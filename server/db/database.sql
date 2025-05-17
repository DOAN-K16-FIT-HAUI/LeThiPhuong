-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: eyeglasses
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apikeys`
--

DROP TABLE IF EXISTS `apikeys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apikeys` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `publicKey` text NOT NULL,
  `privateKey` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `apikeys_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apikeys`
--

LOCK TABLES `apikeys` WRITE;
/*!40000 ALTER TABLE `apikeys` DISABLE KEYS */;
/*!40000 ALTER TABLE `apikeys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES ('1a841fdb-e2fc-4ca3-b3bc-39e094af9a86','bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','279b60c5-4404-4989-8a25-76a76b9395e9',1,NULL,NULL,NULL,NULL,'2025-05-04 14:34:40','2025-05-04 14:34:40',NULL),('4bda2f98-06e3-4df1-a767-206397f79c7a','f0d43c47-444a-4a68-909d-97e233612c3e','0fb0fa94-c3bb-41d7-8884-7ddfaaff288a',6,NULL,NULL,NULL,NULL,'2025-05-04 14:38:06','2025-05-04 14:38:07',NULL),('8eecd781-a594-4888-9da3-d97ad5c33590','bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','260f3681-1a0b-405f-adf4-33550187d7aa',1,NULL,NULL,NULL,NULL,'2025-05-04 14:34:00','2025-05-04 14:34:00','buyNow'),('dc40318e-ef79-40e4-9fe0-36dfed4dca13','bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','294c38ca-1086-4d80-81a3-aa8540825a5e',2,NULL,NULL,NULL,NULL,'2025-05-04 14:33:51','2025-05-04 14:33:52',NULL),('deb4ea0c-d8b1-40a3-a3e7-d2cce2df17c4','f0d43c47-444a-4a68-909d-97e233612c3e','20d3e711-3169-4197-b7c4-ac8fb2d83f8b',9,NULL,NULL,NULL,NULL,'2025-05-04 14:38:22','2025-05-04 14:38:51',NULL);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('0cfb3d22-8763-4dda-bec3-e8043789293b','Kính cận ','2025-04-25 17:03:53','2025-04-30 03:47:02'),('8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','Kính râm','2025-04-25 15:05:01','2025-04-25 15:05:01'),('d9222df6-619c-45d8-bfe2-3725238f6fec','Kính trẻ em','2025-04-27 13:45:25','2025-04-27 13:45:25'),('e6d55230-bc5a-4716-94b7-138de8825bf1','Phụ kiện kính','2025-04-27 13:45:39','2025-04-27 13:45:39');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otps`
--

DROP TABLE IF EXISTS `otps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otps` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otps`
--

LOCK TABLES `otps` WRITE;
/*!40000 ALTER TABLE `otps` DISABLE KEYS */;
/*!40000 ALTER TABLE `otps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `idPayment` varchar(255) NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `typePayment` enum('cod','vnpay','momo') NOT NULL,
  `status` enum('pending','processing','completed','cancelled','shipping') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES ('0e27ea2a-c610-4e34-a91f-ffcac6ab4a8a','PAY174637078263742637','540f5b72-0d45-4690-94fa-b6d761958ee6','20d3e711-3169-4197-b7c4-ac8fb2d83f8b',25,'th','Hà Nội, Quận Ba Đình','0892738623',NULL,'cod','pending','2025-05-04 14:59:42','2025-05-04 14:59:42'),('1f8a748c-ea3b-4b0a-8051-ce36ec24025e','PAY174609347909959099','540f5b72-0d45-4690-94fa-b6d761958ee6','085b5ceb-8296-44c1-8061-16a186ba28ea',1,'Phuong Le','VietNam','0799162749',NULL,'vnpay','completed','2025-05-01 09:57:59','2025-05-01 10:00:59'),('2631648f-a216-43f2-9b31-ea3c98b3b4be','PAY174637078263742637','540f5b72-0d45-4690-94fa-b6d761958ee6','ad7a8d2d-c506-4786-b3ee-501388e487b6',1,'th','Hà Nội, Quận Ba Đình','0892738623',NULL,'cod','pending','2025-05-04 14:59:42','2025-05-04 14:59:42'),('2ddb462b-a2b4-402d-b1d7-c62ece0564b7','PAY174609347909959099','540f5b72-0d45-4690-94fa-b6d761958ee6','2fc87f3f-7d3b-4179-aad2-7b6f600b3216',6,'Phuong Le','VietNam','0799162749',NULL,'vnpay','completed','2025-05-01 09:57:59','2025-05-01 10:00:59'),('32d3a9a0-db98-45ad-bd5b-d1b1afa3a1a0','PAY174559880823128231','540f5b72-0d45-4690-94fa-b6d761958ee6','2a23a3d8-5f0b-403c-9481-cf89c05edafa',2,'Hiền','VietNam','2992',NULL,'vnpay','completed','2025-04-25 16:33:28','2025-04-25 16:56:06'),('337b7f72-678a-4efa-b4a1-ec872a7b766b','PAY174637078263742637','540f5b72-0d45-4690-94fa-b6d761958ee6','372bbb1f-5a8d-4366-af4c-6c2d72819477',2,'th','Hà Nội, Quận Ba Đình','0892738623',NULL,'cod','pending','2025-05-04 14:59:42','2025-05-04 14:59:42'),('357afc6b-f088-439b-a4b0-44a99235a34e','PAY174636902326223262','bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','537b293c-4dcb-422d-90e8-45196785cbb8',7,'KHOA','Hà Nội, Quận Hoàn Kiếm','0892738623',NULL,'vnpay','shipping','2025-05-04 14:30:23','2025-05-04 14:40:41'),('39932df0-361e-4500-b715-9d7a5f428440','PAY174609260144421444','bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','537b293c-4dcb-422d-90e8-45196785cbb8',1,'Khoa','Hà Nội, Quận Ba Đình','0789162749',NULL,'cod','completed','2025-05-01 09:43:21','2025-05-01 10:01:58'),('3b194813-43d0-44c0-8986-e76744daf4bb','PAY174637078263742637','540f5b72-0d45-4690-94fa-b6d761958ee6','279b60c5-4404-4989-8a25-76a76b9395e9',30,'th','Hà Nội, Quận Ba Đình','0892738623',NULL,'cod','pending','2025-05-04 14:59:42','2025-05-04 14:59:42'),('5171011d-0a22-4666-8a2b-6270cdff2dfa','PAY174637078263742637','540f5b72-0d45-4690-94fa-b6d761958ee6','372bbb1f-5a8d-4366-af4c-6c2d72819477',1,'th','Hà Nội, Quận Ba Đình','0892738623',NULL,'cod','pending','2025-05-04 14:59:42','2025-05-04 14:59:42'),('5205413b-4d04-483c-9c49-403bb8b9463e','PAY174636902326223262','bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','294c38ca-1086-4d80-81a3-aa8540825a5e',1,'KHOA','Hà Nội, Quận Hoàn Kiếm','0892738623',NULL,'vnpay','shipping','2025-05-04 14:30:23','2025-05-04 14:40:41'),('58101be3-aa26-4e37-87cc-496efe028575','PAY174609347909959099','540f5b72-0d45-4690-94fa-b6d761958ee6','ad7a8d2d-c506-4786-b3ee-501388e487b6',15,'Phuong Le','VietNam','0799162749',NULL,'vnpay','completed','2025-05-01 09:57:59','2025-05-01 10:00:59'),('635fab56-f37a-4fbf-b9cc-8dfff4b7055c','PAY174636911830758307','bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','372bbb1f-5a8d-4366-af4c-6c2d72819477',2,'KHOA','Hà Nội, Quận Hoàn Kiếm','0892738623',NULL,'cod','pending','2025-05-04 14:31:58','2025-05-04 14:31:58'),('63e0d02b-8e0a-4b34-82a2-283e0e74b71a','PAY174575891903259032','540f5b72-0d45-4690-94fa-b6d761958ee6','7f340463-ba62-4a2a-ab20-9a792ce7dc77',1,'Phuong','TP.HCM, Quận 3','0893984233','th','cod','cancelled','2025-04-27 13:01:59','2025-04-27 13:02:18'),('660e7188-efdb-4b2d-82bc-7e95eade637b','PAY174636902326223262','bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','ad7a8d2d-c506-4786-b3ee-501388e487b6',1,'KHOA','Hà Nội, Quận Hoàn Kiếm','0892738623',NULL,'vnpay','shipping','2025-05-04 14:30:23','2025-05-04 14:40:41'),('672e473d-d740-4cc9-8487-74fb5e257e76','PAY174574769956359563','fdc55d39-f102-40e7-82ad-634f1fbd42e5','294c38ca-1086-4d80-81a3-aa8540825a5e',1,'Ha','VietNam','0799162749',NULL,'cod','cancelled','2025-04-27 09:54:59','2025-04-27 12:30:45'),('7f333ef4-8fae-45b6-bca2-89aa24abc4b7','PAY174559738561245612','540f5b72-0d45-4690-94fa-b6d761958ee6','2a23a3d8-5f0b-403c-9481-cf89c05edafa',1,'Phuong Le','Hà Nội, Việt Nam','0799162749',NULL,'vnpay','cancelled','2025-04-25 16:09:45','2025-04-25 16:10:48'),('851cbf62-9ccf-4140-9a67-b0ad5029bc74','PAY174576944947929479','540f5b72-0d45-4690-94fa-b6d761958ee6','7d9ee98a-1181-4efb-9afd-68b2462f5f7b',2,'Phương','VietNam','0799162749',NULL,'cod','processing','2025-04-27 15:57:29','2025-05-01 10:02:02'),('857c20ce-9678-4365-9677-cb7636c171a8','PAY174637078263742637','540f5b72-0d45-4690-94fa-b6d761958ee6','085b5ceb-8296-44c1-8061-16a186ba28ea',1,'th','Hà Nội, Quận Ba Đình','0892738623',NULL,'cod','pending','2025-05-04 14:59:42','2025-05-04 14:59:42'),('929ca8a1-d957-4f2b-8f98-28413b138b18','PAY174636911830758307','bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','73867b01-8670-448c-a278-3ab8a91c29a0',1,'KHOA','Hà Nội, Quận Hoàn Kiếm','0892738623',NULL,'cod','pending','2025-05-04 14:31:58','2025-05-04 14:31:58'),('94289e4a-13de-4f95-83c2-dffe4f4b66af','PAY174575823370833708','cafa0dfc-ddb5-412e-8b9d-3ce1b098b4cb','9c640b0c-c00a-44ef-9c83-a3a986b37482',1,'Mai Lan','Thanh Hóa','0739999222','','vnpay','shipping','2025-04-27 12:50:33','2025-05-01 10:02:09'),('a4a7003b-133c-4986-b78b-35ba877e2047','PAY174576944947929479','540f5b72-0d45-4690-94fa-b6d761958ee6','0fb0fa94-c3bb-41d7-8884-7ddfaaff288a',3,'Phương','VietNam','0799162749',NULL,'cod','processing','2025-04-27 15:57:29','2025-05-01 10:02:02'),('a5a455a6-5ae4-4401-aa3e-6fe749dd0fb1','PAY174576944947929479','540f5b72-0d45-4690-94fa-b6d761958ee6','73867b01-8670-448c-a278-3ab8a91c29a0',1,'Phương','VietNam','0799162749',NULL,'cod','processing','2025-04-27 15:57:29','2025-05-01 10:02:02'),('a5aef866-ccfa-41d6-86c8-571696423196','PAY174636911830758307','bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','3ea5e50e-22a2-418b-b4c4-32a13e89ed21',1,'KHOA','Hà Nội, Quận Hoàn Kiếm','0892738623',NULL,'cod','pending','2025-05-04 14:31:58','2025-05-04 14:31:58'),('a92b2b64-3be8-464a-b298-67c43f2ebce7','PAY174609347909959099','540f5b72-0d45-4690-94fa-b6d761958ee6','726ff04d-69fc-4767-bd93-157435cf3f29',1,'Phuong Le','VietNam','0799162749',NULL,'vnpay','completed','2025-05-01 09:57:59','2025-05-01 10:00:59'),('acc4f0ae-61b9-4b18-a6b0-343db05a3387','PAY174637078263742637','540f5b72-0d45-4690-94fa-b6d761958ee6','0fb0fa94-c3bb-41d7-8884-7ddfaaff288a',1,'th','Hà Nội, Quận Ba Đình','0892738623',NULL,'cod','pending','2025-05-04 14:59:42','2025-05-04 14:59:42'),('c6bcded4-69d2-4469-a4fb-0038aa369ec6','PAY174576977754857548','540f5b72-0d45-4690-94fa-b6d761958ee6','3ea5e50e-22a2-418b-b4c4-32a13e89ed21',1,'Phuong Le','Hà Nội, Quận Ba Đình','0799162749',NULL,'cod','pending','2025-04-27 16:02:57','2025-04-27 16:02:57'),('cf2e0b60-8f1a-4bc5-9418-fa85d5f84760','PAY174636911830758307','bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','73867b01-8670-448c-a278-3ab8a91c29a0',1,'KHOA','Hà Nội, Quận Hoàn Kiếm','0892738623',NULL,'cod','pending','2025-05-04 14:31:58','2025-05-04 14:31:58'),('d8e87f77-60ec-4d16-b5e9-fc2895653343','PAY174637078263742637','540f5b72-0d45-4690-94fa-b6d761958ee6','3ea5e50e-22a2-418b-b4c4-32a13e89ed21',1,'th','Hà Nội, Quận Ba Đình','0892738623',NULL,'cod','pending','2025-05-04 14:59:42','2025-05-04 14:59:42'),('d95fb80d-2c1b-4dbf-9e05-ebc6654fbb41','PAY174637078263742637','540f5b72-0d45-4690-94fa-b6d761958ee6','2a23a3d8-5f0b-403c-9481-cf89c05edafa',1,'th','Hà Nội, Quận Ba Đình','0892738623',NULL,'cod','pending','2025-05-04 14:59:42','2025-05-04 14:59:42'),('e52bb55f-06b1-4403-90d3-6d444a9d4c6d','PAY174559880823128231','540f5b72-0d45-4690-94fa-b6d761958ee6','260f3681-1a0b-405f-adf4-33550187d7aa',3,'Hiền','VietNam','2992',NULL,'vnpay','completed','2025-04-25 16:33:28','2025-04-25 16:56:06');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productreviews`
--

DROP TABLE IF EXISTS `productreviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productreviews` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `productreviews_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productreviews`
--

LOCK TABLES `productreviews` WRITE;
/*!40000 ALTER TABLE `productreviews` DISABLE KEYS */;
INSERT INTO `productreviews` VALUES ('0375d5e4-606a-4b1f-9f65-360a0310c755','bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','537b293c-4dcb-422d-90e8-45196785cbb8',5,'đẹp, giá rẻ','2025-05-01 10:10:45','2025-05-01 10:10:45'),('15657f2d-b38b-4f67-95c9-0f82c3217e73','540f5b72-0d45-4690-94fa-b6d761958ee6','2a23a3d8-5f0b-403c-9481-cf89c05edafa',2,'Chất lượng kém','2025-04-27 10:38:46','2025-04-27 10:38:46'),('29cc44c1-f37e-4d5f-96e9-ceea9581fdeb','bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','537b293c-4dcb-422d-90e8-45196785cbb8',2,'th','2025-05-01 10:10:54','2025-05-01 10:10:54'),('4833317b-5009-494a-b47f-63d29033a603','540f5b72-0d45-4690-94fa-b6d761958ee6','2a23a3d8-5f0b-403c-9481-cf89c05edafa',3,'lên','2025-04-25 16:57:29','2025-04-25 16:57:29'),('7cb5b69c-4c78-45bb-af94-10ca95fe6ecd','540f5b72-0d45-4690-94fa-b6d761958ee6','2a23a3d8-5f0b-403c-9481-cf89c05edafa',4,'thhhh','2025-04-30 02:56:02','2025-04-30 02:56:02'),('f124264e-3c6f-4534-a23b-6ad0bd26967f','540f5b72-0d45-4690-94fa-b6d761958ee6','2fc87f3f-7d3b-4179-aad2-7b6f600b3216',3,'đẹp, mát','2025-05-01 10:01:24','2025-05-01 10:01:24');
/*!40000 ALTER TABLE `productreviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `stock` int(11) NOT NULL DEFAULT '0',
  `images` text NOT NULL,
  `categoryId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('085b5ceb-8296-44c1-8061-16a186ba28ea','Kính râm Nam KC12','<p>Dáng vuông to, chống tia UV400, phù hợp người có khuôn mặt twwwwo.ww</p>',850000,8,'1745763683592.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-27 14:21:23','2025-05-04 14:26:36'),('0fb0fa94-c3bb-41d7-8884-7ddfaaff288a','Kính cận Nam gọng chữ nhật KC07','<p>Gọng chữ nhật mảnh, phong c&aacute;ch văn ph&ograve;ng, lịch l&atilde;m.</p>',410000,0,'1745762506625.png','0cfb3d22-8763-4dda-bec3-e8043789293b','2025-04-27 14:01:46','2025-05-04 14:38:07'),('1680d265-969f-4c93-8fff-17073e5d6ef4','Kính trẻ em nữ KTE02','<p>Thiết kế gọng k&iacute;nh dễ d&agrave;ng điều chỉnh ph&ugrave; hợp với khu&ocirc;n mặt của b&eacute;, mang đến sự thoải m&aacute;i tuyệt đối</p>',170000,20,'1745767441016.png','d9222df6-619c-45d8-bfe2-3725238f6fec','2025-04-27 15:24:01','2025-04-27 15:31:50'),('1d036de1-e5d7-439d-bd5c-b4b56488349e','Nước lau kính dạng xịt dành cho mắt kính','<p class=\"QN2lPu\">✅ Th&agrave;nh phần dung dịch rửa mắt k&iacute;nh:</p>\r\n<p class=\"QN2lPu\">Isopropyl alcohol, Sodium lauryl ether sulfate, Fragrance, Butyl cellosolve, Nước</p>\r\n<p class=\"QN2lPu\">✅ T&aacute;c dụng:</p>\r\n<p class=\"QN2lPu\">Gi&uacute;p mắt k&iacute;nh s&aacute;ng</p>\r\n<p class=\"QN2lPu\">Tạo lớp m&agrave;ng bảo vệ mắt k&iacute;nh</p>\r\n<p class=\"QN2lPu\">Gi&uacute;p nh&igrave;n tốt hơn</p>\r\n<p class=\"QN2lPu\">L&agrave;m giảm mỏi mắt do vết xước</p>\r\n<p class=\"QN2lPu\">Kh&ocirc;ng để lại vết d&iacute;nh nhờn.</p>\r\n<p class=\"QN2lPu\">Mở rộng sử dụng: ipad, laptop, smartphone &hellip;.</p>\r\n<p class=\"QN2lPu\">✅ Thể t&iacute;ch: 60 ml</p>\r\n<p class=\"QN2lPu\">✅Th&ocirc;ng tin an to&agrave;n:</p>\r\n<p class=\"QN2lPu\">Kh&ocirc;ng được uống</p>\r\n<p class=\"QN2lPu\">Khi d&iacute;nh v&agrave;o mắt phải rửa thật kỹ với nước sạch</p>\r\n<p class=\"QN2lPu\">Tr&aacute;nh xa tầm tay trẻ em</p>',10000,100,'1745768693687.webp','e6d55230-bc5a-4716-94b7-138de8825bf1','2025-04-27 15:44:53','2025-05-01 10:23:36'),('20d3e711-3169-4197-b7c4-ac8fb2d83f8b','Kính cận nam gọng vuông KC13','<p>Thiết kế gọng vu&ocirc;ng bản to ấn tượng, t&ocirc;n l&ecirc;n n&eacute;t mạnh mẽ, c&aacute; t&iacute;nh ri&ecirc;ng cho ph&aacute;i mạnh</p>',299000,-9,'1745765891073.png','0cfb3d22-8763-4dda-bec3-e8043789293b','2025-04-27 14:58:11','2025-05-04 14:38:51'),('260f3681-1a0b-405f-adf4-33550187d7aa','Kính râm Nam KR02','<p>Thiết kế gọng kim loại nhẹ, phong c&aacute;ch mạnh mẽ.</p>',390000,28,'1745594772178.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-25 15:26:12','2025-04-27 09:52:16'),('279b60c5-4404-4989-8a25-76a76b9395e9','Kính cận nữ gọng vuông','<p>Gọng k&iacute;nh vu&ocirc;ng mảnh, sắc n&eacute;t, t&ocirc;n l&ecirc;n vẻ chuy&ecirc;n nghiệp, thanh lịch cho n&agrave;ng c&ocirc;ng sở hiện đại</p>',900000,-1,'1745765770088.png','0cfb3d22-8763-4dda-bec3-e8043789293b','2025-04-27 14:56:10','2025-05-04 14:34:40'),('294c38ca-1086-4d80-81a3-aa8540825a5e','Kính râm Nữ KR07','<p>Mắt k&iacute;nh lớn, tr&ograve;ng tr&agrave; nhẹ, th&iacute;ch hợp đi biển.</p>',370000,2,'1745596299237.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-25 15:51:39','2025-05-04 14:33:52'),('2a23a3d8-5f0b-403c-9481-cf89c05edafa','Kính râm Nữ KR09','<p>K&iacute;nh tr&ograve;n cổ điển, gọng mảnh thanh lịch, dễ phối đồ.</p>',400000,38,'1745596531821.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-25 15:55:31','2025-05-04 13:31:43'),('2fc87f3f-7d3b-4179-aad2-7b6f600b3216','Kính trẻ em nữ KTE08','<p>Gọng k&iacute;nh si&ecirc;u nhẹ, nhựa dẻo an to&agrave;n cho trẻ nhỏ, chịu lực tốt, kh&ocirc;ng g&acirc;y kh&oacute; chịu khi đeo l&acirc;u d&agrave;i.</p>',279000,6,'1745767890078.png','d9222df6-619c-45d8-bfe2-3725238f6fec','2025-04-27 15:31:30','2025-04-30 03:36:17'),('372bbb1f-5a8d-4366-af4c-6c2d72819477','Kính cận nam gọng chữ nhật KC02','<p>Gọng chữ nhật titan si&ecirc;u nhẹ, chống g&atilde;y, độ bền cao.</p>',600000,96,'1745761970044.png','0cfb3d22-8763-4dda-bec3-e8043789293b','2025-04-27 13:52:50','2025-05-04 14:31:06'),('3ea5e50e-22a2-418b-b4c4-32a13e89ed21','Kính nam gọng vuông KC10','<p>Gọng k&iacute;nh vu&ocirc;ng nam mạnh mẽ, thiết kế tối giản, ph&ugrave; hợp sử dụng h&agrave;ng ng&agrave;y, đi học, đi l&agrave;m</p>',640000,37,'1745764647965.png','0cfb3d22-8763-4dda-bec3-e8043789293b','2025-04-27 14:37:27','2025-05-04 14:31:17'),('3fff93cb-6f52-4744-8505-810eefbfd04b','Kính râm Nam KR01','<p>Gọng vu&ocirc;ng cổ điển, tr&ograve;ng đen chống tia UV, ph&ugrave; hợp mọi khu&ocirc;n mặt.</p>',520000,17,'1745597551307.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-25 15:24:49','2025-04-27 12:46:50'),('4edb7381-645f-4f7a-a06a-1b8f46586604','Kính cận nữ gọng vuông KC11','<p>Gọng k&iacute;nh vu&ocirc;ng nữ t&iacute;nh, thiết kế đơn giản m&agrave; tinh tế, ph&ugrave; hợp với mọi phong c&aacute;ch hằng ng&agrave;y</p>',499000,35,'1745763219362.png','0cfb3d22-8763-4dda-bec3-e8043789293b','2025-04-27 14:13:39','2025-04-27 14:13:39'),('537b293c-4dcb-422d-90e8-45196785cbb8','Kính cận Nữ gọng tròn KC08','<p>Gọng bo tr&ograve;n nhựa dẻo, nhẹ nh&agrave;ng dễ phối đồ</p>',330000,22,'1745762377358.png','0cfb3d22-8763-4dda-bec3-e8043789293b','2025-04-27 13:59:37','2025-05-01 10:13:05'),('6f6d3b32-73a7-40d0-8820-5b8692148e80','Kính râm Nam KR05','<p>D&aacute;ng vu&ocirc;ng to, chống tia UV400, ph&ugrave; hợp người c&oacute; khu&ocirc;n mặt to.</p>',420000,12,'1745596026891.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-25 15:35:57','2025-04-27 10:15:14'),('6f77863d-92d7-4e2d-bd3f-4a3f29a3c4e1','Kính trẻ em nữ KTE01','<p>K&iacute;nh trẻ em kiểu d&aacute;ng thời trang, gọng vu&ocirc;ng hoặc tr&ograve;n dễ thương, ph&ugrave; hợp với cả b&eacute; trai v&agrave; b&eacute; g&aacute;i, gi&uacute;p b&eacute; tự tin thể hiện c&aacute; t&iacute;nh</p>',210000,50,'1745766556690.webp','d9222df6-619c-45d8-bfe2-3725238f6fec','2025-04-27 15:09:16','2025-04-27 15:19:00'),('726ff04d-69fc-4767-bd93-157435cf3f29','Khăn giấy lau kính nano','<div class=\"WBVL_7\">\r\n<div class=\"WBVL_7\">\r\n<p class=\"vR6K3w\">Khăn giấy lau k&iacute;nh nano, miếng lau chống b&aacute;m hơi nước cho k&iacute;nh cận, k&iacute;nh mắt hộp 100 miếng - G&oacute;c H&agrave;ng Gia Dụng</p>\r\n</div>\r\n<div class=\"flex asFzUa\">&nbsp;</div>\r\n<div class=\"flex asFzUa\">&nbsp;</div>\r\n</div>\r\n<div class=\"flex asFzUa\">&nbsp;</div>',20000,49,'1745769110778.webp','e6d55230-bc5a-4716-94b7-138de8825bf1','2025-04-27 15:51:50','2025-04-30 02:57:58'),('730ef5a0-3864-46ef-8c07-6f011c545665','Kính râm Nữ KR06','<p>Gọng m&egrave;o c&aacute; t&iacute;nh, phối đồ s&agrave;nh điệu, che nắng tốt.</p>',330000,20,'1745596131479.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-25 15:48:51','2025-04-25 15:48:51'),('73867b01-8670-448c-a278-3ab8a91c29a0','Kính cận nữ gọng tròn KC01','<p>1</p>',340000,20,'1745761820424.png','0cfb3d22-8763-4dda-bec3-e8043789293b','2025-04-27 09:31:46','2025-05-04 14:31:36'),('7d9ee98a-1181-4efb-9afd-68b2462f5f7b','Kính cận Nữ gọng vương KC14','<p>Đường n&eacute;t vu&ocirc;ng vức, bo tr&ograve;n nhẹ nh&agrave;ng ở g&oacute;c k&iacute;nh, mang lại vẻ mềm mại m&agrave; vẫn sắc sảo cho khu&ocirc;n mặt</p>',550000,28,'1745766027949.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-27 15:00:27','2025-04-27 15:57:00'),('7f340463-ba62-4a2a-ab20-9a792ce7dc77','Kính râm Nam KR03','<p>Gọng nhựa đen b&oacute;ng, tr&ograve;ng ph&acirc;n cực, chống ch&oacute;i tốt.</p>',350000,14,'1745595949775.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-25 15:30:11','2025-04-27 13:00:54'),('85437c1b-a481-46b2-9927-92106a31a04c','Kính trẻ em nam KTE05','<p>K&iacute;nh bảo vệ mắt tối đa khỏi tia UV, gi&uacute;p trẻ học tập v&agrave; vui chơi thoải m&aacute;i m&agrave; kh&ocirc;ng lo mỏi mắt.</p>',169000,15,'1745767519527.png','d9222df6-619c-45d8-bfe2-3725238f6fec','2025-04-27 15:25:19','2025-04-27 15:25:52'),('85f495a5-fffc-45fc-9363-ede98ef29cfd','Kính râm Nữ KC10','<p>Gọng hồng pastel nữ t&iacute;nh, chống nắng nhẹ nh&agrave;ng.</p>',650000,10,'1745763437845.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-27 14:17:17','2025-04-27 14:17:17'),('9c640b0c-c00a-44ef-9c83-a3a986b37482','Kính râm Nữ KR08 ','<p>Gọng vu&ocirc;ng nhẹ nh&agrave;ng, tr&ograve;ng ph&acirc;n cực chống l&oacute;a.</p>',450000,4,'1745596664393.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-25 15:57:44','2025-04-27 12:48:11'),('a6868b60-2a67-4772-a0dd-59be0bc8e2aa','Kính trẻ em nam KTE07','<p>Gọng k&iacute;nh si&ecirc;u nhẹ, nhựa dẻo an to&agrave;n cho trẻ nhỏ, chịu lực tốt, kh&ocirc;ng g&acirc;y kh&oacute; chịu khi đeo l&acirc;u d&agrave;i.</p>',300000,30,'1745767725692.png','d9222df6-619c-45d8-bfe2-3725238f6fec','2025-04-27 15:28:45','2025-04-27 15:33:08'),('a8468904-1540-41e2-85e2-614aad0ce340','Kính trẻ nam nữ KTE10','<p>Gọng k&iacute;nh si&ecirc;u nhẹ, nhựa dẻo an to&agrave;n cho trẻ nhỏ, chịu lực tốt, kh&ocirc;ng g&acirc;y kh&oacute; chịu khi đeo l&acirc;u d&agrave;i.</p>',140000,15,'1745767781857.png','d9222df6-619c-45d8-bfe2-3725238f6fec','2025-04-27 15:29:41','2025-04-27 15:29:41'),('aba54310-8fa6-4bc5-a603-d41f5f49d024','Kính cận Nữ mắt mèo KC10','<p>&nbsp;Gọng k&iacute;nh mắt m&egrave;o với phần đu&ocirc;i k&iacute;nh hơi vểnh l&ecirc;n, tạo n&ecirc;n n&eacute;t sắc sảo, quyến rũ v&agrave; đầy c&aacute; t&iacute;nh.</p>',630000,20,'1745763092643.png','0cfb3d22-8763-4dda-bec3-e8043789293b','2025-04-27 14:11:32','2025-04-27 14:11:32'),('aba6b588-2927-41f9-a1c2-0cf2c11d1d5c','Kính râm Nam KR13','<p>Phong c&aacute;ch thể thao, gọng &ocirc;m mặt, chống nắng hiệu quả</p>',1200000,25,'1745763799476.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-27 14:23:19','2025-04-27 14:24:45'),('ac46d048-8a05-4413-81dc-2605f9b63d9d','Kính râm Nữ KR14','<p>Tr&ograve;ng k&iacute;nh &aacute;nh t&iacute;m, nổi bật giữa đ&aacute;m đ&ocirc;ng &ndash; d&agrave;nh cho c&ocirc; n&agrave;ng c&aacute; t&iacute;nh.</p>',250000,60,'1745764043393.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-27 14:27:23','2025-04-27 14:27:23'),('ad424520-0d4f-4662-8554-ac2c53f3e4c4','Kính cận Nam gọng tròn KC02','<p>Gọng nhựa&nbsp; b&oacute;ng, d&aacute;ng cổ điển, dễ phối đồ.</p>',120000,11,'1745746351134.png','0cfb3d22-8763-4dda-bec3-e8043789293b','2025-04-27 09:32:31','2025-04-27 14:30:58'),('ad7a8d2d-c506-4786-b3ee-501388e487b6','Hộp đựng kính bằng Da ','<p>Hợp đựng k&iacute;nh bằng da</p>',50000,14,'1745768906738.png','e6d55230-bc5a-4716-94b7-138de8825bf1','2025-04-27 15:48:26','2025-05-01 10:19:01'),('b575fe58-d651-4538-8244-6afe5fb48256','Kính cận Nữ gọng tròn KC06','<p>Gọng tr&ograve;n vintage, nhẹ nh&agrave;ng, ph&ugrave; hợp mọi d&aacute;ng mặt.</p>',720000,40,'1745762208012.png','0cfb3d22-8763-4dda-bec3-e8043789293b','2025-04-27 13:56:48','2025-04-27 14:30:44'),('b635aebd-078d-49ef-831a-c4f975958c6a','Kính trẻ em nữ KTE09','<p>K&iacute;nh cận trẻ em thiết kế dễ thương, bảo vệ mắt tối đa khỏi tia UV, gi&uacute;p trẻ học tập v&agrave; vui chơi thoải m&aacute;i m&agrave; kh&ocirc;ng lo mỏi mắt.</p>',199000,15,'1745767201854.png','d9222df6-619c-45d8-bfe2-3725238f6fec','2025-04-27 15:20:01','2025-04-27 15:33:32'),('c0977b7c-256e-4574-8375-f839a4d37125','Kính râm Nữ KR15','<p>Gọng vu&ocirc;ng bo tr&ograve;n, tr&ograve;ng ph&acirc;n cực bảo vệ mắt tối ưu.</p>',800000,20,'1745764179877.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-27 14:29:39','2025-04-27 14:29:39'),('c9a6c469-4cd9-4bf7-86e2-c6d2cfdbd121','Kính râm Nữ KC11','<p>Gọng nhựa đen b&oacute;ng, tr&ograve;ng ph&acirc;n cực, chống ch&oacute;i tốt.</p>',710000,10,'1745763597309.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-27 14:19:57','2025-04-27 14:19:57'),('d108a6f1-981e-4b36-b625-88574d52970a','Kính trẻ em nữ KTE03','<p>K&iacute;nh trẻ em c&oacute; khả năng chống tia UV, bảo vệ đ&ocirc;i mắt của b&eacute; khỏi t&aacute;c hại của &aacute;nh s&aacute;ng mặt trời, l&yacute; tưởng cho c&aacute;c hoạt động ngo&agrave;i trời.</p>',230000,420000,'1745767109124.webp','d9222df6-619c-45d8-bfe2-3725238f6fec','2025-04-27 15:18:29','2025-04-27 15:18:29'),('d6f51ca8-6206-422f-9739-70c8be415de0','Kính trẻ em nam KTE06','<p>K&iacute;nh trẻ em chống &aacute;nh s&aacute;ng xanh, bảo vệ mắt khỏi t&aacute;c hại từ việc sử dụng thiết bị điện tử, đặc biệt l&agrave; khi học online hoặc chơi game.</p>',230000,5,'1745767358904.png','d9222df6-619c-45d8-bfe2-3725238f6fec','2025-04-27 15:22:38','2025-04-27 15:22:38'),('d7c7772e-c3fe-498a-99c6-ab8566330dfd','Kính cận nữ gọng mắt mèo KC04','<p>Gọng mắt m&egrave;o, phong c&aacute;ch trẻ trung, hợp xu hướng thời trang.</p>',210000,30,'1745762083077.png','0cfb3d22-8763-4dda-bec3-e8043789293b','2025-04-27 13:54:43','2025-04-27 14:31:20'),('dd3e81b9-85d9-4f12-8b22-a6d6148e6304','Kính râm Nam KR04','<p>Phong c&aacute;ch thể thao, gọng &ocirc;m mặt, chống nắng hiệu quả.</p>',280000,30,'1745596174595.png','8b90d2ac-0bdc-4222-95e3-6be58e2b81d6','2025-04-25 15:33:01','2025-04-27 13:01:00'),('e7821a5d-678f-4c4f-9607-db7919eb2602','Kính cận Nam gọng vuông KC09','<p>Gọng vu&ocirc;ng mang đến vẻ ngo&agrave;i mạnh mẽ, nam t&iacute;nh cho nam giới, v&agrave; sự c&aacute; t&iacute;nh</p>',750000,45,'1745762931202.png','0cfb3d22-8763-4dda-bec3-e8043789293b','2025-04-27 14:08:51','2025-05-01 10:23:45'),('e83f2040-6dc2-4967-aeea-c73d8422c898','Hộp đựng kính cao cấp','<p>Hộp đựng k&iacute;nh cao cấp</p>',120000,15,'1745768944262.webp','e6d55230-bc5a-4716-94b7-138de8825bf1','2025-04-27 15:49:04','2025-04-27 15:49:04'),('ef835cf5-3eae-4566-ae1c-632ed04b6f05','Kính trẻ em  nữ KTE04','<p>Gọng k&iacute;nh si&ecirc;u nhẹ, nhựa dẻo an to&agrave;n cho trẻ nhỏ, chịu lực tốt, kh&ocirc;ng g&acirc;y kh&oacute; chịu khi đeo l&acirc;u d&agrave;i.</p>',150000,20,'1745767271034.png','d9222df6-619c-45d8-bfe2-3725238f6fec','2025-04-27 15:21:11','2025-04-27 15:21:11');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isAdmin` varchar(255) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('540f5b72-0d45-4690-94fa-b6d761958ee6','Phương Lê','phuong@gmail.com','$2b$10$uj1cQ8KTFqRbFF/bAAE7nOeb6qXcYgvI1oQ8AUn3RZg31nspBYrmm','1','2025-04-25 13:17:40','2025-05-04 15:01:36'),('b1e49790-ee21-4e3a-ad67-803ca3203ac0','Thanh','thanh@gmail.com','$2b$10$qjEPfNsHtlRuAHI.reNMPO20iPNWq5nSWtfaCsznnb51bJER2aU12','1','2025-05-04 14:45:10','2025-05-04 14:46:28'),('bac4de7f-8fff-45c3-98c6-db7bd2ba35fa','Đăng Khoa','khoa@gmail.com','$2b$10$D2GAeo3hkOXZfzil2So7KeYPD.4pX3VpVBnquAOdBf36sSKKaMP..','0','2025-05-01 09:27:53','2025-05-04 14:42:53'),('cafa0dfc-ddb5-412e-8b9d-3ce1b098b4cb','Mai Lan','lan1@gmail.com','$2b$10$1McnjM.5TRZuv97Vf3bzkuLXp1Vhz7gdekizsaIFxBek8cQcUiBB.','0','2025-04-27 12:47:54','2025-04-27 12:55:00'),('f0d43c47-444a-4a68-909d-97e233612c3e','Phong','phong@gmail.com','$2b$10$HwUUjzwqEpJAezpOccfmuue8qDzKOFpxx21LAdBq1a9pX32YImmti','0','2025-05-04 14:37:16','2025-05-04 14:37:16'),('fdc55d39-f102-40e7-82ad-634f1fbd42e5','Ngân Hà','ha@gmail.com','$2b$10$pYIy0ZyalsvGnSGAysejou/OWhMrRUDJH2q10VVsayMto408fc/Ha','0','2025-04-25 16:14:09','2025-04-27 12:31:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-04 22:08:11
