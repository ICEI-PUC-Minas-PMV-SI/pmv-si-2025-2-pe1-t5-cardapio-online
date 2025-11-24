// Gerenciamento da página de pedidos
class PedidosManager {
  constructor() {
    this.pedidosAtuais = [];
    this.historicoPedidos = [];
    this.init();
  }

  init() {
    this.carregarPedidos();
    this.configurarEventos();
    this.renderizarPedidos();
  }

  carregarPedidos() {
    // Carregar pedidos atuais do localStorage
    this.pedidosAtuais = JSON.parse(localStorage.getItem('pedidos_atuais') || '[]');

    // Carregar histórico do localStorage
    this.historicoPedidos = JSON.parse(localStorage.getItem('historico_pedidos') || '[]');

    // Limpar duplicatas do histórico
    this.limparDuplicatasHistorico();

    // Converter datas de string para Date objects
    this.pedidosAtuais = this.pedidosAtuais.map(pedido => ({
      ...pedido,
      data: new Date(pedido.data)
    }));

    this.historicoPedidos = this.historicoPedidos.map(pedido => ({
      ...pedido,
      data: new Date(pedido.data)
    }));

    // Ordenar pedidos atuais por data (mais recentes primeiro)
    this.pedidosAtuais.sort((a, b) => b.data - a.data);

    // Ordenar histórico por data (mais recentes primeiro)
    this.historicoPedidos.sort((a, b) => b.data - a.data);
  }

  configurarEventos() {
    // Eventos das abas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.alterarAba(tab.dataset.tab);
      });
    });

    // Evento do botão voltar
    const backIcon = document.querySelector('.back-icon');
    if (backIcon) {
      backIcon.addEventListener('click', () => {
        window.history.back();
      });
    }

    // Evento do link de perfil
    const profileLink = document.getElementById('profile-link');
    if (profileLink) {
      profileLink.addEventListener('click', () => {
        window.location.href = 'perfil.html';
      });
    }
  }

  alterarAba(tabId) {
    // Remover classe active de todas as abas
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
    });

    // Adicionar classe active à aba clicada
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

    // Esconder todos os painéis
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    // Mostrar o painel correspondente
    document.getElementById(tabId).classList.add('active');

    // Renderizar conteúdo da aba
    this.renderizarPedidos();
  }

  renderizarPedidos() {
    const abaAtiva = document.querySelector('.tab.active').dataset.tab;

    if (abaAtiva === 'atuais') {
      this.renderizarPedidosAtuais();
    } else {
      this.renderizarHistorico();
    }
  }

  renderizarPedidosAtuais() {
    const container = document.getElementById('pedidos-atuais');

    if (this.pedidosAtuais.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <img src="../assets/icons/Cart.svg" alt="Sem pedidos" class="empty-icon">
          <h3>Nenhum pedido atual</h3>
          <p>Você não tem pedidos em andamento no momento.</p>
          <a href="cardapio.html" class="btn-primary">Fazer um pedido</a>
        </div>
      `;
      return;
    }

    container.innerHTML = '';

    this.pedidosAtuais.forEach(pedido => {
      const card = this.criarCardPedido(pedido);
      container.appendChild(card);
    });
  }

  renderizarHistorico() {
    const container = document.getElementById('pedidos-historico');

    if (this.historicoPedidos.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <img src="../assets/icons/Cart.svg" alt="Sem histórico" class="empty-icon">
          <h3>Nenhum histórico</h3>
          <p>Você ainda não fez nenhum pedido.</p>
          <a href="cardapio.html" class="btn-primary">Fazer primeiro pedido</a>
        </div>
      `;
      return;
    }

    container.innerHTML = '';

    this.historicoPedidos.forEach(pedido => {
      const card = this.criarCardPedido(pedido);
      container.appendChild(card);
    });
  }

  criarCardPedido(pedido) {
    const card = document.createElement('div');
    card.className = 'order-card';
    card.onclick = () => this.verDetalhesPedido(pedido.id);

    const statusInfo = this.getStatusInfo(pedido.status);
    const dataFormatada = this.formatarData(pedido.data);

    card.innerHTML = `
      <div class="order-header">
        <div class="order-number">#${pedido.id}</div>
        <div class="order-date">${dataFormatada}</div>
      </div>
      <div class="order-status">
        <img src="${statusInfo.icone}" alt="${statusInfo.texto}" class="status-icon" />
        <div class="status-text ${pedido.status}">${statusInfo.texto}</div>
      </div>
      <div class="order-items">
        ${pedido.itens.map(item => `
          <div class="order-item">
            <span>${item.quantidade}x ${item.nome}</span>
            <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
          </div>
        `).join('')}
      </div>
      <div class="order-total">
        <span>Total</span>
        <span>R$ ${pedido.total.toFixed(2).replace('.', ',')}</span>
      </div>
    `;

    return card;
  }

  getStatusInfo(status) {
    const statusMap = {
      'preparando': {
        texto: 'Preparando',
        icone: '../assets/icons/Waiting.svg'
      },
      'saiu-entrega': {
        texto: 'Saiu para entrega',
        icone: '../assets/icons/Check.svg'
      },
      'entregue': {
        texto: 'Entregue',
        icone: '../assets/icons/Check.svg'
      }
    };

    return statusMap[status] || statusMap['preparando'];
  }

  formatarData(data) {
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);

    if (data.toDateString() === hoje.toDateString()) {
      return 'Hoje';
    } else if (data.toDateString() === ontem.toDateString()) {
      return 'Ontem';
    } else {
      return data.toLocaleDateString('pt-BR');
    }
  }

  limparDuplicatasHistorico() {
    // Criar um mapa para rastrear pedidos únicos por ID
    const pedidosUnicos = new Map();

    // Processar histórico para manter apenas o pedido mais recente de cada ID
    this.historicoPedidos.forEach(pedido => {
      if (!pedidosUnicos.has(pedido.id)) {
        pedidosUnicos.set(pedido.id, pedido);
      } else {
        // Se já existe, manter o mais recente (por data)
        const existente = pedidosUnicos.get(pedido.id);
        if (new Date(pedido.data) > new Date(existente.data)) {
          pedidosUnicos.set(pedido.id, pedido);
        }
      }
    });

    // Converter de volta para array
    this.historicoPedidos = Array.from(pedidosUnicos.values());

    // Salvar o histórico limpo no localStorage
    localStorage.setItem('historico_pedidos', JSON.stringify(this.historicoPedidos));
  }

  verDetalhesPedido(pedidoId) {
    // Redirecionar para a página de status do pedido
    window.location.href = `pedido-status.html?id=${pedidoId}`;
  }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  new PedidosManager();
});
