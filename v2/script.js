// Elementos da página
const tabButtons = document.querySelectorAll('.tab-btn');
const levelForms = document.querySelectorAll('.level-form');
const infoContents = document.querySelectorAll('.info-content');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializePasswordToggles();
    initializeCPFFormatting();
    initializeForms();
    initializeSocialButtons();
});

// Inicializar sistema de abas
function initializeTabs() {
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            switchLevel(level);
        });
    });
}

// Trocar entre níveis
function switchLevel(level) {
    // Atualizar abas ativas
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-level') === level) {
            btn.classList.add('active');
        }
    });
    
    // Atualizar formulários ativos
    levelForms.forEach(form => {
        form.classList.remove('active');
        if (form.id === `level${level}`) {
            form.classList.add('active');
        }
    });
    
    // Atualizar conteúdo de informações ativo
    infoContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `info-level${level}`) {
            content.classList.add('active');
        }
    });
    
    // Adicionar efeito de transição suave
    addTransitionEffect();
}

// Efeito de transição
function addTransitionEffect() {
    const activeForm = document.querySelector('.level-form.active');
    const activeInfo = document.querySelector('.info-content.active');
    
    if (activeForm) {
        activeForm.style.opacity = '0';
        activeForm.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            activeForm.style.opacity = '1';
            activeForm.style.transform = 'translateY(0)';
        }, 50);
    }
    
    if (activeInfo) {
        activeInfo.style.opacity = '0';
        activeInfo.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            activeInfo.style.opacity = '1';
            activeInfo.style.transform = 'translateX(0)';
        }, 50);
    }
}

// Inicializar toggles de senha
function initializePasswordToggles() {
    const passwordInputs = document.querySelectorAll('.password-input input');
    
    passwordInputs.forEach(input => {
        const toggle = input.parentNode.querySelector('.password-toggle');
        if (toggle) {
            toggle.addEventListener('click', function() {
                togglePassword(input.id);
            });
        }
    });
}

// Função para alternar visibilidade da senha
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = passwordInput.parentNode.querySelector('.password-toggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.classList.remove('fa-eye');
        toggleButton.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleButton.classList.remove('fa-eye-slash');
        toggleButton.classList.add('fa-eye');
    }
}

// Inicializar formatação de CPF
function initializeCPFFormatting() {
    const cpfInputs = document.querySelectorAll('#govbr-cpf, #cpf');
    
    cpfInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatCPF(this);
        });
        
        input.addEventListener('keypress', function(e) {
            // Permitir apenas números
            if (!/\d/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'].includes(e.key)) {
                e.preventDefault();
            }
        });
    });
}

// Formatação automática de CPF
function formatCPF(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = value;
}

// Inicializar formulários
function initializeForms() {
    const forms = document.querySelectorAll('.login-form');
    
    forms.forEach((form, index) => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const level = index + 1;
            handleFormSubmit(level, form);
        });
    });
}

// Manipular submissão de formulários
function handleFormSubmit(level, form) {
    const formData = new FormData(form);
    
    // Obter dados específicos do nível
    let loginData = {};
    
    switch(level) {
        case 1: // GOV.BR
            loginData = {
                type: 'govbr',
                cpf: document.getElementById('govbr-cpf').value,
                password: document.getElementById('govbr-password').value
            };
            break;
            
        case 2: // CPF
            loginData = {
                type: 'cpf',
                cpf: document.getElementById('cpf').value,
                password: document.getElementById('cpf-password').value
            };
            break;
            
        case 3: // Email
            loginData = {
                type: 'email',
                email: document.getElementById('email').value,
                password: document.getElementById('email-password').value
            };
            break;
    }
    
    // Validar dados
    if (validateFormData(loginData)) {
        showLoading(level);
        
        // Simular processo de login
        setTimeout(() => {
            hideLoading();
            showSuccess(`Login Nível ${level} realizado com sucesso!`);
        }, 2000);
    }
}

// Validação de dados do formulário
function validateFormData(data) {
    switch(data.type) {
        case 'govbr':
        case 'cpf':
            if (!validateCPF(data.cpf)) {
                showError('CPF inválido');
                return false;
            }
            if (data.password.length < 6) {
                showError('Senha deve ter pelo menos 6 caracteres');
                return false;
            }
            break;
            
        case 'email':
            if (!validateEmail(data.email)) {
                showError('Email inválido');
                return false;
            }
            if (data.password.length < 6) {
                showError('Senha deve ter pelo menos 6 caracteres');
                return false;
            }
            break;
    }
    
    return true;
}

// Validação de CPF
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    
    if (cpf.length !== 11 || 
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999") {
        return false;
    }
    
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

// Validação de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Inicializar botões sociais
function initializeSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = getSocialPlatform(this);
            handleSocialLogin(platform);
        });
    });
}

// Obter plataforma social
function getSocialPlatform(button) {
    if (button.classList.contains('google-btn')) return 'Google';
    if (button.classList.contains('facebook-btn')) return 'Facebook';
    if (button.classList.contains('linkedin-btn')) return 'LinkedIn';
    return 'Desconhecida';
}

// Manipular login social
function handleSocialLogin(platform) {
    showLoading(3, `Conectando com ${platform}...`);
    
    // Simular login social
    setTimeout(() => {
        hideLoading();
        showSuccess(`Login com ${platform} realizado com sucesso!`);
    }, 2000);
}

// Funções de feedback visual
function showLoading(level, customMessage = null) {
    removeExistingAlerts();
    
    const message = customMessage || `Processando login Nível ${level}...`;
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-loading';
    alert.innerHTML = `
        <div class="spinner"></div>
        <span>${message}</span>
    `;
    
    const activeForm = document.querySelector('.level-form.active');
    if (activeForm) {
        activeForm.insertBefore(alert, activeForm.firstChild);
        
        // Desabilitar botões durante loading
        const buttons = activeForm.querySelectorAll('button[type="submit"], .social-btn');
        buttons.forEach(btn => btn.disabled = true);
    }
}

function hideLoading() {
    const loadingAlert = document.querySelector('.alert-loading');
    if (loadingAlert) {
        loadingAlert.remove();
    }
    
    // Reabilitar botões
    const activeForm = document.querySelector('.level-form.active');
    if (activeForm) {
        const buttons = activeForm.querySelectorAll('button[type="submit"], .social-btn');
        buttons.forEach(btn => btn.disabled = false);
    }
}

function showError(message) {
    removeExistingAlerts();
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-error';
    alert.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    const activeForm = document.querySelector('.level-form.active');
    if (activeForm) {
        activeForm.insertBefore(alert, activeForm.firstChild);
    }
    
    // Remover alerta após 5 segundos
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

function showSuccess(message) {
    removeExistingAlerts();
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    const activeForm = document.querySelector('.level-form.active');
    if (activeForm) {
        activeForm.insertBefore(alert, activeForm.firstChild);
    }
    
    // Remover alerta após 3 segundos
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function removeExistingAlerts() {
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
}

// Adicionar estilos dos alertas dinamicamente
const alertStyles = `
<style>
.alert {
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    animation: slideInAlert 0.3s ease;
}

@keyframes slideInAlert {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.alert i {
    margin-right: 8px;
    font-size: 16px;
}

.alert-error {
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
}

.alert-success {
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid #bbf7d0;
}

.alert-loading {
    background: #eff6ff;
    color: #2563eb;
    border: 1px solid #dbeafe;
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #dbeafe;
    border-top: 2px solid #2563eb;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 8px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
}

.level-form, .info-content {
    transition: opacity 0.3s ease, transform 0.3s ease;
}
</style>
`;

// Adicionar estilos ao head
document.head.insertAdjacentHTML('beforeend', alertStyles);

// Funcionalidades extras
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Navegação por tabs com teclas numéricas
        if (e.key >= '1' && e.key <= '3') {
            const level = e.key;
            switchLevel(level);
        }
        
        // Enter para submit no formulário ativo
        if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
            const activeForm = document.querySelector('.level-form.active form');
            if (activeForm) {
                e.preventDefault();
                const submitBtn = activeForm.querySelector('.submit-btn');
                if (submitBtn && !submitBtn.disabled) {
                    submitBtn.click();
                }
            }
        }
    });
}

// Inicializar navegação por teclado
document.addEventListener('DOMContentLoaded', addKeyboardNavigation);
