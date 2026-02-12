# Workspace Scripts com Turborepo

Este é um monorepo configurado com **Turborepo** e **npm workspaces**.

## 📁 Estrutura

```
├── apps/
│   ├── web/      # Aplicação React + Vite
│   └── api/      # API Express
├── packages/     # Pacotes compartilhados (utils, ui, types, etc)
└── turbo.json    # Configuração do Turborepo
```

## 🚀 Comandos Disponíveis

### Desenvolvimento
```bash
npm run dev      # Inicia todos os dev servers em paralelo
```

### Build
```bash
npm run build    # Faz build de todos os workspaces (com cache automático do Turbo)
```

### Lint
```bash
npm run lint     # Roda eslint em todos os workspaces
```

### Preview
```bash
npm run preview  # Faz preview do build
```

## 💡 Turborepo Features

- **Cache Inteligente**: O Turbo cacheia outputs de tasks anteriores
- **Execução em Paralelo**: Executa tasks independentes em paralelo automaticamente
- **Dependências Implícitas**: Respeita as dependências entre workspaces

## 📝 Adicionando Novos Workspaces

### App (em `apps/`)
```bash
mkdir apps/meu-app
cd apps/meu-app
npm init -y
```

### Package (em `packages/`)
```bash
mkdir packages/meu-package
cd packages/meu-package
npm init -y
```

Os novos workspaces serão automaticamente detectados pelo Turbo!

## 🔧 Config Turborepo

Veja [turbo.json](../turbo.json) para a configuração atual de tasks e caching.
