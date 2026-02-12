# Docker - Melhores Práticas para Monorepo

## Por que Docker?

✅ **Ambiente Consistente** - Funciona igual no seu PC e em produção  
✅ **Onboarding Fácil** - Novo dev apenas faz `docker-compose up`  
✅ **Isolamento** - Não polui sua máquina  
✅ **Escalabilidade** - Pronto para Kubernetes/Swarm  
✅ **CI/CD** - Fácil integração com GitHub Actions, GitLab CI, etc  

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────┐
│         docker-compose.yml              │
├──────────────┬────────────┬─────────────┤
│              │            │             │
│          postgres      api            web
│          :5432        :3000          :5173
│          (data)       (api)          (ui) 
└──────────────┴────────────┴─────────────┘
```

Cada container é **independente** mas se comunicam via rede `workout-spa-network`.

## 🔄 Workflow DevOps

### 1️⃣ Development Local

```bash
docker-compose up --build
```

**Características:**
- Volumes mounted para hot-reload
- Rebuild automático ao salvar arquivos
- Database persiste entre reinicializações

### 2️⃣ CI/CD (Pre-deploy)

```yaml
# .github/workflows/ci-cd.yml
- Lint
- Build
- Docker build
- Testes
```

### 3️⃣ Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

**Diferenças:**
- Sem volumes mounted (usa binários compilados)
- Restart policies para alta disponibilidade
- Variáveis de ambiente seguras

## 📊 Economia de Recursos

```
Local sem Docker   vs   Com Docker
├─ Node 24                ├─ Container web: 150MB
├─ PostgreSQL             ├─ Container api: 100MB
├─ npm packages 500MB+    ├─ Database: 200MB
└─ Sistema poluído        └─ Sistema isolado ✅
```

## 🔐 Segurança

**Development:**
```yaml
environment:
  DATABASE_URL: postgresql://postgres:postgres@postgres:5432/...
  # Credentials simples, OK para dev
```

**Production:**
```bash
# Use secrets
docker-compose -f docker-compose.prod.yml up -d \
  --env-file .env.production.secret
```

## 🛠️ Troubleshooting

### Container não inicia

```bash
# Ver logs detalhados
docker-compose logs -f [service]

# Exemplo
docker-compose logs -f api
```

### PostgreSQL não conecta

```bash
# Verificar se está rodando
docker ps | grep postgres

# Acessar terminal do container
docker-compose exec postgres psql -U postgres -l
```

### Porta em uso

```bash
# Limpar tudo
docker-compose down -v

# Rebuild
docker-compose up --build
```

## 📦 Otimizações

### Multi-stage builds

Os Dockerfiles usam Node Alpine (pequeno) em vez de Ubuntu/Debian.

```dockerfile
FROM node:24-alpine  # ~150MB vs ~900MB com debian
```

### Layer caching

```dockerfile
# Copiar declarações primeiro (não muda com código)
COPY package.json .

# Instalar deps (cacheia se package.json não mudou)
RUN npm ci

# Depois copiar código
COPY . .
```

Isso faz rebuilds muito mais rápido.

## 🚀 Deploy Opções

### Vercel + Railway

```bash
# API no Railway
DATABASE_URL=postgresql://...
npm start

# Web na Vercel
npm run build
```

### AWS ECS

```bash
# Build e push para ECR
docker build -t api:latest apps/api
docker tag api:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/api:latest
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/api:latest
```

### DigitalOcean App Platform

```yaml
# app.yaml
apps:
  - name: api
    github:
      repo: your-repo
      branch: main
    build_command: npm run build -- --filter=api
    run_command: npm -w api start
```

## 📈 Monitoramento

```bash
# Ver recursos usados
docker stats

# Health checks
docker-compose logs -f postgres | grep health
```

## 💭 Considerações

| Aspecto | Docker | Local | Vencedor |
|---------|--------|-------|----------|
| Setup    | 10 min | 30 min | Docker ✅ |
| Hot-reload | Sim | Sim | Empate |
| Performance | -0.5% | -0% | Local |
| Isolamento | Perfeito | Nenhum | Docker ✅ |
| Deploy | Fácil | Complicado | Docker ✅ |

## ✨ Conclusão

Docker é **essencial** para um projeto profissional. Trade-off mínimo (hot-reload funciona) com benefícios enormes (consistency, deploy, onboarding).

Seu setup está **production-ready** 🚀
