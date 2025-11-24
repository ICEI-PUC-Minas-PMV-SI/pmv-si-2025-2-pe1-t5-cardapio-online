# Instruções de utilização

## Instalação do Site

O site Get Eats é um projeto estático desenvolvido em HTML, CSS e JavaScript, utilizando localStorage para persistência de dados. Não requer instalação de dependências ou servidor backend.

### Como executar:
1. Clone ou baixe o repositório do projeto.
2. Abra o arquivo `src/index.html` em um navegador web moderno (Chrome, Firefox, Edge, etc.).
3. Para uma experiência completa, execute um servidor local simples para evitar restrições de CORS ao carregar recursos:
   - Instale o Node.js se necessário.
   - Execute `npx http-server src` no diretório raiz do projeto e acesse `http://localhost:8080`.
   - Alternativamente, use extensões como "Live Server" no VS Code.

O site funcionará offline após o carregamento inicial, pois utiliza localStorage para armazenar dados de usuários, produtos e pedidos.

## Navegação e Funcionalidades

### Para Clientes:
1. **Página Inicial**: Acesse `src/index.html` para login ou navegação como convidado.
2. **Cardápio**: Navegue por categorias (hambúrgueres, bebidas, etc.) e use a barra de busca para filtrar produtos.
3. **Detalhes do Produto**: Clique em um produto para ver descrição, preço e adicionar ao carrinho.
4. **Carrinho de Compras**: Ícone flutuante mostra itens; modal permite editar quantidades, aplicar cupons e alterar endereço.
5. **Pagamento**: Opções de PIX ou cartão de crédito (simulado); confirme para gerar pedido.
6. **Acompanhamento**: Modal de rastreamento mostra status em tempo real (Preparando, Pronto, Em Entrega).
7. **Histórico de Pedidos**: Acesse via perfil para ver pedidos anteriores.
8. **Autenticação**: Login/cadastro via modal; dados salvos no localStorage.

### Para Administradores:
1. **Login Admin**: Acesse `src/admin.html` com credenciais padrão (adm / adm).
2. **Gerenciamento de Cardápio**: Em `admin-cardapio.html`, adicione, edite ou remova produtos; visualize promoções.
3. **Adicionar Produto**: Use `addprodutoADM.html` para novos itens com imagem, preço, categoria, etc.
4. **Estatísticas**: `estatisticasADM.html` mostra métricas de vendas e pedidos.
5. **Splash Admin**: Tela inicial do painel administrativo.

### Responsividade:
- **Mobile**: Interface otimizada para telas < 768px. (Otimização crítica apenas em dimensionamento 430x932 (Iphone 14 pro max))
- **Tablet**: Grid de 2 colunas para 768px - 1024px.(Otimização crítica apenas em dimensionamento 768x1024 (Ipad mini))
- **Desktop**: Modais e grid de 3-4 colunas para > 1024px.

Todas as funcionalidades são persistidas via localStorage, permitindo uso offline.

