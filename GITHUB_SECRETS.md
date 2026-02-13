# GitHub Secrets Setup para Deploy Automático

Para que o deploy automático funcione, você precisa configurar os secrets no GitHub.

## 🔐 Acessar GitHub Secrets

1. Vá para seu repositório no GitHub
2. Settings → Secrets and variables → Actions
3. Clique em "New repository secret"

---

## 🚂 Railway Token

**Obter Token:**
1. Vá para [https://railway.app](https://railway.app)
2. Login na sua conta
3. Settings → API Tokens
4. Copie o token

**No GitHub:**
- Name: `RAILWAY_TOKEN`
- Value: `<cole-seu-token-aqui>`

---

## ▲ Vercel Token

**Obter Token:**
1. Vá para [https://vercel.com](https://vercel.com)
2. Settings → Tokens
3. Gere um novo token (cópia a "Production" e "Preview")
4. Copie o token

**No GitHub:**
- Name: `VERCEL_TOKEN`
- Value: `<cole-seu-token-aqui>`

---

## ✅ Fluxo após configurar secrets:

```
1. Você faz push para develop
   ├─ GitHub Actions roda: lint + build
   └─ ✅ Se passar → develop fica verde

2. Você faz PR: develop → main
   ├─ GitHub Actions roda de novo: lint + build
   └─ ✅ Se passar → PR pode ser merged

3. Você faz merge para main
   ├─ GitHub Actions roda: lint + build + deploy 🚀
   ├─ Deploy API para Railway
   ├─ Deploy Web para Vercel
   └─ ✅ Tudo live em produção!
```

---

## 🔍 Verificar Deploy

**Railway:**
- Vá para https://railway.app → seus projetos
- Veja logs de deploy em "Deployments"

**Vercel:**
- Vá para https://vercel.com → seu projeto
- Veja logs de deploy em "Deployments"

---

## 📝 Variáveis de Ambiente em Produção

**Railway (API):**
- Vá para projeto API → Settings
- Em "Environment" adicione:
  ```
  DATABASE_URL=postgresql://user:pass@db-host:5432/workout_spa
  NODE_ENV=production
  PORT=3000
  ```

**Vercel (Web):**
- Vá para projeto Web → Settings → Environment Variables
- Adicione:
  ```
  VITE_API_URL=https://seu-api.railway.app
  ```

---

## 🐛 Troubleshooting

**Deploy falha com "Permission denied"**
- Verifique se o token está correto
- Regenere o token se necessário

**API/Web não começa com erro de banco**
- Verifique DATABASE_URL em Railway
- Certifique-se que o banco está rodando

---

## 🎯 Próximos passos

1. ✅ Configurar secrets do GitHub
2. ✅ Criar projetos em Railway (API) e Vercel (Web)
3. ✅ Fazer primeiro push para main
4. 🚀 Verificar se deploy automático funcionou!
