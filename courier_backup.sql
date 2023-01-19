-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: courier_app
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id_client` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(11) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `street` varchar(20) DEFAULT NULL,
  `street_number` int DEFAULT NULL,
  `client_code` varchar(25) NOT NULL,
  `county` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_client`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `client_code` (`client_code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'a','b','test@gmail.com','$2b$10$Sbe23Wka7dZy9cSNoxlmGe4N9gYrifE61U895LpUuwMb2Uhzn8G4m',NULL,NULL,NULL,NULL,NULL,'ca56d4fec6',NULL),(2,'a','b','test2@gmail.com','$2b$10$4KNfku5fJvFSJhxTs0p.Z.YtgtUsFi1s8DTLpGSGet75lsg2xVt2e',NULL,NULL,NULL,NULL,NULL,'5bb53f75ee',NULL),(3,'a','b','test3@gmail.com','$2b$10$wJ3ePVYavoIaGAQ.bcD5MuvAbnBB2/HNBLStWypnSLuGn26qgeCBi',NULL,NULL,NULL,NULL,NULL,'df82632b78',NULL),(4,'a','b','a@abc.c','$2b$10$tnWTZUufVel8hAts5WnSPuZ9fZzIqvQNbVWCdkpOHPRyrGOy1vd8O',NULL,NULL,NULL,NULL,NULL,'9848c05028',NULL),(5,'a','b','test1@gmail.com','$2b$10$SlGGGbSy9yuMT5FrPaPIAOuPZKZHic37g7iybl/R1zmD7Bo8hMvRy','072323456','Bucharest','245800','Iuliu Maniu',21,'322fa6c417','Bucharest');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposits`
--

DROP TABLE IF EXISTS `deposits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deposits` (
  `id_deposit` int NOT NULL AUTO_INCREMENT,
  `x_pos` float NOT NULL,
  `y_pos` float NOT NULL,
  `manager_id` int DEFAULT NULL,
  `schedule_start` varchar(10) NOT NULL,
  `schedule_end` varchar(10) NOT NULL,
  PRIMARY KEY (`id_deposit`),
  KEY `deposits_fk0` (`manager_id`),
  CONSTRAINT `deposits_fk0` FOREIGN KEY (`manager_id`) REFERENCES `employees` (`id_employee`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposits`
--

LOCK TABLES `deposits` WRITE;
/*!40000 ALTER TABLE `deposits` DISABLE KEYS */;
INSERT INTO `deposits` VALUES (1,26.1015,44.4349,1,'09:00','17:00'),(2,26.0922,44.4375,6,'10:00','18:00'),(3,26.0905,44.4367,6,'10:00','18:00'),(4,26.1054,44.439,6,'10:00','18:00');
/*!40000 ALTER TABLE `deposits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id_employee` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(11) NOT NULL,
  `city` varchar(20) DEFAULT NULL,
  `county` varchar(20) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `street` varchar(20) DEFAULT NULL,
  `street_number` int DEFAULT NULL,
  `wage` int NOT NULL,
  `role` varchar(10) NOT NULL,
  `ssn` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_employee`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Andrei','Radu','andrei@curier.io','$2b$10$SlGGGbSy9yuMT5FrPaPIAOuPZKZHic37g7iybl/R1zmD7Bo8hMvRy','0734291655','Bucharest','Bucharest','354201','Iuliu Maniu',20,10000,'admin','1234567891011'),(5,'Vasile','Moldoveanu','vmoldoveanu@curier.io','$2b$10$FGtM7U9EdqkxY74smekoL.9z/5gWuUt2n.P6undxewLJxopU9PPBa','07334202132','Bucharest','Bucharest','356214','Calea Victoriei',3,2000,'driver','1111111111111'),(6,'David','Popescu','david@curier.io','$2b$10$6ohb2q2xrTv9BtrkRPHHHeCbVwXOrVspQR/AqVgRZAz9iS5M9Jc5e','07123546789','Bucharest','Bucharest','123456','Gara',3,7000,'admin','1234567891012'),(7,'x','x','x@curier.io','$2b$10$ZJ3fCshI7Z7y/ipX4Hmu0OjMoMZvA0m620x2.mLN4wghnwR.ZMgFm','1','b','b','2','d',2,1000,'admin','1');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_status`
--

DROP TABLE IF EXISTS `package_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `package_status` (
  `id_pack_status` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `status_id` int NOT NULL,
  PRIMARY KEY (`id_pack_status`),
  KEY `PACKAGE_STATUS_fk0` (`package_id`),
  KEY `PACKAGE_STATUS_fk1` (`status_id`),
  CONSTRAINT `PACKAGE_STATUS_fk0` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id_package`),
  CONSTRAINT `PACKAGE_STATUS_fk1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_status`
--

LOCK TABLES `package_status` WRITE;
/*!40000 ALTER TABLE `package_status` DISABLE KEYS */;
INSERT INTO `package_status` VALUES (2,6,2),(5,9,2);
/*!40000 ALTER TABLE `package_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packages`
--

DROP TABLE IF EXISTS `packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packages` (
  `id_package` int NOT NULL AUTO_INCREMENT,
  `weight` int NOT NULL,
  `cost` int NOT NULL,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `driver_id` int DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `date_delivered` datetime DEFAULT NULL,
  PRIMARY KEY (`id_package`),
  KEY `PACKAGES_fk0` (`sender_id`),
  KEY `PACKAGES_fk1` (`receiver_id`),
  KEY `PACKAGES_fk2` (`driver_id`),
  CONSTRAINT `PACKAGES_fk0` FOREIGN KEY (`sender_id`) REFERENCES `clients` (`id_client`),
  CONSTRAINT `PACKAGES_fk1` FOREIGN KEY (`receiver_id`) REFERENCES `clients` (`id_client`),
  CONSTRAINT `PACKAGES_fk2` FOREIGN KEY (`driver_id`) REFERENCES `employees` (`id_employee`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
INSERT INTO `packages` VALUES (6,22,83,5,2,1,'2023-01-19 00:00:00','2023-01-19 00:00:00'),(9,28,105,2,1,1,'2023-01-18 00:00:00','2023-01-19 00:00:00');
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id_status` int NOT NULL AUTO_INCREMENT,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'In Transit'),(2,'Delivered'),(4,'In Deposit');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `id_vehicle` int NOT NULL AUTO_INCREMENT,
  `model` varchar(50) NOT NULL,
  `county` varchar(2) NOT NULL,
  `number` int NOT NULL,
  `alpha_characters` varchar(3) NOT NULL,
  `driver_id` int DEFAULT NULL,
  PRIMARY KEY (`id_vehicle`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES (1,'logan','B',3,'ABC',5);
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-19 23:43:53
