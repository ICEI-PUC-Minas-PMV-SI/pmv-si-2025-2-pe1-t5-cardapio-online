// Função para validar CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
}

// Função para validar telefone
function validarTelefone(telefone) {
  const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return regex.test(telefone);
}

// Função para validar email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Função para formatar CPF
function formatarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return cpf;
}

// Função para formatar telefone
function formatarTelefone(telefone) {
  telefone = telefone.replace(/\D/g, '');
  telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
  telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
  return telefone;
}

// Event listeners para formatação
document.getElementById('cpf').addEventListener('input', function(e) {
  e.target.value = formatarCPF(e.target.value);
});

document.getElementById('contato').addEventListener('input', function(e) {
  e.target.value = formatarTelefone(e.target.value);
});

// Validação do formulário
document.addEventListener('DOMContentLoaded', function() {
  console.log('Cadastro script loaded');
  const btn = document.querySelector('.btn--primario');
  console.log('Button found:', btn);
  if (btn) {
    btn.addEventListener('click', function(e) {
      console.log('Button clicked');
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const cpf = document.getElementById('cpf').value.trim();
      const contato = document.getElementById('contato').value.trim();
      const endereco = document.getElementById('endereco').value.trim();
      const senha = document.getElementById('password').value;
      const confirmarSenha = document.getElementById('confirm-password').value;
      const termos = document.getElementById('terms').checked;

      console.log('Form values:', { nome, email, cpf, contato, endereco, senha, confirmarSenha, termos });

      let erros = [];

      if (!nome) erros.push('Nome é obrigatório.');
      if (!validarEmail(email)) erros.push('Email inválido.');
      if (!validarCPF(cpf)) erros.push('CPF inválido.');
      if (!validarTelefone(contato)) erros.push('Telefone inválido.');
      if (!endereco) erros.push('Endereço é obrigatório.');
      if (senha.length < 6) erros.push('Senha deve ter pelo menos 6 caracteres.');
      if (senha !== confirmarSenha) erros.push('Senhas não coincidem.');
      if (!termos) erros.push('Você deve aceitar os termos e condições.');

      console.log('Errors:', erros);

      if (erros.length > 0) {
        alert('Erros encontrados:\n' + erros.join('\n'));
      } else {
        // Criar objeto usuário
        const novoUsuario = {
          nome: nome,
          email: email,
          cpf: cpf,
          contato: contato,
          endereco: endereco,
          senha: senha
        };

        console.log('Creating user:', novoUsuario);

        try {
          // Salvar usuário
          authManager.salvarUsuario(novoUsuario);
          console.log('User saved successfully');
          // Mostrar confirmação no botão
          const btn = document.querySelector('.btn--primario');
          btn.textContent = 'Conta criada com sucesso';
          btn.disabled = true;
          // Redirecionar para login após 2 segundos
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000);
        } catch (error) {
          console.error('Error saving user:', error);
          alert('Erro no cadastro: ' + error.message);
        }
      }
    });
  } else {
    console.error('Button not found');
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
