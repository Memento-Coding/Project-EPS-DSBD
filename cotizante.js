
async function getDni() {
    // Busca el DNI del afiliado según su nombre de usuario
    // y lo guarda en el almacenamiento local
    let username = localStorage.getItem('username');
    let data = await fetch(`https://api-borvo.fly.dev/api/v1/afiliados/?username=${username}&format=json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token f157d56772f666a0b944a466aa65e4d2e3be1310',
        },
    });
    let response = await data.json();
    localStorage.setItem('dni', response.results[0].dni);
}


async function getId() {
    // Busca el ID del cotizante afiliado según su DNI
    // y lo guarda en el almacenamiento local
    let dni = localStorage.getItem('dni');
    let data = await fetch(`https://api-borvo.fly.dev/api/v1/cotizantes/?dni=${dni}&format=json`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token f157d56772f666a0b944a466aa65e4d2e3be1310',
        },
    });
    let response = await data.json();
    localStorage.setItem('id', response.results[0].id);
}


async function loadAfiliadoInfo(url, table) {
    const tableHead = table.querySelector('thead');
    const tableBody = table.querySelector('tbody');
    let data = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.token,
        },
    });
    const response = await data.json();
    const headers = Object.keys(response);
    const info = Object.values(response);
    document.getElementById('title').innerHTML = `Información de ${response.nombre} ${response.apellido}`
    let ips_data = await fetch(response.ips.replace('http', 'https'), {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.token,
        },
    })
    const ips_response = await ips_data.json();
    // Limpiar la tabla
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    // Llenar la tabla
    for (let i=0; i<headers.length; i++) {
        const rowElem = document.createElement('tr');
        const headerElem = document.createElement('th');
        headerElem.classList.add('text-end');
        const cellElem = document.createElement('td');
        headerElem.textContent = headers[i];
        if (i == 1) {
            cellElem.textContent = ips_response.razon_social;
        }
        else {
            cellElem.textContent = info[i];
        }
        rowElem.appendChild(headerElem);
        rowElem.appendChild(cellElem);
        tableBody.appendChild(rowElem);
    }
}


async function loadCotizanteInfo(url, table) {
    const tableHead = table.querySelector('thead');
    const tableBody = table.querySelector('tbody');
    let data = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.token,
        },
    });
    const response = await data.json();
    const headers = Object.keys(response);
    const info = Object.values(response);
    document.getElementById('titleCotizante').innerHTML = 'Cotizante'
    // Limpiar la tabla
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    // Llenar la tabla
    for (let i=0; i<headers.length; i++) {
        const rowElem = document.createElement('tr');
        const headerElem = document.createElement('th');
        headerElem.classList.add('text-end');
        const cellElem = document.createElement('td');
        // No coloca el campo dni ni su valor en la tabla.
        if (headers[i] == 'id' || headers[i] == 'dni') {
            continue;
        }
        headerElem.textContent = headers[i];
        cellElem.textContent = info[i];
        rowElem.appendChild(headerElem);
        rowElem.appendChild(cellElem);
        tableBody.appendChild(rowElem);
    }
}


async function loadBeneficiarioInfo(url, container) {
    let data = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.token,
        },
    });
    const response = await data.json();
    const info = Object.values(response);
    // Llenar la tabla
    for (let beneficiario of info) {
        const table = document.createElement('table');
        const tableHead = document.createElement('thead');
        const tableBody = document.createElement('tbody');
        table.classList.add('table', 'table-bordered', 'my-5', 'table-striped');
        table.appendChild(tableHead);
        table.appendChild(tableBody);
        container.appendChild(table);
        tableHead.innerHTML = '';
        tableBody.innerHTML = '';
        const rowElem1 = document.createElement('tr');
        const rowElem2 = document.createElement('tr');
        const rowElem3 = document.createElement('tr');
        const rowElem4 = document.createElement('tr');
        const headerElem1 = document.createElement('th');
        const headerElem2 = document.createElement('th');
        const headerElem3 = document.createElement('th');
        const headerElem4 = document.createElement('th');
        headerElem1.classList.add('text-end');
        headerElem2.classList.add('text-end');
        headerElem3.classList.add('text-end');
        headerElem4.classList.add('text-end');
        headerElem1.textContent = 'dni';
        headerElem2.textContent = 'nombre';
        headerElem3.textContent = 'fecha de nacimiento';
        headerElem4.textContent = 'parentesco';
        const cellElem1 = document.createElement('td');
        const cellElem2 = document.createElement('td');
        const cellElem3 = document.createElement('td');
        const cellElem4 = document.createElement('td');
        let afiliado_data = await fetch(beneficiario.dni.replace('http', 'https'), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.token,
            },
        })
        const afiliado_response = await afiliado_data.json();
        cellElem1.textContent = afiliado_response.dni;
        cellElem2.textContent = `${afiliado_response.nombre} ${afiliado_response.apellido}`;
        cellElem3.textContent = afiliado_response.fecha_nacimiento;
        cellElem4.textContent = Object.values(beneficiario)[3];
        rowElem1.appendChild(headerElem1);
        rowElem1.appendChild(cellElem1);
        rowElem2.appendChild(headerElem2);
        rowElem2.appendChild(cellElem2);
        rowElem3.appendChild(headerElem3);
        rowElem3.appendChild(cellElem3);
        rowElem4.appendChild(headerElem4);
        rowElem4.appendChild(cellElem4);
        tableBody.appendChild(rowElem1);
        tableBody.appendChild(rowElem2);
        tableBody.appendChild(rowElem3);
        tableBody.appendChild(rowElem4);
    }
}


async function main() {
    await getDni();
    await getId();
    await loadAfiliadoInfo(`https://api-borvo.fly.dev/api/v1/afiliados/${localStorage.dni}/?format=json`, document.querySelector('table'));
    await loadCotizanteInfo(`https://api-borvo.fly.dev/api/v1/cotizantes/${localStorage.id}/?format=json`, document.querySelector('#tableCotizante'));
    await loadBeneficiarioInfo(`https://api-borvo.fly.dev/api/v1/afiliados/${localStorage.dni}/beneficiarios/?format=json`, document.querySelector('#beneficiariosBody'));
}




// ----------------------------------------------------------------------------

$(window).load(function() {
    window.setTimeout(function() {
        $(".se-pre-con").fadeOut("slow")
    }, 2000);
});

main();