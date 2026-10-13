-- Ruta Andina: sincroniza el CHECK de experiencias con el catálogo de React.
-- Ejecutar en Supabase Dashboard > SQL Editor > New query.
-- No actualiza ni elimina filas existentes. NOT VALID conserva filas antiguas,
-- pero verifica las nuevas inserciones y actualizaciones.

begin;

do $$
declare
  constraint_definition text;
begin
  select pg_get_constraintdef(c.oid)
    into constraint_definition
  from pg_constraint c
  where c.conrelid = 'public.inquiries'::regclass
    and c.conname = 'inquiries_experience_known'
    and c.contype = 'c';

  if constraint_definition is null then
    raise exception 'No existe public.inquiries.inquiries_experience_known como CHECK; se cancela sin cambios.';
  end if;

  if position('experience_id' in constraint_definition) = 0 then
    raise exception 'La restricción encontrada no parece validar experience_id; se cancela sin cambios. Definición: %', constraint_definition;
  end if;

  alter table public.inquiries
    drop constraint inquiries_experience_known;

  alter table public.inquiries
    add constraint inquiries_experience_known
    check (experience_id = any (array[
      'death-road'::text,
      'el-choro'::text,
      'isla-del-sol'::text,
      'pico-tunari'::text,
      'vacas'::text,
      'asesoramiento'::text
    ])) not valid;
end
$$;

commit;

-- Verifica el CHECK instalado y revisa que la política INSERT también acepte
-- los identificadores del catálogo (si no, la política deberá sincronizarse).
select c.conname, pg_get_constraintdef(c.oid) as definition, c.convalidated
from pg_constraint c
where c.conrelid = 'public.inquiries'::regclass
  and c.conname = 'inquiries_experience_known';

select policyname, cmd, roles, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'inquiries'
  and cmd in ('INSERT', 'ALL');
