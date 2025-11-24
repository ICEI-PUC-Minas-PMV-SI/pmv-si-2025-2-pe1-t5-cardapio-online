// Sistema de Gerenciamento de Pedidos Desktop - Get Eats

class DesktopPedidosManager {
    constructor() {
        this.modal = document.getElementById('pedidos-modal');
        this.modalOverlay = document.querySelector('.pedidos-modal-overlay');
        this.closeBtn = document.querySelector('.pedidos-modal-close');
        this.tabs = document.querySelectorAll('.pedidos-tab');
        this.tabContents = document.querySelectorAll('.pedidos-tab-content');
        this.pedidosAtuaisContainer = document.getElementById('pedidos-atuais-desktop');
        this.historicoContainer = document.getElementById('pedidos-historico-desktop');

        this.pedidosAtuais = [];
        this.historicoPedidos = [];

        this.init();
    }

    init() {
        // Event listeners
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', (e) => {
                if (e.target === this.modalOverlay) {
                    this.closeModal();
                }
            });
        }

        // Tab switching
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab.dataset.tab);
            });
        });

        // Load orders data
        this.carregarPedidos();
    }

    openModal() {
        if (this.modalOverlay) {
            this.modalOverlay.style.display = 'flex';
            this.render();
        }
    }

    closeModal() {
        if (this.modalOverlay) {
            this.modalOverlay.style.display = 'none';
        }
    }

    isOpen() {
        return this.modal && this.modal.style.display === 'flex';
    }

    switchTab(tabId) {
        // Remove active class from all tabs
        this.tabs.forEach(tab => tab.classList.remove('active'));

        // Add active class to clicked tab
        const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Hide all tab contents
        this.tabContents.forEach(content => content.classList.remove('active'));

        // Show selected tab content
        const activeContent = document.getElementById(tabId);
        if (activeContent) {
            activeContent.classList.add('active');
        }

        // Render content for the active tab
        this.render();
    }

    carregarPedidos() {
        // Load current orders from localStorage
        this.pedidosAtuais = JSON.parse(localStorage.getItem('pedidos_atuais') || '[]');

        // Load order history from localStorage
        this.historicoPedidos = JSON.parse(localStorage.getItem('historico_pedidos') || '[]');

        // Clean duplicates from history
        this.limparDuplicatasHistorico();

        // Convert date strings to Date objects
        this.pedidosAtuais = this.pedidosAtuais.map(pedido => ({
            ...pedido,
            data: new Date(pedido.data)
        }));

        this.historicoPedidos = this.historicoPedidos.map(pedido => ({
            ...pedido,
            data: new Date(pedido.data)
        }));

        // Sort current orders by date (most recent first)
        this.pedidosAtuais.sort((a, b) => b.data - a.data);

        // Sort history by date (most recent first)
        this.historicoPedidos.sort((a, b) => b.data - a.data);
    }

    render() {
        const activeTab = document.querySelector('.pedidos-tab.active');
        if (!activeTab) return;

        const tabId = activeTab.dataset.tab;

        if (tabId === 'atuais') {
            this.renderizarPedidosAtuais();
        } else {
            this.renderizarHistorico();
        }
    }

    renderizarPedidosAtuais() {
        if (!this.pedidosAtuaisContainer) return;

        if (this.pedidosAtuais.length === 0) {
            this.pedidosAtuaisContainer.innerHTML = `
                <div class="empty-state">
                    <img src="../assets/icons/Cart.svg" alt="Sem pedidos" class="empty-icon">
                    <h3>Nenhum pedido atual</h3>
                    <p>Você não tem pedidos em andamento no momento.</p>
                    <a href="#" class="btn-primary" onclick="desktopPedidosManager.closeModal()">Fazer um pedido</a>
                </div>
            `;
            return;
        }

        this.pedidosAtuaisContainer.innerHTML = '';

        this.pedidosAtuais.forEach(pedido => {
            const card = this.criarCardPedido(pedido);
            this.pedidosAtuaisContainer.appendChild(card);
        });
    }

    renderizarHistorico() {
        if (!this.historicoContainer) return;

        if (this.historicoPedidos.length === 0) {
            this.historicoContainer.innerHTML = `
                <div class="empty-state">
                    <img src="../assets/icons/Cart.svg" alt="Sem histórico" class="empty-icon">
                    <h3>Nenhum histórico</h3>
                    <p>Você ainda não fez nenhum pedido.</p>
                    <a href="#" class="btn-primary" onclick="desktopPedidosManager.closeModal()">Fazer primeiro pedido</a>
                </div>
            `;
            return;
        }

        this.historicoContainer.innerHTML = '';

        this.historicoPedidos.forEach(pedido => {
            const card = this.criarCardPedido(pedido);
            this.historicoContainer.appendChild(card);
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
        // Create a map to track unique orders by ID
        const pedidosUnicos = new Map();

        // Process history to keep only the most recent order for each ID
        this.historicoPedidos.forEach(pedido => {
            if (!pedidosUnicos.has(pedido.id)) {
                pedidosUnicos.set(pedido.id, pedido);
            } else {
                // If it already exists, keep the most recent one (by date)
                const existente = pedidosUnicos.get(pedido.id);
                if (new Date(pedido.data) > new Date(existente.data)) {
                    pedidosUnicos.set(pedido.id, pedido);
                }
            }
        });

        // Convert back to array
        this.historicoPedidos = Array.from(pedidosUnicos.values());

        // Save the cleaned history to localStorage
        localStorage.setItem('historico_pedidos', JSON.stringify(this.historicoPedidos));
    }

    verDetalhesPedido(pedidoId) {
        // Open desktop order tracking modal instead of redirecting
        if (window.innerWidth >= 1024 && typeof desktopOrderTrackingManager !== 'undefined') {
            // Close the pedidos modal first
            this.closeModal();
            desktopOrderTrackingManager.openModal(pedidoId);
        } else {
            // Fallback to mobile page for smaller screens
            window.location.href = `pedido-status.html?id=${pedidoId}`;
        }
    }
}

// Global instance of desktop orders manager
const desktopPedidosManager = new DesktopPedidosManager();

// Global function to open orders modal
function openPedidosModal() {
    desktopPedidosManager.openModal();
}

// Export for use in other modules (if necessary)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DesktopPedidosManager, desktopPedidosManager };
}
