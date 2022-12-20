$(document).ready(async function () {
    const formVinculacion = document.getElementById('formVinculacion'),
        formRetiro = document.getElementById('formRetiro');

    await get('https://api-borvo.fly.dev/api/v1/cotizantes/?limit=1000')
        .then(response => response.json())
        .then(data => data.results.forEach(async function (element) {
            await get('https://api-borvo.fly.dev/api/v1/afiliados/' + element.dni.substr(42, element.dni.length))
                .then(response => response.json())
                .then(data => {
                    formVinculacion['cotizante'].innerHTML += `<option value="${element.id}">${data.nombre + " " + data.apellido}</option>`;
                    formRetiro['cotizante'].innerHTML += `<option value="${data.dni}">${data.nombre + " " + data.apellido}</option>`;
                })

        }));

    await get('https://api-borvo.fly.dev/api/v1/empresas/?limit=1000')
        .then(response => response.json())
        .then(data => data.results.forEach(function (element) {
            formVinculacion['empresa'].innerHTML += `<option value="${element.nit_rut}">${element.razon_social}</option>`;
            formRetiro['empresa'].innerHTML += `<option value="${element.nit_rut}">${element.razon_social}</option>`;
        }));

    formVinculacion.onsubmit = function (e) {
        e.preventDefault();
        const data = {
            cotizante: 'http://api-borvo.fly.dev/api/v1/cotizantes/' + formVinculacion['cotizante'].value + '/',
            empresa: 'http://api-borvo.fly.dev/api/v1/empresas/' + formVinculacion['empresa'].value + '/',
            fecha_recibido: formVinculacion['fecha'].value,
            salario_base: formVinculacion['salario'].value,
            estado: 'activo'
        }

        create(data, 'https://api-borvo.fly.dev/api/v1/contratos/')
            .then(response => {
                if (response) {
                    formVinculacion.reset();
                }
            })
            .catch(err => console.log(err));
    }

    formRetiro.onsubmit = function(e) {
        e.preventDefault();
        const dni = formRetiro['cotizante'].value,
        nit = formRetiro['empresa'].value;

        get('https://api-borvo.fly.dev/api/v1/contratos/?cotizante__dni='+ dni +'&empresa=' + nit)
        .then(response => response.json())
        .then(data => {
            elm = data.results[0];
            id = elm.id;
            data = {
                id: id,
                cotizante: elm.cotizante,
                empresa: elm.empresa,
                fecha_recibido: elm.fecha_recibido,
                salario_base: elm.salario_base,
                estado: 'inactivo'
            }

            up(data, 'https://api-borvo.fly.dev/api/v1/contratos/' + id + '/')
            .then(response => {
                if(response){
                    formRetiro.reset();
                }
            })
        })
    }
});