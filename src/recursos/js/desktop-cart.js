// Sistema de Gerenciamento do Carrinho Desktop - Get Eats

class DesktopCartManager {
    constructor() {
        this.modal = document.getElementById('cart-modal');
        this.modalOverlay = document.querySelector('.cart-modal-overlay');
        this.closeBtn = document.querySelector('.cart-modal-close');
        this.itemsContainer = document.querySelector('.cart-items');
        this.couponInput = document.querySelector('.cart-coupon-bar input');
        this.applyCouponBtn = document.querySelector('.cart-apply-btn');
        this.finalizeBtn = document.querySelector('.cart-finalize-btn');
        this.changeAddressBtn = document.getElementById('cart-alterar-endereco-btn');

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

        if (this.applyCouponBtn) {
            this.applyCouponBtn.addEventListener('click', () => this.applyCoupon());
        }

        if (this.finalizeBtn) {
            this.finalizeBtn.addEventListener('click', () => this.finalizeOrder());
        }

        if (this.changeAddressBtn) {
            this.changeAddressBtn.addEventListener('click', () => this.changeAddress());
        }

        // Escutar mudanças no carrinho
        window.addEventListener('carrinhoAtualizado', () => {
            if (this.isOpen()) {
                this.render();
            }
        });

        // Bind cart float button
        this.bindCartFloatButton();
    }

    bindCartFloatButton() {
        const cartFloatBtn = document.querySelector('.cart-float');
        if (cartFloatBtn) {
            cartFloatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.innerWidth >= 1024) {
                    this.openModal();
                } else {
                    window.location.href = 'carrinho.html';
                }
            });
        }
    }

    openModal() {
        // CORREÇÃO: Usamos this.modalOverlay, que é o elemento com display: none; no CSS.
        if (this.modalOverlay) {
            this.modalOverlay.style.display = 'flex';
            this.render();
        }
    }

    closeModal() {
        // CORREÇÃO: Manipula o display do OVERLAY
        if (this.modalOverlay) {
            this.modalOverlay.style.display = 'none';
        }
    }

    isOpen() {
        return this.modal && this.modal.style.display === 'flex';
    }

    render() {
        this.renderItems();
        this.renderSummary();
        this.renderAddress();
    }

    renderItems() {
        if (!this.itemsContainer) return;

        this.itemsContainer.innerHTML = '';

        if (carrinhoManager.estaVazio()) {
            this.itemsContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Seu carrinho está vazio</p>';
            return;
        }

        carrinhoManager.carrinho.forEach(item => {
            const itemElement = this.createItemElement(item);
            this.itemsContainer.appendChild(itemElement);
        });
    }

    createItemElement(item) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        itemDiv.innerHTML = `
            <div class="left-side">
                <div class="image" style="background-image: url('${item.imagem}');"></div>
                <div class="quantity">
                    <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantidade}</span>
                    <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="details">
                <div class="title">${item.nome}</div>
                <div class="price">R$ ${(item.preco * item.quantidade).toFixed(2)}</div>
                <div class="delivery-time">Entrega em até 30 min</div>
            </div>
            <div class="delete-icon" data-id="${item.id}">
                <img src="../assets/icons/delete.svg" alt="Remover">
            </div>
        `;

        // Event listeners para os botões de quantidade
        const decreaseBtn = itemDiv.querySelector('[data-action="decrease"]');
        const increaseBtn = itemDiv.querySelector('[data-action="increase"]');
        const deleteBtn = itemDiv.querySelector('.delete-icon');

        decreaseBtn.addEventListener('click', () => {
            carrinhoManager.alterarQuantidade(item.id, item.quantidade - 1);
        });

        increaseBtn.addEventListener('click', () => {
            carrinhoManager.alterarQuantidade(item.id, item.quantidade + 1);
        });

        deleteBtn.addEventListener('click', () => {
            carrinhoManager.removerItem(item.id);
        });

        return itemDiv;
    }

    renderSummary() {
        const resumo = carrinhoManager.obterResumo();

        // Obter todos os elementos .cart-summary-item
        const summaryItems = document.querySelectorAll('.cart-summary-item');

        // Atualizar subtotal (primeiro .cart-summary-item)
        if (summaryItems[0]) {
            const subtotalElement = summaryItems[0].querySelector('span:last-child');
            if (subtotalElement) {
                subtotalElement.textContent = `R$ ${resumo.subtotal.toFixed(2).replace('.', ',')}`;
            }
        }

        // Atualizar desconto (segundo .cart-summary-item)
        if (summaryItems[1]) {
            const descontoElement = summaryItems[1].querySelector('span:last-child');
            if (descontoElement) {
                descontoElement.textContent = resumo.desconto > 0 ? `-R$ ${resumo.desconto.toFixed(2).replace('.', ',')}` : 'R$ 0,00';
            }
        }

        // Atualizar taxa de entrega (terceiro .cart-summary-item)
        if (summaryItems[2]) {
            const taxaElement = summaryItems[2].querySelector('span:last-child');
            if (taxaElement) {
                taxaElement.textContent = `R$ ${resumo.taxaEntrega.toFixed(2).replace('.', ',')}`;
            }
        }

        // Total
        const totalElement = document.querySelector('.cart-summary-total span:last-child');
        if (totalElement) {
            totalElement.textContent = `R$ ${resumo.total.toFixed(2).replace('.', ',')}`;
        }
    }

    renderAddress() {
        const enderecoElement = document.getElementById('cart-endereco-entrega');
        if (enderecoElement) {
            const endereco = carrinhoManager.obterEndereco();
            enderecoElement.textContent = endereco || 'Endereço não informado';
        }
    }

    applyCoupon() {
        if (!this.couponInput) return;

        const codigo = this.couponInput.value.trim();
        if (!codigo) return;

        const sucesso = carrinhoManager.aplicarCupom(codigo);
        if (sucesso) {
            alert('Cupom aplicado com sucesso!');
            this.couponInput.value = '';
        } else {
            alert('Cupom inválido!');
        }
    }

    finalizeOrder() {
        if (carrinhoManager.estaVazio()) {
            alert('Seu carrinho está vazio!');
            return;
        }

        // Verificar se usuário está logado
        const usuarioLogado = authManager.obterUsuarioLogado();
        if (!usuarioLogado) {
            alert('Você precisa estar logado para finalizar o pedido!');
            // Abrir modal de login
            document.body.classList.add('modal-open-auth');
            return;
        }

        // Verificar endereço
        const endereco = carrinhoManager.obterEndereco();
        if (!endereco) {
            alert('Por favor, informe o endereço de entrega!');
            return;
        }

        // Aqui seria implementada a lógica de finalização do pedido
        // Close cart modal and open payment modal
        this.closeModal();
        desktopPaymentManager.openModal();
    }

    changeAddress() {
        // Implementar mudança de endereço
        const novoEndereco = prompt('Digite o novo endereço de entrega:');
        if (novoEndereco && novoEndereco.trim()) {
            carrinhoManager.alterarEndereco(novoEndereco.trim());
            alert('Endereço alterado com sucesso!');
        }
    }
}

// Instância global do gerenciador do carrinho desktop
const desktopCartManager = new DesktopCartManager();

// Função global para abrir o modal do carrinho
function openCartModal() {
    desktopCartManager.openModal();
}

// Exportar para uso em outros módulos (se necessário)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DesktopCartManager, desktopCartManager };
}
