$(document).ready(function () {
    const tableIPS  = $('#tablaIPS').DataTable({
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json',
        },
        ajax: {
            type: 'GET',
            url: 'https://api-borvo.fly.dev/api/v1/ips/?limit=1000',
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
            { data: 'nit' },
            { data: 'razon_social' },
            { data: 'nivel_atencion'},         
            { defaultContent: '<div class="btn-group btn-group-sm" role="group" aria-label="Small button group"><button type="button" class="editar btn btn-warning d-flex justify-align-center"><i class="bx bx-edit" style="font-size: 1.5rem; color:white"></i></button><button type="button" class="eliminar btn btn-danger d-flex justify-align-center"><i class="bx bx-trash" style="font-size: 1.5rem; color:white"></i></button></div>' }
        ],
        responsive: true,
        processing: true,
    });
    eliminar('#tablaIPS tbody', tableIPS );
    editar('#tablaIPS  tbody', tableIPS );
    añadir(tableIPS );
});

const modalAddIPS  = new bootstrap.Modal(document.getElementById('modalAddIPS'), {
    keyboard: false
});

const modalEditIPS  = new bootstrap.Modal(document.getElementById('modalEditIPS'), {
    keyboard: false
});

abrirModal = (modal) => {
    modal.show();
}

cerrarModal = (modal) => {
    modal.hide();
}

const añadir = function (table) {
    const miForm = document.getElementById('formAddIPS');
    miForm.onsubmit = function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = {
            nit: formData.get('nit'),
            razon_social: formData.get('razon_social'),
            nivel_atencion: formData.get('nivel_atencion'),         
        };
        create(data, 'https://api-borvo.fly.dev/api/v1/ips/').then(response => {
            if (response) {
                cerrarModal(modalAddIPS);
                miForm.reset();
                table.ajax.reload(null, false);
            }
        }).catch(err => console.log(err));
    }
}

const editar = function (tbody, table) {
    $(tbody).on('click', 'button.editar', function () {
        abrirModal(modalEditIPS);
        const data = !$(this).parents('tr').hasClass('child') ?
            table.row($(this).parents('tr')).data() : table.row($(this).parents('tr').prev()).data();
        const nit = data.nit,
        razon_social = data.razon_social,
        nivel_atencion = data.nivel_atencion
        
        const miForm = document.getElementById('formEditIPS');

        miForm['nit'].value = nit;
        miForm['razon_social'].value = razon_social;
        miForm['nivel_atencion'].value = nivel_atencion;

        miForm.onsubmit = function(e){
            e.preventDefault();
            const formData = new FormData(this);
            const data = {
                nit: formData.get('nit'),
                razon_social: formData.get('razon_social'),
                nivel_atencion: formData.get('nivel_atencion'),                
            };
            up(data, 'https://api-borvo.fly.dev/api/v1/ips/'+ nit +'/').then(response => {
                if (response) {
                    table.ajax.reload(null, false);
                    cerrarModal(modalEditIPS);
                }
            })        
        }
    });
}

const eliminar = function (tbody, table) {
    $(tbody).on('click', 'button.eliminar', function () {
        const data = !$(this).parents('tr').hasClass('child') ?
            table.row($(this).parents('tr')).data() : table.row($(this).parents('tr').prev()).data();
        const nit = data.nit;
        const razon_social = data.razon_social;


        swal({
            title: "Está seguro?",
            text: "Se eliminará la IPS: " + razon_social,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    del('https://api-borvo.fly.dev/api/v1/ips/' + nit + '/').then(response => {
                        if (response) {
                            table.ajax.reload(null, false);
                        }
                    });
                }
            });
    });
}




//Servicios/////////////////////////////////////////////////////////

$(document).ready(function () {
    const tableServicios  = $('#tablaServicios').DataTable({
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json',
        },
        ajax: {
            type: 'GET',
            url: 'https://api-borvo.fly.dev/api/v1/servicios/?limit=1000',
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
            { data: 'id' },
            { data: 'nombre' },
            { data: 'descripcion'},         
            { defaultContent: '<div class="btn-group btn-group-sm" role="group" aria-label="Small button group"><button type="button" class="editar btn btn-warning d-flex justify-align-center"><i class="bx bx-edit" style="font-size: 1.5rem; color:white"></i></button><button type="button" class="eliminar btn btn-danger d-flex justify-align-center"><i class="bx bx-trash" style="font-size: 1.5rem; color:white"></i></button></div>' }
        ],
        responsive: true,
        processing: true,
    });
    eliminarServicio('#tablaServicios tbody', tableServicios );
    editarServicio('#tablaServicios  tbody', tableServicios );
    añadirServicio(tableServicios);
});

const modalAddServicio  = new bootstrap.Modal(document.getElementById('modalAddServicio'), {
    keyboard: false
});

const modalEditServicio  = new bootstrap.Modal(document.getElementById('modalEditServicio'), {
    keyboard: false
});


const añadirServicio = function (table) {
    const miForm = document.getElementById('formAddServicio');
    miForm.onsubmit = function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = {
            nombre: formData.get('nombre'),
            descripcion: formData.get('descripcion'),         
        };
        create(data, 'https://api-borvo.fly.dev/api/v1/servicios/').then(response => {
            if (response) {
                cerrarModal(modalAddServicio);
                miForm.reset();
                table.ajax.reload(null, false);
            }
        }).catch(err => console.log(err));
    }
}

const editarServicio = function (tbody, table) {
    $(tbody).on('click', 'button.editar', function () {
        abrirModal(modalEditServicio);
        const data = !$(this).parents('tr').hasClass('child') ?
            table.row($(this).parents('tr')).data() : table.row($(this).parents('tr').prev()).data();
        const id = data.id,
        nombre = data.nombre,
        descripcion = data.descripcion
        
        const miForm = document.getElementById('formEditServicio');

        miForm['id'].value = id;
        miForm['nombre'].value = nombre;
        miForm['descripcion'].value = descripcion;

        miForm.onsubmit = function(e){
            e.preventDefault();
            const formData = new FormData(this);
            const data = {
                id: formData.get('id'),
                nombre: formData.get('nombre'),
                descripcion: formData.get('descripcion'),                
            };
            up(data, 'https://api-borvo.fly.dev/api/v1/servicios/'+ id +'/').then(response => {
                if (response) {
                    table.ajax.reload(null, false);
                    cerrarModal(modalEditServicio);
                }
            })        
        }
    });
}

const eliminarServicio = function (tbody, table) {
    $(tbody).on('click', 'button.eliminar', function () {
        const data = !$(this).parents('tr').hasClass('child') ?
            table.row($(this).parents('tr')).data() : table.row($(this).parents('tr').prev()).data();
        const id = data.id;
        const nombre = data.nombre;


        swal({
            title: "Está seguro?",
            text: "Se eliminará el Servicios: " + nombre,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    del('https://api-borvo.fly.dev/api/v1/servicios/' + id + '/').then(response => {
                        if (response) {
                            table.ajax.reload(null, false);
                        }
                    });
                }
            });
    });
}


