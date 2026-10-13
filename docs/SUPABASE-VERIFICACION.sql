-- Consultas de solo lectura para ejecutar en Supabase > SQL Editor.
-- Verifican la tabla, RLS, política y privilegios efectivos tras la migración.

-- 1) Columnas esperadas y atributos clave.
select
  column_name,
  data_type,
  is_nullable,
  column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'inquiries'
order by ordinal_position;

-- 2) Confirma que cada columna requerida exista.
with expected(column_name) as (
  values
    ('id'), ('created_at'), ('name'), ('email'), ('experience_id'), ('message'),
    ('country'), ('city'), ('whatsapp'), ('requested_date'), ('participants'),
    ('preferred_payment'), ('status')
)
select expected.column_name, columns.column_name is not null as exists
from expected
left join information_schema.columns as columns
  on columns.table_schema = 'public'
 and columns.table_name = 'inquiries'
 and columns.column_name = expected.column_name
order by expected.column_name;

-- 3) email debe aceptar NULL; status debe tener default 'new' y ser NOT NULL.
select
  max(is_nullable) filter (where column_name = 'email') as email_is_nullable,
  max(is_nullable) filter (where column_name = 'status') as status_is_nullable,
  max(column_default) filter (where column_name = 'status') as status_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'inquiries'
  and column_name in ('email', 'status');

-- 4) RLS debe estar activo. rls_forced puede continuar false según la migración.
select relrowsecurity as rls_enabled, relforcerowsecurity as rls_forced
from pg_class
where oid = 'public.inquiries'::regclass;

-- 5) Revisa nombre y condición real de las políticas.
select policyname, permissive, roles, cmd, qual as using_condition, with_check as insert_check
from pg_policies
where schemaname = 'public'
  and tablename = 'inquiries'
order by policyname;

-- 6) Privilegios EFECTIVOS, incluidos los heredados de PUBLIC.
-- Esperado: SELECT/UPDATE/DELETE false para ambos roles;
-- anon puede insertar columnas autorizadas, pero no email/status/id/created_at.
select
  role_name,
  has_table_privilege(role_name, 'public.inquiries', 'SELECT') as can_select,
  has_table_privilege(role_name, 'public.inquiries', 'INSERT') as can_insert_table,
  has_any_column_privilege(role_name, 'public.inquiries', 'INSERT') as can_insert_any_column,
  has_table_privilege(role_name, 'public.inquiries', 'UPDATE') as can_update,
  has_table_privilege(role_name, 'public.inquiries', 'DELETE') as can_delete,
  has_column_privilege(role_name, 'public.inquiries', 'name', 'INSERT') as can_insert_name,
  has_column_privilege(role_name, 'public.inquiries', 'email', 'INSERT') as can_insert_email,
  has_column_privilege(role_name, 'public.inquiries', 'status', 'INSERT') as can_insert_status,
  has_column_privilege(role_name, 'public.inquiries', 'id', 'INSERT') as can_insert_id
from (values ('anon'), ('authenticated')) as roles(role_name);

-- 7) Revisa restricciones CHECK y comprueba que el catálogo de experiencias
-- coincida con src/data/experiences.js antes de insertar desde React.
select c.conname, pg_get_constraintdef(c.oid) as definition, c.convalidated
from pg_constraint c
where c.conrelid = 'public.inquiries'::regclass
  and c.contype = 'c'
order by c.conname;
