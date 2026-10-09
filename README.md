# 🎵 TrackNotes — Frontend do Playlist Service

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Shadcn_UI-Base_UI-black?style=for-the-badge&logo=shadcnui" alt="Shadcn UI" />
  <img src="https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=react-query" alt="TanStack Query" />
</p>

---

## 📌 Sobre o Projeto

O **TrackNotes** é uma aplicação web moderna e minimalista desenvolvida em **Next.js 16**, **TypeScript** e **Tailwind CSS**, inspirada na estética de ferramentas de anotação e produtividade como *Apple Notes*, *Linear* e *Notion*.

O sistema atua como o cliente frontend oficial do ecossistema de catálogo musical, consumindo a API REST do [**`back-playlist-service`**](https://github.com/Cloves-Neto/back-playlist-service) desenvolvida em **Java 21** e **Spring Boot 4**.

---

## 🔗 Repositórios do Ecossistema

| Componente | Repositório | Tecnologias Principais |
| :--- | :--- | :--- |
| 🌐 **Frontend (Esta Aplicação)** | [Cloves-Neto/app-playlist-service](https://github.com/Cloves-Neto/app-playlist-service) | Next.js 16, React 19, TypeScript, Tailwind v4, TanStack Query |
| ☕ **Backend REST API** | [Cloves-Neto/back-playlist-service](https://github.com/Cloves-Neto/back-playlist-service) | Java 21, Spring Boot 4, Spring Security, JWT, JPA/Hibernate |

---

## ✨ Funcionalidades Principais

- ⚡ **Barra de Captura Rápida (Quick Capture):**
  - Anotação instantânea de faixas no topo da tela com foco imediato e atalho <kbd>↵ Enter</kbd>.
  - Seleção rápida de gêneros musicais (*Rock, Pop, Jazz, MPB, Lo-Fi, etc.*).
  - Atalho de teclado <kbd>N</kbd> para focar diretamente na digitação da música.
- 🗂️ **Cadernos de Playlists:**
  - Painel lateral com contagem dinâmica de faixas por lista.
  - Criação rápida de playlists com opção de inclusão imediata de faixas existentes.
  - Página de detalhes da playlist otimizada com **Server-Side Rendering (SSR)** e streaming via `<Suspense>`.
  - Desvinculação e remoção de músicas em lote (`DELETE /lists/{name}/musics`).
- 🔍 **Busca Global Instantânea:**
  - Input com debounce dinâmico conectado diretamente ao endpoint de busca da API Java.
  - Atalho de teclado <kbd>/</kbd> para focar na barra de busca a qualquer momento.
- 🔐 **Autenticação Segura & Guards:**
  - Telas estilizadas de **Login** e **Registro** com validação em tempo real via **Zod** e **React Hook Form**.
  - Gerenciamento de tokens JWT via cookies com suporte híbrido (SSR e CSR).
  - Middleware de proteção que redireciona usuários não autenticados para `/login`.
- 🎨 **Experiência Visual & Microinterações:**
  - Dark Mode sofisticado baseado em paleta TweakCN / Slate minimalista.
  - Feedback tátil com notificações de sucesso e erro via **Sonner**.
  - Estados vazios (*Empty States*) ilustrados e esqueletos de carregamento (*Skeletons*).

---

## 🏗️ Arquitetura do Frontend

O projeto adota uma arquitetura orientada a domínios (**Feature-Driven Architecture**) com o padrão **Screaming Architecture** na camada de integração de rede:

```text
src/
├── api/                  # Screaming Services (1 pasta por ação REST da API)
│   ├── auth/             # LoginService, RegisterService
│   ├── musics/           # CreateMusic, SearchMusic, EditMusic, DeleteMusic
│   ├── lists/            # CreatePlaylist, GetAll, GetByName, Delete, RemoveMusics
│   └── client/           # Instância Axios com interceptors de JWT para SSR/CSR
├── app/                  # App Router do Next.js
│   ├── (auth)/           # Rotas públicas de login e registro
│   │   ├── login/
│   │   └── register/
│   ├── (workspace)/      # Rotas autenticadas do workspace
│   │   ├── page.tsx      # Feed principal com Quick Capture e Notas
│   │   └── playlists/[name]/ # Detalhes da playlist via SSR
│   └── layout.tsx        # Providers globais (QueryClient, Toaster, Tooltip)
├── components/           # Componentes compartilhados e primitivos
│   ├── layout/           # AppHeader, AppLogo, SearchBar, RepoActionButtons, UserProfileMenu
│   ├── providers/        # QueryProvider com React Query v5
│   └── ui/               # Componentes Shadcn UI (Base UI)
├── features/             # Domínios de negócio com hooks, schemas e componentes
│   ├── auth/             # Schemas e formulários de autenticação
│   ├── music/            # QuickCaptureBar, MusicFeed, MusicCard, Modais e Hooks
│   └── playlist/         # PlaylistSidebar, PlaylistDetailView, Modais e Hooks
├── hooks/                # Hooks utilitários globais (ex: useDebounce)
├── stores/               # Estado cliente em Zustand (auth.store, workspace.store)
└── middleware.ts         # Next.js Route Guard para proteção de sessão
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js:** Versão 20+ ou 22 LTS
- **Backend em Execução:** Ter o [back-playlist-service](https://github.com/Cloves-Neto/back-playlist-service) ativo na porta `8080`.

### 1. Clonar o Repositório
```bash
git clone https://github.com/Cloves-Neto/app-playlist-service.git
cd app-playlist-service
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 4. Executar o Servidor de Desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### 5. Compilar para Produção
```bash
npm run build
npm start
```

---

## 👤 Autor

Desenvolvido por **Cloves Neto**:

- 🌐 **Website:** [devneto.com.br](https://devneto.com.br)
- 🐙 **GitHub:** [@Cloves-Neto](https://github.com/Cloves-Neto)
- 💼 **LinkedIn:** [linkedin.com/in/cloves-neto](https://linkedin.com/in/cloves-neto)
