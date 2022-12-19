const IPS_Select = document.getElementById('IPS-Select'),
    IPS_Select2 = document.getElementById('IPS-Select2'),
    Afiliados_Select = document.getElementById('Afiliado-Select');

get('https://api-borvo.fly.dev/api/v1/ips/?limit=1000')
    .then(response => response.json())
    .then(data => data.results.forEach(function (element) {
        IPS_Select.innerHTML += `<option value="${element.nit}">${element.razon_social}</option>`;
        IPS_Select2.innerHTML += `<option value="${element.nit}">${element.razon_social}</option>`;
    }));

get('https://api-borvo.fly.dev/api/v1/afiliados/?limit=1000')
    .then(response => response.json())
    .then(data => data.results.forEach(function (element) {
        Afiliados_Select.innerHTML += `<option value="${element.dni}">${element.nombre + " " +  element.apellido}</option>`;
    }));






const reporteIPSActivos = document.getElementById('reporteIPSActivos');

reporteIPSActivos.addEventListener('click', () => {
    window.open("https://api-borvo.fly.dev/api/v1/pdf/afiliados-activos/ips/" + IPS_Select.value + "/");
});