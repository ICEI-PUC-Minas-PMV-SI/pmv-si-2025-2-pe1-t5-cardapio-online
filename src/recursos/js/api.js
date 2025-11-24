
// API para gerenciamento de produtos usando localStorage
class ProdutoAPI {
  constructor() {
    this.storageKey = 'produtos';
    this.inicializarProdutosPadrao();
  }

  // Inicializar produtos padrão se não houver nenhum
  inicializarProdutosPadrao() {
    const produtosAtuais = this.obterProdutos();
    if (produtosAtuais.length === 0) {
      const produtosPadrao = [
        {
          id: 1,
          nome: "X Bacon",
          descricao: "Hambúrguer com bacon",
          tempo: 20,
          imagem: "../assets/imagen/XBacon.jpg",
          promocao: true,
          rating: 4.8,
          estrelas: "★★★★★",
          categoria: "favoritos,entrega-gratis,promocoes,hamburgueres",
          preco: 32.50
        },
        {
          id: 2,
          nome: "Chicken Burguer",
          descricao: "Hambúrguer de frango",
          tempo: 18,
          imagem: "../assets/imagen/ChickenBurguer.jpg",
          promocao: false,
          rating: 4.6,
          categoria: "favoritos,entrega-gratis,hamburgueres",
          preco: 28.00
        },
        {
          id: 3,
          nome: "Australiano",
          descricao: "Hambúrguer australiano",
          tempo: 22,
          imagem: "../assets/imagen/Australiano.jpg",
          promocao: false,
          rating: 4.9,
          categoria: "favoritos,entrega-gratis,hamburgueres",
          preco: 35.00
        },
        {
          id: 4,
          nome: "Cream Burguer",
          descricao: "Hambúrguer cremoso",
          tempo: 19,
          imagem: "../assets/imagen/CreamBurguer.jpg",
          promocao: false,
          rating: 4.7,
          estrelas: "★★★★☆",
          categoria: "hamburgueres,novidades",
          preco: 30.00
        },
        {
          id: 5,
          nome: "Crispy Burguer",
          descricao: "Hambúrguer crispy",
          tempo: 20,
          imagem: "../assets/imagen/CrispyBurguer.jpg",
          promocao: false,
          rating: 4.6,
          categoria: "hamburgueres,novidades",
          preco: 29.00
        },
        {
          id: 6,
          nome: "X Burguer",
          descricao: "Clássico com queijo",
          tempo: 15,
          imagem: "../assets/imagen/XBurguer.jpg",
          promocao: false,
          rating: 4.5,
          estrelas: "★★★★☆",
          categoria: "hamburgueres",
          preco: 25.00
        },
        {
          id: 7,
          nome: "Cheddar Duplo",
          descricao: "Hambúrguer duplo com cheddar",
          tempo: 24,
          imagem: "../assets/imagen/CheddarDuplo.jpg",
          promocao: false,
          rating: 4.9,
          categoria: "favoritos,hamburgueres",
          preco: 34.00
        },
        {
          id: 8,
          nome: "Artesanal Duplo",
          descricao: "Hambúrguer artesanal duplo",
          tempo: 25,
          imagem: "../assets/imagen/ArtesanalDuplo.jpg",
          promocao: false,
          rating: 4.9,
          estrelas: "★★★★★",
          categoria: "favoritos,hamburgueres",
          preco: 38.00
        },
        {
          id: 9,
          nome: "Água",
          descricao: "Bebida refrescante",
          tempo: 5,
          imagem: "../assets/imagen/Agua.jpg",
          promocao: false,
          rating: 4.5,
          categoria: "bebidas",
          preco: 3.00
        },
        {
          id: 10,
          nome: "Coca-Cola",
          descricao: "Refrigerante clássico",
          tempo: 5,
          imagem: "../assets/imagen/Coca.jpg",
          promocao: false,
          rating: 4.5,
          categoria: "bebidas",
          preco: 5.00
        },
        {
          id: 11,
          nome: "Sprite",
          descricao: "Refrigerante limão",
          tempo: 5,
          imagem: "../assets/imagen/Sprite.jpg",
          promocao: false,
          rating: 4.5,
          categoria: "bebidas",
          preco: 5.00
        },
        {
          id: 12,
          nome: "Suco de Laranja",
          descricao: "Suco natural",
          tempo: 5,
          imagem: "../assets/imagen/SucoLaranja.jpg",
          promocao: false,
          rating: 4.5,
          estrelas: "★★★★☆",
          categoria: "bebidas,favoritos",
          preco: 6.00
        },
        {
          id: 13,
          nome: "Suco de Melancia",
          descricao: "Suco natural",
          tempo: 5,
          imagem: "../assets/imagen/SucoMelancia.jpg",
          promocao: false,
          rating: 4.5,
          categoria: "bebidas,favoritos",
          preco: 6.00
        }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(produtosPadrao));
    }
  }

  // Salvar produto
  salvarProduto(produto) {
    const produtos = this.obterProdutos();
    produto.id = Date.now(); // ensure unique id
    produtos.push(produto);
    localStorage.setItem(this.storageKey, JSON.stringify(produtos));
  }

  // Obter todos os produtos
  obterProdutos() {
    const produtos = localStorage.getItem(this.storageKey);
    return produtos ? JSON.parse(produtos) : [];
  }

  // Atualizar produto
  atualizarProduto(id, produtoAtualizado) {
    const produtos = this.obterProdutos();
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
      produtos[index] = { ...produtos[index], ...produtoAtualizado };
      localStorage.setItem(this.storageKey, JSON.stringify(produtos));
    }
  }

  // Deletar produto
  deletarProduto(id) {
    const produtos = this.obterProdutos();
    const filtrados = produtos.filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtrados));
  }
}

// Instância global
const produtoAPI = new ProdutoAPI();
