# Deployment Guide com Docker

## 🚀 Deploy Rápido

### Opção 1: Railway (⭐ Recomendado)

[ https://railway.app - Super fácil, free tier generoso ]

```bash
# 1. Install CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Init project
railway init

# 4. Deploy
railway up
```

Railway auto-detecta Dockerfile e npm scripts. Zero config necessário.

### Opção 2: Render.com

```bash
# 1. Push para GitHub

# 2. Conectar Render ao repo

# 3. Create new service
# - Select Docker
# - Branch: main
# - Port: 3000
# - Environment: NODE_ENV=production
```

### Opção 3: DigitalOcean App Platform

```bash
# 1. Connect GitHub repo

# 2. Auto-detect docker-compose.yml

# 3. Deploy botão 1-click
```

### Opção 4: Self-hosted (VPS/Linode/Hetzner)

```bash
# 1. SSH para servidor
ssh user@server.com

# 2. Install Docker & docker-compose
sudo apt update && sudo apt install docker.io docker-compose

# 3. Clone repo
git clone https://github.com/seu-user/workout-spa-mvp.git
cd workout-spa-mvp

# 4. Deploy
docker-compose -f docker-compose.prod.yml up -d

# 5. Setup Nginx reverse proxy
sudo apt install nginx
# ... configure nginx para proxear :80 -> :5173 e :3000
```

## 🔐 Segurança Production

### Environment Variables

```bash
# Criar .env.production.secret (NÃO commitar!)
DB_PASSWORD=sua_senha_super_segura
JWT_SECRET=sua_chave_jwt
API_URL=https://api.seu-dominio.com
```

### Secrets Management

```bash
# Com Railway
railway link
railway variables set DB_PASSWORD xyz

# Com Render
# UI: Settings -> Environment
```

## 📊 Monitoramento

### Logs

```bash
# Ver últimos 100 linhas
docker-compose logs -f api --tail 100

# Salvar em arquivo
docker-compose logs api > api.log
```

### Health Checks

O `docker-compose.yml` já tem health checks configurados:

```yaml
healthcheck:
  test: ["CMD-SHELL", "curl http://localhost:3000/health"]
  interval: 10s
```

### Métricas

```bash
# CPU, Memória
docker stats

# Dashboard Portainer (GUI para Docker)
docker run -d -p 9000:9000 portainer/portainer-ce
```

## 🔄 CI/CD Automático

### GitHub Actions

Seu projeto já tem `.github/workflows/ci-cd.yml`:

```yaml
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - name: Deploy
        run: |
          # Deploy script
```

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - build
  - deploy

build:
  stage: build
  script:
    - docker build -t api:$CI_COMMIT_SHA apps/api
    - docker push registry.gitlab.com/seu-user/api:$CI_COMMIT_SHA

deploy:
  stage: deploy
  script:
    - docker pull registry.gitlab.com/seu-user/api:$CI_COMMIT_SHA
    - docker run -d registry.gitlab.com/seu-user/api:$CI_COMMIT_SHA
```

## 💾 Backup Database

```bash
# Backup PostgreSQL
docker-compose exec postgres pg_dump -U postgres workout_spa > backup.sql

# Restore
docker-compose exec -T postgres psql -U postgres workout_spa < backup.sql
```

## 🔄 Updates & Zero Downtime

```bash
# Pull latest
git pull origin main

# Rebuild e restart (com mínimo downtime)
docker-compose up -d --build

# Blue-Green deployment
# 1. Start new containers
docker-compose -f docker-compose.v2.yml up -d

# 2. Switch nginx/load-balancer para v2

# 3. Kill old containers
docker-compose down
```

## 📈 Scaling

### Load Balancing (nginx)

```nginx
upstream backend {
    server api:3000;
    server api-2:3000;
}

upstream frontend {
    server web:5173;
    server web-2:5173;
}

server {
    listen 80;
    location /api {
        proxy_pass http://backend;
    }
    location / {
        proxy_pass http://frontend;
    }
}
```

### Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml workout-spa

# Scale service
docker service scale api=3
```

### Kubernetes

```bash
# Converter docker-compose para K8s
kompose convert -f docker-compose.yml

# Deploy
kubectl apply -f compose.yaml
```

## 💰 Custo Estimado (Monthly)

| Provider | API | Web | Database | Total |
|----------|-----|-----|----------|-------|
| Railway | $5 | Free | $9 | ~$14 |
| Render | Free tier | Free tier | $15 | ~$15 |
| DigitalOcean | $6 (APP + DB bundle) | $5 | $12 | ~$23 |
| Self-hosted VPS | $5-10 (Linode) | - | - | ~$8 |

## ✅ Checklist Pre-Production

- [ ] `.env.production` configurado
- [ ] Health checks validados
- [ ] Database backups setup
- [ ] Logs centralizados
- [ ] HTTPS/SSL configurado
- [ ] Rate limiting ativado
- [ ] CORS correto
- [ ] Database migrations automáticas
- [ ] Monitoring em place
- [ ] Plano de rollback

Pronto para produção! 🚀
