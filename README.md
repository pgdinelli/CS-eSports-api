# CS eSports API

## Sobre o projeto

A **CS eSports API** trata-se de uma API REST desenvolvida para manter dados do cenário competitivo do esporte eletrônico Counter-Strike. A aplicação permite realizar operações completas de CRUD (Create, Read, Update, Delete) para o gerenciamento de:

- **Jogadores**: Cadastro e manutenção de jogadores profissionais, contendo informações como nome e a organização/time que representam.
- **Times**: Cadastro e manutenção de equipes, contendo informações como nome e país/local de base.

O projeto foi construído seguindo os princípios de **arquitetura em camadas**, garantindo uma clara separação entre o roteamento HTTP, os controladores de requisição (*controllers*), as regras de negócio (*services*) e a camada de acesso a dados via Prisma ORM.

---

## Desenvolvimento

### Arquitetura do Projeto

A estrutura de código está localizada dentro do diretório `src/` e dividida conforme as responsabilidades das camadas:

- `src/routes/`: Módulos de roteamento do Fastify definindo os caminhos REST e métodos HTTP.
- `src/controllers/`: Controladores responsáveis por interpretar requisições, validar parâmetros/corpos de requisição e retornar as respostas HTTP formatadas.
- `src/services/`: Camada de serviço contendo as regras de negócio e integrações diretas com as consultas do Prisma ORM.
- `src/lib/prisma/`: Instanciação e configuração do cliente Prisma acoplado ao adaptador nativo do PostgreSQL (`@prisma/adapter-pg`).
- `src/utils/`: Tipagens, interfaces TypeScript e utilitários da aplicação.
- `prisma/`: Definição do schema relacional do banco de dados (`schema.prisma`) e arquivos de migrações (`migrations/`).

### Endpoints da API

#### Jogadores (`/api/players`)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/players/test` | Rota de teste e verificação de status da API |
| `GET` | `/api/players` | Lista todos os jogadores cadastrados |
| `GET` | `/api/players/:id` | Busca os detalhes de um jogador pelo seu ID (UUID) |
| `POST` | `/api/players` | Cadastra um novo jogador |
| `PUT` | `/api/players/:id` | Atualiza os dados de um jogador existente pelo ID |
| `DELETE` | `/api/players/:id` | Remove um jogador pelo ID |

#### Times (`/api/teams`)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/teams/test` | Rota de teste e verificação de status da API |
| `GET` | `/api/teams` | Lista todos os times cadastrados |
| `GET` | `/api/teams/:id` | Busca os detalhes de um time pelo seu ID (UUID) |
| `POST` | `/api/teams` | Cadastra um novo time |
| `PUT` | `/api/teams/:id` | Atualiza os dados de um time existente pelo ID |
| `DELETE` | `/api/teams/:id` | Remove um time pelo ID |

---

### Como Executar o Projeto

#### Pré-requisitos
- **[Node.js](https://nodejs.org/)** (v18 ou superior)
- **[Docker](https://www.docker.com/)** e **[Docker Compose](https://docs.docker.com/compose/)**

#### Passo a Passo

1. **Instalar as dependências do Node.js**:
   ```bash
   npm install
   ```

2. **Configurar as Variáveis de Ambiente**:
   Crie um arquivo `.env` na raiz do projeto conforme o modelo fornecido no `.env.example`:
   ```env
   DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/cs_esports_db?schema=public"
   POSTGRES_PASSWORD="SUA_SENHA"
   ```

3. **Inicializar o Banco de Dados com Docker**:
   Suba o container PostgreSQL utilizando a imagem e configurações do `docker-compose.yml`:
   ```bash
   docker compose up -d
   ```

4. **Executar as Migrações do Prisma**:
   Aplique o esquema das tabelas `tb_players` e `tb_teams` no PostgreSQL e gere o cliente do Prisma:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Executar a Aplicação**:
   - **Modo de Desenvolvimento** (com monitoramento de alterações via `tsx watch`):
     ```bash
     npm run dev
     ```
   - **Modo de Produção** (compilação TypeScript e execução via Node.js):
     ```bash
     npm run start
     ```

   A API ficará acessível no endereço: `http://localhost:3000`.

---

## Tecnologias Utilizadas

- **[TypeScript](https://www.typescriptlang.org/)**: Linguagem de programação fortemente tipada que oferece autocompletar avançado, segurança de tipos em tempo de compilação e melhor manutenibilidade.
- **[Fastify](https://fastify.dev/)**: Framework web focado em altíssima performance, baixo *overhead* e arquitetura baseada em plugins para Node.js.
- **[Prisma ORM](https://www.prisma.io/)**: ORM moderno para Node.js e TypeScript que simplifica a consulta ao banco e o gerenciamento de migrações com tipagem automatizada.
- **[PostgreSQL](https://www.postgresql.org/)**: Sistema de Gerenciamento de Banco de Dados Relacional (SGBD) robusto e de alta confiabilidade.
- **[Docker & Docker Compose](https://www.docker.com/)**: Plataforma de containerização utilizada para empacotar, virtualizar e rodar o banco de dados PostgreSQL em um ambiente isolado.
- **[@fastify/cors](https://github.com/fastify/fastify-cors)**: Plugin oficial do Fastify para permitir requisições de origens cruzadas (CORS).
- **[tsx](https://github.com/privatenumber/tsx)**: Transpilador e executor rápido de arquivos TypeScript sem necessidade de etapa prévia de build manual durante o desenvolvimento.

---

## Autor
[Paulo Guilherme Souza Dinelli](https://www.linkedin.com/in/paulodinelli/)
