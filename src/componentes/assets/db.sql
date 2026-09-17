create table categorias (
    id uuid default gen_random_uuid() primary key,
    nome text not null,
    tipo text not null --'receita' ou 'despesa'
);

create table transacoees (
  id uuid defalt gen_random_uuid() primary key,
  descricao text not null,
   valor numeric not null,
   tipot text not null,
   data timestamp with time zone defalt now(),
   categoria_id uuid references categorias(id)

);

insert into categorias (nome, tipo) values
('Alimentação', 'despesa'), ('Transporte', 'despesa'),
('Lazer', 'despesa'),
('salario', 'receita'), ('freelance', 'receita');

alter table categorias enable row level security;
create policy "Leitura pública de categorias" on categorias
for select to authenticated using (true);

alter table transacoees enable row level security
create policy "Usuários gerenciam seus próprios dados" on transacoees
for all to authenticated using (auth.uid() = user_id) with
check (auth.uid() = user_id);

create policy "Permitir atualização para usuarios autenticados"
on transacoees for update to authenticated
using (auth.uid() =user_id) with check (auth.uid() = user_id);

create policy "permitir exclusao para usuarios autrnticados"
on transacoes for delete to authenticated using
(auth.uid() = user_id);