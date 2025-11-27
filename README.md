# 🔗 LinksHub

**O que é:** Um agregador de links pessoais (tipo Linktree) onde você centraliza suas redes sociais e portfólio.
**Status:** 🟢 Online (Produção)

---

## 1. Tecnologias Utilizadas ("Stack")

- **Linguagem:** TypeScript (JavaScript com tipagem, mais seguro).
- **Frontend (Visual):** React (Biblioteca) + Next.js (Framework App Router).
- **Estilização:** Tailwind CSS (Estilos direto no HTML) + Lucide React (Ícones).
- **Backend (Dados):** Supabase (Banco de dados PostgreSQL na nuvem).
- **Autenticação:** Supabase Auth (Email/Senha).
- **Deploy (Hospedagem):** Vercel (Frontend) + GitHub (Controle de versão).
- **IDE (Ferramenta):** Cursor (Editor com IA).

---

## 2. O Fluxo de Dados (Arquitetura)

1.  **Acesso:** O Usuário acessa `https://links-hub-six.vercel.app/`.
2.  **Requisição:** O Next.js (no servidor da Vercel) percebe que precisa de dados.
3.  **Conexão:** Ele usa as Chaves de API (Variáveis de Ambiente) para conectar ao Supabase.
4.  **Banco de Dados:** O Supabase consulta a tabela `links` no banco PostgreSQL e devolve um JSON.
5.  **Renderização:** O Next.js mistura esses dados com o HTML/CSS e entrega a página pronta.

---

## 3. Novas Funcionalidades (Painel Admin) 🚀

Recentemente implementamos um sistema completo de gestão de conteúdo:

### 🔐 Área Administrativa (`/admin`)

- **Proteção de Rota:** Apenas usuários logados podem acessar.
- **CRUD Completo:**
  - **Create (Criar):** Formulário para adicionar novos links em tempo real.
  - **Read (Ler):** Visualização da lista atual vinda do banco.
  - **Delete (Deletar):** Botão para remover links indesejados.

### 🛡️ Segurança e Autenticação

- **Login:** Tela de login personalizada integrada ao Supabase Auth.
- **RLS (Row Level Security):** Políticas de segurança no banco de dados que garantem que:
  - _Qualquer pessoa_ pode LER os links (Público).
  - _Apenas o admin_ pode CRIAR ou DELETAR links (Privado).

---

## 4. Conceitos de DevOps Aplicados

- ✅ **Ambiente Local vs. Produção**
- ✅ **Controle de Versão (Git)**
- ✅ **CI/CD (Integração Contínua via Vercel)**
- ✅ **Gerenciamento de Segredos (.env.local)**
- ✅ **Pipeline de Deploy Automatizado**
