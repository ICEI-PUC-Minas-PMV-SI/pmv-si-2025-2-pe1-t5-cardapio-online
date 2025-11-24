// Sistema de Gerenciamento do Histórico de Pedidos Desktop - Get Eats

class DesktopOrderHistoryManager {
    constructor() {
        this.modal = document.getElementById('order-history-modal');
        this.closeBtn = this.modal.querySelector('.close-modal-btn');
        this.tabs = document.querySelectorAll('.history-tab');
        this.ordersContainer = document.getElementById('history-orders-list');

        this.currentOrders = [];
        this.pastOrders = [];

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

        // Tab listeners
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });
    }

    openModal() {
        if (this.modal) {
            this.modal.style.display = 'flex';
            this.loadOrders();
            this.renderOrders('current');
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }

    loadOrders() {
        // Load current orders
        this.currentOrders = JSON.parse(localStorage.getItem('pedidos_atuais') || '[]');

        // Load past orders
        this.pastOrders = JSON.parse(localStorage.getItem('historico_pedidos') || '[]');

        // Convert dates and sort
        this.currentOrders = this.currentOrders.map(order => ({
            ...order,
            data: new Date(order.data)
        })).sort((a, b) => b.data - a.data);

        this.pastOrders = this.pastOrders.map(order => ({
            ...order,
            data: new Date(order.data)
        })).sort((a, b) => b.data - a.data);
    }

    switchTab(tabType) {
        // Update tab active state
        this.tabs.forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-tab="${tabType}"]`).classList.add('active');

        // Render orders for selected tab
        this.renderOrders(tabType);
    }

    renderOrders(tabType) {
        if (!this.ordersContainer) return;

        const orders = tabType === 'current' ? this.currentOrders : this.pastOrders;

        if (orders.length === 0) {
            this.renderEmptyState(tabType);
            return;
        }

        this.ordersContainer.innerHTML = '';

        orders.forEach(order => {
            const orderCard = this.createOrderCard(order, tabType);
            this.ordersContainer.appendChild(orderCard);
        });
    }

    createOrderCard(order, tabType) {
        const card = document.createElement('div');
        card.className = 'history-order-card';
        card.onclick = () => this.viewOrderDetails(order.id);

        const statusInfo = this.getStatusInfo(order.status);
        const formattedDate = this.formatDate(order.data);

        card.innerHTML = `
            <div class="history-order-header">
                <div class="history-order-number">#${order.id}</div>
                <div class="history-order-date">${formattedDate}</div>
            </div>
            <div class="history-order-status">
                <img src="${statusInfo.icon}" alt="Status" class="history-status-icon" />
                <div class="history-status-text ${order.status}">${statusInfo.text}</div>
            </div>
            <div class="history-order-items">
                ${order.itens ? order.itens.slice(0, 2).map(item =>
                    `<div class="history-order-item">
                        <span>${item.quantidade}x ${item.nome}</span>
                        <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                    </div>`
                ).join('') : ''}
                ${order.itens && order.itens.length > 2 ? `<div class="history-order-item"><span>+${order.itens.length - 2} itens</span></div>` : ''}
            </div>
            <div class="history-order-total">
                <span>Total</span>
                <span>R$ ${order.total.toFixed(2).replace('.', ',')}</span>
            </div>
        `;

        return card;
    }

    getStatusInfo(status) {
        const statusMap = {
            'confirmado': {
                text: 'Confirmado',
                icon: '../assets/icons/Check.svg'
            },
            'preparando': {
                text: 'Preparando',
                icon: '../assets/icons/Waiting.svg'
            },
            'saiu-entrega': {
                text: 'Saiu para entrega',
                icon: '../assets/icons/Check.svg'
            },
            'entregue': {
                text: 'Entregue',
                icon: '../assets/icons/Check.svg'
            }
        };

        return statusMap[status] || statusMap['confirmado'];
    }

    formatDate(date) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Hoje';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Ontem';
        } else {
            return date.toLocaleDateString('pt-BR');
        }
    }

    renderEmptyState(tabType) {
        const title = tabType === 'current' ? 'Nenhum pedido atual' : 'Nenhum histórico';
        const message = tabType === 'current'
            ? 'Você não tem pedidos em andamento no momento.'
            : 'Você ainda não fez nenhum pedido.';
        const buttonText = tabType === 'current' ? 'Fazer um pedido' : 'Fazer primeiro pedido';

        this.ordersContainer.innerHTML = `
            <div class="history-empty-state">
                <img src="../assets/icons/Cart.svg" alt="Sem pedidos" class="empty-icon" />
                <h3>${title}</h3>
                <p>${message}</p>
                <a href="cardapio.html" class="history-btn-primary">${buttonText}</a>
            </div>
        `;
    }

    viewOrderDetails(orderId) {
        // Close history modal
        this.closeModal();

        // Find order in both arrays
        let order = this.currentOrders.find(o => o.id === orderId);
        if (!order) {
            order = this.pastOrders.find(o => o.id === orderId);
        }

        if (order) {
            // Save as current order for tracking
            localStorage.setItem('pedido_atual', JSON.stringify(order));

            // Open tracking modal
            desktopOrderTrackingManager.openModal();
        }
    }
}

// Instância global do gerenciador de histórico de pedidos desktop
const desktopOrderHistoryManager = new DesktopOrderHistoryManager();

// Exportar para uso em outros módulos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DesktopOrderHistoryManager, desktopOrderHistoryManager };
}
