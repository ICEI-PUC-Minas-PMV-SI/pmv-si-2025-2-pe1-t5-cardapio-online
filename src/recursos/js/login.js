// Login page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // // Verificar se usuário já está logado
  // if (authManager.estaLogado()) {
  //   // Redirecionar para cardapio se já estiver logado
  //   window.location.href = 'cardapio.html';
  //   return;
  // }

  // Event listener para o botão de login
  document.querySelector('.btn--primario').addEventListener('click', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('password').value;

    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Verificar login
    const usuario = authManager.verificarLogin(email, senha);

    if (usuario) {
      alert('Login realizado com sucesso!');
      // Redirecionar para cardapio
      window.location.href = 'cardapio.html';
    } else {
      alert('Email ou senha incorretos.');
    }
  });

  // Toggle para mostrar/ocultar senha
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
});
