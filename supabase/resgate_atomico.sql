-- Popular App: resgate atomico de premio
-- Execute uma vez no Supabase SQL Editor.
create or replace function public.resgatar_premio_fidelidade(
  p_telefone text,
  p_pontos integer default 12,
  p_descricao text default 'Prêmio entregue: 1 X-Salada grátis'
)
returns table(ok boolean, pontos_restantes integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cliente_id bigint;
  v_pontos integer;
begin
  if p_pontos <= 0 then
    raise exception 'Quantidade de pontos inválida';
  end if;

  select id, pontos
    into v_cliente_id, v_pontos
  from public.clientes_fidelidade
  where telefone = p_telefone
  for update;

  if v_cliente_id is null then
    raise exception 'Cliente não encontrado';
  end if;

  if coalesce(v_pontos,0) < p_pontos then
    raise exception 'Saldo insuficiente';
  end if;

  update public.clientes_fidelidade
  set pontos = pontos - p_pontos,
      atualizado_em = now()
  where id = v_cliente_id
  returning pontos into v_pontos;

  insert into public.historico_fidelidade
    (cliente_id,tipo,pontos,descricao,pedido_id)
  values
    (v_cliente_id,'resgate_premio',-p_pontos,p_descricao,
     'RESGATE-' || floor(extract(epoch from clock_timestamp()) * 1000)::bigint::text || '-' || substr(md5(random()::text),1,8));

  return query select true, v_pontos;
end;
$$;

revoke all on function public.resgatar_premio_fidelidade(text,integer,text) from public, anon, authenticated;
grant execute on function public.resgatar_premio_fidelidade(text,integer,text) to service_role;
