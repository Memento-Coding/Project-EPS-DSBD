import datetime

from django.http import HttpResponse
from django.views.generic import View

from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .utils import render_to_pdf
from .models import (
    Afiliado, Beneficiario, Contrato, Cotizante, Empresa, Ips,
    IpsServicio, Orden, OrdenServicio, PagoAportes, Retiro, Servicio,
    Vinculacion
)
from .serializers import (
    AfiliadoSerializer, BeneficiarioSerializer, ContratoSerializer,
    CotizanteSerializer, EmpresaSerializer, IpsSerializer,
    IpsServicioSerializer, OrdenSerializer, OrdenServicioSerializer,
    PagoAportesSerializer, RetiroSerializer, ServicioSerializer,
    VinculacionSerializer
)


class AfiliadoViewSet(viewsets.ModelViewSet):
    queryset = Afiliado.objects.all().order_by('pk')
    serializer_class = AfiliadoSerializer
    filterset_fields = ['genero', 'estado_civil', 'estado_actual', 'username']
    permission_classes = (permissions.IsAuthenticated, )

    # def get_permissions(self):
    #    self.permission_classes = (permissions.IsAdmin, )
    #    if self.action == 'retrieve':
    #        self.permission_classes = (permissions.IsAffiliateItself, )
    #    return super(self.__class__, self).get_permissions()

    @action(detail=True, methods=['get'])
    def beneficiarios(self, request, pk=None):
        # afiliados/{id}/beneficiarios
        cotizante = Cotizante.objects.get(dni=pk)
        beneficiarios = Beneficiario.objects.filter(cotizante=cotizante.pk)
        queryset = BeneficiarioSerializer(
            beneficiarios,
            many=True,
            context={'request': request}
        ).data
        return Response(queryset)


class BeneficiarioViewSet(viewsets.ModelViewSet):
    queryset = Beneficiario.objects.all().order_by('pk')
    serializer_class = BeneficiarioSerializer
    permission_classes = (permissions.IsAuthenticated, )
    filterset_fields = ['dni']

    # def get_permissions(self):
    #    self.permission_classes = (permissions.IsAdmin, )
    #    if self.action == 'retrieve':
    #        self.permission_classes = (permissions.IsItsBeneficiary, )
    #    return super(self.__class__, self).get_permissions()


class ContratoViewSet(viewsets.ModelViewSet):
    queryset = Contrato.objects.all().order_by('pk')
    serializer_class = ContratoSerializer
    permission_classes = (permissions.IsAuthenticated, )
    filterset_fields = ['estado', 'cotizante__dni', 'empresa']


class CotizanteViewSet(viewsets.ModelViewSet):
    queryset = Cotizante.objects.all().order_by('pk')
    serializer_class = CotizanteSerializer
    filterset_fields = ['tipo_cotizante', 'rango_salarial', 'dni']
    permission_classes = (permissions.IsAuthenticated, )

    # def get_permissions(self):
    #    self.permission_classes = (permissions.IsAdmin, )
    #    if self.action == 'retrieve':
    #        self.permission_classes = (permissions.IsContributorItself, )
    #    return super(self.__class__, self).get_permissions()

    @action(detail=True, methods=['get'])
    def contratos(self, request, pk=None):
        # cotizantes/{id}/contratos
        contratos = Contrato.objects.filter(cotizante=pk)
        queryset = ContratoSerializer(
            contratos,
            many=True,
            context={'request': request}
        ).data
        return Response(queryset)

    @action(detail=True, methods=['get'])
    def pago_aportes(self, request, pk=None):
        # cotizantes/{id}/pago_aportes
        pago_aportes = PagoAportes.objects.filter(cotizante=pk)
        queryset = PagoAportesSerializer(
            pago_aportes,
            many=True,
            context={'request': request}
        ).data
        return Response(queryset)


class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all().order_by('pk')
    serializer_class = EmpresaSerializer
    permission_classes = (permissions.IsAuthenticated, )

    @action(detail=True, methods=['get'])
    def contratos(self, request, pk=None):
        # empresas/{id}/contratos
        contratos = Contrato.objects.filter(empresa=pk)
        queryset = ContratoSerializer(
            contratos,
            many=True,
            context={'request': request}
        ).data
        return Response(queryset)


class IpsViewSet(viewsets.ModelViewSet):
    queryset = Ips.objects.all().order_by('pk')
    serializer_class = IpsSerializer
    permission_classes = (permissions.IsAuthenticated, )
    filterset_fields = ['nivel_atencion']

    @action(detail=True, methods=['get'])
    def ordenes(self, request, pk=None):
        # ips/{id}/ordenes
        ordenes = Orden.objects.filter(ips=pk)
        queryset = OrdenSerializer(
            ordenes,
            many=True,
            context={'request': request}
        ).data
        return Response(queryset)

    @action(detail=True, methods=['get'])
    def servicios(self, request, pk=None):
        # ips/{id}/servicios
        servicios = Servicio.objects.filter(ipsservicio__ips=pk)
        queryset = ServicioSerializer(
            servicios,
            many=True,
            context={'request': request}
        ).data
        return Response(queryset)


class IpsServicioViewSet(viewsets.ModelViewSet):
    queryset = IpsServicio.objects.all().order_by('pk')
    serializer_class = IpsServicioSerializer
    permission_classes = (permissions.IsAuthenticated, )
    filterset_fields = ['ips', 'servicio']


class OrdenViewSet(viewsets.ModelViewSet):
    queryset = Orden.objects.all().order_by('pk')
    serializer_class = OrdenSerializer
    permission_classes = (permissions.IsAuthenticated, )
    filterset_fields = ['ips', 'afiliado']


class OrdenServicioViewSet(viewsets.ModelViewSet):
    queryset = OrdenServicio.objects.all().order_by('pk')
    serializer_class = OrdenServicioSerializer
    permission_classes = (permissions.IsAuthenticated, )
    filterset_fields = ['orden', 'servicio']


class PagoAportesViewSet(viewsets.ModelViewSet):
    queryset = PagoAportes.objects.all().order_by('pk')
    serializer_class = PagoAportesSerializer
    permission_classes = (permissions.IsAuthenticated, )
    filterset_fields = ['cotizante__dni', 'empresa']


class RetiroViewSet(viewsets.ModelViewSet):
    queryset = Retiro.objects.all().order_by('pk')
    serializer_class = RetiroSerializer
    permission_classes = (permissions.IsAuthenticated, )
    filterset_fields = ['cotizante__dni', 'empresa']


class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all().order_by('pk')
    serializer_class = ServicioSerializer
    permission_classes = (permissions.IsAuthenticated, )


class VinculacionViewSet(viewsets.ModelViewSet):
    queryset = Vinculacion.objects.all().order_by('pk')
    serializer_class = VinculacionSerializer
    permission_classes = (permissions.IsAuthenticated, )
    filterset_fields = ['cotizante__dni', 'empresa']


# ---------------------------------- REPORTES ---------------------------------


class ReporteAfiliadoActivos(View):
    def get(self, request, *args, **kwargs):
        queryset = Afiliado.objects.filter(estado_actual='activo')
        data = {
            'fecha': datetime.date.today(),
            'afiliados': queryset,
            'server': request.get_host(),
        }
        pdf = render_to_pdf('api/afiliados_activos.html', data)
        return HttpResponse(pdf, content_type='application/pdf')


class ReporteAfiliadoActivosIPS(View):
    def get(self, request, *args, **kwargs):
        ips_pk = kwargs['pk']
        ips = Ips.objects.get(pk=ips_pk)
        queryset = Afiliado.objects.filter(estado_actual='activo', ips=ips_pk)
        data = {
            'fecha': datetime.date.today(),
            'ips': ips,
            'afiliados': queryset,
            'server': request.get_host(),
        }
        pdf = render_to_pdf('api/afiliados_activos_ips.html', data)
        return HttpResponse(pdf, content_type='application/pdf')


class ReportePagoAportes(View):
    def get(self, request, *args, **kwargs):
        afiliado_pk = kwargs['afiliado_pk']
        fecha_inicio = kwargs['fecha_inicio']
        fecha_fin = kwargs['fecha_fin']
        cotizante = Cotizante.objects.get(dni=afiliado_pk)
        queryset = PagoAportes.objects.filter(cotizante__dni=afiliado_pk, fecha__range=(fecha_inicio, fecha_fin))
        data = {
            'fecha': datetime.date.today(),
            'fecha_inicio': fecha_inicio,
            'fecha_fin': fecha_fin,
            'cotizante': cotizante,
            'pago_aportes': queryset,
            'server': request.get_host(),
        }
        pdf = render_to_pdf('api/pago-aportes.html', data)
        return HttpResponse(pdf, content_type='application/pdf')


class ReporteAfiliadoInactivos(View):
    def get(self, request, *args, **kwargs):
        queryset = Afiliado.objects.filter(estado_actual__in=['inactivo', 'retirado'])
        data = {
            'fecha': datetime.date.today(),
            'afiliados': queryset,
            'server': request.get_host(),
        }
        pdf = render_to_pdf('api/afiliados_inactivos.html', data)
        return HttpResponse(pdf, content_type='application/pdf')


class ReporteCitasIPS(View):
    def get(self, request, *args, **kwargs):
        ips_pk = kwargs['ips_pk']
        fecha_inicio = kwargs['fecha_inicio']
        fecha_fin = kwargs['fecha_fin']
        ips = Ips.objects.get(pk=ips_pk)
        queryset = Orden.objects.filter(ips=ips_pk, fecha__range=(fecha_inicio, fecha_fin))
        data = {
            'fecha': datetime.date.today(),
            'fecha_inicio': fecha_inicio,
            'fecha_fin': fecha_fin,
            'ips': ips,
            'ordenes': queryset,
            'server': request.get_host(),
        }
        pdf = render_to_pdf('api/citas.html', data)
        return HttpResponse(pdf, content_type='application/pdf')


class ReporteAfiliadoIndependiente(View):
    def get(self, request, *args, **kwargs):
        queryset = Afiliado.objects.filter(cotizante__tipo_cotizante='independiente').order_by('estado_actual', 'nombre', 'apellido').values()
        data = {
            'fecha': datetime.date.today(),
            'afiliados': queryset,
            'server': request.get_host(),
        }
        pdf = render_to_pdf('api/afiliados_independientes.html', data)
        return HttpResponse(pdf, content_type='application/pdf')