"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.views.generic import RedirectView

from rest_framework import permissions
from rest_framework.authtoken.views import obtain_auth_token
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from api import views


schema_view = get_schema_view(
    openapi.Info(
        title='Borvo Medicinae Operam API',
        default_version='v1',
        description='A sample API for the EPS Esperar para salvarse',
        terms_of_service='https://www.google.com/policies/terms/',
        contact=openapi.Contact(email='borvo-mo@email.com'),
        license=openapi.License(name='BSD License')
    ),
    public=True,
    permission_classes=(permissions.IsAuthenticatedOrReadOnly,)
)

urlpatterns = [
    path('', RedirectView.as_view(url='api/v1')),
    path('admin/', admin.site.urls),
    path('api-auth', include('rest_framework.urls')),   # add login
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('api/v1/', include('api.urls')),
    path('api/v1/dj-rest-auth/', include('dj_rest_auth.urls')),
    path('api/v1/dj-rest-auth/registration/',
         include('dj_rest_auth.registration.urls')
    ),
    path('api/v1/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    # ------------------------------- REPORTES --------------------------------
    path('api/v1/pdf/afiliados-activos/', views.ReporteAfiliadoActivos.as_view(), name="pdf-afiliados-activos" ),
    path('api/v1/pdf/afiliados-activos/ips/<int:pk>/', views.ReporteAfiliadoActivosIPS.as_view(), name="pdf-afiliados-activos-ips" ),
    path('api/v1/pdf/pago-aportes/<int:afiliado_pk>/<str:fecha_inicio>/<str:fecha_fin>/', views.ReportePagoAportes.as_view(), name="pdf-pago-aportes" ),
    path('api/v1/pdf/afiliados-inactivos/', views.ReporteAfiliadoInactivos.as_view(), name="pdf-afiliados-inactivos" ),
    path('api/v1/pdf/citas/<int:ips_pk>/<str:fecha_inicio>/<str:fecha_fin>/', views.ReporteCitasIPS.as_view(), name="pdf-citas" ),
    path('api/v1/pdf/citas/<int:ips_pk>/<str:fecha>/', views.ReporteCitasDiaIPS.as_view(), name="pdf-citas-dia" ),
    path('api/v1/pdf/independientes/', views.ReporteAfiliadoIndependiente.as_view(), name="pdf-afiliados-independientes" ),
    path('api/v1/pdf/ordenes/<int:afiliado_pk>', views.ReporteOrdenesAfiliado.as_view(), name="pdf-ordenes-afiliado" ),
    path('api/v1/pdf/cotizantes/<int:empresa_pk>', views.ReporteCotizantesEmpresa.as_view(), name="pdf-cotizantes-empresa" ),
]
