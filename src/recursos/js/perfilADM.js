// Perfil ADM page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se ADM está logado
  if (!authADM.isLoggedIn()) {
    window.location.href = 'loginADM.html';
    return;
  }

  // Preencher informações do ADM
  preencherPerfilADM();

  // Event listeners
  document.getElementById('ir-cardapio').addEventListener('click', () => window.location.href = 'admin-cardapio.html');
  document.getElementById('logout').addEventListener('click', fazerLogout);

});

function preencherPerfilADM() {
  const user = authADM.getUserADM();
  if (user) {
    document.getElementById('admin-user').textContent = user;
    document.getElementById('admin-status').textContent = 'Logado';
  }
}

function fazerLogout() {
  if (confirm('Tem certeza que deseja sair da conta?')) {
    authADM.logout();
    window.location.href = 'loginADM.html';
  }
}
