# API Backend

Backend para a aplicação Workout SPA.

## Stack

- Express.js
- TypeScript
- Tsyringe (Dependency Injection)
- Drizzle ORM
- PostgreSQL
- Zod (Validações)
- Swagger (Documentação)

## Setup

1. Copie o arquivo `.env.example` para `.env` e configure suas variáveis:

```bash
cp .env.example .env
```

2. Configure o banco de dados PostgreSQL:

```bash
# Criar banco de dados
createdb workout_spa

# Gerar migrations
npm run db:generate

# Executar migrations
npm run db:migrate
```

3. Instale as dependências:

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`
Swagger docs em `http://localhost:3000/swagger`

## Build

```bash
npm run build
npm start
```

## Arquitetura

```
src/
├── domain/           # Interfaces e contratos
├── infrastructure/   # Implementações (DB, Repos)
├── application/      # Usecases e lógica de negócio
└── presentation/     # Controllers e rotas
```

## Endpoints

### Foods
- `GET /api/foods` - Listar todos os alimentos
- `POST /api/foods` - Criar novo alimento
- `GET /api/foods/:id` - Obter alimento por ID

### Meals
- `GET /api/meals` - Listar todas as refeições
- `POST /api/meals` - Criar nova refeição
- `POST /api/meals/add-food` - Adicionar alimento à refeição
