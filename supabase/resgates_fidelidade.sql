-- Execute uma vez no SQL Editor do Supabase.
create extension if not exists pgcrypto;

create table if not exists public.resgates_fidelidade (
  id uuid primary key default gen_random_uuid(),
  cliente_id bigint null,
  telefone text not null,
  nome text not null default 'Cliente',
  codigo text not null unique,
  premio text not null default '1 X-Salada grátis',
  pontos_consumidos integer not null default 12 check (pontos_consumidos = 12),
  status text not null default 'disponivel' check (status in ('disponivel','reservado','utilizado','cancelado')),
  origem_resgate text null check (origem_resgate in ('presencial','aplicativo')),
  pedido_id text null,
  criado_em timestamptz not null default now(),
  reservado_em timestamptz null,
  utilizado_em timestamptz null,
  utilizado_por text null
);
create index if not exists resgates_fidelidade_telefone_idx on public.resgates_fidelidade(telefone, criado_em desc);
create index if not exists resgates_fidelidade_codigo_idx on public.resgates_fidelidade(codigo);
create index if not exists resgates_fidelidade_status_idx on public.resgates_fidelidade(status, criado_em desc);
alter table public.resgates_fidelidade enable row level security;
-- Nenhuma policy pública: leitura/escrita somente pelas APIs server-side com service role.

create or replace function public.gerar_resgate_fidelidade(p_telefone text)
returns public.resgates_fidelidade
language plpgsql security definer set search_path=public as $$
declare c public.clientes_fidelidade%rowtype; r public.resgates_fidelidade%rowtype; cod text;
begin
  select * into c from public.clientes_fidelidade where telefone=p_telefone for update;
  if not found then raise exception 'Cliente não encontrado'; end if;
  select * into r from public.resgates_fidelidade where telefone=p_telefone and status in ('disponivel','reservado') order by criado_em desc limit 1;
  if found then return r; end if;
  if coalesce(c.pontos,0)<12 then raise exception 'Saldo insuficiente'; end if;
  loop
    cod := 'POP-' || upper(substr(encode(gen_random_bytes(6),'hex'),1,4)) || '-' || upper(substr(encode(gen_random_bytes(6),'hex'),1,4));
    exit when not exists(select 1 from public.resgates_fidelidade where codigo=cod);
  end loop;
  update public.clientes_fidelidade set pontos=pontos-12, atualizado_em=now() where id=c.id;
  insert into public.resgates_fidelidade(cliente_id,telefone,nome,codigo) values(c.id,c.telefone,coalesce(c.nome,'Cliente'),cod) returning * into r;
  return r;
end $$;

create or replace function public.utilizar_resgate_fidelidade(p_codigo text,p_funcionario text,p_origem text default 'presencial',p_pedido_id text default null)
returns public.resgates_fidelidade
language plpgsql security definer set search_path=public as $$
declare r public.resgates_fidelidade%rowtype;
begin
  select * into r from public.resgates_fidelidade where upper(codigo)=upper(trim(p_codigo)) for update;
  if not found then raise exception 'Código inválido'; end if;
  if r.status='utilizado' then raise exception 'Código já utilizado'; end if;
  if r.status='cancelado' then raise exception 'Código cancelado'; end if;
  update public.resgates_fidelidade set status='utilizado',origem_resgate=p_origem,pedido_id=p_pedido_id,utilizado_em=now(),utilizado_por=left(coalesce(p_funcionario,'Admin'),100) where id=r.id returning * into r;
  return r;
end $$;
revoke all on function public.gerar_resgate_fidelidade(text) from public, anon, authenticated;
revoke all on function public.utilizar_resgate_fidelidade(text,text,text,text) from public, anon, authenticated;
