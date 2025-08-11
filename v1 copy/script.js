// Elementos da página
const loginOptions = document.querySelectorAll('.login-option');
const loginForms = document.querySelectorAll('.login-form');
const loginCard = document.querySelector('.login-card');
const formsContainer = document.querySelector('.forms-container');
const benefitsPanel = document.getElementById('benefitsPanel');

// Controle dos efeitos hover e conteúdo
const hoverEffects = {
    'govBrOption': 'govBrBenefits',
    'cpfOption': 'cpfBenefits',
    'emailSocialOption': 'emailBenefits'
};

// Inicializar com benefícios GOV.BR visíveis (estado dourado padrão)
document.addEventListener('DOMContentLoaded', () => {
    showBenefits('govBrBenefits');
});

// Event listeners para hover effects
loginOptions.forEach(option => {
    option.addEventListener('mouseenter', () => {
        if (!isFormVisible()) {
            const benefitsId = hoverEffects[option.id];
            showBenefits(benefitsId);
        }
    });
});

// Event listeners para click (mostrar formulários)
loginOptions.forEach(option => {
    option.addEventListener('click', () => {
        const formId = optionFormMap[option.id];
        showForm(formId);
    });
});

// Função para mostrar benefícios específicos
function showBenefits(benefitsId) {
    // Ocultar todos os conteúdos de benefícios
    document.querySelectorAll('.benefits-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Mostrar conteúdo específico
    const targetBenefits = document.getElementById(benefitsId);
    if (targetBenefits) {
        targetBenefits.classList.add('active');
    }
}

// Verificar se algum formulário está visível
function isFormVisible() {
    return formsContainer && window.getComputedStyle(formsContainer).display !== 'none';
}

// Mapeamento de opções para formulários
const optionFormMap = {
    'govBrOption': 'govBrForm',
    'cpfOption': 'cpfForm',
    'emailSocialOption': 'emailSocialForm'
};

// Event listeners para as opções de login
loginOptions.forEach(option => {
    option.addEventListener('click', () => {
        const formId = optionFormMap[option.id];
        showForm(formId);
    });
});

// Função para mostrar formulário específico
function showForm(formId) {
    // Mostrar container de formulários
    if (formsContainer) {
        formsContainer.style.display = 'flex';
    }
    
    // Ocultar todos os formulários
    loginForms.forEach(form => {
        form.style.display = 'none';
    });
    
    // Mostrar formulário específico
    const targetForm = document.getElementById(formId);
    if (targetForm) {
        targetForm.style.display = 'block';
    }
}

// Função para voltar às opções
function showOptions() {
    // Ocultar container de formulários
    if (formsContainer) {
        formsContainer.style.display = 'none';
    }
    
    // Ocultar todos os formulários
    loginForms.forEach(form => {
        form.style.display = 'none';
    });
    
    // Voltar ao estado padrão (GOV.BR)
    showBenefits('govBrBenefits');
}

// Função para alternar visibilidade da senha
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = passwordInput.nextElementSibling.querySelector('i');
    
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

// Formatação automática de CPF
function formatCPF(input) {
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = value;
}

// Aplicar formatação aos campos de CPF
document.addEventListener('DOMContentLoaded', function() {
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
});

// Validação de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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

// Manipulação dos formulários
document.addEventListener('DOMContentLoaded', function() {
    // Formulário GOV.BR
    const govBrForm = document.querySelector('#govBrForm form');
    if (govBrForm) {
        govBrForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cpf = document.getElementById('govbr-cpf').value;
            const password = document.getElementById('govbr-password').value;
            
            if (!validateCPF(cpf)) {
                showError('CPF inválido');
                return;
            }
            
            if (password.length < 6) {
                showError('Senha deve ter pelo menos 6 caracteres');
                return;
            }
            
            showLoading('Conectando ao GOV.BR...');
            
            // Simular login
            setTimeout(() => {
                hideLoading();
                showSuccess('Login realizado com sucesso!');
            }, 2000);
        });
    }
    
    // Formulário CPF
    const cpfForm = document.querySelector('#cpfForm form');
    if (cpfForm) {
        cpfForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cpf = document.getElementById('cpf').value;
            const password = document.getElementById('cpf-password').value;
            
            if (!validateCPF(cpf)) {
                showError('CPF inválido');
                return;
            }
            
            if (password.length < 6) {
                showError('Senha deve ter pelo menos 6 caracteres');
                return;
            }
            
            showLoading('Verificando credenciais...');
            
            // Simular login
            setTimeout(() => {
                hideLoading();
                showSuccess('Login realizado com sucesso!');
            }, 2000);
        });
    }
    
    // Formulário Email
    const emailForm = document.querySelector('#emailSocialForm form');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('email-password').value;
            
            if (!validateEmail(email)) {
                showError('Email inválido');
                return;
            }
            
            if (password.length < 6) {
                showError('Senha deve ter pelo menos 6 caracteres');
                return;
            }
            
            showLoading('Verificando credenciais...');
            
            // Simular login
            setTimeout(() => {
                hideLoading();
                showSuccess('Login realizado com sucesso!');
            }, 2000);
        });
    }
    
    // Botões de redes sociais
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.textContent.trim().split(' ')[2]; // Google, Facebook, Microsoft
            showLoading(`Conectando com ${platform}...`);
            
            // Simular login social
            setTimeout(() => {
                hideLoading();
                showSuccess(`Login com ${platform} realizado com sucesso!`);
            }, 2000);
        });
    });
});

// Funções de feedback visual
function showError(message) {
    removeExistingAlerts();
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-error';
    alert.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    const activeForm = document.querySelector('.login-form[style*="block"]');
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
    
    const activeForm = document.querySelector('.login-form[style*="block"]');
    if (activeForm) {
        activeForm.insertBefore(alert, activeForm.firstChild);
    }
    
    // Remover alerta após 3 segundos
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function showLoading(message) {
    removeExistingAlerts();
    
    const alert = document.createElement('div');
    alert.className = 'alert alert-loading';
    alert.innerHTML = `
        <div class="spinner"></div>
        <span>${message}</span>
    `;
    
    const activeForm = document.querySelector('.login-form[style*="block"]');
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
    const activeForm = document.querySelector('.login-form[style*="block"]');
    if (activeForm) {
        const buttons = activeForm.querySelectorAll('button[type="submit"], .social-btn');
        buttons.forEach(btn => btn.disabled = false);
    }
}

function removeExistingAlerts() {
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
}

// CSS para os alertas (adicionado dinamicamente)
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
}

.alert i {
    margin-right: 8px;
    font-size: 16px;
}

.alert-error {
    background: #fee;
    color: #c53030;
    border: 1px solid #fed7d7;
}

.alert-success {
    background: #f0fff4;
    color: #38a169;
    border: 1px solid #c6f6d5;
}

.alert-loading {
    background: #ebf8ff;
    color: #3182ce;
    border: 1px solid #bee3f8;
}

.spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #bee3f8;
    border-top: 2px solid #3182ce;
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
}
</style>
`;

// Adicionar estilos dos alertas ao head
document.head.insertAdjacentHTML('beforeend', alertStyles);

// Animação suave para transições
function addSmoothTransitions() {
    const style = document.createElement('style');
    style.textContent = `
        .login-options, .login-form {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .login-option {
            transform: translateY(0);
            transition: all 0.3s ease;
        }
        
        .login-option:hover {
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
}

// Inicializar animações quando a página carregar
document.addEventListener('DOMContentLoaded', addSmoothTransitions);
