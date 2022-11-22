from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from . import permissions
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
    filterset_fields = ['genero', 'estado_civil', 'estado_actual']

    def get_permissions(self):
        self.permission_classes = (permissions.IsAdmin, )
        if self.action == 'retrieve':
            self.permission_classes = (permissions.IsAffiliateItself, )
        return super(self.__class__, self).get_permissions()

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

    def get_permissions(self):
        self.permission_classes = (permissions.IsAdmin, )
        if self.action == 'retrieve':
            self.permission_classes = (permissions.IsItsBeneficiary, )
        return super(self.__class__, self).get_permissions()


class ContratoViewSet(viewsets.ModelViewSet):
    queryset = Contrato.objects.all().order_by('pk')
    serializer_class = ContratoSerializer
    permission_classes = (permissions.BaseModelPermission, )
    filterset_fields = ['estado']


class CotizanteViewSet(viewsets.ModelViewSet):
    queryset = Cotizante.objects.all().order_by('pk')
    serializer_class = CotizanteSerializer
    filterset_fields = ['tipo_cotizante', 'rango_salarial']

    def get_permissions(self):
        self.permission_classes = (permissions.IsAdmin, )
        if self.action == 'retrieve':
            self.permission_classes = (permissions.IsContributorItself, )
        return super(self.__class__, self).get_permissions()

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
    permission_classes = (permissions.BaseModelPermission, )

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
    permission_classes = (permissions.BaseModelPermission, )
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
    permission_classes = (permissions.BaseModelPermission, )


class OrdenViewSet(viewsets.ModelViewSet):
    queryset = Orden.objects.all().order_by('pk')
    serializer_class = OrdenSerializer
    permission_classes = (permissions.BaseModelPermission, )


class OrdenServicioViewSet(viewsets.ModelViewSet):
    queryset = OrdenServicio.objects.all().order_by('pk')
    serializer_class = OrdenServicioSerializer
    permission_classes = (permissions.BaseModelPermission, )


class PagoAportesViewSet(viewsets.ModelViewSet):
    queryset = PagoAportes.objects.all().order_by('pk')
    serializer_class = PagoAportesSerializer
    permission_classes = (permissions.BaseModelPermission, )


class RetiroViewSet(viewsets.ModelViewSet):
    queryset = Retiro.objects.all().order_by('pk')
    serializer_class = RetiroSerializer
    permission_classes = (permissions.BaseModelPermission, )


class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all().order_by('pk')
    serializer_class = ServicioSerializer
    permission_classes = (permissions.BaseModelPermission, )


class VinculacionViewSet(viewsets.ModelViewSet):
    queryset = Vinculacion.objects.all().order_by('pk')
    serializer_class = VinculacionSerializer
    permission_classes = (permissions.BaseModelPermission, )

