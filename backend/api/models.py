# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Afiliado(models.Model):
    TIPOS_DNI = [
        ('cedula', 'cedula'),
        ('tarjeta de identidad', 'tarjeta de identidad'),
        ('pasaporte', 'pasaporte'),
    ]
    GENEROS = [
        ('masculino', 'masculino'),
        ('femenino', 'femenino'),
    ]
    ESTADOS_CIVILES = [
        ('soltero/a', 'soltero/a'),
        ('casado/a', 'casado/a'),
        ('viudo/a', 'viudo/a'),
        ('divorciado/a', 'divorciado'),
    ]
    ESTADOS_ACTUALES = [
        ('activo', 'activo'),
        ('inactivo', 'inactivo'),
        ('retirado', 'retirado'),
    ]
    dni = models.CharField(primary_key=True, max_length=12)
    tipo_dni = models.CharField(max_length=20, choices=TIPOS_DNI)
    nombre = models.CharField(max_length=25)
    apellido = models.CharField(max_length=25)
    fecha_nacimiento = models.DateField()
    genero = models.CharField(max_length=10, choices=GENEROS)
    direccion = models.CharField(max_length=100, blank=True, null=True)
    ciudad = models.CharField(max_length=50)
    telefono = models.CharField(max_length=15)
    estado_civil = models.CharField(max_length=12, choices=ESTADOS_CIVILES)
    email = models.CharField(unique=True, max_length=50)
    estado_actual = models.CharField(max_length=8, choices=ESTADOS_ACTUALES)
    ips = models.ForeignKey('Ips', models.DO_NOTHING, db_column='ips')

    def __str__(self):
        return f'{self.nombre} {self.apellido}'

    class Meta:
        managed = False
        db_table = 'afiliado'


class Beneficiario(models.Model):
    PARENTESCOS = [
        ('conyuge', 'conyuge'),
        ('padre', 'padre'),
        ('madre', 'madre'),
        ('hijo/a', 'hijo/a'),
    ]
    dni = models.ForeignKey(Afiliado, models.DO_NOTHING, db_column='dni', blank=True, null=True)
    parentesco = models.CharField(max_length=7, choices=PARENTESCOS)
    cotizante = models.ForeignKey('Cotizante', models.DO_NOTHING, db_column='cotizante')

    def __str__(self):
        return f'{self.dni.nombre} {self.dni.apellido}'

    class Meta:
        managed = False
        db_table = 'beneficiario'


class Contrato(models.Model):
    ESTADOS = [
        ('activo', 'activo'),
        ('inactivo', 'inactivo'),
    ]
    cotizante = models.ForeignKey('Cotizante', models.DO_NOTHING, db_column='cotizante')
    empresa = models.ForeignKey('Empresa', models.DO_NOTHING, db_column='empresa', blank=True, null=True)
    fecha_recibido = models.DateField()
    salario_base = models.IntegerField()
    estado = models.CharField(max_length=9, choices=ESTADOS)

    def __str__(self):
        return f'{self.cotizante} {self.empresa.nit_rut}'

    class Meta:
        managed = False
        db_table = 'contrato'


class Cotizante(models.Model):
    RANGOS_SALARIALES = [
        ('A', 'A: < 2 smlv'),
        ('B', 'B: 2-5 smlv'),
        ('C', 'C: > 5 smlv')
    ]
    TIPOS = [
        ('dependiente', 'dependiente'),
        ('independiente', 'independiente'),
    ]
    dni = models.ForeignKey(Afiliado, models.DO_NOTHING, db_column='dni', blank=True, null=True)
    tipo_cotizante = models.CharField(max_length=15, choices=TIPOS)
    fecha_primera_afiliacion = models.DateField(auto_now_add=True)
    salario = models.IntegerField()
    rango_salarial = models.CharField(max_length=1, choices=RANGOS_SALARIALES)

    def __str__(self):
        return f'{self.dni.nombre} {self.dni.apellido}'

    class Meta:
        managed = False
        db_table = 'cotizante'


class Empresa(models.Model):
    nit_rut = models.CharField(primary_key=True, max_length=12)
    razon_social = models.CharField(unique=True, max_length=50)
    ciudad = models.CharField(max_length=50)
    direccion = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=15)
    nombre_contacto = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.razon_social}'

    class Meta:
        managed = False
        db_table = 'empresa'


class Ips(models.Model):
    NIVELES_ATENCION = [
        ('1', '1'),
        ('2', '2'),
        ('3', '3'),
        ('4', '4'),
    ]
    nit = models.CharField(primary_key=True, max_length=12)
    razon_social = models.CharField(unique=True, max_length=50)
    nivel_atencion = models.CharField(max_length=1, choices=NIVELES_ATENCION)

    def __str__(self):
        return f'{self.razon_social}'

    class Meta:
        managed = False
        db_table = 'ips'
        verbose_name_plural = 'ips'


class IpsServicio(models.Model):
    ips = models.ForeignKey(Ips, models.DO_NOTHING, db_column='ips', blank=True, null=True)
    servicio = models.ForeignKey('Servicio', models.DO_NOTHING, db_column='servicio')

    def __str__(self):
        return f'{self.ips} - {self.servicio}'

    class Meta:
        managed = False
        db_table = 'ips_servicio'


class Orden(models.Model):
    fecha = models.DateField()
    medico = models.CharField(max_length=50)
    ips = models.ForeignKey(Ips, models.DO_NOTHING, db_column='ips', blank=True, null=True)
    afiliado = models.ForeignKey(Afiliado, models.DO_NOTHING, db_column='afiliado', blank=True, null=True)
    diagnostico = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.ips} [{self.medico}, {self.fecha}]'

    class Meta:
        managed = False
        db_table = 'orden'


class OrdenServicio(models.Model):
    orden = models.ForeignKey(Orden, models.DO_NOTHING, db_column='orden')
    servicio = models.ForeignKey('Servicio', models.DO_NOTHING, db_column='servicio')

    def __str__(self):
        return f'{self.orden} - {self.servicio}'

    class Meta:
        managed = False
        db_table = 'orden_servicio'


class PagoAportes(models.Model):
    cotizante = models.ForeignKey(Cotizante, models.DO_NOTHING, db_column='cotizante')
    empresa = models.ForeignKey(Empresa, models.DO_NOTHING, db_column='empresa', blank=True, null=True)
    fecha = models.DateField()
    valor = models.IntegerField()

    def __str__(self):
        return f'{self.cotizante} - {self.empresa} [{self.fecha}]'

    class Meta:
        managed = False
        db_table = 'pago_aportes'


class Retiro(models.Model):
    fecha = models.DateField()
    empresa = models.ForeignKey('Empresa', models.DO_NOTHING, db_column='empresa', blank=True, null=True)
    cotizante = models.ForeignKey(Cotizante, models.DO_NOTHING, db_column='cotizante')

    def __str__(self):
        return f'Retiro [{self.empresa} - {self.cotizante}]'

    class Meta:
        managed = False
        db_table = 'retiro'


class Servicio(models.Model):
    nombre = models.CharField(unique=True, max_length=25)
    descripcion = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f'{self.nombre}'

    class Meta:
        managed = False
        db_table = 'servicio'


class Vinculacion(models.Model):
    fecha = models.DateField()
    empresa = models.ForeignKey('Empresa', models.DO_NOTHING, db_column='empresa', blank=True, null=True)
    cotizante = models.ForeignKey(Cotizante, models.DO_NOTHING, db_column='cotizante')

    def __str__(self):
        return f'Vinculación [{self.empresa} - {self.cotizante}]'

    class Meta:
        managed = False
        db_table = 'vinculacion'
        verbose_name_plural = 'vinculaciones'