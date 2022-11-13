from rest_framework import permissions, viewsets

from .models import (
    Afiliado, Beneficiario, Contrato, Cotizante, Empresa, Ips,
    IpsServicio, Orden, OrdenServicio, PagoAportes, Servicio
)
from .serializers import (
    AfiliadoSerializer, BeneficiarioSerializer, ContratoSerializer,
    CotizanteSerializer, EmpresaSerializer, IpsSerializer,
    IpsServicioSerializer, OrdenSerializer, OrdenServicioSerializer,
    PagoAportesSerializer, ServicioSerializer
)


class AfiliadoViewSet(viewsets.ModelViewSet):
    queryset = Afiliado.objects.all().order_by('pk')
    serializer_class = AfiliadoSerializer
    permission_classes = (permissions.IsAdminUser, )
    filterset_fields = ['genero', 'estado_civil', 'estado_actual']


class BeneficiarioViewSet(viewsets.ModelViewSet):
    queryset = Beneficiario.objects.all().order_by('pk')
    serializer_class = BeneficiarioSerializer
    permission_classes = (permissions.IsAdminUser, )


class ContratoViewSet(viewsets.ModelViewSet):
    queryset = Contrato.objects.all().order_by('pk')
    serializer_class = ContratoSerializer
    permission_classes = (permissions.IsAdminUser, )
    filterset_fields = ['estado']


class CotizanteViewSet(viewsets.ModelViewSet):
    queryset = Cotizante.objects.all().order_by('pk')
    serializer_class = CotizanteSerializer
    permission_classes = (permissions.IsAdminUser, )
    filterset_fields = ['tipo_cotizante', 'rango_salarial']


class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all().order_by('pk')
    serializer_class = EmpresaSerializer
    permission_classes = (permissions.IsAdminUser, )


class IpsViewSet(viewsets.ModelViewSet):
    queryset = Ips.objects.all().order_by('pk')
    serializer_class = IpsSerializer
    permission_classes = (permissions.IsAdminUser, )
    filterset_fields = ['nivel_atencion']


class IpsServicioViewSet(viewsets.ModelViewSet):
    queryset = IpsServicio.objects.all().order_by('pk')
    serializer_class = IpsServicioSerializer
    permission_classes = (permissions.IsAdminUser, )


class OrdenViewSet(viewsets.ModelViewSet):
    queryset = Orden.objects.all().order_by('pk')
    serializer_class = OrdenSerializer
    permission_classes = (permissions.IsAdminUser, )


class OrdenServicioViewSet(viewsets.ModelViewSet):
    queryset = OrdenServicio.objects.all().order_by('pk')
    serializer_class = OrdenServicioSerializer
    permission_classes = (permissions.IsAdminUser, )


class PagoAportesViewSet(viewsets.ModelViewSet):
    queryset = PagoAportes.objects.all().order_by('pk')
    serializer_class = PagoAportesSerializer
    permission_classes = (permissions.IsAdminUser, )


class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all().order_by('pk')
    serializer_class = ServicioSerializer
    permission_classes = (permissions.IsAdminUser, )
