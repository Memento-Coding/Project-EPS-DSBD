const formLogin = document.getElementById('formLogin');

formLogin.onsubmit = data => {
    let username = data.target[0].value;
    if (username == '') {
        return false;
    }
    let password = data.target[1].value;
    if (password == '') {
        return false;
    }
    let dataUser = {
        username: username,
        password: password,
    };
    login(dataUser);
};

function login(data) {
    $.ajax({
        method: 'POST',
        url: 'https://api-borvo.fly.dev/api-token-auth/',
        data: data,
        success: function(response) {
            localStorage.clear();
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', data.username);
            location.replace('cotizante.html');
        },
        error: function(response) {
            alert('Usuario y/o contraseña incorrectos!');
        }
    });
}