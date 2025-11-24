// Sistema de Gerenciamento do Pagamento Desktop - Get Eats

class DesktopPaymentManager {
    constructor() {
        this.modal = document.getElementById('payment-modal');
        this.closeBtn = this.modal.querySelector('.close-modal-btn');
        this.pixBtn = document.getElementById('pix-btn');
        this.confirmBtn = document.getElementById('confirm-payment-btn');
        this.cardNumberInput = document.getElementById('card-number');
        this.cardExpiryInput = document.getElementById('card-expiry');
        this.cardCvvInput = document.getElementById('card-cvv');
        this.cardHolderInput = document.getElementById('card-holder');

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

        if (this.pixBtn) {
            this.pixBtn.addEventListener('click', () => this.selectPixPayment());
        }

        if (this.confirmBtn) {
            this.confirmBtn.addEventListener('click', () => this.confirmPayment());
        }

        // Input formatting
        if (this.cardNumberInput) {
            this.cardNumberInput.addEventListener('input', (e) => this.formatCardNumber(e));
        }

        if (this.cardExpiryInput) {
            this.cardExpiryInput.addEventListener('input', (e) => this.formatExpiry(e));
        }
    }

    openModal() {
        if (this.modal) {
            this.modal.style.display = 'flex';
            this.renderOrderSummary();
            this.resetForm();
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }

    renderOrderSummary() {
        const resumo = carrinhoManager.obterResumo();

        // Update summary items
        const subtotalEl = document.getElementById('payment-subtotal');
        const descontoEl = document.getElementById('payment-desconto');
        const totalEl = document.getElementById('payment-total');

        if (subtotalEl) {
            subtotalEl.textContent = `R$ ${resumo.subtotal.toFixed(2).replace('.', ',')}`;
        }

        if (descontoEl) {
            descontoEl.textContent = resumo.desconto > 0 ? `-R$ ${resumo.desconto.toFixed(2).replace('.', ',')}` : 'R$ 0,00';
        }

        if (totalEl) {
            totalEl.textContent = `R$ ${resumo.total.toFixed(2).replace('.', ',')}`;
        }
    }

    selectPixPayment() {
        // Highlight PIX button
        this.pixBtn.style.borderColor = '#FE2E2E';
        this.pixBtn.style.backgroundColor = '#fef2f2';

        // Reset card form styling
        const cardForm = document.querySelector('.credit-card-form');
        if (cardForm) {
            cardForm.style.opacity = '0.5';
        }
    }

    confirmPayment() {
        // Validate user login
        const usuarioLogado = authManager.obterUsuarioLogado();
        if (!usuarioLogado) {
            alert('Você precisa estar logado para finalizar o pedido!');
            this.closeModal();
            document.body.classList.add('modal-open-auth');
            return;
        }

        // Validate address
        const endereco = carrinhoManager.obterEndereco();
        if (!endereco) {
            alert('Por favor, informe o endereço de entrega!');
            this.closeModal();
            return;
        }

        // Validate payment method
        const pixSelected = this.pixBtn.style.borderColor === 'rgb(254, 46, 46)';
        const cardNumber = this.cardNumberInput.value.replace(/\s/g, '');

        if (!pixSelected && cardNumber.length < 16) {
            alert('Por favor, selecione uma forma de pagamento válida!');
            return;
        }

        // Validate card details if credit card is selected
        if (!pixSelected) {
            const expiry = this.cardExpiryInput.value;
            const cvv = this.cardCvvInput.value;
            const holder = this.cardHolderInput.value.trim();

            if (!this.validateCardDetails(cardNumber, expiry, cvv, holder)) {
                return;
            }
        }

        // Process payment
        this.processPayment(pixSelected);
    }

    validateCardDetails(number, expiry, cvv, holder) {
        // Basic validation
        if (number.length !== 16) {
            alert('Número do cartão deve ter 16 dígitos!');
            return false;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            alert('Data de expiração deve estar no formato MM/AA!');
            return false;
        }

        if (cvv.length < 3) {
            alert('CVV deve ter pelo menos 3 dígitos!');
            return false;
        }

        if (holder.length < 3) {
            alert('Nome do titular deve ter pelo menos 3 caracteres!');
            return false;
        }

        return true;
    }

    processPayment(isPix) {
        // Show loading state
        this.confirmBtn.disabled = true;
        this.confirmBtn.textContent = 'Processando...';

        // Simulate payment processing
        setTimeout(() => {
            // Close payment modal
            this.closeModal();

            // Open order confirmation modal
            desktopOrderConfirmationManager.openModal();
        }, 2000);
    }

    formatCardNumber(e) {
        let value = e.target.value.replace(/\s/g, '');
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value.substring(0, 19);
    }

    formatExpiry(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value.substring(0, 5);
    }

    resetForm() {
        // Reset PIX selection
        this.pixBtn.style.borderColor = '#e0e0e0';
        this.pixBtn.style.backgroundColor = 'white';

        // Reset card form
        const cardForm = document.querySelector('.credit-card-form');
        if (cardForm) {
            cardForm.style.opacity = '1';
        }

        // Clear inputs
        if (this.cardNumberInput) this.cardNumberInput.value = '';
        if (this.cardExpiryInput) this.cardExpiryInput.value = '';
        if (this.cardCvvInput) this.cardCvvInput.value = '';
        if (this.cardHolderInput) this.cardHolderInput.value = '';

        // Reset button
        this.confirmBtn.disabled = false;
        this.confirmBtn.textContent = 'Confirmar Pagamento';
    }
}

// Instância global do gerenciador de pagamento desktop
const desktopPaymentManager = new DesktopPaymentManager();

// Exportar para uso em outros módulos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DesktopPaymentManager, desktopPaymentManager };
}
