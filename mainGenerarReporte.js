const IPS_Select = document.getElementById('IPS-Select'),
    Paciente_Select = document.getElementById('Paciente-Select'),
    Empresa_Select = document.getElementById('Empresa-Select'),
    formReporteAportes = document.getElementById('formReporteAportes'),
    formReporteCitasIPS = document.getElementById('formReporteCitasIPS');

get('https://api-borvo.fly.dev/api/v1/ips/?limit=1000')
    .then(response => response.json())
    .then(data => data.results.forEach(function (element) {
        IPS_Select.innerHTML += `<option value="${element.nit}">${element.razon_social}</option>`;
        formReporteCitasIPS['afiliados'].innerHTML += `<option value="${element.nit}">${element.razon_social}</option>`;
    }));

get('https://api-borvo.fly.dev/api/v1/afiliados/?limit=1000')
    .then(response => response.json())
    .then(data => data.results.forEach(function (element) {
        Paciente_Select.innerHTML += `<option value="${element.dni}">${element.nombre + " " + element.apellido}</option>`;
    }));

get('https://api-borvo.fly.dev/api/v1/cotizantes/?limit=1000')
    .then(response => response.json())
    .then(data => data.results.forEach(async function (element) {
        await get('https://api-borvo.fly.dev/api/v1/afiliados/' + element.dni.substr(42, element.dni.length))
        .then(response => response.json())
        .then(data => {
            formReporteAportes['Afiliado-Select'].innerHTML += `<option value="${data.dni}">${data.nombre + " " + data.apellido}</option>`;
        })
        
    }));

get('https://api-borvo.fly.dev/api/v1/empresas/?limit=1000')
    .then(response => response.json())
    .then(data => data.results.forEach(function (element) {
        Empresa_Select.innerHTML += `<option value="${element.nit_rut}">${element.razon_social}</option>`;
    }));




const reporteIPSActivos = document.getElementById('reporteIPSActivos'),
    reporteOrdenesPaciente = document.getElementById('reporteOrdenesPaciente'),
    reporteAfiliadosEmpresa = document.getElementById('reporteAfiliadosEmpresa');

reporteIPSActivos.addEventListener('click', () => {
    window.open("https://api-borvo.fly.dev/api/v1/pdf/afiliados-activos/ips/" + IPS_Select.value);
});

reporteOrdenesPaciente.addEventListener('click', () => {
    window.open("https://api-borvo.fly.dev/api/v1/pdf/ordenes/" + Paciente_Select.value);
});

reporteAfiliadosEmpresa.addEventListener('click', () => {
    window.open("https://api-borvo.fly.dev/api/v1/pdf/cotizantes/" + Empresa_Select.value);
});

formReporteAportes.onsubmit = function (e) {
    e.preventDefault();
    const fechaInicio = formReporteAportes['fechaInicio'].value,
        fechaFin = formReporteAportes['fechaFin'].value,
        dni = formReporteAportes['Afiliado-Select'].value;

    if (fechaInicio > fechaFin) {
        swal("Error", 'La fecha de inicio debe ser anterior a la fecha de fin!', "warning");
    } else {
        window.open("https://api-borvo.fly.dev/api/v1/pdf/pago-aportes/" + dni + "/" + fechaInicio + "/" + fechaFin + "/");
    }
}