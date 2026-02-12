# Docker Setup Guide

## 🐳 Development com Docker

Para rodar todo o stack localmente com Docker:

```bash
# Build e start todos os containers
docker-compose up --build

# Ou rodar em background
docker-compose up -d --build
```

**Serviços disponíveis:**
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Swagger: http://localhost:3000/swagger
- PostgreSQL: localhost:5432

## 🔧 Comandos Úteis

```bash
# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f api
docker-compose logs -f web
docker-compose logs -f postgres

# Acessar terminal do container
docker-compose exec api sh
docker-compose exec web sh
docker-compose exec postgres psql -U postgres

# Rebuild específico
docker-compose up --build api
docker-compose up --build web
```

## 🚀 Production

```bash
# Usar docker-compose.prod.yml
docker-compose -f docker-compose.prod.yml up -d

# Com variáveis de ambiente
DB_USER=user \
DB_PASSWORD=secure_password \
DB_NAME=workout_spa \
API_URL=https://api.example.com \
docker-compose -f docker-compose.prod.yml up -d
```

## 📝 Variáveis de Ambiente

Create `.env.docker` na raiz:

```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=workout_spa

# API
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/workout_spa
PORT=3000

# Web
VITE_API_URL=http://localhost:3000
```

## 🏗️ Volumes

**Development:** Os containers têm volumes mounted para hot-reload
```yaml
volumes:
  - ./apps/api/src:/app/apps/api/src
  - ./apps/web/src:/app/apps/web/src
```

**Production:** Sem volumes, apenas código compilado

## 🔒 Network

Todos os containers rodam na rede `workout-spa-network`:
- Frontend acesso backend via `http://api:3000`
- API acesso database via `postgresql://postgres@postgres:5432`

## 🐛 Troubleshooting

**Container não inicia:**
```bash
docker-compose logs [service]
```

**Porta já em uso:**
```bash
docker-compose down -v  # Remove volumes também
```

**Rebuild from scratch:**
```bash
docker-compose down -v
docker-compose up --build
```
