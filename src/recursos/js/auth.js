// Módulo de autenticação usando localStorage
class AuthManager {
  constructor() {
    this.USERS_KEY = 'geteats_users';
    this.CURRENT_USER_KEY = 'geteats_current_user';
    this.ADMINS_KEY = 'geteats_admins';
    this.CURRENT_ADMIN_KEY = 'geteats_current_admin';
  }

  // Salvar usuário no localStorage
  salvarUsuario(userData) {
    const users = this.obterUsuarios();
    users.push(userData);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Obter todos os usuários
  obterUsuarios() {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Verificar login
  verificarLogin(email, senha) {
    const users = this.obterUsuarios();
    const user = users.find(u => u.email === email && u.senha === senha);

    if (user) {
      // Salvar usuário logado
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
      return user;
    }

    return null;
  }

  // Obter usuário logado
  obterUsuarioLogado() {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Verificar se usuário está logado
  estaLogado() {
    return this.obterUsuarioLogado() !== null;
  }

  // Logout
  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    // Limpar carrinho do usuário ao fazer logout
    const usuarioLogado = this.obterUsuarioLogado();
    if (usuarioLogado) {
      const chaveCarrinho = `carrinho_geteats_${usuarioLogado.email}`;
      localStorage.removeItem(chaveCarrinho);
    }
  }

  // Atualizar dados do usuário logado
  atualizarUsuarioLogado(userData) {
    if (this.estaLogado()) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userData));
    }
  }

  // Salvar admin no localStorage
  salvarAdmin(adminData) {
    const admins = this.obterAdmins();
    admins.push(adminData);
    localStorage.setItem(this.ADMINS_KEY, JSON.stringify(admins));
  }

  // Obter todos os admins
  obterAdmins() {
    const admins = localStorage.getItem(this.ADMINS_KEY);
    return admins ? JSON.parse(admins) : [];
  }

  // Verificar login de admin
  verificarLoginAdmin(email, senha) {
    const admins = this.obterAdmins();
    const admin = admins.find(a => a.email === email && a.senha === senha);

    if (admin) {
      // Salvar admin logado
      localStorage.setItem(this.CURRENT_ADMIN_KEY, JSON.stringify(admin));
      return admin;
    }

    return null;
  }

  // Obter admin logado
  obterAdminLogado() {
    const admin = localStorage.getItem(this.CURRENT_ADMIN_KEY);
    return admin ? JSON.parse(admin) : null;
  }

  // Verificar se admin está logado
  adminEstaLogado() {
    return this.obterAdminLogado() !== null;
  }

  // Logout admin
  logoutAdmin() {
    localStorage.removeItem(this.CURRENT_ADMIN_KEY);
  }
}

// Instância global
const authManager = new AuthManager();
