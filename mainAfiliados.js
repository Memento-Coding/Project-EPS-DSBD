$(document).ready(function () {
    const tableAfiliados = $('#tablaAfiliados').DataTable({
    language: {
        url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json',
    },
    ajax: {
        type: 'GET',
        url: 'https://api-borvo.fly.dev/api/v1/afiliados/?limit=1000',
        dataSrc: 'results',
        mode: 'cors',
        async: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        }
    },
    columns: [
        {
            data: 'tipo_dni', render: function (data) {
                const tipo = data;

                switch (tipo) {
                    case 'cedula':
                        return 'Cédula';
                    case 'pasaporte':
                        return 'Pasaporte';
                    case 'tarjeta de identidad':
                        return 'Tarjeta de Identidad';
                    default:
                        return '';
                }
            }
        },
        { data: 'dni' },
        { data: 'nombre' },
        { data: 'apellido' },
        {
            data: 'estado_actual', render: function (data) {
                const estado = data;
                switch (estado) {
                    case 'activo':
                        return '<span class="badge text-bg-success" style="width: 70px">Activo</span>';
                    case 'inactivo':
                        return '<span class="badge text-bg-danger" style="width: 70px">Inactivo</span>';
                    case 'retirado':
                        return '<span class="badge text-bg-secondary" style="width: 70px">Retirado</span>';
                    default:
                        return '';
                }
            }
        },
        { defaultContent: '<div class="btn-group btn-group-sm" role="group" aria-label="Small button group"><button type="button" class= "ver btn btn-primary d-flex justify-align-center"><i class="bx bx-show" style="font-size: 1.5rem; color:white"></i></button><button type="button" class="btn btn-warning d-flex justify-align-center"><i class="bx bx-edit" style="font-size: 1.5rem; color:white"></i></button><button type="button" class="btn btn-danger d-flex justify-align-center"><i class="bx bx-trash" style="font-size: 1.5rem; color:white"></i></button></div>' }
    ],
    responsive: true,
    processing: true,
    });
    verAfiliado('#tablaAfiliados tbody', tableAfiliados);
    añadirAfiliado(tableAfiliados);
    selectIPS();
    
});

const modalAddAfiliado = new bootstrap.Modal(document.getElementById('modalAddAfiliado'), {
    keyboard: false
});

const modalVerAfiliado = new bootstrap.Modal(document.getElementById('modalVerAfiliado'), {
    keyboard: false
});

const modalAddAfiliadoBeneficiario = new bootstrap.Modal(document.getElementById('modalAddAfiliadoBeneficiario'), {
    keyboard: false
});

const modalEditAfiliado = new bootstrap.Modal(document.getElementById('formEditAfiliado'), {
    keyboard: false
});

function abrirModal(modal){
    modal.show();
    
}

function cerrarModal(modal){
    modal.hide();
}

function añadirAfiliado(table) {
    const miForm = document.getElementById('formAddAfiliado');
    miForm.onsubmit = function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = {
            dni: formData.get('dni'),
            ips: formData.get('ips'),
            tipo_dni: formData.get('tipo_dni'),
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            fecha_nacimiento: formData.get('fecha_nacimiento'),
            genero: formData.get('genero'),
            direccion: formData.get('direccion'),
            ciudad: formData.get('ciudad'),
            telefono: formData.get('telefono'),
            estado_civil: formData.get('estado_civil'),
            email: formData.get('email'),
            estado_actual: formData.get('estado_actual'),
            username: formData.get('username'),
        };
        create(data, 'https://api-borvo.fly.dev/api/v1/afiliados/').then(response => {
            if(response){
                cerrarModal(modalAddAfiliado);
                miForm.reset();
                table.ajax.reload(null, false);
            }
        }).catch(err => console.log(err));
    }
}

function selectIPS(){
    const url = 'https://api-borvo.fly.dev/api/v1/ips/?limit=1000';
    $.ajax({
        type: 'GET',
        url: url,
        dataSrc: 'results',
        mode: 'cors',
        async: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        success: function (data) {
            const listaIPS = data.results;
            const selectIPS = document.getElementById('IPS');
            listaIPS.forEach(ips => {
                const option = document.createElement('option');
                option.value = ips.nit;
                option.text = ips.razon_social;
                selectIPS.add(option);
            });
            
        }
    })
}


function verAfiliado(tbody, table){
      $(tbody).on('click', 'button.ver', function(){
        abrirModal(modalVerAfiliado);
        const data = !$(this).parents('tr').hasClass('child') ? table.row($(this).parents('tr')).data() : table.row($(this).parents('tr').prev('tr')).data();
        const tipo_dni = data.tipo_dni,
            dni = data.dni,
            nombre = data.nombre,
            apellido = data.apellido,
            fecha_nacimiento = data.fecha_nacimiento,
            genero = data.genero,
            direccion = data.direccion,
            ciudad = data.ciudad,
            telefono = data.telefono,
            estado_civil = data.estado_civil,
            email = data.email,
            estado_actual = data.estado_actual,
            username = data.username,
            ips = data.ips.substring(37);
            ipsFinal = ips.substring(0, ips.length - 1);
            console.log(data)
        
            const miForm = document.getElementById('formVerAfiliado');
            miForm['tipo_dni'].value = tipo_dni;
            miForm['dni'].value = dni;
            miForm['username'].value = username;
            miForm['nombre'].value = nombre;
            miForm['apellido'].value = apellido;
            miForm['fecha_nacimiento'].value = fecha_nacimiento;
            miForm['genero'].value = genero;
            miForm['direccion'].value = direccion;
            miForm['ciudad'].value = ciudad;
            miForm['telefono'].value = telefono;
            miForm['estado_civil'].value = estado_civil;
            miForm['email'].value = email;
            miForm['IPS'].value = ipsFinal;
            miForm['estado_actual'].value = estado_actual;
            
            
            
})}