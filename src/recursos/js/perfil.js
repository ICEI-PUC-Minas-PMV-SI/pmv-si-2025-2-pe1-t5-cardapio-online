// Perfil page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se usuário está logado
  const usuarioLogado = authManager.obterUsuarioLogado();
  if (!usuarioLogado) {
    window.location.href = 'login.html';
    return;
  }

  // Preencher informações do perfil
  preencherPerfil();

  // Event listeners
  document.getElementById('ir-cardapio').addEventListener('click', () => window.location.href = 'cardapio.html');
  document.getElementById('editar-perfil').addEventListener('click', abrirModalEdicao);
  document.getElementById('alterar-senha').addEventListener('click', abrirModalSenha);
  document.getElementById('logout').addEventListener('click', fazerLogout);

  // Modal de edição
  const editModal = document.getElementById('edit-modal');
  const passwordModal = document.getElementById('password-modal');

  // Fechar modais
  document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      editModal.style.display = 'none';
      passwordModal.style.display = 'none';
    });
  });

  // Fechar modal clicando fora
  window.addEventListener('click', (e) => {
    if (e.target === editModal) {
      editModal.style.display = 'none';
    }
    if (e.target === passwordModal) {
      passwordModal.style.display = 'none';
    }
  });

  // Cancelar edição
  document.getElementById('cancel-edit').addEventListener('click', () => {
    editModal.style.display = 'none';
  });

  // Salvar edição
  document.getElementById('save-edit').addEventListener('click', salvarEdicaoPerfil);

  // Cancelar alteração de senha
  document.getElementById('cancel-password').addEventListener('click', () => {
    passwordModal.style.display = 'none';
  });

  // Salvar alteração de senha
  document.getElementById('save-password').addEventListener('click', salvarAlteracaoSenha);

  // Toggle para mostrar/ocultar senha nos modais
  document.querySelectorAll('#password-modal .input-field__eye').forEach(eye => {
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

  // Formatação de telefone no modal de edição
  document.getElementById('edit-contato').addEventListener('input', function(e) {
    e.target.value = formatarTelefone(e.target.value);
  });

  // Botão voltar
  document.querySelector('.back-icon').addEventListener('click', function() {
    window.history.back();
  });
});

function preencherPerfil() {
  const usuario = authManager.obterUsuarioLogado();
  if (usuario) {
    document.getElementById('user-name').textContent = usuario.nome;
    const addressDiv = document.getElementById('user-address');
    addressDiv.innerHTML = '<img src="../assets/icons/Loc.svg" alt="Localização" class="address-icon">' + usuario.endereco;
    document.getElementById('nome').textContent = usuario.nome;
    document.getElementById('email').textContent = usuario.email;
    document.getElementById('cpf').textContent = formatarCPF(usuario.cpf);
    document.getElementById('contato').textContent = formatarTelefone(usuario.contato);
    document.getElementById('endereco').textContent = usuario.endereco;
  }
}

function abrirModalEdicao() {
  const usuario = authManager.obterUsuarioLogado();
  if (usuario) {
    document.getElementById('edit-nome').value = usuario.nome;
    document.getElementById('edit-email').value = usuario.email;
    document.getElementById('edit-contato').value = usuario.contato;
    document.getElementById('edit-endereco').value = usuario.endereco;
    document.getElementById('edit-modal').style.display = 'block';
  }
}

function abrirModalSenha() {
  document.getElementById('current-password').value = '';
  document.getElementById('new-password').value = '';
  document.getElementById('confirm-new-password').value = '';
  document.getElementById('password-modal').style.display = 'block';
}

function salvarEdicaoPerfil() {
  const nome = document.getElementById('edit-nome').value.trim();
  const email = document.getElementById('edit-email').value.trim();
  const contato = document.getElementById('edit-contato').value.trim();
  const endereco = document.getElementById('edit-endereco').value.trim();

  if (!nome || !email || !contato || !endereco) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  if (!validarEmail(email)) {
    alert('Email inválido.');
    return;
  }

  if (!validarTelefone(contato)) {
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

  preencherPerfil();
  document.getElementById('edit-modal').style.display = 'none';
  alert('Perfil atualizado com sucesso!');
}

function salvarAlteracaoSenha() {
  const senhaAtual = document.getElementById('current-password').value;
  const novaSenha = document.getElementById('new-password').value;
  const confirmarNovaSenha = document.getElementById('confirm-new-password').value;

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

  document.getElementById('password-modal').style.display = 'none';
  alert('Senha alterada com sucesso!');
}

function fazerLogout() {
  if (confirm('Tem certeza que deseja sair da conta?')) {
    authManager.logout();
    window.location.href = 'login.html';
  }
}

// Funções de validação e formatação (reutilizadas do cadastro.js)
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarTelefone(telefone) {
  const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return regex.test(telefone);
}

function formatarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return cpf;
}

function formatarTelefone(telefone) {
  telefone = telefone.replace(/\D/g, '');
  telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
  telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
  return telefone;
}
