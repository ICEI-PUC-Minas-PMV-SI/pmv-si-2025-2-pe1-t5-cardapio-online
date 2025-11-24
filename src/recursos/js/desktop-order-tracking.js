// Sistema de Gerenciamento do Acompanhamento do Pedido Desktop - Get Eats

class DesktopOrderTrackingManager {
    constructor() {
        this.modal = document.getElementById('order-tracking-modal');
        this.closeBtn = this.modal.querySelector('.cart-modal-close');
        this.updateBtn = document.getElementById('update-status-btn');
        this.backToHomeBtn = document.getElementById('back-to-home-btn');

        this.statuses = [
            {
                titulo: 'Pedido Confirmado',
                descricao: 'Seu pedido foi confirmado e está sendo preparado.',
                progresso: 25,
                icone: '../assets/icons/Check.svg'
            },
            {
                titulo: 'Preparando Pedido',
                descricao: 'Estamos preparando seu pedido com todo cuidado.',
                progresso: 50,
                icone: '../assets/icons/Check.svg'
            },
            {
                titulo: 'Saiu para Entrega',
                descricao: 'Seu pedido saiu para entrega e está a caminho.',
                progresso: 75,
                icone: '../assets/icons/Check.svg'
            },
            {
                titulo: 'Entregue',
                descricao: 'Seu pedido foi entregue com sucesso!',
                progresso: 100,
                icone: '../assets/icons/Check.svg'
            }
        ];

        this.deliverers = [
            { nome: 'João Silva', avatar: 'JS', info: 'Entregador • Moto • 5.0 ★' },
            { nome: 'Maria Santos', avatar: 'MS', info: 'Entregadora • Carro • 4.9 ★' },
            { nome: 'Pedro Costa', avatar: 'PC', info: 'Entregador • Moto • 4.8 ★' },
            { nome: 'Ana Oliveira', avatar: 'AO', info: 'Entregadora • Bicicleta • 5.0 ★' }
        ];

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

        if (this.updateBtn) {
            this.updateBtn.addEventListener('click', () => this.updateStatus());
        }

        if (this.backToHomeBtn) {
            this.backToHomeBtn.addEventListener('click', () => this.backToHome());
        }
    }

    openModal(orderId = null) {
        if (this.modal) {
            this.modal.style.display = 'flex';
            if (orderId) {
                this.loadOrderById(orderId);
            } else {
                this.loadOrderData();
            }
            this.simulateStatus();
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }

    loadOrderData() {
        // Try to load current order
        let pedido = JSON.parse(localStorage.getItem('pedido_atual') || 'null');

        if (!pedido) {
            // Fallback to last order from pedidos_atuais
            const pedidosAtuais = JSON.parse(localStorage.getItem('pedidos_atuais') || '[]');
            if (pedidosAtuais.length > 0) {
                pedido = pedidosAtuais[pedidosAtuais.length - 1];
            }
        }

        if (pedido) {
            this.currentOrder = pedido;
            this.renderOrderDetails();
        }
    }

    loadOrderById(orderId) {
        // Try to find in current orders
        let pedido = null;
        const pedidosAtuais = JSON.parse(localStorage.getItem('pedidos_atuais') || '[]');
        pedido = pedidosAtuais.find(p => p.id === orderId);

        // If not found, try in history
        if (!pedido) {
            const historicoPedidos = JSON.parse(localStorage.getItem('historico_pedidos') || '[]');
            pedido = historicoPedidos.find(p => p.id === orderId);
        }

        if (pedido) {
            this.currentOrder = pedido;
            this.renderOrderDetails();
        }
    }

    renderOrderDetails() {
        if (!this.currentOrder) return;

        // Update order number
        const orderNumberEl = document.getElementById('tracking-order-number');
        if (orderNumberEl) {
            orderNumberEl.textContent = `#${this.currentOrder.id}`;
        }

        // Update address
        const addressEl = document.getElementById('tracking-address');
        if (addressEl) {
            addressEl.textContent = this.currentOrder.endereco;
        }

        // Update total
        const totalEl = document.getElementById('tracking-total');
        if (totalEl) {
            totalEl.textContent = `R$ ${this.currentOrder.total.toFixed(2).replace('.', ',')}`;
        }
    }

    simulateStatus() {
        if (!this.currentOrder) return;

        // Check if order is already delivered
        if (this.currentOrder.status === 'entregue') {
            this.renderStatus(3); // Delivered
            this.assignDeliverer();
            this.updateRouteProgress(100);
            this.disableUpdateButton();
            return;
        }

        // Calculate status based on time elapsed
        const tempoDecorrido = Date.now() - this.currentOrder.timestampInicio;
        const minutosDecorridos = tempoDecorrido / (1000 * 60);
        const tempoTotalSimulacao = 2; // 2 minutes for full simulation
        const progressoTotal = Math.min((minutosDecorridos / tempoTotalSimulacao) * 100, 100);

        let statusAtual = 0;
        if (progressoTotal >= 25) statusAtual = 1;
        if (progressoTotal >= 50) statusAtual = 2;
        if (progressoTotal >= 100) statusAtual = 3;

        // Assign deliverer when order is out for delivery
        if (statusAtual >= 2 && !this.currentOrder.entregador) {
            this.assignDeliverer();
        }

        // Update route progress
        this.updateRouteProgress(progressoTotal);

        // Render current status
        this.renderStatus(statusAtual);

        // If delivered, move to history and disable updates
        if (statusAtual === 3) {
            this.moveToHistory();
            this.disableUpdateButton();
        }
    }

    renderStatus(statusIndex) {
        const status = this.statuses[statusIndex];

        // Update status elements
        const titleEl = document.getElementById('tracking-status-title');
        const descEl = document.getElementById('tracking-status-description');
        const progressEl = document.getElementById('tracking-progress-fill');
        const iconEl = document.getElementById('tracking-status-icon');

        if (titleEl) titleEl.textContent = status.titulo;
        if (descEl) descEl.textContent = status.descricao;
        if (progressEl) progressEl.style.width = `${status.progresso}%`;
        if (iconEl) iconEl.src = status.icone;

        // Update time estimate
        const timeEl = document.getElementById('tracking-time');
        if (timeEl) {
            if (statusIndex === 3) {
                timeEl.textContent = 'Entregue';
            } else {
                const remainingMinutes = Math.max(0, Math.floor((100 - status.progresso) / 25 * 15));
                timeEl.textContent = remainingMinutes > 0 ? `${remainingMinutes} min` : 'Em breve';
            }
        }
    }

    assignDeliverer() {
        if (!this.currentOrder.entregador) {
            const delivererIndex = Math.floor(Math.random() * this.deliverers.length);
            this.currentOrder.entregador = this.deliverers[delivererIndex];

            // Update localStorage
            localStorage.setItem('pedido_atual', JSON.stringify(this.currentOrder));
        }

        // Render deliverer info
        const nameEl = document.getElementById('delivery-name');
        const avatarEl = document.getElementById('delivery-avatar');
        const infoEl = document.getElementById('delivery-info');

        if (nameEl) nameEl.textContent = this.currentOrder.entregador.nome;
        if (avatarEl) avatarEl.textContent = this.currentOrder.entregador.avatar;
        if (infoEl) infoEl.textContent = this.currentOrder.entregador.info;
    }

    updateRouteProgress(progress) {
        const routeLineEl = document.querySelector('.route-line');
        if (routeLineEl) {
            routeLineEl.style.setProperty('--route-progress', `${progress}%`);
        }
    }

    updateStatus() {
        if (!this.currentOrder || this.currentOrder.status === 'entregue') return;

        // Manually advance status for demo purposes
        const currentTime = Date.now();
        const newTime = this.currentOrder.timestampInicio - (2 * 60 * 1000); // Subtract 2 minutes
        this.currentOrder.timestampInicio = newTime;

        // Update localStorage
        localStorage.setItem('pedido_atual', JSON.stringify(this.currentOrder));

        // Re-simulate status
        this.simulateStatus();
    }

    moveToHistory() {
        if (!this.currentOrder) return;

        // Update status
        this.currentOrder.status = 'entregue';
        this.currentOrder.dataEntrega = new Date().toISOString();

        // Add to history
        const historico = JSON.parse(localStorage.getItem('historico_pedidos') || '[]');
        historico.push(this.currentOrder);
        localStorage.setItem('historico_pedidos', JSON.stringify(historico));

        // Remove from current orders
        const pedidosAtuais = JSON.parse(localStorage.getItem('pedidos_atuais') || '[]');
        const index = pedidosAtuais.findIndex(p => p.id === this.currentOrder.id);
        if (index > -1) {
            pedidosAtuais.splice(index, 1);
            localStorage.setItem('pedidos_atuais', JSON.stringify(pedidosAtuais));
        }

        // Update localStorage
        localStorage.setItem('pedido_atual', JSON.stringify(this.currentOrder));
    }

    disableUpdateButton() {
        if (this.updateBtn) {
            this.updateBtn.disabled = true;
            this.updateBtn.textContent = 'Pedido Entregue';
        }
    }

    backToHome() {
        // Close modal and redirect to menu
        this.closeModal();
        window.location.href = 'cardapio.html';
    }
}

// Instância global do gerenciador de acompanhamento de pedido desktop
const desktopOrderTrackingManager = new DesktopOrderTrackingManager();

// Exportar para uso em outros módulos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DesktopOrderTrackingManager, desktopOrderTrackingManager };
}
