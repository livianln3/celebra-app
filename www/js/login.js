document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const passwordInput = document.getElementById('senha');
    const passwordError = document.getElementById('passwordError');

    const email = emailInput.value;
    const password = passwordInput.value;

    let valid = true;

    // Validação do email
    if (!validateEmail(email)) {
        emailError.textContent = 'Por favor, insira um email válido.';
        valid = false;
    } else {
        emailError.textContent = '';
    }

    // Validação da senha (mínimo de 6 caracteres)
    if (password.length < 6) {
        passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        valid = false;
    } else {
        passwordError.textContent = '';
    }

    if (valid) {
        alert('Cadastro realizado com sucesso!');
    }
});

document.getElementById('recoverPassword').addEventListener('click', function() {
    alert('Recuperar senha foi clicado!');
});

// Mostrar/ocultar senha
function mostrarSenha() {
    const inputPass = document.getElementById('senha');
    const btnShowPass = document.getElementById('btn-senha');

    if (inputPass.type === 'password') {
        inputPass.setAttribute('type', 'text');
        btnShowPass.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        inputPass.setAttribute('type', 'password');
        btnShowPass.classList.replace('bi-eye-slash', 'bi-eye');
    }
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
