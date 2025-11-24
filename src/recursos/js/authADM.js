const authADM = {
  // Credenciais salvas localmente (hardcoded)
  credentials: {
    user: 'adm',
    password: 'adm'
  },

  // Função para verificar login do admin
  login(email, password) {
    if (email === this.credentials.user && password === this.credentials.password) {
      localStorage.setItem('isLoggedInADM', 'true');
      localStorage.setItem('userADM', email);
      return true;
    }
    return false;
  },

  // Função para verificar se o admin está logado
  isLoggedIn() {
    return localStorage.getItem('isLoggedInADM') === 'true';
  },

  // Função para fazer logout do admin
  logout() {
    localStorage.removeItem('isLoggedInADM');
    localStorage.removeItem('userADM');
  },

  // Função para obter o email do admin logado
  getUserADM() {
    return localStorage.getItem('userADM');
  }
};

// Tornar global para uso em outros scripts
window.authADM = authADM;

// Login ADM page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Event listener for the login button
  document.querySelector('.btn--primario').addEventListener('click', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Verify login using authADM
    const success = authADM.login(email, password);

    if (success) {
      alert('Login realizado com sucesso!');
      // Redirect to admin cardapio
      window.location.href = 'admin-cardapio.html';
    } else {
      alert('Email ou senha incorretos.');
    }
  });

  // Toggle for show/hide password
  document.querySelectorAll('.input-field__eye').forEach(eye => {
    eye.addEventListener('click', function() {
      const input = this.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        this.src = '../assets/icons/Ver.svg';
      } else {
        input.type = 'password';
        this.src = '../assets/icons/NãoVer.svg';
      }
    });
  });

  // Event listener for the manager credentials button
  document.querySelector('.social-btn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('apenas usuarios permitidos');
  });
});
