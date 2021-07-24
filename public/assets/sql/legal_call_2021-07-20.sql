USE legal_call
# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.35)
# Database: legal_call
# Generation Time: 2021-07-20 20:07:09 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table app_lang
# ------------------------------------------------------------

DROP TABLE IF EXISTS `app_lang`;

CREATE TABLE `app_lang` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `lang` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `app_lang` WRITE;
/*!40000 ALTER TABLE `app_lang` DISABLE KEYS */;

INSERT INTO `app_lang` (`id`, `lang`)
VALUES
	(1,'TR'),
	(2,'EN');

/*!40000 ALTER TABLE `app_lang` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table app_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `app_user`;

CREATE TABLE `app_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `address` text,
  `birth_date` date DEFAULT NULL,
  `gsm_number` varchar(10) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `idprocess` int(11) DEFAULT NULL,
  `idrole` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table group_has_members
# ------------------------------------------------------------

DROP TABLE IF EXISTS `group_has_members`;

CREATE TABLE `group_has_members` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `iduhg` int(11) DEFAULT NULL,
  `idgroup_member` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table process
# ------------------------------------------------------------

DROP TABLE IF EXISTS `process`;

CREATE TABLE `process` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `process_name` varchar(20) DEFAULT NULL,
  `process_desc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `process` WRITE;
/*!40000 ALTER TABLE `process` DISABLE KEYS */;

INSERT INTO `process` (`id`, `process_name`, `process_desc`)
VALUES
	(1,'ON_BORDING',NULL),
	(2,'ACTIVE',NULL),
	(3,'DELETED',NULL);

/*!40000 ALTER TABLE `process` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  `role_description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;

INSERT INTO `role` (`id`, `role_name`, `role_description`)
VALUES
	(1,'GROUP_MANAGER',NULL),
	(2,'GROUP_MEMBER',NULL);

/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table template_variable
# ------------------------------------------------------------

DROP TABLE IF EXISTS `template_variable`;

CREATE TABLE `template_variable` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `variable_name` varchar(20) DEFAULT NULL,
  `idlang` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `template_variable` WRITE;
/*!40000 ALTER TABLE `template_variable` DISABLE KEYS */;

INSERT INTO `template_variable` (`id`, `variable_name`, `idlang`)
VALUES
	(1,'FIRST_NAME',2),
	(2,'LAST_NAME',2),
	(3,'MEETING_DATETIME',2),
	(4,'LOCATION',2),
	(5,'MEETING_TOPIC',2),
	(6,'PROJECT_NAME',2),
	(7,'AD',1),
	(8,'SOYAD',1),
	(9,'TOPLANTI_TARİHİ',1),
	(10,'LOKASYON',1),
	(11,'TOPLANTI_KONUSU',1),
	(12,'PROJE_İSMİ',1);

/*!40000 ALTER TABLE `template_variable` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_has_group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_has_group`;

CREATE TABLE `user_has_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idgroup_owner` int(11) DEFAULT NULL,
  `group_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_has_template
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_has_template`;

CREATE TABLE `user_has_template` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `idgroup_owner` int(11) DEFAULT NULL,
  `template_name` varchar(20) DEFAULT NULL,
  `template_file` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
