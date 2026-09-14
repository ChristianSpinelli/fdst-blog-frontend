📝 Blog FDST - Frontend (Fase 3)
Este repositório contém a aplicação frontend do Blog FDST, desenvolvida em React como parte do Tech Challenge (Fase 3) da FIAP. A interface foi construída com foco em experiência do usuário (UX), design responsivo (mobile-first), componentização escalável e automação de entrega contínua por meio de containers.

🛠️ Tecnologias Utilizadas e Como Foram Aplicadas
O projeto foi estruturado integrando ferramentas modernas de desenvolvimento web, estilização e DevOps. Abaixo, detalhamos o papel de cada tecnologia no ecossistema da aplicação:

React & TypeScript: A biblioteca base para a construção de interfaces reativas baseadas em componentes e a linguagem de tipagem estática. O TypeScript foi aplicado para garantir segurança de tipos na manipulação de dados vindos da API, prevenindo erros em tempo de compilação e estruturando modelos consistentes para Posts e Usuários.

Vite: O bundler e ferramenta de build de alta performance escolhido para substituir ferramentas legadas, oferecendo recarregamento rápido em ambiente de desenvolvimento (HMR) e builds otimizados para produção.

Styled-Components: Utilizado para a estilização baseada em componentes (CSS-in-JS). Permitiu criar um tema escuro consistente (com fundo #09090B e detalhes em vermelho primário #ED145B), além de gerenciar facilmente regras de responsividade e adaptação de layout (como a alternância entre tabela no desktop e cards no mobile).

Formik & Yup: Aplicados em conjunto para o gerenciamento de formulários complexos (criação e edição de postagens) e validação de esquemas de dados em tempo real, garantindo uma experiência de preenchimento fluida e segura para o usuário.

Context API: Utilizada para o gerenciamento de estados globais essenciais, centralizando o controle de autenticação (AuthContext), verificação de papéis de usuário (RBAC para estudantes e professores) e o gerenciamento das postagens.

Docker: Utilizado para empacotar o frontend utilizando um fluxo de multi-stage build. No primeiro estágio, o código React/TypeScript é compilado pelo Vite; no segundo estágio, um servidor web leve (serve) roda em cima do Alpine Linux para servir os arquivos estáticos na porta 5173, mantendo a imagem compacta e altamente performática.

Docker Compose: Aplicado para orquestrar o funcionamento do container frontend localmente, facilitando o mapeamento de portas e garantindo a integração perfeita com o backend.

GitHub Actions (CI/CD): A ferramenta de Integração Contínua. Configuramos um workflow automatizado acionado a cada git push na branch main, responsável por compilar a aplicação, construir a imagem Docker e enviá-la para o registro.

Docker Hub: Utilizado como o Container Registry público. É o destino final da nossa esteira de CI/CD, onde a imagem otimizada do frontend é publicada com versionamento por Commit (SHA) e tag latest, permitindo o deploy instantâneo em qualquer infraestrutura.

Caso já tenha rodado uma imagem anterior e queira garantir a versão mais atualizada, utilize o comando:

Bash
docker compose pull && docker compose up -d
Isso força o Docker a buscar a versão mais recente publicada no Docker Hub em vez de usar uma imagem em cache local.

🏛️ Arquitetura do Sistema e Estrutura de Pastas
A aplicação adota uma organização modular baseada em responsabilidades, facilitando a manutenção, a legibilidade do código e a escalabilidade da interface:

src/components/: Componentes visuais reutilizáveis em toda a aplicação (como o Header com navegação responsiva e menu hambúrguer, rodapé, botões padronizados).

src/pages/: Telas principais do sistema, divididas entre o Dashboard geral de postagens, o AdminPosts (painel gerencial adaptativo) e as telas de autenticação/formulários.

src/contexts/: Provedores de estado global da aplicação para regras de negócio e controle de sessão.

src/types/: Definições globais de interfaces e tipos em TypeScript para manter a tipagem estricta em toda a comunicação com a API.

🚀 Uso e Inicialização da Aplicação
Como a aplicação está totalmente containerizada e publicada no Docker Hub, executá-la localmente clonando o repositório é um processo simples e direto.

Pré-requisitos
Ter o Docker instalado na máquina.

Ter o Git instalado.

Passo a Passo
Faça o clone do projeto utilizando o comando git clone do repositório.

Acesse a pasta do projeto clonado utilizando o terminal (cd nome-da-pasta-do-frontend).

Execute o comando para baixar e subir o container:

Bash
docker compose pull && docker compose up -d

Ao realizar esse comando, o Docker buscará a imagem mais recente do frontend diretamente no Docker Hub e subirá a aplicação de forma isolada na porta 5173.

Acesse a aplicação no navegador em:

Plaintext
http://localhost:5173

Principais Desafios Encontrados
Adaptação Mobile-First e Responsividade em Tabelas Administrativas: Tabelas de dados complexas em telas de smartphones costumam quebrar a experiência do usuário. Para solucionar isso, implementei uma abordagem responsiva em camadas no painel administrativo: a visualização em tabela completa é exibida em desktops, enquanto em dispositivos móveis a interface se transforma automaticamente em um layout limpo de cards empilhados com botões otimizados para toque, além de um menu hambúrguer dinâmico no cabeçalho.

Configuração de Containers para Aplicações Single Page (SPA): Como o Vite gera arquivos estáticos puros, executar o container Node.js tradicional encerrava o processo imediatamente após o boot. O desafio foi estruturar um Dockerfile em multi-stage eficiente utilizando o pacote serve para manter o servidor web estático ativo na porta 5173 respondendo de forma estável.

Esteira de CI/CD e Versionamento de Imagens: Automatizar o processo de empacotamento do frontend com o GitHub Actions exigiu ajustes finos nas permissões e nas tags de build, garantindo que cada alteração enviada para a branch main gerasse uma imagem limpa, validada e pronta para produção no Docker Hub.

Uma das principais dificuldades foi a divergência entre os requisitos da Fase 3 e os da Fase 2, o que exigiu uma refatoração e atualização contínua do backend. Foi necessário expandir o modelo de dados com novos campos e relacionamentos, além de refinar as regras de permissão para suportar as novas demandas da aplicação.

A subjetividade em alguns pontos da documentação de requisitos exigiu a tomada de decisões técnicas e de negócio proativas durante o desenvolvimento. Foi necessário definir arquiteturalmente cenários em aberto, como o comportamento de acesso a rotas restritas sem permissão, o escopo de visualização no painel administrativo (se as postagens listadas eram globais ou restritas ao docente logado) e a regra de preservação ou substituição de autoria caso um professor editasse uma postagem criada por outro.

Equipe
Christian Spinelli RM371199