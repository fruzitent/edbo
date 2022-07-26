create database edbo encoding = 'UTF8';
\c edbo

create table edbo.public.offers
(
  data jsonb not null
);

create table edbo.public.programs
(
  ids text    not null,
  n   numeric not null,
  uid numeric not null,
  un  text    not null
);

create table edbo.public.users
(
  data jsonb not null
);
