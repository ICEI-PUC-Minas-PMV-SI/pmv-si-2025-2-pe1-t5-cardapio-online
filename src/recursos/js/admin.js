// Gerenciador de administração para produtos

class AdminManager {
  constructor() {
    this.productsContainer = null;
    this.allProducts = [];
  }

  // Carregar produtos na interface de administração
  carregarProdutosAdmin() {
    this.productsContainer = document.getElementById('products-container');
    this.allProducts = produtoAPI.obterProdutos();
    this.renderProdutos(this.allProducts);
  }

  // Renderizar produtos
  renderProdutos(produtos) {
    this.productsContainer.innerHTML = '';
    produtos.forEach(produto => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.onclick = () => this.editarProduto(produto.id);
      productCard.innerHTML = `
        ${produto.promocao ? `<div class="discount-badge">
          <img src="../assets/icons/Percent.svg" alt="Percent" class="percent-icon">
          Promoção
        </div>` : ''}
        <div class="image" style="background-image: url('${produto.imagem}');"></div>
        <div class="details">
          <div class="title">${produto.nome}</div>
          <div class="subtitle">${produto.descricao} • ${produto.tempo} min</div>
          <div class="rating"> <span class="stars">${this.getStars(produto.rating)}</span> ${produto.rating.toFixed(1)} </div>
        </div>
        <button class="add-btn-tablet" onclick="event.stopPropagation(); adminManager.editarProduto(${produto.id})">Editar</button>
        <div class="add-btn" onclick="event.stopPropagation(); adminManager.deletarProduto(${produto.id})"><img src="../assets/icons/Delete.svg" alt="Delete"></div>
      `;
      this.productsContainer.appendChild(productCard);
    });
  }

  // Obter estrelas
  getStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? '☆' : '';
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return '★'.repeat(fullStars) + halfStar + '☆'.repeat(emptyStars);
  }

  // Filtrar produtos
  filtrarProdutos(searchTerm, filter = '') {
    let filtered = this.allProducts;
    if (searchTerm) {
      filtered = filtered.filter(p => p.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (filter === 'promocao') {
      filtered = filtered.filter(p => p.promocao);
    }
    this.renderProdutos(filtered);
  }

  // Editar produto
  editarProduto(id) {
    window.location.href = `editprodutoADM.html?id=${id}`;
  }

  // Deletar produto
  deletarProduto(id) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      produtoAPI.deletarProduto(id);
      this.carregarProdutosAdmin();
    }
  }
}

// Instância global
const adminManager = new AdminManager();
