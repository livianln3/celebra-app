document.getElementById('enterButton').addEventListener('click', function(event) {
    event.preventDefault();  // Impede o comportamento padrão do botão
    
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

    // Validação da senha
    if (password.length < 6) {
        passwordError.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        valid = false;
    } else {
        passwordError.textContent = '';
    }

    // Verifica se o email e senha são corretos
    if (email === 'exemplo@gmail.com' && password === 'senha123' && valid) {
        // Redireciona para o menu
        window.location.href = '/js/menu.html';
    } else if (valid) {
        alert('Email ou senha incorretos.');
    }
});

// Funções de recuperação de senha e cadastro
document.getElementById('recoverPassword').addEventListener('click', function() {
    window.location.href = '../js/recuperarSenha.html';
});

document.getElementById('registerButton').addEventListener('click', function() {
    window.location.href = '../js/cadastro.html';
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

// Função para validar email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
