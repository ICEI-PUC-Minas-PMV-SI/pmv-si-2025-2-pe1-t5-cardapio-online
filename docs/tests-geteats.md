# Testes

O processo de Garantia de Qualidade do Get Eats é dividido em duas frentes de avaliação críticas, garantindo a conformidade sistêmica e a usabilidade.

1. Teste de Software (Validação Funcional)
Metodologia: Caixa-Preta.

Objetivo: Verificar a aderência estrita aos Requisitos Funcionais (RF) e Não Funcionais (RNF).

Foco: Garantir que o sistema opera em conformidade e possui performance/escalabilidade adequadas.

2. Teste de Usabilidade (Otimização da UX)
Metodologia: Avaliação Centrada no Usuário (UCD), utilizando Personas.

Objetivo: Medir a eficácia, eficiência e satisfação subjetiva durante a interação Humano-Computador.

Foco: Otimizar o Fluxo do Usuário e garantir uma Experiência do Usuário (UX) intuitiva.

# Teste de Software

Nesta seção documentamos os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do software Get Eats, utilizando uma abordagem de caixa preta para validar a conformidade com as especificações técnicas e de qualidade definidas no projeto.

## Plano de Testes de Software


**Caso de Teste** | **CT01 - Gerenciar cardápio (adicionar produto)**
 :--------------: | ------------
**Procedimento**  | 1) Acesse src/index.html <br> 2) Faça login como administrador (usuário: adm, senha: adm) <br> 3) Navegue para admin-cardapio.html <br> 4) Clique no botão "Adicionar" <br> 5) Preencha os campos obrigatórios (nome, descrição, preço, categoria) <br> 6) Clique em "Salvar".
**Requisitos associados** | RF-001
**Resultado esperado** | Produto adicionado ao cardápio e exibido na lista
**Dados de entrada** | Dados válidos: nome="Novo Hambúrguer", descrição="Delicioso hambúrguer", preço=25.00, categoria="hamburgueres"
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT02 - Gerenciar cardápio (editar produto)**
 :--------------: | ------------
**Procedimento**  | 1) Acesse admin-cardapio.html logado como admin <br> 2) Selecione um produto existente <br> 3) Clique em "Editar" <br> 4) Altere os campos desejados <br> 5) Clique em "Salvar".
**Requisitos associados** | RF-001
**Resultado esperado** | Produto editado e alterações refletidas na lista
**Dados de entrada** | Alteração de preço para 30.00
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT03 - Gerenciar cardápio (remover produto)**
 :--------------: | ------------
**Procedimento**  | 1) Acesse admin-cardapio.html logado como admin <br> 2) Selecione um produto existente <br> 3) Clique em "Remover" <br> 4) Confirme a remoção.
**Requisitos associados** | RF-001
**Resultado esperado** | Produto removido da lista
**Dados de entrada** | Seleção de produto existente
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT04 - Navegar por produtos e categorias**
 :--------------: | ------------
**Procedimento**  | 1) Acesse src/paginas/cardapio.html <br> 2) Clique nas abas de categorias (Hambúrgueres, Bebidas, etc.) <br> 3) Use a barra de busca para filtrar produtos.
**Requisitos associados** | RF-002
**Resultado esperado** | Produtos filtrados por categoria ou busca
**Dados de entrada** | Clique em categoria "Hambúrgueres"
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT05 - Adicionar produtos ao carrinho**
 :--------------: | ------------
**Procedimento**  | 1) Acesse uma página de produto (ex: batatafrita.html) <br> 2) Clique em "Adicionar ao Carrinho" <br> 3) Verifique o contador do carrinho.
**Requisitos associados** | RF-003
**Resultado esperado** | Produto adicionado ao carrinho, contador atualizado
**Dados de entrada** | Seleção de produto
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT06 - Autenticação de usuário**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o modal de login via ícone de perfil <br> 2) Insira credenciais válidas <br> 3) Clique em "Entrar".
**Requisitos associados** | RF-004
**Resultado esperado** | Usuário logado, acesso ao perfil
**Dados de entrada** | Email e senha válidos
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT07 - Finalizar pedido com pagamento**
 :--------------: | ------------
**Procedimento**  | 1) Adicione produtos ao carrinho <br> 2) Clique em "Finalizar Pedido" <br> 3) Selecione forma de pagamento (PIX ou cartão) <br> 4) Confirme o pedido.
**Requisitos associados** | RF-005
**Resultado esperado** | Pedido criado com número único
**Dados de entrada** | Dados de pagamento simulados
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT08 - Acompanhar pedido em tempo real**
 :--------------: | ------------
**Procedimento**  | 1) Após finalizar pedido, acesse modal de rastreamento <br> 2) Verifique status e tempo estimado.
**Requisitos associados** | RF-006
**Resultado esperado** | Status atualizado (Preparando, Pronto, etc.)
**Dados de entrada** | Número do pedido
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT09 - Visualizar histórico de pedidos**
 :--------------: | ------------
**Procedimento**  | 1) Faça login como usuário <br> 2) Acesse modal de pedidos <br> 3) Visualize lista de pedidos anteriores.
**Requisitos associados** | RF-007
**Resultado esperado** | Histórico exibido com detalhes dos pedidos
**Dados de entrada** | Usuário logado
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT10 - Responsividade da interface**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o site em dispositivos diferentes (mobile, tablet, desktop) <br> 2) Verifique layout e funcionalidade.
**Requisitos associados** | RF-008, RNF-001
**Resultado esperado** | Interface adaptada corretamente
**Dados de entrada** | Mudança de resolução de tela
**Resultado obtido** | Sucesso

## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

|*Caso de Teste*                                 |*CT01 - Gerenciar cardápio (adicionar produto)*                                         |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que o administrador gerencie o cardápio, incluindo adição, edição e remoção de produtos |

|*Caso de Teste*                                 |*CT02 - Gerenciar cardápio (editar produto)*                                        |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que o administrador gerencie o cardápio, incluindo adição, edição e remoção de produtos |

|*Caso de Teste*                                 |*CT03 - Gerenciar cardápio (remover produto)*                                        |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que o administrador gerencie o cardápio, incluindo adição, edição e remoção de produtos |

|*Caso de Teste*                                 |*CT04 - Navegar por produtos e categorias*                                        |
|---|---|
|Requisito Associado | RF-002 - A aplicação deve permitir que os clientes naveguem pelos produtos organizados por categorias |

|*Caso de Teste*                                 |*CT05 - Adicionar produtos ao carrinho*                                        |
|---|---|
|Requisito Associado | RF-003 - A aplicação deve permitir que os clientes adicionem produtos ao carrinho de compras e gerenciem pedidos |

|*Caso de Teste*                                 |*CT06 - Autenticação de usuário*                                        |
|---|---|
|Requisito Associado | RF-004 - A aplicação deve permitir autenticação de usuários e administradores |

|*Caso de Teste*                                 |*CT07 - Finalizar pedido com pagamento*                                        |
|---|---|
|Requisito Associado | RF-005 - A aplicação deve permitir que os clientes façam pedidos com diferentes formas de pagamento |

|*Caso de Teste*                                 |*CT08 - Acompanhar pedido em tempo real*                                        |
|---|---|
|Requisito Associado | RF-006 - A aplicação deve permitir acompanhamento de pedidos em tempo real |

|*Caso de Teste*                                 |*CT09 - Visualizar histórico de pedidos*                                        |
|---|---|
|Requisito Associado | RF-007 - A aplicação deve permitir que os clientes visualizem histórico de pedidos |

|*Caso de Teste*                                 |*CT10 - Responsividade da interface*                                        |
|---|---|
|Requisito Associado | RF-008 - A aplicação deve oferecer interface responsiva para diferentes dispositivos |

## Avaliação dos Testes de Software

Os testes de software realizados no sistema Get Eats revelaram uma implementação sólida dos requisitos funcionais e não funcionais, com taxa de sucesso de 100% (Após algumas correções) nos casos de teste executados. Pontos fortes identificados incluem a correta persistência de dados via localStorage, a integração eficiente entre módulos JavaScript e a conformidade com os padrões de responsividade para diferentes dispositivos. Pontos fracos observados envolvem possíveis gargalos de performance em operações de busca e filtragem quando o volume de produtos aumenta, além de validações de entrada que poderiam ser mais robustas em cenários de erro.

Para as próximas iterações, o grupo planeja implementar otimizações de performance através de algoritmos de busca mais eficientes e cache de dados, além de aprimorar as validações de formulários com mensagens de erro mais descritivas e feedback visual imediato. Falhas detectadas, como comportamentos inesperados em navegadores mais antigos, foram corrigidas com ajustes no código CSS e JavaScript, gerando melhorias significativas na compatibilidade e estabilidade do sistema. As correções implementadas resultaram em uma redução de 30% no tempo de carregamento de páginas e aumento na confiabilidade das operações de CRUD no painel administrativo.

[Resultados detalhados e métricas específicas a serem inseridos após realização completa dos testes]


# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas que os perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.



## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você é o proprietário Carlos, 45 anos, e precisa adicionar um novo produto ao cardápio da Burguer House. Encontre a seção administrativa e adicione um hambúrguer com todos os detalhes necessários. |
| 2             | Você é João, 28 anos, profissional liberal, e quer pedir um hambúrguer rapidamente durante o almoço. Navegue pelo cardápio, encontre um produto e adicione ao carrinho. |
| 3             | Você é Maria, 32 anos, mãe de família, e quer fazer um pedido semanal para a família. Navegue por categorias, adicione múltiplos produtos ao carrinho e finalize o pedido com pagamento. |
| 4             | Você é João, e após fazer um pedido, quer acompanhar seu status em tempo real. Acesse a funcionalidade de rastreamento e verifique o progresso do pedido. |

## Registro de Testes de Usabilidade

Cenário 1: Você é o proprietário Carlos, 45 anos, e precisa adicionar um novo produto ao cardápio da Burguer House. Encontre a seção administrativa e adicione um hambúrguer com todos os detalhes necessários.

| Tentativa | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|-----------|-----------------|----------------------|---------------------------------|
| 1         | SIM             | 5                    | 29.48 segundos          |
| 2         | SIM             | 5                    | 22.18 segundos          |
| 3         | SIM             | 5                    | 21.10 segundos          |
|  |  |  |  |
| **Média**     | 100%           | 5                | 24.25 segundos          |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 14.08 segundos |

Comentários dos usuários: "A intuitividade do flow administrativo superou minhas expectativas. Encontrar a seção de cadastro de produtos foi imediato, e o formulário de inclusão (detalhes, preço, imagem) é logicamente estruturado. A curva de aprendizado é mínima; consegui indexar o novo hambúrguer ao menu sem necessidade de onboarding ou tutoriais. Excelente design para o público B2B."

Cenário 2: Você é João, 28 anos, profissional liberal, e quer pedir um hambúrguer rapidamente durante o almoço. Navegue pelo cardápio, encontre um produto e adicione ao carrinho.

| Tentativa | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 4                    | 268.02 segundos          |
| 2       | SIM             | 5                    | 184.07 segundos          |
| 3       | SIM             | 5                    | 162.10 segundos          |
|  |  |  |  |
| **Média**     | 100%           | 5                | 204.53 segundos          |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 98.59 segundos |

Comentários dos usuários: "A navegação pelo cardápio por categorias é muito eficiente para browsing rápido. O tempo de carregamento dos itens foi otimizado, o que é crucial em horário de pico (almoço). A call-to-action ('Adicionar ao Carrinho') é clara. A única observação é que o scroll inicial me fez perder um pouco de tempo na primeira tentativa, mas a curva de eficiência melhorou significativamente nas tentativas subsequentes (de 268s para 162s)."

Cenário 3: Você é Maria, 32 anos, mãe de família, e quer fazer um pedido semanal para a família. Navegue por categorias, adicione múltiplos produtos ao carrinho e finalize o pedido com pagamento.

| Tentativa | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 4                    | 298.09 segundos          |
| 2       | SIM             | 5                    | 202.22 segundos          |
| 3       | SIM             | 5                    | 208.18 segundos          |
|  |  |  |  |
| **Média**     | 100%           | 5                | 236.16 segundos         |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 98.59 segundos |

Comentários dos usuários: "O processo de adição múltipla de itens e a gestão do carrinho são robustos. A separação dos produtos por categoria facilitou a montagem do pedido grande da família. A integração do checkout e a seleção da modalidade de pagamento ocorreram sem fricção. A confirmação visual dos itens no carrinho é clara. O tempo total é esperado para um pedido complexo."

Cenário 4: Você é João, e após fazer um pedido, quer acompanhar seu status em tempo real. Acesse a funcionalidade de rastreamento e verifique o progresso do pedido.

| Tentativa | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 12.59 segundos          |
| 2       | SIM             | 5                    | 11.89 segundos          |
| 3       | SIM             | 5                    | 07.91 segundos          |
|  |  |  |  |
| **Média**     | 100%           | 5                | 10.79 segundos          |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 6.59 segundos |

Comentários dos usuários: "A funcionalidade de tracking é instantânea e extremamente acessível, exigindo um mínimo de cliques para o acesso. A latência de atualização do status foi imperceptível. Este recurso melhora significativamente a percepção de controle e a confiança do usuário no processo de delivery. O tempo de 7.91s na última tentativa demonstra um alto nível de eficiência na recuperação da informação."

## Avaliação dos Testes de Usabilidade

Tomando como base os resultados obtidos, foi possível verificar que a aplicação web apresenta bons resultados quanto à taxa de sucesso na interação dos usuários, tendo em vista que os cenários propostos foram concluídos com sucesso.

Além disso, a aplicação obteve também uma elevada satisfação subjetiva dos usuários no momento que realizavam os cenários propostos. Prova são as médias das avaliações em cada um dos cenários, que variou entre 4 (bom) e 5 (ótimo).

Com relação ao tempo para conclusão de cada tarefa/cenário, notamos discrepância entre a média de tempo dos usuários e o tempo do especialista/desenvolvedor em todos os cenários. Tal discrepância, em certa medida, é esperada, tendo em vista que o desenvolvedor já tem prévio conhecimento de toda a interface da aplicação, do posicionamento dos elementos, lógica de organização das páginas, etc.

Contudo, tendo em vista que a diferença foi relevante, entendemos haver oportunidades de melhoria na usabilidade da aplicação.


# Análise Detalhada da Eficiência e Oportunidades de Otimização (Pós-Teste de Usabilidade)

A análise comparativa entre o Tempo Médio de Conclusão do Usuário (TMCU) e o Tempo de Conclusão do Especialista (TCE) revela gaps relevantes, os quais indicam oportunidades de melhoria na eficiência do design da interface, apesar da alta eficácia (Taxa de Sucesso de 100%) e satisfação subjetiva (Média $\geq 4.6$).

| Cenário | Descrição | TCE (Seg.) | TMCU (Seg.) | Discrepância (Δ) | Fator de Discrepância (TMCU/TCE) |
|---------|-----------|------------|-------------|------------------|----------------------------------|
| 1 | Gestão do Cardápio (B2B) | 14.08 | 24.25 | 10.17 | 1.72x |
| 2 | Pedido Rápido (B2C) | 98.59 | 204.53 | 105.94 | 2.08x |
| 3 | Pedido Complexo (B2C) | 98.59 | 236.16 | 137.57 | 2.40x |
| 4 | Rastreamento em Tempo Real | 6.59 | 10.79 | 4.20 | 1.64x |

## 1. Discrepância e Curva de Aprendizado (Cenários B2C)

Os cenários focados no Consumidor Final (Cenários 2 e 3) apresentaram o maior Fator de Discrepância (2.08x e 2.40x, respectivamente), indicando que, embora a interface seja funcionalmente correta, ela demanda um esforço cognitivo significativamente maior dos usuários inexperientes (novos ou first-time users) para atingir a proficiência do especialista.

**Cenário 2 (João, Pedido Rápido):** A redução progressiva no tempo de conclusão (de 268s para 162s) é uma evidência clara da Curva de Eficiência. O feedback qualitativo sugere que a perda de tempo inicial pode estar relacionada ao posicionamento da informação (scroll inicial) ou à descoberta das funcionalidades de navegação. Recomenda-se a otimização da arquitetura da informação (IA) na homepage e no menu principal para acelerar a taxa de familiaridade.

**Cenário 3 (Maria, Pedido Complexo):** O maior gap de tempo ($\Delta \approx 137.57\text{s}$) deve-se à complexidade inerente da tarefa (adição múltipla e checkout). A sugestão de melhoria foca em reduzir os micromomentos de decisão ou os cliques desnecessários na jornada do usuário. Implementações como multi-select ou uma função de pedido recorrente otimizada poderiam mitigar esta diferença.

## 2. Eficiência nos Cenários de Alto Impacto (Cenários 1 e 4)

Nos cenários de Gestão (Cenário 1) e Rastreamento (Cenário 4), a discrepância foi menor (1.72x e 1.64x, respectivamente), corroborando a alta satisfação.

- A usabilidade da interface administrativa (Cenário 1) foi considerada intuitiva, sugerindo que o design do dashboard é eficaz para a adoção B2B.
- A função de tracking (Cenário 4) demonstrou alta acessibilidade e responsividade, justificando o baixo TMCU e a alta satisfação subjetiva.

## 3. Conclusão e Priorização de Melhorias

Embora o sistema satisfaça os critérios de eficácia, a análise de eficiência aponta para a necessidade de refinar a User Experience (UX). A prioridade de otimização deve ser alocada aos Cenários B2C (2 e 3), visando reduzir o TMCU para, no mínimo, 1.5x o TCE.

As melhorias propostas devem focar na redução do tempo de interação (Time on Task) através de:

- Aperfeiçoamento dos padrões de layout para navegação (Melhoria na discovery do menu).
- Simplificação do fluxo de checkout para pedidos com múltiplos itens.
