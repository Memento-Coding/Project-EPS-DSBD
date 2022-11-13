from django.urls import include, path
from rest_framework import routers

from .views import (
    AfiliadoViewSet, BeneficiarioViewSet, ContratoViewSet, CotizanteViewSet,
    EmpresaViewSet, IpsViewSet, IpsServicioViewSet, OrdenViewSet,
    OrdenServicioViewSet, PagoAportesViewSet, ServicioViewSet
)


class BorvoMedicinaeOperamView(routers.APIRootView):
    """
    API of the management system of the EPS Esperar para Salvarse.
    """
    pass


class DocumentedRouter(routers.DefaultRouter):
    APIRootView = BorvoMedicinaeOperamView


router = DocumentedRouter()
router.register('afiliados', AfiliadoViewSet, basename='afiliados')
router.register('beneficiarios', BeneficiarioViewSet, basename='beneficiarios')
router.register('contratos', ContratoViewSet, basename='contratos')
router.register('cotizantes', CotizanteViewSet, basename='cotizantes')
router.register('empresas', EmpresaViewSet, basename='empresas')
router.register('ips', IpsViewSet, basename='ips')
router.register('ips-servicios', IpsServicioViewSet, basename='ips-servicios')
router.register('ordenes', OrdenViewSet, basename='ordenes')
router.register('ordenes-servicios', OrdenServicioViewSet, basename='ordenes-servicios')
router.register('pagos-aportes', PagoAportesViewSet, basename='pagos-aportes')
router.register('servicios', ServicioViewSet, basename='servicios')


urlpatterns = [
    path('', include(router.urls)),
]