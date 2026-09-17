create table categorias (
    id uuid default gen_random_uuid() primary key,
    nome text not null,
    tipo text not null -- 'receita' ou 'despesa'
);

create table transacoes (
    id uuid default gen_random_uuid() primary key,
    descricao text not null,
    valor numeric not null,
    tipo text not null,
    data timestamp with time zone default now(),
    categoria_id uuid references categorias(id),
    user_id uuid default auth.uid() not null
);

insert into categorias (nome, tipo) values ('Alimentação', 'despesa'), ('Transporte', 'despesa'),
('Lazer', 'despesa'), ('Salário', 'receita'), ('Freelance', 'receita');

alter table categorias enable row level security;
create policy "Leitura pública de categorias" on categorias 
for select to authenticated using (true);

alter table transacoes enable row level security;
create policy "Usuários gerenciam seus próprios dados" on transacoes
for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Permitir atualização para usuários autenticados"
on transacoes for update to authenticated 
using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Permitir exclusão para usuários autenticados"
on transacoes for delete to authenticated
using (auth.uid() = user_id);