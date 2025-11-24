// Desktop Authentication Modals Manager
class DesktopAuthManager {
    constructor() {
        this.DESKTOP_BREAKPOINT = 1024;
        this.currentUser = null;

        // Modal elements
        this.authModal = document.getElementById('auth-modal');
        this.loginModal = document.getElementById('login-modal');

        // Form elements
        this.signupForm = document.getElementById('signup-form');
        this.loginForm = document.getElementById('login-form');

        // Button elements
        this.switchToLogin = document.getElementById('switch-to-login');
        this.switchToSignup = document.getElementById('switch-to-signup');

        this.init();
    }

    init() {
        this.checkCurrentUser();
        this.bindEvents();
        this.setupEyeIcons();
        this.checkAutoOpenLogin();
    }

    checkCurrentUser() {
        this.currentUser = authManager.obterUsuarioLogado();
    }

    bindEvents() {
        // Close modal buttons
        document.querySelectorAll('.close-modal-btn').forEach(btn => {
            btn.addEventListener('click', () => this.closeAllModals());
        });

        // Overlay clicks
        if (this.authModal) {
            this.authModal.addEventListener('click', (e) => {
                if (e.target === this.authModal) {
                    this.closeAllModals();
                }
            });
        }

        // Form submissions
        if (this.signupForm) {
            this.signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Switch between login/signup
        if (this.switchToLogin) {
            this.switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginModal();
            });
        }
        if (this.switchToSignup) {
            this.switchToSignup.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSignupModal();
            });
        }
    }

    setupEyeIcons() {
        document.querySelectorAll('.input-field__eye').forEach(icon => {
            icon.addEventListener('click', () => {
                // Find the input field in the same input-field container
                const inputField = icon.closest('.input-field');
                const input = inputField.querySelector('input');
                if (input) {
                    if (input.type === 'password') {
                        input.type = 'text';
                        icon.src = '../assets/icons/Ver.svg'; // Show password icon
                        icon.alt = 'Ocultar senha';
                    } else {
                        input.type = 'password';
                        icon.src = '../assets/icons/NãoVer.svg'; // Hide password icon
                        icon.alt = 'Mostrar senha';
                    }
                }
            });
        });
    }

    showSignupModal() {
        this.closeAllModals();
        if (this.authModal) {
            this.authModal.style.display = 'flex';
        }
    }

    showLoginModal() {
        this.closeAllModals();
        if (this.loginModal) {
            this.loginModal.style.display = 'flex';
        }
    }

    closeAllModals() {
        [this.authModal, this.loginModal].forEach(modal => {
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }

    async handleSignup(e) {
        e.preventDefault();

        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (!name || !email || !password || !confirmPassword) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }

        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (!this.validarEmail(email)) {
            alert('Email inválido.');
            return;
        }

        try {
            const newUser = {
                nome: name,
                email: email,
                senha: password,
                contato: '',
                endereco: '',
                cpf: ''
            };

            authManager.salvarUsuario(newUser);
            this.currentUser = newUser;
            authManager.atualizarUsuarioLogado(newUser);

            alert('Conta criada com sucesso!');
            this.closeAllModals();
        } catch (error) {
            alert('Erro ao criar conta: ' + error.message);
        }
    }

    async handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const user = authManager.verificarLogin(email, password);
        if (user) {
            this.currentUser = user;
            authManager.atualizarUsuarioLogado(user);
            alert('Login realizado com sucesso!');
            this.closeAllModals();
        } else {
            alert('Email ou senha incorretos.');
        }
    }

    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    checkAutoOpenLogin() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('openLogin') && !this.currentUser) {
            this.showLoginModal();
        }
    }
}

// Initialize when DOM is ready
let desktopAuthManagerInstance;
document.addEventListener('DOMContentLoaded', () => {
    desktopAuthManagerInstance = new DesktopAuthManager();
});

// Global function to open login modal
window.openLoginModal = function() {
    if (desktopAuthManagerInstance) {
        desktopAuthManagerInstance.showLoginModal();
    } else {
        const loginModal = document.getElementById('login-modal');
        if (loginModal) {
            loginModal.style.display = 'flex';
        }
    }
};
