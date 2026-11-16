# MapTec · TJRR

Consulta de salas, setores e unidades dos prédios do TJRR. Site estático (GitHub Pages) + banco **Supabase**.

- Visitantes: só leitura, sem login.
- Administradores: entram com Google e editam prédios, andares e salas direto no site.
- Exclusões vão para a **lixeira** (restauráveis); todas as alterações ficam no **histórico**.
- Só o administrador principal promove/remove administradores (botão *Administração*).
- `data/maptec.json` é só o backup offline/semente; a fonte oficial é o banco.

## Ativar o login com Google (uma vez)
1. Google Cloud Console → *APIs e serviços* → *Credenciais* → **ID do cliente OAuth** (aplicativo da Web).
   - URI de redirecionamento autorizado: `https://qkemhenapokxbzfgubdx.supabase.co/auth/v1/callback`
2. Supabase → *Authentication → Sign In / Providers → Google*: ativar e colar Client ID e Client Secret.
3. Supabase → *Authentication → URL Configuration*: Site URL `https://rafajames.github.io/MapTec-TJRR/` e adicionar a mesma URL em *Redirect URLs*.

## Segurança
- A chave `sb_publishable_…` no código é pública por design; quem protege os dados são as regras RLS do banco.
- Escrita só para e-mails da tabela `admins` (verificado no servidor). Nunca use a chave `service_role` no site.
