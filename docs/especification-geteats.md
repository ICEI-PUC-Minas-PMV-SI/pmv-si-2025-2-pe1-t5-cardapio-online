# Especificações do Projeto

Este documento apresenta as especificações do projeto "Get Eats", um sistema de delivery online desenvolvido para o restaurante Burguer House. A partir da perspectiva do usuário, aborda a definição do problema enfrentado por restaurantes tradicionais na adaptação às tecnologias digitais e a proposta de solução através de uma plataforma web completa para gerenciamento de pedidos.

O documento é estruturado em torno de quatro componentes principais: personas (perfis detalhados dos usuários ideais), histórias de usuários (funcionalidades desejadas expressas em linguagem natural), requisitos funcionais e não funcionais (especificações técnicas detalhadas), e restrições do projeto (limitações que orientam o desenvolvimento).

No projeto "Get Eats", utilizou-se análise de personas baseada em pesquisa de público-alvo, elicitação de histórias de usuários através de mapeamento de empatia e análise de stakeholders, além da definição sistemática de requisitos funcionais e não funcionais derivados diretamente das necessidades identificadas junto aos usuários finais e administradores do sistema.

## Personas

Com base na análise do público-alvo do "Get Eats", foram identificadas as seguintes personas que representam os usuários ideais da solução:

**Persona 1 - João, 28 anos, Profissional Liberal:**
João trabalha em um escritório e tem pouco tempo para cozinhar. Ele usa o "Get Eats" durante o almoço para pedir hambúrgueres da "Burguer House" enquanto trabalha. Valoriza rapidez na entrega e facilidade de personalização do pedido. João é solteiro, mora sozinho em um apartamento no centro da cidade, utiliza smartphone diariamente para compras online e prefere aplicativos intuitivos com entrega rápida.

**Persona 2 - Maria, 32 anos, Mãe de Família:**
Maria coordena a rotina da família e usa o app para fazer pedidos semanais. Prefere navegar por categorias e ter histórico de pedidos para repetir compras. Maria é casada, tem dois filhos pequenos, trabalha meio período e busca conveniência para refeições rápidas. Ela valoriza interfaces amigáveis, opções de personalização e promoções familiares.

**Persona 3 - Carlos, 45 anos, Proprietário da Burguer House:**
Carlos gerencia o restaurante e precisa atualizar o cardápio diariamente. Usa o painel administrativo para controle e análise de vendas. Carlos é empresário experiente, focado em eficiência operacional e crescimento do negócio. Ele tem conhecimentos básicos de tecnologia e busca ferramentas que simplifiquem a gestão diária do restaurante.

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários, agrupadas por contexto (Administrador e Cliente):

### Contexto: Administrador

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Carlos (Proprietário da Burguer House) | Gerenciar o cardápio completo, incluindo adição, edição e remoção de produtos | Simplificar a gestão diária do restaurante e manter o cardápio atualizado |
|Carlos (Proprietário da Burguer House) | Autenticar-me como administrador | Garantir acesso seguro ao painel administrativo e proteger dados do negócio |

### Contexto: Cliente

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|João (Profissional Liberal) | Navegar pelos produtos organizados por categorias | Encontrar rapidamente hambúrgueres e fazer pedidos durante o almoço |
|João (Profissional Liberal) | Adicionar produtos ao carrinho e gerenciar pedidos | Personalizar meu pedido e finalizar compra rapidamente |
|João (Profissional Liberal) | Fazer pedidos com diferentes formas de pagamento | Escolher a opção mais conveniente (PIX ou cartão) |
|João (Profissional Liberal) | Acompanhar pedidos em tempo real | Saber quando meu pedido estará pronto e acompanhar a entrega |
|João (Profissional Liberal) | Visualizar histórico de pedidos | Repetir pedidos anteriores facilmente |
|João (Profissional Liberal) | Usar interface responsiva em meu smartphone | Fazer pedidos de qualquer lugar sem dificuldades |
|João (Profissional Liberal) | Autenticar-me como usuário | Salvar meus dados e ter experiência personalizada |
|Maria (Mãe de Família) | Navegar por categorias e ver histórico de pedidos | Facilitar compras semanais e repetir pedidos familiares |
|Maria (Mãe de Família) | Adicionar produtos ao carrinho com personalização | Atender às preferências de toda a família |
|Maria (Mãe de Família) | Usar interface intuitiva e responsiva | Fazer pedidos rapidamente mesmo com filhos por perto |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

## Requisitos

As tabelas que seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| A aplicação deve permitir que o administrador gerencie o cardápio, incluindo adição, edição e remoção de produtos | ALTA |
|RF-002| A aplicação deve permitir que os clientes naveguem pelos produtos organizados por categorias | ALTA |
|RF-003| A aplicação deve permitir que os clientes adicionem produtos ao carrinho de compras e gerenciem pedidos | ALTA |
|RF-004| A aplicação deve permitir autenticação de usuários e administradores | ALTA |
|RF-005| A aplicação deve permitir que os clientes façam pedidos com diferentes formas de pagamento | MÉDIA |
|RF-006| A aplicação deve permitir acompanhamento de pedidos em tempo real | MÉDIA |
|RF-007| A aplicação deve permitir que os clientes visualizem histórico de pedidos | MÉDIA |
|RF-008| A aplicação deve oferecer interface responsiva para diferentes dispositivos | ALTA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A aplicação deve ser responsiva para dispositivos móveis, tablets e desktops | ALTA |
|RNF-002| A aplicação deve processar requisições do usuário em no máximo 3 segundos | BAIXA |
|RNF-003| A aplicação deve ser acessível e intuitiva para usuários com diferentes níveis de familiaridade tecnológica | MÉDIA |
|RNF-004| A aplicação deve manter a consistência visual e de navegação em todas as páginas | MÉDIA |


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend - a aplicação deve funcionar apenas com frontend e localStorage |
|03| A aplicação deve ser desenvolvida utilizando tecnologias web padrão (HTML, CSS, JavaScript) |
|04| O projeto deve ser compatível com navegadores modernos sem necessidade de instalação de software adicional |
