create table if not exists public.cardapio_config (
  produto_id text primary key,
  nome text not null,
  preco numeric(10,2) not null check (preco >= 0),
  disponivel boolean not null default true,
  destaque boolean not null default false,
  preco_promocional numeric(10,2) null check (preco_promocional is null or preco_promocional >= 0),
  atualizado_em timestamptz not null default now()
);
alter table public.cardapio_config enable row level security;
revoke all on table public.cardapio_config from anon, authenticated;
create index if not exists cardapio_config_disponivel_idx on public.cardapio_config(disponivel);
create index if not exists cardapio_config_destaque_idx on public.cardapio_config(destaque);
