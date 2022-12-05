from rest_framework import serializers

from .models import (
    Afiliado, Beneficiario, Contrato, Cotizante, Empresa, Ips,
    IpsServicio, Orden, OrdenServicio, PagoAportes, Retiro, Servicio,
    Vinculacion
)


class IpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ips
        fields = '__all__'


class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'


class IpsServicioSerializer(serializers.ModelSerializer):
    ips = serializers.HyperlinkedRelatedField(
        view_name='ips-detail', many=False, queryset=Ips.objects.all()
    )
    servicio = serializers.HyperlinkedRelatedField(
        view_name='servicios-detail', many=False, queryset=Servicio.objects.all()
    )
    class Meta:
        model = IpsServicio
        fields = '__all__'


class AfiliadoSerializer(serializers.ModelSerializer):
    ips = serializers.HyperlinkedRelatedField(
        view_name='ips-detail', many=False, queryset=Ips.objects.all()
    )
    class Meta:
        model = Afiliado
        fields = '__all__'


class CotizanteSerializer(serializers.ModelSerializer):
    dni = serializers.HyperlinkedRelatedField(
        view_name='afiliados-detail', many=False, queryset=Afiliado.objects.all()
    )
    class Meta:
        model = Cotizante
        fields = '__all__'


class BeneficiarioSerializer(serializers.ModelSerializer):
    dni = serializers.HyperlinkedRelatedField(
        view_name='afiliados-detail', many=False, queryset=Afiliado.objects.all()
    )
    cotizante = serializers.HyperlinkedRelatedField(
        view_name='cotizantes-detail', many=False, queryset=Cotizante.objects.all()
    )
    class Meta:
        model = Beneficiario
        fields = '__all__'


class OrdenSerializer(serializers.ModelSerializer):
    ips = serializers.HyperlinkedRelatedField(
        view_name='ips-detail', many=False, queryset=Ips.objects.all()
    )
    afiliado = serializers.HyperlinkedRelatedField(
        view_name='afiliados-detail', many=False, queryset=Afiliado.objects.all()
    )
    class Meta:
        model = Orden
        fields = '__all__'


class OrdenServicioSerializer(serializers.ModelSerializer):
    orden = serializers.HyperlinkedRelatedField(
        view_name='ordenes-detail', many=False, queryset=Orden.objects.all()
    )
    servicio = serializers.HyperlinkedRelatedField(
        view_name='servicios-detail', many=False, queryset=Servicio.objects.all()
    )
    class Meta:
        model = OrdenServicio
        fields = '__all__'

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'


class ContratoSerializer(serializers.ModelSerializer):
    cotizante = serializers.HyperlinkedRelatedField(
        view_name='cotizantes-detail', many=False, queryset=Cotizante.objects.all()
    )
    empresa = serializers.HyperlinkedRelatedField(
        view_name='empresas-detail', many=False, queryset=Empresa.objects.all()
    )
    class Meta:
        model = Contrato
        fields = '__all__'


class PagoAportesSerializer(serializers.ModelSerializer):
    cotizante = serializers.HyperlinkedRelatedField(
        view_name='cotizantes-detail', many=False, queryset=Cotizante.objects.all()
    )
    empresa = serializers.HyperlinkedRelatedField(
        view_name='empresas-detail', many=False, queryset=Empresa.objects.all()
    )
    class Meta:
        model = PagoAportes
        fields = '__all__'


class RetiroSerializer(serializers.ModelSerializer):
    cotizante = serializers.HyperlinkedRelatedField(
        view_name='cotizantes-detail', many=False, queryset=Cotizante.objects.all()
    )
    empresa = serializers.HyperlinkedRelatedField(
        view_name='empresas-detail', many=False, queryset=Empresa.objects.all()
    )
    class Meta:
        model = Retiro
        fields = '__all__'


class VinculacionSerializer(serializers.ModelSerializer):
    cotizante = serializers.HyperlinkedRelatedField(
        view_name='cotizantes-detail', many=False, queryset=Cotizante.objects.all()
    )
    empresa = serializers.HyperlinkedRelatedField(
        view_name='empresas-detail', many=False, queryset=Empresa.objects.all()
    )
    class Meta:
        model = Vinculacion
        fields = '__all__'