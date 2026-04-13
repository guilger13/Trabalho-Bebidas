# Trabalho-Bebidas
                                 🍹 Gestor de Drinks 
Um gestor de coquetéis moderno que permite buscar receitas da API pública TheCocktailDB, visualizar detalhes e gerenciar uma lista personalizada de favoritos utilizando o armazenamento local do navegador.

                                 🚀 Funcionalidades
Busca em Tempo Real: Pesquisa de bebidas pelo nome integrando com API externa.

Sugestões Inteligentes: Carregamento automático de sugestões na página inicial.

Sistema de Favoritos: Salva seus drinks preferidos no localStorage para persistência de dados.

Interface Responsiva: Layout elegante com tema dark e detalhes em dourado.

Notificações Toast: Feedback visual instantâneo para ações de sucesso ou erro.

Modal de Confirmação: Camada de segurança ao excluir itens dos favoritos.

                                 🛠️ Tecnologias Utilizadas
HTML5: Estruturação semântica das páginas.

CSS3: Estilização avançada com variáveis, animações e Glassmorphism.

JavaScript (ES6+): Lógica de programação baseada em módulos (import/export).

TheCocktailDB API: Fonte de dados para as receitas de drinks.

                                  📂 Estrutura do Projeto
Plaintext
├── index.html          # Página principal de busca e sugestões
├── favoritos.html      # Página da coleção de itens salvos
├── style.css           # Estilização global e componentes (Modais, Toasts)
├── api.js              # Módulo de comunicação com a API externa
├── storage.js          # Módulo de persistência (LocalStorage)
└── script.js           # Orquestrador da interface e manipulação do DOM
⚙️ Como funciona o fluxo de dados
Busca: O usuário digita o nome do drink; o api.js faz um fetch e retorna os dados.

Exibição: O script.js processa o JSON e renderiza os cards dinamicamente no gridBebidas.

Persistência: Ao clicar na estrela (⭐), o drink é enviado para o storage.js, que o armazena como uma string JSON no navegador.

Gerenciamento: Na página de favoritos, o usuário pode visualizar sua lista e remover itens através de um modal de confirmação.

                                 🔧 Como Executar
Clone este repositório.

Como o projeto utiliza Módulos JavaScript, é necessário rodar através de um servidor local (ex: extensão Live Server do VS Code).

Abra o index.html no seu navegador preferido.


NOME: Gabriel Guilger
      Cauã Endrew
      Felipe Bergami
