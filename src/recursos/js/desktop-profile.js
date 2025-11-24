// Sistema de Gerenciamento do Perfil Desktop - Get Eats

class DesktopProfileManager {
    constructor() {
        this.modal = document.getElementById('profile-modal');
        this.closeBtn = document.querySelector('.profile-modal-close');
        this.userInfoContainer = document.querySelector('.profile-user-info');
        this.personalInfoContainer = document.querySelector('.profile-personal-info');
        this.actionsContainer = document.querySelector('.profile-actions');

        this.init();
    }

    init() {
        // Event listeners
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Bind submodal close buttons
        this.bindSubmodalEvents();

        // Bind profile icon
        this.bindProfileIcon();
    }

    bindSubmodalEvents() {
        // Edit modal close button
        const editCloseBtn = document.querySelector('.profile-edit-modal-close');
        if (editCloseBtn) {
            editCloseBtn.addEventListener('click', () => this.closeEditModal());
        }

        // Password modal close button
        const passwordCloseBtn = document.querySelector('.profile-password-modal-close');
        if (passwordCloseBtn) {
            passwordCloseBtn.addEventListener('click', () => this.closePasswordModal());
        }

        // Edit modal overlay click
        const editModal = document.getElementById('profile-edit-modal');
        if (editModal) {
            editModal.addEventListener('click', (e) => {
                if (e.target === editModal) {
                    this.closeEditModal();
                }
            });
        }

        // Password modal overlay click
        const passwordModal = document.getElementById('profile-password-modal');
        if (passwordModal) {
            passwordModal.addEventListener('click', (e) => {
                if (e.target === passwordModal) {
                    this.closePasswordModal();
                }
            });
        }

        // Cancel buttons
        const cancelEditBtn = document.getElementById('profile-cancel-edit');
        if (cancelEditBtn) {
            cancelEditBtn.addEventListener('click', () => this.closeEditModal());
        }

        const cancelPasswordBtn = document.getElementById('profile-cancel-password');
        if (cancelPasswordBtn) {
            cancelPasswordBtn.addEventListener('click', () => this.closePasswordModal());
        }

        // Save buttons
        const saveEditBtn = document.getElementById('profile-save-edit');
        if (saveEditBtn) {
            saveEditBtn.addEventListener('click', () => this.saveProfileEdit());
        }

        const savePasswordBtn = document.getElementById('profile-save-password');
        if (savePasswordBtn) {
            savePasswordBtn.addEventListener('click', () => this.savePasswordChange());
        }

        // Phone input formatting
        const phoneInput = document.getElementById('profile-edit-contato');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                e.target.value = formatarTelefone(e.target.value);
            });
        }


    }

    bindProfileIcon() {
        // Bind to the profile link that contains both mobile and desktop icons
        const profileLink = document.querySelector('.profile-link');
        if (profileLink) {
            profileLink.addEventListener('click', (e) => {
                if (window.innerWidth >= 1024) {
                    e.preventDefault();
                const usuario = authManager.obterUsuarioLogado();
                if (usuario && usuario.email && usuario.email.trim() !== '') {
                    this.openModal();
                } else {
                    // Open login modal if not logged in
                    const loginModal = document.getElementById('login-modal');
                    if (loginModal) {
                        loginModal.style.display = 'flex';
                    }
                }
                } // else allow default navigation to perfil.html
            });
        }

        // Also bind directly to the desktop icon
        const profileIcon = document.querySelector('.profile-icon--desktop');
        if (profileIcon) {
            profileIcon.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const usuario = authManager.obterUsuarioLogado();
                if (usuario && usuario.email && usuario.email.trim() !== '') {
                    this.openModal();
                } else {
                    // Open login modal if not logged in
                    const loginModal = document.getElementById('login-modal');
                    if (loginModal) {
                        loginModal.style.display = 'flex';
                    }
                }
            });
        }
    }

    openModal() {
        if (this.modal) {
            this.modal.style.display = 'flex';
            this.render();
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }

    isOpen() {
        return this.modal && this.modal.style.display === 'flex';
    }

    render() {
        this.renderUserInfo();
        this.renderPersonalInfo();
        this.renderActions();
    }

    renderUserInfo() {
        if (!this.userInfoContainer) return;

        const usuario = authManager.obterUsuarioLogado();
        if (!usuario) {
            this.userInfoContainer.innerHTML = '<p>Usuário não logado</p>';
            return;
        }

        this.userInfoContainer.innerHTML = `
            <div class="user-avatar">
                <img src="../assets/icons/PerfilHeader.svg" alt="Avatar">
            </div>
            <div class="user-details">
                <h3>${usuario.nome}</h3>
                <p>${usuario.endereco || 'Endereço não informado'}</p>
            </div>
        `;
    }

    renderPersonalInfo() {
        if (!this.personalInfoContainer) return;

        const usuario = authManager.obterUsuarioLogado();
        if (!usuario) {
            this.personalInfoContainer.innerHTML = '<p>Usuário não logado</p>';
            return;
        }

        this.personalInfoContainer.innerHTML = `
            <div class="info-item">
                <span class="info-label">Nome Completo</span>
                <span class="info-value">${usuario.nome}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Email</span>
                <span class="info-value">${usuario.email}</span>
            </div>
            <div class="info-item">
                <span class="info-label">CPF</span>
                <span class="info-value">${usuario.cpf || 'Não informado'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Telefone</span>
                <span class="info-value">${usuario.contato || 'Não informado'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Endereço</span>
                <span class="info-value">${usuario.endereco || 'Não informado'}</span>
            </div>
        `;
    }

    renderActions() {
        if (!this.actionsContainer) return;

        this.actionsContainer.innerHTML = `
            <button class="profile-btn" id="desktop-editar-perfil">
                <img> Editar Perfil
            </button>
            <button class="profile-btn" id="desktop-alterar-senha">
                <img> Alterar Senha
            </button>
            <button class="profile-btn logout-btn" id="desktop-logout">
                <img> Sair da Conta
            </button>
        `;

        // Bind events
        document.getElementById('desktop-editar-perfil').addEventListener('click', () => this.editProfile());
        document.getElementById('desktop-alterar-senha').addEventListener('click', () => this.changePassword());
        document.getElementById('desktop-logout').addEventListener('click', () => this.logout());
    }

    goToCardapio() {
        this.closeModal();
        // Already on cardapio page
    }

    editProfile() {
        // Close main profile modal and open edit modal
        this.closeModal();
        this.openEditModal();
    }

    changePassword() {
        // Close main profile modal and open password modal
        this.closeModal();
        this.openPasswordModal();
    }

    openEditModal() {
        const editModal = document.getElementById('profile-edit-modal');
        if (editModal) {
            editModal.style.display = 'flex';
            this.populateEditForm();
        }
    }

    openPasswordModal() {
        const passwordModal = document.getElementById('profile-password-modal');
        if (passwordModal) {
            passwordModal.style.display = 'flex';
            this.resetPasswordForm();
            this.bindPasswordVisibilityToggles();
        }
    }

    closeEditModal() {
        const editModal = document.getElementById('profile-edit-modal');
        if (editModal) {
            editModal.style.display = 'none';
        }
    }

    closePasswordModal() {
        const passwordModal = document.getElementById('profile-password-modal');
        if (passwordModal) {
            passwordModal.style.display = 'none';
        }
    }

    populateEditForm() {
        const usuario = authManager.obterUsuarioLogado();
        if (usuario) {
            document.getElementById('profile-edit-nome').value = usuario.nome || '';
            document.getElementById('profile-edit-email').value = usuario.email || '';
            document.getElementById('profile-edit-contato').value = usuario.contato || '';
            document.getElementById('profile-edit-endereco').value = usuario.endereco || '';
        }
    }

    resetPasswordForm() {
        document.getElementById('profile-current-password').value = '';
        document.getElementById('profile-new-password').value = '';
        document.getElementById('profile-confirm-new-password').value = '';
    }

    saveProfileEdit() {
        const nome = document.getElementById('profile-edit-nome').value.trim();
        const email = document.getElementById('profile-edit-email').value.trim();
        const contato = document.getElementById('profile-edit-contato').value.trim();
        const endereco = document.getElementById('profile-edit-endereco').value.trim();

        if (!nome || !email || !contato || !endereco) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!this.validarEmail(email)) {
            alert('Email inválido.');
            return;
        }

        if (!this.validarTelefone(contato)) {
            alert('Telefone inválido.');
            return;
        }

        const usuarioAtualizado = {
            ...authManager.obterUsuarioLogado(),
            nome: nome,
            email: email,
            contato: contato,
            endereco: endereco
        };

        authManager.atualizarUsuarioLogado(usuarioAtualizado);

        // Atualizar lista de usuários
        const usuarios = authManager.obterUsuarios();
        const index = usuarios.findIndex(u => u.email === usuarioAtualizado.email);
        if (index !== -1) {
            usuarios[index] = usuarioAtualizado;
            localStorage.setItem(authManager.USERS_KEY, JSON.stringify(usuarios));
        }

        this.closeEditModal();
        alert('Perfil atualizado com sucesso!');
    }

    savePasswordChange() {
        const senhaAtual = document.getElementById('profile-current-password').value;
        const novaSenha = document.getElementById('profile-new-password').value;
        const confirmarNovaSenha = document.getElementById('profile-confirm-new-password').value;

        const usuario = authManager.obterUsuarioLogado();

        if (senhaAtual !== usuario.senha) {
            alert('Senha atual incorreta.');
            return;
        }

        if (novaSenha.length < 6) {
            alert('A nova senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (novaSenha !== confirmarNovaSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        const usuarioAtualizado = {
            ...usuario,
            senha: novaSenha
        };

        authManager.atualizarUsuarioLogado(usuarioAtualizado);

        // Atualizar lista de usuários
        const usuarios = authManager.obterUsuarios();
        const index = usuarios.findIndex(u => u.email === usuarioAtualizado.email);
        if (index !== -1) {
            usuarios[index] = usuarioAtualizado;
            localStorage.setItem(authManager.USERS_KEY, JSON.stringify(usuarios));
        }

        this.closePasswordModal();
        alert('Senha alterada com sucesso!');
    }

    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    validarTelefone(telefone) {
        const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        return regex.test(telefone);
    }

    logout() {
        if (confirm('Tem certeza que deseja sair da conta?')) {
            authManager.logout();
            this.closeModal();
            alert('Logout realizado com sucesso!');
            // Redirect to home or refresh
            window.location.reload();
        }
    }
}

// Instância global do gerenciador do perfil desktop
let desktopProfileManager;

document.addEventListener('DOMContentLoaded', () => {
    desktopProfileManager = new DesktopProfileManager();
});

// Função global para abrir o modal do perfil
function openProfileModal() {
    if (desktopProfileManager) {
        desktopProfileManager.openModal();
    }
}

// Função auxiliar para formatação de telefone (igual ao perfil.js)
function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '');
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
    telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
    return telefone;
}

// Exportar para uso em outros módulos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DesktopProfileManager };
}
