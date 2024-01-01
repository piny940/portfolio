create table if not exists blogs (
  id bigserial primary key,
  title varchar(255) not null,
  url varchar(255) not null,
  kind integer not null,
  created_at timestamp not null,
  updated_at timestamp not null
);

create table if not exists technologies (
  id varchar(127) primary key,
  name varchar(127) not null,
  logo_url varchar(255) not null,
  tag_color varchar(7) not null,
  created_at timestamp not null,
  updated_at timestamp not null
);

create table if not exists blog_tags (
  id bigserial primary key,
  blog_id bigint not null,
  technology_id varchar(127) not null,
  created_at timestamp not null,
  updated_at timestamp not null,
  foreign key (blog_id) references blogs(id),
  foreign key (technology_id) references technologies(id)
);
create index if not exists index_blog_tags_on_blog_id on blog_tags (blog_id);
create index if not exists index_blog_tags_on_technology_id on blog_tags (technology_id);

create table if not exists qiita_articles (
  id bigserial primary key,
  blog_id bigint not null,
  content text not null,
  published_at timestamp not null,
  edited_at timestamp not null,
  likes_count integer not null,
  stocks_count integer not null,
  qiita_id bigint not null,
  views_count integer not null,
  raw_body text not null,
  created_at timestamp not null,
  updated_at timestamp not null,
  foreign key (blog_id) references blogs(id)
);
create index if not exists index_qiita_articles_on_blog_id on qiita_articles (blog_id);

create table if not exists projects (
  id varchar(127) primary key,
  title varchar(127) not null,
  description varchar(255) not null,
  is_favorite boolean not null,
  created_at timestamp not null,
  updated_at timestamp not null
);

create table if not exists project_tags (
  id bigserial primary key,
  project_id varchar(127) not null,
  technology_id varchar(127) not null,
  created_at timestamp not null,
  updated_at timestamp not null,
  foreign key (project_id) references projects(id),
  foreign key (technology_id) references technologies(id)
);
create index if not exists index_project_tags_on_project_id on project_tags (project_id);
create index if not exists index_project_tags_on_technology_id on project_tags (technology_id);

create table if not exists project_links (
  id bigserial primary key,
  project_id varchar(127) not null,
  url varchar(255) not null,
  kind integer not null,
  created_at timestamp not null,
  updated_at timestamp not null,
  foreign key (project_id) references projects(id)
);
create index if not exists index_project_links_on_project_id on project_links (project_id);

create table if not exists tech_stacks (
  id bigserial primary key,
  technology_id varchar(127) not null,
  proficiency integer not null,
  created_at timestamp not null,
  updated_at timestamp not null,
  foreign key (technology_id) references technologies(id)
);
create index if not exists index_tech_stacks_on_technology_id on tech_stacks (technology_id);
