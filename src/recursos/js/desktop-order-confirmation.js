// Sistema de Gerenciamento da Confirmação do Pedido Desktop - Get Eats

class DesktopOrderConfirmationManager {
    constructor() {
        this.modal = document.getElementById('order-confirmation-modal');
        this.closeBtn = this.modal.querySelector('.close-modal-btn');
        this.trackOrderBtn = document.getElementById('track-order-btn');
        this.backToMenuBtn = document.getElementById('back-to-menu-btn');

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

        if (this.trackOrderBtn) {
            this.trackOrderBtn.addEventListener('click', () => this.trackOrder());
        }

        if (this.backToMenuBtn) {
            this.backToMenuBtn.addEventListener('click', () => this.backToMenu());
        }
    }

    openModal() {
        if (this.modal) {
            this.modal.style.display = 'flex';
            this.createOrder();
            this.renderOrderDetails();
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }

    createOrder() {
        // Generate unique order number
        const orderNumber = this.generateOrderNumber();

        // Get order details
        const resumo = carrinhoManager.obterResumo();
        const endereco = carrinhoManager.obterEndereco();
        const usuarioLogado = authManager.obterUsuarioLogado();

        // Create order object
        const pedido = {
            id: orderNumber.replace('#', ''),
            data: new Date(),
            status: 'confirmado',
            itens: resumo.quantidadeItens > 0 ? carrinhoManager.carrinho : [],
            total: resumo.total,
            endereco: endereco || (usuarioLogado ? usuarioLogado.endereco : ''),
            timestampInicio: Date.now(),
            entregador: null // Will be assigned when status changes to "out for delivery"
        };

        // Save to localStorage
        const pedidosAtuais = JSON.parse(localStorage.getItem('pedidos_atuais') || '[]');
        pedidosAtuais.push(pedido);
        localStorage.setItem('pedidos_atuais', JSON.stringify(pedidosAtuais));

        // Save current order for tracking
        localStorage.setItem('pedido_atual', JSON.stringify(pedido));

        // Clear cart
        carrinhoManager.limparCarrinho();

        // Store order number for display
        this.currentOrderNumber = orderNumber;
        this.currentOrder = pedido;
    }

    generateOrderNumber() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `#${timestamp}${random}`;
    }

    renderOrderDetails() {
        if (!this.currentOrder) return;

        // Update order number
        const orderNumberEl = document.getElementById('confirmation-order-number');
        if (orderNumberEl) {
            orderNumberEl.textContent = this.currentOrderNumber;
        }

        // Update address
        const addressEl = document.getElementById('confirmation-address');
        if (addressEl) {
            addressEl.textContent = this.currentOrder.endereco;
        }

        // Update total
        const totalEl = document.getElementById('confirmation-total');
        if (totalEl) {
            totalEl.textContent = `R$ ${this.currentOrder.total.toFixed(2).replace('.', ',')}`;
        }
    }

    trackOrder() {
        // Close confirmation modal
        this.closeModal();

        // Open tracking modal
        desktopOrderTrackingManager.openModal();
    }

    backToMenu() {
        // Close modal and redirect to menu
        this.closeModal();
        window.location.href = 'cardapio.html';
    }
}

// Instância global do gerenciador de confirmação de pedido desktop
const desktopOrderConfirmationManager = new DesktopOrderConfirmationManager();

// Exportar para uso em outros módulos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DesktopOrderConfirmationManager, desktopOrderConfirmationManager };
}
