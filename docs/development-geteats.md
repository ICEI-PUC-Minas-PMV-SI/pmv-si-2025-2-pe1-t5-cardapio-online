# Programação de Funcionalidades

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do Requisito | Responsável | Artefato Criado |
|------|------------------------|------------|-----------------|
|RF-001| A aplicação deve permitir que o administrador gerencie o cardápio, incluindo adição, edição e remoção de produtos | Equipe Get Eats | admin-cardapio.html, addprodutoADM.html, api.js (ProdutoAPI), admin.js |
|RF-002| A aplicação deve permitir que os clientes naveguem pelos produtos organizados por categorias | Equipe Get Eats | cardapio.html, index.html, páginas individuais de produtos (batatafrita.html, gua.html, etc.) |
|RF-003| A aplicação deve permitir que os clientes adicionem produtos ao carrinho de compras e gerenciem pedidos | Equipe Get Eats | carrinho.js (CarrinhoManager), desktop-cart.js |
|RF-004| A aplicação deve permitir autenticação de usuários e administradores | Equipe Get Eats | auth.js, loginADM.js, desktop-auth.js |
|RF-005| A aplicação deve permitir que os clientes façam pedidos com diferentes formas de pagamento | Equipe Get Eats | desktop-payment.js, modal de pagamento em cardapio.html |
|RF-006| A aplicação deve permitir acompanhamento de pedidos em tempo real | Equipe Get Eats | desktop-order-tracking.js, modal de rastreamento |
|RF-007| A aplicação deve permitir que os clientes visualizem histórico de pedidos | Equipe Get Eats | desktop-pedidos.js, modal de pedidos |
|RF-008| A aplicação deve oferecer interface responsiva para diferentes dispositivos | Equipe Get Eats | CSS responsivo em todos os arquivos HTML, breakpoints para mobile/tablet/desktop |

## Descrição das estruturas:

## Produto
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Id             | Numero (Inteiro)  | Identificador único do produto            | 1                                              |
| Nome           | Texto             | Nome do produto                           | X Bacon                                        |
| Descrição      | Texto             | Descrição detalhada do produto            | Hambúrguer com bacon                           |
| Preço          | Numero (Decimal)  | Preço do produto em reais                 | 32.50                                          |
| Categoria      | Texto             | Categoria do produto (ex: hamburgueres, bebidas) | hamburgueres                                   |
| Tempo          | Numero (Inteiro)  | Tempo de preparo em minutos               | 20                                             |
| Imagem         | Texto (URL)       | Caminho ou URL da imagem do produto       | ../assets/img/XBacon.jpg                    |
| Promoção       | Booleano          | Indica se o produto está em promoção      | true                                           |
| Rating         | Numero (Decimal)  | Avaliação média do produto                | 4.8                                            |
| Estrelas       | Texto             | Representação visual das estrelas         | ★★★★☆                                          |

## Carrinho
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Itens          | Array de Objetos  | Lista de itens no carrinho                | [{id: 1, nome: "X Bacon", preco: 32.50, quantidade: 2, ...}] |
| Cupom          | Texto             | Código do cupom aplicado                  | cupom5                                         |
| Endereço       | Texto             | Endereço de entrega                       | Rua das Flores, 123                            |
| Subtotal       | Numero (Decimal)  | Soma dos preços dos itens                 | 65.00                                          |
| Desconto       | Numero (Decimal)  | Valor do desconto aplicado                | 5.00                                           |
| TaxaEntrega    | Numero (Decimal)  | Taxa de entrega fixa                      | 5.00                                           |
| Total          | Numero (Decimal)  | Valor total do pedido                     | 65.00                                          |

## Usuário
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Nome           | Texto             | Nome completo do usuário                  | João Silva                                     |
| Email          | Texto             | Email do usuário                          | joao@email.com                                 |
| CPF            | Texto             | CPF do usuário                            | 123.456.789-00                                 |
| Contato        | Texto             | Número de telefone                        | (11) 99999-9999                                |
| Endereço       | Texto             | Endereço de entrega                       | Rua das Flores, 123                            |
| Senha          | Texto             | Senha criptografada                       | hash_senha                                     |

## Pedido
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Numero         | Texto             | Número único do pedido                    | #123456                                        |
| Data           | Data              | Data e hora do pedido                     | 2024-01-15 14:30                               |
| Status         | Texto             | Status atual do pedido                    | Preparando                                     |
| Itens          | Array de Objetos  | Produtos do pedido                        | [{nome: "X Bacon", quantidade: 2, preco: 32.50}] |
| Total          | Numero (Decimal)  | Valor total do pedido                     | 65.00                                          |
| Endereco       | Texto             | Endereço de entrega                       | Rua das Flores, 123                            |
| TempoEstimado  | Texto             | Tempo estimado de entrega                 | 30-45 minutos                                  |

## Instruções para Acesso e Verificação

1. **Gerenciamento Administrativo:**
   - Acesse `src/index.html` para iniciar a aplicação
   - Para área administrativa: navegue para login admin ou use credenciais padrão (adm / adm)
   - Em `admin-cardapio.html`: gerencie produtos existentes, adicione novos via "Adicionar", visualize promoções
   - Verifique persistência no localStorage através do console do navegador

2. **Navegação do Cliente:**
   - Acesse `src/paginas/cardapio.html` diretamente ou via fluxo
   - Navegue por categorias usando as abas superiores
   - Use barra de busca para filtrar produtos
   - Clique em produtos individuais para ver detalhes

3. **Sistema de Carrinho:**
   - Em qualquer página de produto, clique em "Adicionar" para incluir no carrinho
   - Ícone flutuante do carrinho mostra contador de itens
   - Modal do carrinho permite alterar quantidades, aplicar cupons, alterar endereço
   - Sistema calcula subtotal, descontos e total

4. **Autenticação e Perfil:**
   - Modal de login/cadastro acessível via ícone de perfil (desktop) ou página dedicada (mobile)
   - Após login, acesse perfil para editar dados pessoais e senha
   - Dados persistidos por usuário no localStorage

5. **Processo de Pedido:**
   - No carrinho, clique "Finalizar Pedido" para acessar pagamento
   - Opções: PIX ou cartão de crédito (simulado)
   - Após confirmação, modal de sucesso mostra número do pedido
   - Acompanhe pedido em tempo real via modal de rastreamento

6. **Responsividade:**
   - Teste em diferentes larguras de tela:
     - Mobile: < 768px 
     - Tablet: 768px - 1024px (grid 2)
     - Desktop: > 1024px (modais, grid 3,4)

A implementação utiliza localStorage para persistência completa, permitindo funcionamento offline. Todas as funcionalidades estão integradas e funcionais no ambiente de desenvolvimento local, com interface responsiva e experiência consistente em dispositivos móveis, tablets e desktops.
