
-- +migrate Up
create table if not exists blogs (
  id bigserial primary key,
  title varchar(255) not null,
  url varchar(255) not null,
  kind integer not null,
  published_at timestamp not null,
  created_at timestamp not null,
  updated_at timestamp not null
);

create table if not exists technologies (
  id bigserial primary key,
  name varchar(127) not null,
  logo_url varchar(255) not null,
  tag_color varchar(7) not null,
  created_at timestamp not null,
  updated_at timestamp not null
);

create table if not exists blog_technology_tags (
  id bigserial primary key,
  blog_id bigint references blogs on delete cascade,
  technology_id bigint references technologies,
  created_at timestamp not null,
  updated_at timestamp not null
);
create index if not exists index_blog_tags_on_blog_id on blog_technology_tags (blog_id);
create index if not exists index_blog_tags_on_technology_id on blog_technology_tags (technology_id);

create table if not exists projects (
  id varchar(127) primary key,
  title varchar(127) not null,
  description varchar(255) not null,
  is_favorite boolean not null,
  position integer not null,
  created_at timestamp not null,
  updated_at timestamp not null
);

create table if not exists project_technology_tags (
  id bigserial primary key,
  project_id varchar(127) references projects on delete cascade,
  technology_id bigint references technologies,
  created_at timestamp not null,
  updated_at timestamp not null
);
create index if not exists index_project_tags_on_project_id on project_technology_tags (project_id);
create index if not exists index_project_tags_on_technology_id on project_technology_tags (technology_id);

create table if not exists project_links (
  id bigserial primary key,
  project_id varchar(127) references projects on delete cascade,
  url varchar(255) not null,
  kind integer not null,
  created_at timestamp not null,
  updated_at timestamp not null
);
create index if not exists index_project_links_on_project_id on project_links (project_id);

create table if not exists tech_stacks (
  id bigserial primary key,
  technology_id bigint references technologies on delete cascade,
  proficiency integer not null,
  created_at timestamp not null,
  updated_at timestamp not null
);
create index if not exists index_tech_stacks_on_technology_id on tech_stacks (technology_id);


-- +migrate Down
drop index if exists index_tech_stacks_on_technology_id;
drop table if exists tech_stacks;
drop index if exists index_project_links_on_project_id;
drop table if exists project_links;
drop index if exists index_project_tags_on_technology_id;
drop index if exists index_project_tags_on_project_id;
drop table if exists project_technology_tags;
drop table if exists projects;
drop index if exists index_blog_tags_on_technology_id;
drop index if exists index_blog_tags_on_blog_id;
drop table if exists blog_technology_tags;
drop table if exists technologies;
drop table if exists blogs;