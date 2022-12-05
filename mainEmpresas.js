$(document).ready(function () {
    const tableEmpresas = $('#tablaEmpresas').DataTable({
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json',
        },
        ajax: {
            type: 'GET',
            url: 'https://api-borvo.fly.dev/api/v1/empresas/?limit=1000',
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
            { data: 'nit_rut' },
            { data: 'razon_social' },
            { data: 'ciudad' },
            { data: 'direccion' },
            { data: 'telefono' },
            { data: 'nombre_contacto' },
            { defaultContent: '<div class="btn-group btn-group-sm" role="group" aria-label="Small button group"><button type="button" class="editar btn btn-warning d-flex justify-align-center"><i class="bx bx-edit" style="font-size: 1.5rem; color:white"></i></button><button type="button" class="eliminar btn btn-danger d-flex justify-align-center"><i class="bx bx-trash" style="font-size: 1.5rem; color:white"></i></button></div>' }
        ],
        responsive: true,
        processing: true,
    });
    eliminar('#tablaEmpresas tbody', tableEmpresas);
    editar('#tablaEmpresas tbody', tableEmpresas);
    añadir(tableEmpresas);
});



const modalAddEmpresa = new bootstrap.Modal(document.getElementById('modalAddEmpresa'), {
    keyboard: false
});

const modalEditEmpresa = new bootstrap.Modal(document.getElementById('modalEditEmpresa'), {
    keyboard: false
});

abrirModal = (modal) => {
    modal.show();
}

cerrarModal = (modal) => {
    modal.hide();
}

const añadir = function (table) {
    const miForm = document.getElementById('formAddEmpresa');
    miForm.onsubmit = function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = {
            nit_rut: formData.get('nit_rut'),
            razon_social: formData.get('razon_social'),
            ciudad: formData.get('ciudad'),
            direccion: formData.get('direccion'),
            telefono: formData.get('telefono'),
            nombre_contacto: formData.get('nombre_contacto'),
        };
        create(data, 'https://api-borvo.fly.dev/api/v1/empresas/').then(response => {
            if (response) {
                cerrarModal(modalAddEmpresa);
                miForm.reset();
                table.ajax.reload(null, false);
            }
        }).catch(err => console.log(err));
    }
}

const editar = function (tbody, table) {
    $(tbody).on('click', 'button.editar', function () {
        abrirModal(modalEditEmpresa);
        const data = !$(this).parents('tr').hasClass('child') ?
            table.row($(this).parents('tr')).data() : table.row($(this).parents('tr').prev()).data();
        const nit = data.nit_rut,
        nombre = data.razon_social,
        ciudad = data.ciudad,
        direccion = data.direccion,
        telefono = data.telefono,
        nombre_contacto = data.nombre_contacto;
        
        const miForm = document.getElementById('formEditEmpresa');

        miForm['nit_rut'].value = nit;
        miForm['razon_social'].value = nombre;
        miForm['ciudad'].value = ciudad;
        miForm['direccion'].value = direccion;
        miForm['telefono'].value = telefono;
        miForm['nombre_contacto'].value = nombre_contacto;

        miForm.onsubmit = function(e){
            e.preventDefault();
            const formData = new FormData(this);
            const data = {
                nit_rut: formData.get('nit_rut'),
                razon_social: formData.get('razon_social'),
                ciudad: formData.get('ciudad'),
                direccion: formData.get('direccion'),
                telefono: formData.get('telefono'),
                nombre_contacto: formData.get('nombre_contacto'),
            };
            up(data, 'https://api-borvo.fly.dev/api/v1/empresas/'+ nit +'/').then(response => {
                if (response) {
                    table.ajax.reload(null, false);
                    cerrarModal(modalEditEmpresa);
                }
            })        
        }
    });
}

const eliminar = function (tbody, table) {
    $(tbody).on('click', 'button.eliminar', function () {
        const data = !$(this).parents('tr').hasClass('child') ?
            table.row($(this).parents('tr')).data() : table.row($(this).parents('tr').prev()).data();
        const nit = data.nit_rut;
        const nombre = data.razon_social;

        swal({
            title: "Está seguro?",
            text: "Se eliminará la empresa: " + nombre,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    del('https://api-borvo.fly.dev/api/v1/empresas/' + nit + '/').then(response => {
                        if (response) {
                            table.ajax.reload(null, false);
                        }
                    });
                }
            });
    });
}
