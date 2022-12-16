const username = 'borvo-admin';
const password = 'admin123';

function getToken(username, password) {
    fetch('https://api-borvo.fly.dev/api-token-auth/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(resp => resp.json())
        .then(data => window.localStorage.setItem("Token", JSON.stringify(data.token)));
}

getToken(username, password);
const token = 'Token '.concat(window.localStorage.getItem('Token')).replace(/['"]+/g, '');


async function create(data, url) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(data),
    }).catch(err => {
        swal("Error", "" + err, "warning");
    });

    if (response.ok) {
        swal("Éxito", "Se ha realizado un registro correctamente.", "success");
        return true;
    } else {
        swal("Ops!", "No fue posible realizar el registro.", "error");
    }
    return false;
}

async function del(url) {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Authorization': token,
        },
    }).catch(err => {
        swal("Error", "" + err, "warning");
    });

    if (response.ok) {
        swal("Éxito", "Se ha eliminado un registro correctamente.", "success");
        return true;
    } else {
        swal("Ops!", "No fue posible eliminar el registro.", "error");
    }
    return false;
}

async function up(data,url) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(data),
    }).catch(err => {
        swal("Error", "" + err, "warning");
    });

    if (response.ok) {
        swal("Éxito", "Se ha modificado un registro correctamente.", "success");
        return true;
    } else {
        swal("Ops!", "No fue posible modificar el registro.", "error");
    }
    return false;
}

