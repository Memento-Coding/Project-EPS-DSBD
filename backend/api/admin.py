from django.contrib import admin

from . import models


@admin.register(models.Afiliado)
class AfiliadoAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.Afiliado._meta.fields]
    search_fields = ('nombre', 'apellido')
    search_help_text = 'Search by first name and last name'
    list_filter = ('genero', 'estado_civil', 'estado_actual')
    empty_value_display = '-'
    ordering = ('nombre', 'apellido')
    list_per_page = 25


@admin.register(models.Beneficiario)
class BeneficiarioAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.Beneficiario._meta.fields]
    list_filter = ('parentesco',)
    empty_value_display = '-'
    list_per_page = 25


@admin.register(models.Contrato)
class ContratoAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.Contrato._meta.fields]
    search_fields = ('empresa', 'cotizante')
    search_help_text = 'Search by company and contributor'
    list_filter = ('estado',)
    empty_value_display = '-'
    list_per_page = 25


@admin.register(models.Cotizante)
class CotizanteAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.Cotizante._meta.fields]
    list_filter = ('tipo_cotizante', 'rango_salarial')
    empty_value_display = '-'
    list_per_page = 25


@admin.register(models.Empresa)
class EmpresaAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.Empresa._meta.fields]
    search_fields = ('razon_social', 'ciudad')
    search_help_text = 'Search by business name or city'
    empty_value_display = '-'
    ordering = ('razon_social',)
    list_per_page = 25


@admin.register(models.Ips)
class IpsAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.Ips._meta.fields]
    search_fields = ('razon_social',)
    search_help_text = 'Search by business name'
    list_filter = ('nivel_atencion',)
    empty_value_display = '-'
    ordering = ('razon_social',)
    list_per_page = 25


@admin.register(models.IpsServicio)
class IpsServicioAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.IpsServicio._meta.fields]


@admin.register(models.Orden)
class OrdenAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.Orden._meta.fields]
    search_fields = ('medico', 'ips')
    search_help_text = 'Search by doctor or IPS'
    empty_value_display = '-'
    ordering = ('ips', 'medico')
    list_per_page = 25


@admin.register(models.OrdenServicio)
class OrdenServicioAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.OrdenServicio._meta.fields]


@admin.register(models.PagoAportes)
class PagoAportesAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.PagoAportes._meta.fields]
    search_fields = ('cotizante', 'empresa')
    search_help_text = 'Search by contributor or company'
    empty_value_display = '-'
    ordering = ('empresa', 'cotizante')
    list_per_page = 25


@admin.register(models.Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = [field.name for field in models.Servicio._meta.fields]
    search_fields = ('nombre',)
    search_help_text = 'Search by service name'
    empty_value_display = '-'
    ordering = ('nombre',)
    list_per_page = 25
