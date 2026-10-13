-- Ruta Andina: permitir observaciones vacías manteniendo message NOT NULL.
-- Ejecutar en Supabase Dashboard > SQL Editor > New query.
-- No elimina ni modifica registros existentes.

begin;

do $$
declare
  constraint_definition text;
begin
  select pg_get_constraintdef(c.oid)
    into constraint_definition
  from pg_constraint c
  where c.conrelid = 'public.inquiries'::regclass
    and c.conname = 'inquiries_message_length'
    and c.contype = 'c';

  if constraint_definition is null then
    raise exception 'No existe public.inquiries.inquiries_message_length como CHECK; se cancela sin cambios.';
  end if;

  if constraint_definition not like '%char_length(btrim(message)) >= 10%'
     or constraint_definition not like '%char_length(btrim(message)) <= 1500%' then
    raise exception 'La definición actual no coincide con la esperada; se cancela sin cambios. Definición: %', constraint_definition;
  end if;

  alter table public.inquiries
    drop constraint inquiries_message_length;

  alter table public.inquiries
    add constraint inquiries_message_length
    check (char_length(btrim(message)) = 0 or char_length(btrim(message)) between 10 and 1500);
end
$$;

-- Garantiza que la columna siga siendo obligatoria (el formulario envía '' si está vacía).
alter table public.inquiries
  alter column message set not null;

commit;

-- Verificación posterior: definición y NOT NULL.
select c.conname, pg_get_constraintdef(c.oid) as definition
from pg_constraint c
where c.conrelid = 'public.inquiries'::regclass
  and c.conname = 'inquiries_message_length';

select column_name, is_nullable, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'inquiries'
  and column_name = 'message';
