drop database if exists madbtest;
create database madbtest;
use madbtest;

DROP TABLE IF EXISTS activities;
CREATE TABLE activities (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description text COLLATE utf8_unicode_ci,
  -- parent_id int(11) DEFAULT NULL,
  project_manager_id int(11) DEFAULT NULL,
  created_at datetime DEFAULT NULL,
  updated_at datetime DEFAULT NULL,
  colour_id int(11) DEFAULT NULL,
  a_type_id int(11) DEFAULT NULL,
  ended tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  KEY index_activites_on_project_manager_id (project_manager_id)
) ENGINE=InnoDB AUTO_INCREMENT=3706 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*LOCK TABLES activities WRITE;
INSERT INTO activities VALUES (3688,'Activité 1',NULL,NULL,'2020-01-27 17:24:40','2020-01-27 16:31:05','#FF3333','mission',0,NULL),(3689,'Tâche 1.1',NULL,3688,'2020-01-27 17:26:01','2020-01-27 17:26:01',NULL,NULL,0,NULL),(3690,'Tâche 1.2',NULL,3688,'2020-01-27 17:26:01','2020-01-27 17:26:01',NULL,NULL,0,NULL),(3691,'Tâche 1.3',NULL,3688,'2020-01-27 17:26:01','2020-01-27 17:26:01',NULL,NULL,0,NULL),(3692,'Tâche 1.4',NULL,3688,'2020-01-27 17:26:01','2020-01-27 17:26:01',NULL,NULL,0,NULL),(3693,'Tâche 1.5',NULL,3688,'2020-01-27 17:26:01','2020-01-27 17:26:01',NULL,NULL,0,NULL),(3694,'Activité 2',NULL,NULL,'2020-01-27 17:26:53','2020-01-27 17:26:53','#3399ff','projet',0,NULL),(3695,'Tâche 2.1',NULL,3694,'2020-01-27 17:27:22','2020-01-27 17:27:22',NULL,NULL,0,NULL),(3696,'Tâche 2.2',NULL,3694,'2020-01-27 17:27:22','2020-01-27 17:27:22',NULL,NULL,0,NULL),(3697,'Tâche 2.3',NULL,3694,'2020-01-27 17:27:22','2020-01-27 17:27:22',NULL,NULL,0,NULL),(3698,'Tâche 2.4',NULL,3694,'2020-01-27 17:27:22','2020-01-27 17:27:22',NULL,NULL,0,NULL),(3699,'Activité 3',NULL,NULL,'2020-01-27 17:28:05','2020-01-27 17:28:05','#5cd65c','autre',0,NULL),(3700,'Tâche 3.1',NULL,3699,'2020-01-27 17:28:41','2020-01-27 17:28:41',NULL,NULL,0,NULL),(3701,'Tâche 3.2',NULL,3699,'2020-01-27 17:28:41','2020-01-27 17:28:41',NULL,NULL,0,NULL),(3702,'Tâche 3.3',NULL,3699,'2020-01-27 17:28:41','2020-01-27 17:28:41',NULL,NULL,0,NULL),(3703,'Tâche 3.4',NULL,3699,'2020-01-27 17:28:41','2020-01-27 17:28:41',NULL,NULL,0,NULL),(3704,'Tâche 3.5',NULL,3699,'2020-01-27 17:28:41','2020-01-27 17:28:41',NULL,NULL,0,NULL),(3705,'Tâche 3.6',NULL,3699,'2020-01-27 17:28:41','2020-01-27 17:28:41',NULL,NULL,0,NULL);
UNLOCK TABLES;*/

DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description text COLLATE utf8_unicode_ci,
  activity_id int(11) DEFAULT NULL,
  created_at datetime DEFAULT NULL,
  updated_at datetime DEFAULT NULL,
  cloturee tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  KEY index_activites_on_activity_id (activity_id)
) ENGINE=InnoDB AUTO_INCREMENT=3706 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


DROP TABLE IF EXISTS activities_assignments;
CREATE TABLE activities_assignments (
  user_id int(11) NOT NULL DEFAULT '0',
  activity_id int(11) NOT NULL DEFAULT '0',
  description text COLLATE utf8_unicode_ci,
  created_at datetime DEFAULT NULL,
  updated_at datetime DEFAULT NULL,
  PRIMARY KEY (user_id,activity_id),
  KEY activity_id (activity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*LOCK TABLES activities_assignments WRITE;
INSERT INTO activities_assignments VALUES (96,3699,NULL,'2020-01-27 16:28:58','2020-01-27 16:28:58'),(97,3694,NULL,'2020-01-27 16:32:08','2020-01-27 16:32:08'),(98,3688,NULL,'2020-01-27 16:32:01','2020-01-27 16:32:01');
UNLOCK TABLES;*/

DROP TABLE IF EXISTS tasks_assignments;
CREATE TABLE tasks_assignments (
  user_id int(11) NOT NULL DEFAULT '0',
  task_id int(11) NOT NULL DEFAULT '0',
  description text COLLATE utf8_unicode_ci,
  created_at datetime DEFAULT NULL,
  updated_at datetime DEFAULT NULL,
  PRIMARY KEY (user_id,task_id),
  KEY task_id (task_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  responsible_id int(11) DEFAULT NULL,
  created_at datetime DEFAULT NULL,
  updated_at datetime DEFAULT NULL,
  PRIMARY KEY (id),
  KEY responsible_id (responsible_id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*LOCK TABLES departments WRITE;
INSERT INTO departments VALUES (7,'Département 1',96,NULL,'2020-01-28 11:43:09'),(8,'Département 2',98,NULL,'2020-01-28 11:43:19');
UNLOCK TABLES;*/

DROP TABLE IF EXISTS events;
CREATE TABLE events (
  user_id int(11) DEFAULT NULL,
  task_id int(11) DEFAULT NULL,
  description text COLLATE utf8_unicode_ci,
  duration float DEFAULT NULL,
  created_at datetime DEFAULT NULL,
  updated_at datetime DEFAULT NULL,
  start datetime DEFAULT NULL,
  end datetime DEFAULT NULL,
  id int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  KEY task_id (task_id),
  KEY user_id (user_id)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*LOCK TABLES events WRITE;
INSERT INTO events VALUES (96,3701,'Tâche de l\'admin',1.5,'2020-01-28 09:43:10','2020-01-28 09:43:22','2020-01-27 08:00:00','2020-01-27 09:30:00',1),(96,3705,'Une autre tâche de l\'admin',2,'2020-01-28 09:43:24','2020-01-28 09:43:34','2020-01-27 12:00:00','2020-01-27 14:00:00',2),(98,3691,'Tâche moderator',1.5,'2020-01-28 09:43:48','2020-01-28 09:44:00','2020-01-27 09:00:00','2020-01-27 10:30:00',3),(98,3693,'Événement moderator',2,'2020-01-28 09:44:02','2020-01-28 09:44:15','2020-01-27 11:30:00','2020-01-27 13:30:00',4),(97,3697,'Un événement',2,'2020-01-28 09:44:25','2020-01-28 09:44:37','2020-01-27 10:00:00','2020-01-27 12:00:00',5),(97,3697,'Un autre événement',2,'2020-01-28 09:44:41','2020-01-28 09:44:47','2020-01-27 13:30:00','2020-01-27 15:30:00',6);
UNLOCK TABLES;*/

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  login varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  lastname varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  firsname varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  department_id int(11) DEFAULT NULL,
  created_at datetime DEFAULT NULL,
  updated_at datetime DEFAULT NULL,
  role_id int(11)  DEFAULT 1,
  email varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  passw varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  token varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY index_personnes_on_email (email),
  KEY departement_id (department_id)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*LOCK TABLES users WRITE;
INSERT INTO users VALUES (96,'admin','Timetrack','Admin',8,'2020-01-27 16:13:37','2020-01-28 11:42:13','admin','admin@domain.be','$2a$10$NiIsHp71VzWe/.lPqZZI1eH2wOWBEzZsC5qzDp1fCdPffoVwHOLfu'),(97,'user','Timetrack','User',7,'2020-01-27 16:14:06','2020-01-28 09:44:22','user','user@domain.be','$2a$10$ohA3Sldp28L/L8be00q7iOFxNnZzzTaK1kBX3XbltDbXWsaZiW/b6'),(98,'moderator','Timetrack','Moderator',8,'2020-01-27 16:14:43','2020-01-28 09:43:44','moderator','moderator@domain.be','$2a$10$6eH1zDZ31VsfbOf/Lx7XlO/D0P93p1VUMkGe4cMZVxGi861XEG6kW');
UNLOCK TABLES;*/

DROP TABLE IF EXISTS colours;
CREATE TABLE colours (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS a_types;
CREATE TABLE a_types (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;





ALTER TABLE tasks ADD CONSTRAINT tasks_ibfk_1 FOREIGN KEY (activity_id) REFERENCES activities (id);
ALTER TABLE activities_assignments ADD CONSTRAINT activity_assignments_ibfk_2 FOREIGN KEY (activity_id) REFERENCES activities (id); 
ALTER TABLE activities_assignments ADD CONSTRAINT activity_assignments_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE departments ADD CONSTRAINT departments_ibfk_1 FOREIGN KEY (responsible_id) REFERENCES users (id);
ALTER TABLE events ADD CONSTRAINT events_ibfk_1 FOREIGN KEY (task_id) REFERENCES tasks (id);
ALTER TABLE users ADD CONSTRAINT users_ibfk_1 FOREIGN KEY (department_id) REFERENCES departments (id);
ALTER TABLE tasks_assignments ADD CONSTRAINT tasks_assignments_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE events ADD CONSTRAINT events_ibfk_2 FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE tasks_assignments ADD CONSTRAINT tasks_assignments_ibfk_2 FOREIGN KEY (task_id) REFERENCES tasks (id);
ALTER TABLE activities ADD CONSTRAINT activities_ibfk_1 FOREIGN KEY (a_type_id) REFERENCES a_types (id);
ALTER TABLE activities ADD CONSTRAINT activities_ibfk_2 FOREIGN KEY (colour_id) REFERENCES colours (id);
ALTER TABLE activities ADD CONSTRAINT activities_ibfk_3 FOREIGN KEY (project_manager_id) REFERENCES users (id);
ALTER TABLE users ADD CONSTRAINT users_ibfk_2 FOREIGN KEY (role_id) REFERENCES roles (id);
  
  