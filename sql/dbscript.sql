drop database if exists madbtest;
create database madbtest;
use madbtest;

DROP TABLE IF EXISTS activities;
CREATE TABLE activities (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description text COLLATE utf8_unicode_ci,
  projectManagerId int(11) DEFAULT NULL,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  colourId int(11) DEFAULT NULL,
  aTypeId int(11) DEFAULT NULL,
  ended tinyint(1) NOT NULL DEFAULT 0,
  crmId varchar(255),
  PRIMARY KEY (id),
  KEY index_activites_on_project_managerId (projectManagerId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  description text COLLATE utf8_unicode_ci,
  activityId int(11) DEFAULT NULL,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  ended tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY index_activites_on_activityId (activityId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS activitiesAssignments;
CREATE TABLE activitiesAssignments (
  userId int(11) NOT NULL DEFAULT 0,
  activityId int(11) NOT NULL DEFAULT 0,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  PRIMARY KEY (userId,activityId),
  KEY activityId (activityId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS tasksAssignments;
CREATE TABLE tasksAssignments (
  userId int(11) NOT NULL DEFAULT 0,
  taskId int(11) NOT NULL DEFAULT 0,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  PRIMARY KEY (userId,taskId),
  KEY taskId (taskId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  responsibleId int(11) DEFAULT NULL,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  PRIMARY KEY (id),
  KEY responsibleId (responsibleId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id int(11) NOT NULL AUTO_INCREMENT,
  userId int(11) DEFAULT NULL,
  taskId int(11) DEFAULT NULL,
  description text COLLATE utf8_unicode_ci,
  duration float DEFAULT NULL,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  startAt datetime DEFAULT NULL,
  endAt datetime DEFAULT NULL,
  PRIMARY KEY (id),
  KEY taskId (taskId),
  KEY userId (userId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  login varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  lastName varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  firstName varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  departmentId int(11) DEFAULT NULL,
  createdAt datetime DEFAULT NULL,
  updatedAt datetime DEFAULT NULL,
  roleId int(11)  DEFAULT NULL,
  email varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `password` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (id),
  UNIQUE KEY index_personnes_on_email (email),
  KEY departementId (departmentId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS colours;
CREATE TABLE colours (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  code varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS aTypes;
CREATE TABLE aTypes (
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


ALTER TABLE tasks ADD CONSTRAINT tasks_ibfk_1 FOREIGN KEY (activityId) REFERENCES activities (id);
ALTER TABLE activitiesAssignments ADD CONSTRAINT activity_assignments_ibfk_2 FOREIGN KEY (activityId) REFERENCES activities (id);
ALTER TABLE activitiesAssignments ADD CONSTRAINT activity_assignments_ibfk_1 FOREIGN KEY (userId) REFERENCES users (id);
ALTER TABLE departments ADD CONSTRAINT departments_ibfk_1 FOREIGN KEY (responsibleId) REFERENCES users (id);
ALTER TABLE events ADD CONSTRAINT events_ibfk_1 FOREIGN KEY (taskId) REFERENCES tasks (id);
ALTER TABLE users ADD CONSTRAINT users_ibfk_1 FOREIGN KEY (departmentId) REFERENCES departments (id);
ALTER TABLE tasksAssignments ADD CONSTRAINT tasks_assignments_ibfk_1 FOREIGN KEY (userId) REFERENCES users (id);
ALTER TABLE events ADD CONSTRAINT events_ibfk_2 FOREIGN KEY (userId) REFERENCES users (id);
ALTER TABLE tasksAssignments ADD CONSTRAINT tasks_assignments_ibfk_2 FOREIGN KEY (taskId) REFERENCES tasks (id);
ALTER TABLE activities ADD CONSTRAINT activities_ibfk_1 FOREIGN KEY (aTypeId) REFERENCES aTypes (id);
ALTER TABLE activities ADD CONSTRAINT activities_ibfk_2 FOREIGN KEY (colourId) REFERENCES colours (id);
ALTER TABLE activities ADD CONSTRAINT activities_ibfk_3 FOREIGN KEY (projectManagerId) REFERENCES users (id);
ALTER TABLE users ADD CONSTRAINT users_ibfk_2 FOREIGN KEY (roleId) REFERENCES roles (id);
  
INSERT INTO roles (name ) VALUES ('Utilisateur'), ('Chef de projet'), ('Moderateur'), ('Administrateur');
INSERT INTO departments (name , createdAt , updatedAt) VALUES ('R&D', '2020-03-02', '2020-03-02');
INSERT INTO aTypes (name ) VALUES ('Projet'), ('Mission'), ('Autre');
INSERT INTO users (departmentId , email , firstName , lastName , roleId , createdAt , updatedAt, login, `password` ) VALUES (1, 'emailpourtest@test.test', 'Test', 'TEST', 4, '2020-03-02', '2020-03-02', 'admin', 'Admin2020');
INSERT INTO users (departmentId , email , firstName , lastName , roleId , createdAt , updatedAt) VALUES (1, 'emailtest@test.test', 'Test', 'TEST', 2, '2020-03-02', '2020-03-02');
INSERT INTO users (departmentId , email , firstName , lastName , roleId , createdAt , updatedAt) VALUES (1, 'emaiergltest@test.test', 'Teergst', 'TEergergST', 2, '2020-03-02', '2020-03-02');
UPDATE departments SET departments.responsibleId = 1 WHERE departments.id = 1;
INSERT INTO colours (name , code ) VALUES ('Vert Fonce', '#53853d'), ('Vert CETIC', '#6fb052'), ('Vert clair', '#d7e6cc'), ('Gris Fonce', '#5a5a5a'), ('Gris Moyen', '#808080'), ('Gris clair', '#cccccc'), ('Rouge ECS', '#f62f00'), ('Jaune SSE', '#feb602'), ('Bleu SST', '#00b0f0'), ('Bleu fonce', '#0070c0'), ('Mauve', '#7030a0');
INSERT INTO activities (aTypeId , colourId , createdAt, updatedAt , description , ended , name , projectManagerId ) VALUES (1, 2, '2020-03-02','2020-03-02' , 'on fait des tests', 0, 'Tests', 2);
INSERT INTO activities (aTypeId , colourId , createdAt, updatedAt , description , ended , name , projectManagerId ) VALUES (1, 2, '2020-03-02','2020-03-02' , 'on fait des tests', 0, 'ergerg', 2);
INSERT INTO activities (aTypeId , colourId , createdAt, updatedAt , description , ended , name , projectManagerId ) VALUES (1, 2, '2020-03-02','2020-03-02' , 'on fawergests', 0, 'ergerg', 2);
INSERT INTO activities (aTypeId , colourId , createdAt, updatedAt , description , ended , name , projectManagerId ) VALUES (1, 2, '2020-03-02','2020-03-02' , 'on fawerg tests', 0, 'erg', 2);
INSERT INTO activities (aTypeId , colourId , createdAt, updatedAt , description , ended , name , projectManagerId ) VALUES (1, 2, '2020-03-02','2020-03-02' , 'on faergtests', 0, 'reg', 2);
INSERT INTO tasks (activityId, ended, createdAt, updatedAt , name, description ) VALUES (1, 0, '2020-03-02',  '2020-03-02', 'tache test', 'ceci est un petit test');
INSERT INTO tasks (activityId, ended, createdAt, updatedAt , name, description ) VALUES (2, 0, '2020-03-03',  '2020-03-04', 'tafwe test 2', 'ceci est wefwef petit test');
INSERT INTO tasks (activityId, ended, createdAt, updatedAt , name, description ) VALUES (5, 0, '2020-03-03',  '2020-03-04', 'tacwefwefwfest 2', 'ceci est un autre petit test');
INSERT INTO tasks (activityId, ended, createdAt, updatedAt , name, description ) VALUES (3, 0, '2020-03-03',  '2020-03-04', 'tacwefst 2', 'ceci est un auwefwefit test');
INSERT INTO tasks (activityId, ended, createdAt, updatedAt , name, description ) VALUES (1, 0, '2020-03-03',  '2020-03-04', 'tacwefwefwef 2', 'ceci eswefwutre petit test');
INSERT INTO tasksAssignments (taskId , userId, createdAt , updatedAt ) VALUES (1, 1, '2020-03-02', '2020-03-02');
INSERT INTO tasksAssignments (taskId , userId, createdAt , updatedAt ) VALUES (2, 3, '2020-03-02', '2020-03-02');
INSERT INTO tasksAssignments (taskId , userId, createdAt , updatedAt ) VALUES (3, 1, '2020-03-02', '2020-03-02');
INSERT INTO tasksAssignments (taskId , userId, createdAt , updatedAt ) VALUES (4, 3, '2020-03-02', '2020-03-02');
INSERT INTO tasksAssignments (taskId , userId, createdAt , updatedAt ) VALUES (5, 2, '2020-03-02', '2020-03-02');
INSERT INTO activitiesAssignments (activityId , userId, createdAt , updatedAt ) VALUES (1, 1, '2020-03-02', '2020-03-02');
INSERT INTO activitiesAssignments (activityId , userId, createdAt , updatedAt ) VALUES (2, 2, '2020-03-02', '2020-03-02');
INSERT INTO activitiesAssignments (activityId , userId, createdAt , updatedAt ) VALUES (3, 3, '2020-03-02', '2020-03-02');
INSERT INTO activitiesAssignments (activityId , userId, createdAt , updatedAt ) VALUES (4, 3, '2020-03-02', '2020-03-02');
INSERT INTO activitiesAssignments (activityId , userId, createdAt , updatedAt ) VALUES (5, 1, '2020-03-02', '2020-03-02');
INSERT INTO events (taskId , userId , description , startAt, endAt, duration , createdAt , updatedAt ) VALUES (1, 1, 'la description 1', '2020-03-03 8:30:00', '2020-03-03 10:30:00', 2, '2020-03-02', '2020-03-02'), (4, 1, 'la description 1', '2020-03-03 11:00:00', '2020-03-03 13:00:00', 2, '2020-03-02', '2020-03-02'), (1, 2, 'la description 1', '2020-03-03 13:30:00', '2020-03-03 15:00:00', 2, '2020-03-02', '2020-03-02'), (1, 3, 'la description 1', '2020-03-03 13:30:00', '2020-03-03 15:00:00', 2, '2020-03-02', '2020-03-02'), (5, 3, 'la description 1', '2020-03-03 13:30:00', '2020-03-03 15:00:00', 2, '2020-03-02', '2020-03-02');






