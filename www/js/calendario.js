let CLIENT_ID = '871965115839-s2ve2ot1gsjm769i3rflapbfb5tpgc8t.apps.googleusercontent.com';

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    // Aqui você pode decodificar o JWT e usá-lo para autenticar o usuário
    document.getElementById('authorize_button').style.display = 'none';
    document.getElementById('signout_button').style.display = 'inline-block';
    listUpcomingEvents(); // Lista os eventos após o login
}

function handleSignoutClick() {
    google.accounts.id.disableAutoSelect();
    document.getElementById('authorize_button').style.display = 'block';
    document.getElementById('signout_button').style.display = 'none';
    document.getElementById('events').innerHTML = ''; // Limpa os eventos
    alert('Logged out');
}

function listUpcomingEvents() {
    document.getElementById('events').innerHTML = '<p>Lista de eventos vai aqui.</p>'; // Exemplo
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("authorize_button"),
        { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
};

window.onload = function () {
    console.log("Window loaded");
    google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse
    });

    console.log("Rendering button");
    google.accounts.id.renderButton(
        document.getElementById("authorize_button"),
        { theme: "outline", size: "large" }
    );

    console.log("Prompting for credentials");
    google.accounts.id.prompt();
};
