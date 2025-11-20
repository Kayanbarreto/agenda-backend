# 📅 Sistema de Agendamentos – Teste Técnico Full Stack

Este repositório contém minha solução para o **Teste Técnico de Estágio Full Stack**.

O projeto consiste em um sistema simples de **agendamento de serviços**, contendo:

- **Backend** com API REST feita em Node.js + Express + Prisma + PostgreSQL  
- **Frontend Web** em React + Vite + TailwindCSS  
- Funcionalidades completas: criar, listar, buscar e excluir agendamentos.

---

# 🚀 Tecnologias Utilizadas

## 🧩 **Backend**
- Node.js  
- Express  
- TypeScript  
- Prisma ORM  
- PostgreSQL
- Docker & Docker Compose  
- ts-node-dev  
- Validação manual com RegEx  
- Arquitetura simples baseada em rotas

## 🎨 **Frontend**
- React.js  
- Vite  
- TypeScript  
- TailwindCSS  
- React Router DOM  
- Axios (para consumo da API)

---

# 📚 Funcionalidades Implementadas

## 🔧 **Backend**
- **POST /agendamentos** → cria um novo agendamento  
- **GET /agendamentos** → lista todos os agendamentos  
- **GET /agendamentos/:id** → busca por ID  
- **GET /agendamentos?nome=** → busca por nome ou parte do nome  
- **DELETE /agendamentos/:id** → exclui um agendamento  
- **Validações avançadas**:
  - Campos obrigatórios  
  - Formato da data `dd/mm/aaaa`  
  - Formato da hora `hh:mm`  
  - Bloqueio de datas passadas  
- Conexão com PostgreSQL via Prisma

---

## 💻 **Frontend**
- Tela de **listagem de agendamentos**  
- Campo de **busca inteligente**:
  - Identifica automaticamente se o usuário digitou **ID** ou **nome**
  - Busca automática ao digitar  
  - Botão de "Limpar busca"  
- Tela de **criação de agendamento**
  - Campos: nome, serviço, data e hora  
  - Botão de “Limpar formulário”  
  - Validação visual  
- **Exclusão direta na listagem**
- Navegação entre páginas com **React Router**
- Interface responsiva usando TailwindCSS

---
# 📁 Estrutura Geral
```bash
  agenda-backend/
  agenda-web/
  README.md
```
## 📁 Estrutura do Projeto

### **agenda-backend/**
```bash
agenda-backend/
├── dbDocker/
│   └── docker-compose.yml 
├── prisma/
│   └── schema.prisma
├── src/
│   ├── prisma/
│   │   └── client.ts
│   ├── routes/
│   │   └── agendamentos.routes.ts
│   └── server.ts
├── package.json
└── tsconfig.json
```
### **agenda-web/**
```bash
agenda-web/
├── src/
│   ├── components/
│   │   └── Header.tsx
│   ├── pages/
│   │   ├── AgendamentosList.tsx
│   │   └── AgendamentoCreate.tsx
│   ├── services/
│   │   └── api.ts
│   ├── main.tsx
│   └── App.tsx
├── tailwind.config.js
└── package.json
```

# Deploy da aplicação
  ### 🔗 https://agenda-web-pink.vercel.app/
## 🌳 Local do .env (Backend)

O arquivo .env deve ser criado na raiz da pasta agenda-backend/, no mesmo nível de:
```
agenda-backend/
├── .env          # ✅ aqui
├── docker-compose.yml
├── prisma/
├── src/
└── package.json
```
Conteúdo do .env
```bash
DATABASE_URL="postgresql://postgres:skdpo1425@localhost:5432/agenda_db?schema=public"
```

# 🛠 Como Rodar o Projeto

## 📌 1. Clonar os repositórios

```bash
git clone https://github.com/Kayanbarreto/agenda-backend.git
git clone https://github.com/Kayanbarreto/agenda-web.git
```

## ⚙️ 2. Backend (API + Banco em Docker)
### 🔹 2.1 Entrar na pasta do backend
```
cd agenda-backend
```
### 🔹 2.2 Criar o arquivo .env
```
# agenda-backend/.env
DATABASE_URL="postgresql://postgres:skdpo1425@localhost:5432/agenda_db?schema=public"
```
### 🔹 2.3 Subir o Postgres + pgAdmin com Docker

O arquivo `docker-compose.yml` (no diretório dbDocker) contém os serviços:

`db` (PostgreSQL)

`pgadmin` (interface gráfica opcional)

### Subir os containers:
```
# agenda-backend/  
docker compose up -d
```
  Postgres estará disponível em localhost:5432
  pgAdmin em http://localhost:5050

    Email: admin@admin.com
    Senha: skdpo1425
    
### 🔹 2.4 Instalar dependências do backend

```bash
# agenda-backend/
npm install
```

### 🔹 2.5 Rodar Prisma (migrations + client)
```
npx prisma migrate dev --name init
npx prisma generate
```

### 🔹 2.6 Iniciar API
```
npm run dev
```

API disponível em:

👉 http://localhost:3333

## 🎨 3. Frontend

### 🔹 3.1 Entrar na pasta do frontend
```
cd agenda-web
```

### 🔹 3.2 Instalar dependências
```
npm install
```

### 🔹 3.3 Iniciar aplicação React
```
npm run dev
```

Frontend disponível em:
  👉 http://localhost:5173

    O frontend faz requisições para http://localhost:3333 através do arquivo src/services/api.ts

## ▶️ Como rodar o projeto (se já estiver com as dependencias já configuradas)

Assumindo que você já possui todas as dependências instaladas (Node, Docker, dependências do projeto):

NO BACKEND INICIALMENTE
1. **Subir banco de dados (PostgreSQL + pgAdmin via Docker)**

```bash
cd dbDocker
docker compose up -d
```

2. Iniciar o backend
```bash
cd ../agenda-backend
npm run dev
```

3. Iniciar o frontend
```bash
cd ../agenda-web
npm run dev
```
Frontend disponível em: http://localhost:5173

# 📡 Endpoints da API
| Método | Rota                | Descrição             |
|--------|----------------------|------------------------|
| POST   | /agendamentos       | Criar agendamento     |
| GET    | /agendamentos       | Listar todos          |
| GET    | /agendamentos/:id   | Buscar por ID         |
| GET    | /agendamentos?nome= | Buscar por nome parcial |
| DELETE | /agendamentos/:id   | Excluir               |

#### 📋 Listagem de agendamentos

#### ➕ Tela de criação

#### 🔍 Busca funcional

#### ❌ Exclusão

## 📦 Extras Implementados

#### 🔎 Filtro inteligente no frontend (ID ou nome)

#### 🔄 Busca automática sem botão

#### 🧹 Botão de limpar formulário

#### 📱 UI responsiva em Tailwind


## 👨‍💻 Autor

#### Kayan Marques Barreto

#### 🔗 GitHub: https://github.com/Kayanbarreto

#### 🔗 LinkedIn: https://www.linkedin.com/in/kayan-barreto-39a330265/

#### 📧 Email: kayan.marques.barreto@ccc.ufcg.edu.br
