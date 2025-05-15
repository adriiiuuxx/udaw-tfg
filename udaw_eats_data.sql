-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: udaw_eats
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` bigint NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKda8tuywtf0gb6sedwk7la1pgi` (`user_id`),
  CONSTRAINT `FKda8tuywtf0gb6sedwk7la1pgi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (252,'A Coruña','A Coruña','Avda. Concordia 9','15009',1),(253,'A Coruña','A Coruña','Avda. Cde Oza 45','15006',1),(254,'A Coruña','A Coruña','Avda. Cde Oza 45','15006',1),(255,'A Coruña','A Coruña','Avda. Cde Oza 45','15006',1),(256,'A Coruña','A Coruña','Avda. Cde Oza 45','15006',1),(257,'A Coruña','A Coruña','Avda. Cde Oza 45','15006',1),(258,'A Coruña','A Coruña','Avda. Cde Oza 45','15006',1),(259,'A Coruña','A Coruña','Avda. Cde Oza 45','15006',1),(260,'A Coruña','A Coruña','Avda. Cde Oza 45','15006',1),(261,'A Coruña','A Coruña','Avda. Cde Oza 45','15006',1),(262,'A Coruña','A Coruña','Avda. Cde Oza 45','15006',3),(302,'A Coruña','A Coruña','Avda. Cde Oza 45','15006',3),(352,'A Coruña','A Coruña','Avda. Cde Oza 45','15006',3),(452,'Madrid','Madrid','Calle Falsa 123','28001',2),(502,'Madrid','Madrid','Calle Falsa 123','28001',2),(552,'ad','ad','ad',NULL,2),(602,'ad','ad','ad',NULL,2),(603,'adsyy','ads','adsdu',NULL,2),(652,'A Coruña','A Coruña','Avda. de Oza 4','15006',152),(702,'juan carlos','af33','albacete','1222',2),(752,'Coruña','Coruña','Carballo','1553',2),(753,'Coruña','Coruña','Elviña','15010',2),(754,'Coruña','Coruña','castros','15009',2),(755,'Coruña','Coruña','castros','15009',2),(756,'Coruña','Coruña','castros','15009',2),(757,'Coruña','Coruña','castros','15009',2),(802,'Coruña','Coruña','Elviña 12','15010',2),(852,'Coruña','Coruña','Avda Monte das moas','15009',202),(902,'Coruña','Coruña','Avda Monte das moas 4','15009',302),(952,'Coruña','Coruña','Avda de Oza, 12 - 4º Izq','15006',302),(1052,'Coruña','Coruña','Avda de Oza 31','15006',252),(1152,'Coruña','Coruña','Avda Monte das moas','15009',2);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address_seq`
--

DROP TABLE IF EXISTS `address_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address_seq`
--

LOCK TABLES `address_seq` WRITE;
/*!40000 ALTER TABLE `address_seq` DISABLE KEYS */;
INSERT INTO `address_seq` VALUES (1251);
/*!40000 ALTER TABLE `address_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL,
  `total` bigint DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK867x3yysb1f3jk41cv3vsoejj` (`customer_id`),
  CONSTRAINT `FK9mocisyryuqas1xrlbl8872lb` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,NULL,1),(2,21,2),(3,NULL,3),(52,NULL,52),(102,NULL,102),(103,NULL,103),(152,7,152),(202,NULL,202),(252,NULL,252),(302,21,302);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id` bigint NOT NULL,
  `ingredients` varbinary(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `total_price` bigint DEFAULT NULL,
  `cart_id` bigint DEFAULT NULL,
  `food_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1uobyhgl1wvgt1jpccia8xxs3` (`cart_id`),
  KEY `FKcro8349ry4i72h81en8iw202g` (`food_id`),
  CONSTRAINT `FK1uobyhgl1wvgt1jpccia8xxs3` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `FKcro8349ry4i72h81en8iw202g` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item_ingredients`
--

DROP TABLE IF EXISTS `cart_item_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item_ingredients` (
  `cart_item_id` bigint NOT NULL,
  `ingredient` varchar(255) DEFAULT NULL,
  KEY `FKkrku8lnktprll6drft94bedkx` (`cart_item_id`),
  CONSTRAINT `FKkrku8lnktprll6drft94bedkx` FOREIGN KEY (`cart_item_id`) REFERENCES `cart_item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item_ingredients`
--

LOCK TABLES `cart_item_ingredients` WRITE;
/*!40000 ALTER TABLE `cart_item_ingredients` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_item_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item_seq`
--

DROP TABLE IF EXISTS `cart_item_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item_seq`
--

LOCK TABLES `cart_item_seq` WRITE;
/*!40000 ALTER TABLE `cart_item_seq` DISABLE KEYS */;
INSERT INTO `cart_item_seq` VALUES (1851);
/*!40000 ALTER TABLE `cart_item_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_seq`
--

DROP TABLE IF EXISTS `cart_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_seq`
--

LOCK TABLES `cart_seq` WRITE;
/*!40000 ALTER TABLE `cart_seq` DISABLE KEYS */;
INSERT INTO `cart_seq` VALUES (401);
/*!40000 ALTER TABLE `cart_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `restaurant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp6n44aqw5n74qc4f1d6eyqgha` (`restaurant_id`),
  CONSTRAINT `FKp6n44aqw5n74qc4f1d6eyqgha` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'MARISCOS',1),(2,'MARISCOS',102),(3,'CARNES',1),(4,'CARNES',102),(5,'VEGETARIANO',1),(6,'VEGETARIANO',102),(7,'POSTRES',1),(8,'POSTRES',102),(9,'BEBIDAS',1),(10,'BEBIDAS',102),(11,'ESPECIAS',1),(12,'ESPECIAS',102),(13,'VERDURAS',1),(14,'VERDURAS',102),(15,'PANADERÍA',1),(16,'PANADERÍA',102),(17,'CONDIMENTOS',1),(18,'CONDIMENTOS',102),(19,'MARISCOS',152),(20,'CARNES',152),(21,'VEGETARIANO',152),(22,'POSTRES',152),(23,'BEBIDAS',152),(24,'ESPECIAS',152),(25,'VERDURAS',152),(26,'PANADERÍA',152),(27,'CONDIMENTOS',152),(52,'LACTEOS',1),(53,'MARISCOS',202),(54,'PASTA',202),(55,'FRUTAS',202),(56,'xxx',202);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_seq`
--

DROP TABLE IF EXISTS `category_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_seq`
--

LOCK TABLES `category_seq` WRITE;
/*!40000 ALTER TABLE `category_seq` DISABLE KEYS */;
INSERT INTO `category_seq` VALUES (151);
/*!40000 ALTER TABLE `category_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `id` bigint NOT NULL,
  `available` bit(1) NOT NULL,
  `creation_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_vegetarian` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `food_category_id` bigint DEFAULT NULL,
  `restaurant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd5jb57wcj3nomso10nhrit3dc` (`food_category_id`),
  KEY `FKm9xrxt95wwp1r2s7andom1l1c` (`restaurant_id`),
  CONSTRAINT `FKd5jb57wcj3nomso10nhrit3dc` FOREIGN KEY (`food_category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKm9xrxt95wwp1r2s7andom1l1c` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (402,_binary '','2025-03-26 17:01:11.409283','Ración de pulpo con patatas, aceite de oliva y pimentón',_binary '\0','Pulpo a feira',18,1,1),(452,_binary '','2025-03-26 17:04:08.881745','Arroz de la tierra con langostinos en salsa',_binary '\0','Arroz negro con langostinos',25,1,1),(502,_binary '','2025-04-15 13:37:32.930183','Clásica empanada gallega rellena de atún, pimiento y cebolla',_binary '\0','Empanada Gallega de Atún',12,2,102),(503,_binary '\0','2025-04-15 13:41:55.742671','Pulpo cocido sobre cama de patatas, rociado con aceite y pimentón',_binary '\0','Pulpo a Feira',20,2,102),(504,_binary '','2025-04-15 13:46:49.739283','Tarta tradicional gallega de almendra con azúcar glas',_binary '','Tarta de Santiago',7,22,152),(552,_binary '','2025-05-05 14:24:19.377676','Botella de Agua Cabreiroa 1,5 L',_binary '\0','Agua Mineral',2,NULL,1),(553,_binary '\0','2025-05-05 15:50:29.812798','Salteado de verduras con 200gr de solomillo gallego',_binary '\0','Salteado de verduras',17,NULL,1),(602,_binary '','2025-05-08 12:12:44.289784','Plato de spahettis a la boloñesa',_binary '\0','Spaghetti boloñesa',12,NULL,202);
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_images`
--

DROP TABLE IF EXISTS `food_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_images` (
  `food_id` bigint NOT NULL,
  `images` varchar(1000) DEFAULT NULL,
  KEY `FKjjjt9373et45vaj0mguo4pd2p` (`food_id`),
  CONSTRAINT `FKjjjt9373et45vaj0mguo4pd2p` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_images`
--

LOCK TABLES `food_images` WRITE;
/*!40000 ALTER TABLE `food_images` DISABLE KEYS */;
INSERT INTO `food_images` VALUES (402,'https://media.istockphoto.com/id/2193380288/es/foto/tapas-from-spain-pulpo-a-la-gallega-octopus-appetizer-with-potatoes-spanish-food-on-wood.jpg?s=2048x2048&w=is&k=20&c=v6IyPJc-6nja4YD2uBNoN8gw-aHXkFdcx0eLU5L4uxY='),(402,'https://media.istockphoto.com/id/2193379996/es/foto/delicious-pulpo-a-la-gallega-with-potatoes-served-on-wood-in-galicia-spain.jpg?s=2048x2048&w=is&k=20&c=bPDu7BEFoRKI1dAgbz_n8HKMUPwifEyVrh_kQy4iBi8='),(452,'https://cdn.pixabay.com/photo/2017/04/04/11/55/paella-2201193_1280.jpg'),(502,'https://images.unsplash.com/photo-1576521528238-eedd3602b8a5?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),(502,'https://recetasdecocina.elmundo.es/wp-content/uploads/2023/02/receta-de-empanada-de-atun.jpg'),(503,'https://media.istockphoto.com/id/2193380288/es/foto/tapas-from-spain-pulpo-a-la-gallega-octopus-appetizer-with-potatoes-spanish-food-on-wood.jpg?s=2048x2048&w=is&k=20&c=v6IyPJc-6nja4YD2uBNoN8gw-aHXkFdcx0eLU5L4uxY='),(503,'https://media.istockphoto.com/id/2193379996/es/foto/delicious-pulpo-a-la-gallega-with-potatoes-served-on-wood-in-galicia-spain.jpg?s=2048x2048&w=is&k=20&c=bPDu7BEFoRKI1dAgbz_n8HKMUPwifEyVrh_kQy4iBi8='),(504,'https://cdn.pixabay.com/photo/2021/12/28/22/28/tarta-6900298_1280.jpg'),(504,'https://imag.bonviveur.com/foto-de-la-tarta-de-santiago.webp'),(552,'http://res.cloudinary.com/dmwy3upvv/image/upload/v1746447558/spgivlmejuunordlnae5.jpg'),(553,'http://res.cloudinary.com/dmwy3upvv/image/upload/v1746448164/ua5hdhsonifnssoejfme.avif'),(602,'http://res.cloudinary.com/dmwy3upvv/image/upload/v1746699159/jlvqcd7pxab59dlc0spm.avif');
/*!40000 ALTER TABLE `food_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_ingredients`
--

DROP TABLE IF EXISTS `food_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_ingredients` (
  `food_id` bigint NOT NULL,
  `ingredients_id` bigint NOT NULL,
  KEY `FKnfwd9dp2aw8o8l4ftu39jmvv9` (`food_id`),
  KEY `FKhy3t7b303ydmureccjf1qak2k` (`ingredients_id`),
  CONSTRAINT `FKhy3t7b303ydmureccjf1qak2k` FOREIGN KEY (`ingredients_id`) REFERENCES `ingredients_item` (`id`),
  CONSTRAINT `FKnfwd9dp2aw8o8l4ftu39jmvv9` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_ingredients`
--

LOCK TABLES `food_ingredients` WRITE;
/*!40000 ALTER TABLE `food_ingredients` DISABLE KEYS */;
INSERT INTO `food_ingredients` VALUES (402,1),(402,2),(402,3),(402,4),(452,14),(452,2),(452,10),(502,24),(502,19),(502,20),(503,16),(503,17),(503,18),(503,19),(504,38),(504,47),(552,53),(553,2),(553,7),(553,8),(553,12),(553,13),(602,57),(602,58);
/*!40000 ALTER TABLE `food_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_seq`
--

DROP TABLE IF EXISTS `food_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_seq`
--

LOCK TABLES `food_seq` WRITE;
/*!40000 ALTER TABLE `food_seq` DISABLE KEYS */;
INSERT INTO `food_seq` VALUES (701);
/*!40000 ALTER TABLE `food_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient_category`
--

DROP TABLE IF EXISTS `ingredient_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredient_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `restaurant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdx2hvej3t5hkiguy698n9covv` (`restaurant_id`),
  CONSTRAINT `FKdx2hvej3t5hkiguy698n9covv` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient_category`
--

LOCK TABLES `ingredient_category` WRITE;
/*!40000 ALTER TABLE `ingredient_category` DISABLE KEYS */;
INSERT INTO `ingredient_category` VALUES (1,'MARISCOS',1),(2,'MARISCOS',102),(3,'CARNES',1),(4,'CARNES',102),(5,'VEGETARIANO',1),(6,'VEGETARIANO',102),(7,'POSTRES',1),(8,'POSTRES',102),(9,'BEBIDAS',1),(10,'BEBIDAS',102),(11,'ESPECIAS',1),(12,'ESPECIAS',102),(13,'VERDURAS',1),(14,'VERDURAS',102),(15,'PANADERÍA',1),(16,'PANADERÍA',102),(17,'CONDIMENTOS',1),(18,'CONDIMENTOS',102),(19,'MARISCOS',152),(20,'CARNES',152),(21,'VEGETARIANO',152),(22,'POSTRES',152),(23,'BEBIDAS',152),(24,'ESPECIAS',152),(25,'VERDURAS',152),(26,'PANADERÍA',152),(27,'CONDIMENTOS',152),(28,'CARBOHIDRATOS',152),(29,'PROTEINAS',152),(30,'FRUTAS',152),(31,'MARISCOS',202),(32,'CONDIMENTOS',202),(33,'ESPECIAS',202),(34,'TUBERCULO',202),(35,'ALCOHOL',202),(36,'CARBOHIDRATOS',202),(37,'VERDURAS',202),(38,'FRUTAS',202),(39,'xxx',202);
/*!40000 ALTER TABLE `ingredient_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient_category_seq`
--

DROP TABLE IF EXISTS `ingredient_category_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredient_category_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient_category_seq`
--

LOCK TABLES `ingredient_category_seq` WRITE;
/*!40000 ALTER TABLE `ingredient_category_seq` DISABLE KEYS */;
INSERT INTO `ingredient_category_seq` VALUES (101);
/*!40000 ALTER TABLE `ingredient_category_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients_item`
--

DROP TABLE IF EXISTS `ingredients_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `in_stoke` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `restaurant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkokfv1la8uvwmow57uv6aeqnx` (`restaurant_id`),
  KEY `FKjb94f4rm414htlxd1mwhf56in` (`category_id`),
  CONSTRAINT `FKjb94f4rm414htlxd1mwhf56in` FOREIGN KEY (`category_id`) REFERENCES `ingredient_category` (`id`),
  CONSTRAINT `FKkokfv1la8uvwmow57uv6aeqnx` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients_item`
--

LOCK TABLES `ingredients_item` WRITE;
/*!40000 ALTER TABLE `ingredients_item` DISABLE KEYS */;
INSERT INTO `ingredients_item` VALUES (1,_binary '','Pulpo',1,1),(2,_binary '','Aceite de Oliva Virgen Extra',11,1),(3,_binary '','Patata Cocida',13,1),(4,_binary '','Pimentón',11,1),(5,_binary '\0','Masa Madre',15,1),(6,_binary '','Carne Vaca Rubia Gallega',3,1),(7,_binary '','Solomillo',3,1),(8,_binary '','Pimiento Rojo',17,1),(9,_binary '','Atun',1,1),(10,_binary '','Langostinos',1,1),(11,_binary '','Huevos',17,1),(12,_binary '','Sal',17,1),(13,_binary '','Pimienta',11,1),(14,_binary '','Arroz',17,1),(15,_binary '','Almejas',1,1),(16,_binary '','Pulpo',2,102),(17,_binary '','Aceite de Oliva Virgen Extra',12,102),(18,_binary '','Patata Cocida',14,102),(19,_binary '','Pimentón',12,102),(20,_binary '','Masa Madre',16,102),(21,_binary '','Carne Vaca Rubia Gallega',4,102),(22,_binary '','Solomillo',4,102),(23,_binary '','Pimiento Rojo',18,102),(24,_binary '','Atun',2,102),(25,_binary '','Langostinos',2,102),(26,_binary '','Huevos',18,102),(27,_binary '','Sal',18,102),(28,_binary '','Pimienta',12,102),(29,_binary '','Arroz',18,102),(30,_binary '','Almejas',2,102),(31,_binary '','Pulpo',19,152),(32,_binary '','Atun',19,152),(33,_binary '','Langostinos',19,152),(34,_binary '','Almejas',19,152),(35,_binary '','Carne Vaca Rubia Gallega',20,152),(36,_binary '','Solomillo',20,152),(37,_binary '','Patata Cocida',21,152),(38,_binary '','Huevos',22,152),(39,_binary '','Agua Mineral',23,152),(40,_binary '','Cerveza Artesana',23,152),(41,_binary '','Pimentón',24,152),(42,_binary '','Pimienta',24,152),(43,_binary '','Pimiento Rojo',25,152),(44,_binary '','Masa Madre',26,152),(45,_binary '','Aceite de Oliva Virgen Extra',27,152),(46,_binary '','Sal',27,152),(47,_binary '','Arroz',27,152),(48,_binary '','Agua Mineral',23,152),(49,_binary '','Coca Cola',23,152),(50,_binary '','pulpo',31,202),(51,_binary '','Aceite de Oliva',32,202),(52,_binary '','Pimenton Dulce',33,202),(53,_binary '','Agua Mineral',9,1),(54,_binary '','Coca Cola',9,1),(55,_binary '','patata cocida',34,202),(56,_binary '','Vino',35,202),(57,_binary '','Spaghetti',36,202),(58,_binary '','tomate',37,202),(59,_binary '','Manzana',38,202),(60,_binary '','xxx',39,202);
/*!40000 ALTER TABLE `ingredients_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients_item_seq`
--

DROP TABLE IF EXISTS `ingredients_item_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients_item_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients_item_seq`
--

LOCK TABLES `ingredients_item_seq` WRITE;
/*!40000 ALTER TABLE `ingredients_item_seq` DISABLE KEYS */;
INSERT INTO `ingredients_item_seq` VALUES (51);
/*!40000 ALTER TABLE `ingredients_item_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` bigint NOT NULL,
  `ingredients` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `total_price` bigint DEFAULT NULL,
  `food_id` bigint DEFAULT NULL,
  `order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4fcv9bk14o2k04wghr09jmy3b` (`food_id`),
  KEY `FKt4dc2r9nbvbujrljv3e23iibt` (`order_id`),
  CONSTRAINT `FK4fcv9bk14o2k04wghr09jmy3b` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`),
  CONSTRAINT `FKt4dc2r9nbvbujrljv3e23iibt` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1052,'Pulpo,Aceite oliva,Patata Cocida,Pimentón',2,36,402,1052),(1102,'14,2,10',2,50,452,1102),(1152,'1,2,3,4',1,18,402,1152),(1153,'1,2,3,4',1,18,402,1153),(1202,'Pulpo,Aceite oliva,Patata Cocida,Pimentón',2,36,402,1202),(1203,'Huevos,Arroz',1,7,504,1202),(1252,'Arroz,Aceite de Oliva Virgen Extra,Langostinos',2,50,452,1252),(1253,'Huevos,Arroz',3,21,504,1253),(1254,'Pulpo,Aceite de Oliva Virgen Extra,Patata Cocida',3,54,402,1254),(1255,'Arroz,Aceite de Oliva Virgen Extra,Langostinos',1,25,452,1254),(1256,'Huevos,Arroz',2,14,504,1255),(1257,'Aceite de Oliva Virgen Extra,Pimentón,Patata Cocida,Pulpo',6,108,402,1256),(1258,'Huevos,Arroz',1,7,504,1257),(1302,'Aceite de Oliva Virgen Extra,Pimentón,Patata Cocida,Pulpo',2,36,402,1302),(1352,'Solomillo,Sal,Pimiento Rojo,Aceite de Oliva Virgen Extra,Pimienta',2,34,553,1352),(1353,'Agua Mineral',2,4,552,1352),(1402,'Huevos,Arroz',2,14,504,1402),(1452,'Arroz,Huevos',2,14,504,1452),(1502,'Arroz,Aceite de Oliva Virgen Extra,Langostinos',1,25,452,1502),(1503,'Agua Mineral',1,2,552,1502),(1552,'Arroz,Aceite de Oliva Virgen Extra,Langostinos',1,25,452,1552),(1553,'Agua Mineral',2,4,552,1552),(1602,'Huevos,Arroz',3,21,504,1602),(1652,'Agua Mineral',1,2,552,1652),(1702,'Spaghetti,tomate',1,12,602,1702),(1752,'Huevos,Arroz',3,21,504,1752);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item_seq`
--

DROP TABLE IF EXISTS `order_item_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item_seq`
--

LOCK TABLES `order_item_seq` WRITE;
/*!40000 ALTER TABLE `order_item_seq` DISABLE KEYS */;
INSERT INTO `order_item_seq` VALUES (1851);
/*!40000 ALTER TABLE `order_item_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `total_item` int NOT NULL,
  `total_price` bigint DEFAULT NULL,
  `customer_id` bigint DEFAULT NULL,
  `delivery_address_id` bigint DEFAULT NULL,
  `restaurant_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK14n2jkmoyhpimhracvcdy7sst` (`customer_id`),
  KEY `FKbwhiubtkxf94knbm9oo55wdbm` (`delivery_address_id`),
  KEY `FKi7hgjxhw21nei3xgpe4nnpenh` (`restaurant_id`),
  CONSTRAINT `FK14n2jkmoyhpimhracvcdy7sst` FOREIGN KEY (`customer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKbwhiubtkxf94knbm9oo55wdbm` FOREIGN KEY (`delivery_address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `FKi7hgjxhw21nei3xgpe4nnpenh` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1052,'2025-04-04 10:55:32.755000','COMPLETED',2,36,2,502,1),(1102,'2025-04-07 09:47:50.176000','OUT_FOR_DELIVERY',2,50,2,552,1),(1152,'2025-04-07 10:29:05.479000','PENDING',1,18,2,602,1),(1153,'2025-04-07 11:40:06.389000','OUT_FOR_DELIVERY',1,18,2,603,1),(1202,'2025-04-21 09:05:03.028000','PENDING',3,43,2,702,1),(1252,'2025-04-22 10:27:46.786000','PENDING',2,50,2,752,1),(1253,'2025-04-22 10:29:43.079000','PENDING',3,21,2,753,152),(1254,'2025-04-22 11:57:28.031000','PENDING',4,79,2,754,1),(1255,'2025-04-22 11:59:04.210000','PENDING',2,14,2,755,152),(1256,'2025-04-22 12:01:46.542000','PENDING',6,108,2,756,1),(1257,'2025-04-22 13:52:04.625000','PENDING',1,7,2,757,152),(1302,'2025-04-25 12:13:42.756000','PENDING',2,36,2,802,1),(1352,'2025-05-06 12:22:14.637000','COMPLETED',4,38,302,902,1),(1402,'2025-05-06 12:32:19.485000','COMPLETED',2,14,302,952,152),(1452,'2025-05-08 08:46:35.693000','COMPLETED',2,14,302,902,152),(1502,'2025-05-08 09:38:00.915000','COMPLETED',2,27,302,902,1),(1552,'2025-05-09 10:09:30.877000','COMPLETED',3,29,2,753,1),(1602,'2025-05-12 09:37:57.582000','COMPLETED',3,21,302,902,152),(1652,'2025-05-13 15:14:34.360000','COMPLETED',1,2,2,752,1),(1702,'2025-05-14 07:50:10.827000','COMPLETED',1,12,2,756,202),(1752,'2025-05-14 07:59:23.209000','PENDING',3,21,2,1152,152);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_seq`
--

DROP TABLE IF EXISTS `orders_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_seq`
--

LOCK TABLES `orders_seq` WRITE;
/*!40000 ALTER TABLE `orders_seq` DISABLE KEYS */;
INSERT INTO `orders_seq` VALUES (1851);
/*!40000 ALTER TABLE `orders_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `cuisine_type` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `opened` bit(1) NOT NULL,
  `opening_hours` varchar(255) DEFAULT NULL,
  `registration_date` datetime(6) DEFAULT NULL,
  `address_id` bigint DEFAULT NULL,
  `owner_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK2b01rrbfd5g6hklh8ei57uhgn` (`address_id`),
  UNIQUE KEY `UKe5wptm5diypt91i1wpsa42h6x` (`owner_id`),
  CONSTRAINT `FK96q13p1ptpewvus590a8o83xt` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
  CONSTRAINT `FKnm7kj0jgjep1nm5rslxei79jl` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,'bodegonprestige@gmail.com','@bodegonoprestige','618 827 795','Galician','Bar ubicado en Os Castros','Prestige',_binary '','Martes-Domingo: 08:00AM- 00:00AM','2025-03-24 08:58:57.123710',252,1),(102,'cerveceriafenix@gmail.com','@cerveceriafenix','617 282 284','Galician','Cerveceria con cocina gallega','Fenix',_binary '\0','Lunes-Sabado: 08:00AM- 02:00AM','2025-03-24 13:25:28.218243',352,3),(152,'abrenteylago@gmail.com','@cerveceriaoabrente','981 472 735','Mediterranean','Cerveceria con restaurante y terraza en el barrio de Os Castros','Abrente e Lago',_binary '','Lunes-Domingo: 08:00AM- 01:00AM','2025-04-14 14:19:42.631472',652,152),(202,'mesonoscastros@gmail.com','@mesonoscastros','954876643','Galician','Restaurante - bar ubicado en un barrio de La Coruña','Meson Os Castros',_binary '','Mon-Sun : 09:00 - 00:00','2025-04-30 16:44:48.700641',852,202),(252,'milongasparrillada@gmail.com','@parrilladamilongas','981475432','Spanish','Parillada con buffet de diferentes carnes','Milongas',_binary '\0','Tue-Sun : 13:00 - 00:00','2025-05-08 12:56:35.696432',1052,252);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant_images`
--

DROP TABLE IF EXISTS `restaurant_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant_images` (
  `restaurant_id` bigint NOT NULL,
  `images` varchar(1000) DEFAULT NULL,
  KEY `FK810i11orew47qx1nrcwlh43jb` (`restaurant_id`),
  CONSTRAINT `FK810i11orew47qx1nrcwlh43jb` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant_images`
--

LOCK TABLES `restaurant_images` WRITE;
/*!40000 ALTER TABLE `restaurant_images` DISABLE KEYS */;
INSERT INTO `restaurant_images` VALUES (1,'https://cdn.pixabay.com/photo/2018/05/13/20/14/octopus-3397766_1280.jpg'),(1,'https://cdn.pixabay.com/photo/2018/05/16/16/43/octopus-3406293_1280.jpg'),(102,'https://cdn.pixabay.com/photo/2015/10/08/05/06/tortilla-977171_640.jpg'),(102,'https://cdn.pixabay.com/photo/2018/08/31/05/40/coxinha-3643872_1280.jpg'),(152,'https://images.unsplash.com/photo-1474898856510-884a2c0be546?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),(152,'https://images.unsplash.com/photo-1709740198353-df155e1acf36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),(202,'http://res.cloudinary.com/dmwy3upvv/image/upload/v1746024138/ekmpi1jbuqic6ykf8tlm.avif'),(202,'http://res.cloudinary.com/dmwy3upvv/image/upload/v1746024143/htrwgdidcojuenyho9gr.avif'),(202,'http://res.cloudinary.com/dmwy3upvv/image/upload/v1746024147/seubc6ho0fr83wy4igtw.avif'),(252,'http://res.cloudinary.com/dmwy3upvv/image/upload/v1746701763/ooe26fetg7a3wvxoo7d7.avif'),(252,'http://res.cloudinary.com/dmwy3upvv/image/upload/v1746701770/igqfroxfvgqjeipv8ogy.avif'),(252,'http://res.cloudinary.com/dmwy3upvv/image/upload/v1746701777/psyeukdsigw920g0ybqo.avif');
/*!40000 ALTER TABLE `restaurant_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant_seq`
--

DROP TABLE IF EXISTS `restaurant_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant_seq`
--

LOCK TABLES `restaurant_seq` WRITE;
/*!40000 ALTER TABLE `restaurant_seq` DISABLE KEYS */;
INSERT INTO `restaurant_seq` VALUES (351);
/*!40000 ALTER TABLE `restaurant_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_chk_1` CHECK ((`role` between 0 and 2))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'josito@gmail.com','Josito','$2a$10$bOSZ5uB5vkTmqZCsHvQ6LeYeC..S.86yP2unlhH1K4B7AFRhYCbHC',1),(2,'manucito@gmail.com','Manu','$2a$10$kGHmnKVEwxx7wD.o01aXQ.dFJHuxaOFfyL7QiER32oB1sWFw5cZaG',0),(3,'braisito@gmail.com','Brais','$2a$10$GfAKS.JtjrHubZ002nG4e.EHoT4hm9JSvHw3IAJgZiUnpqzrHl3AO',1),(52,'asas@sd.ggg','Adrian','$2a$10$Fnb4ifqJVAt7jBXTY6zt5OkaRidZ2DOEj7gqJWIQ4IkdjupUJcJvi',1),(102,'asdasd@asda.va','Adrian','$2a$10$V9L4MGwQ7HH3H2t1qD2Tr.KzHQo0hnGphc0yeuTVen0ZRGpSvMj7C',0),(103,'paco@gmail.com','Paco','$2a$10$3w7FziNvv3JUQaXHKsBfJehYGsU3P9S2incJJNjLJdCNqI1C6tyti',1),(152,'juan1969@gmail.com','Juan','$2a$10$nwi4Nj.u8wUddoHfOqB/7.6g7hpwvGS9W6p6djkio9914jsC8i9zK',1),(202,'josema@gmail.com','Jose Manuel','$2a$10$O4X//ohWPHkt04SNErEVRes6.mvBTr7lAQhPKzILjnK7rz22LMjbW',1),(252,'nahuelucas@gmail.com','Nahuel Lucas','$2a$10$xLhv9JbJrMI3bLvVG74EFuPorTjZbG/5ZREJLEx1r7FXpJYLRVPG2',1),(302,'samuelac@gmail.com','Samuel Angular','$2a$10$79fkmfRD7g94mj.g/TKmv.3qHm6PyCU1QLr.WI6HHgfa0xZuldiU6',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_addresses`
--

DROP TABLE IF EXISTS `user_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_addresses` (
  `user_id` bigint NOT NULL,
  `addresses_id` bigint NOT NULL,
  UNIQUE KEY `UKi5lp1fvgfvsplfqwu4ovwpnxs` (`addresses_id`),
  KEY `FKfm6x520mag23hvgr1oshaut8b` (`user_id`),
  CONSTRAINT `FKfm6x520mag23hvgr1oshaut8b` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKth1icmttmhhorb9wiarm73i06` FOREIGN KEY (`addresses_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_addresses`
--

LOCK TABLES `user_addresses` WRITE;
/*!40000 ALTER TABLE `user_addresses` DISABLE KEYS */;
INSERT INTO `user_addresses` VALUES (2,452),(2,502),(2,552),(2,602),(2,603),(2,702),(2,752),(2,753),(2,754),(2,755),(2,756),(2,757),(2,802),(302,902),(302,952);
/*!40000 ALTER TABLE `user_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favourites`
--

DROP TABLE IF EXISTS `user_favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_favourites` (
  `user_id` bigint NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `id` bigint DEFAULT NULL,
  `images` varbinary(1000) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `opened` bit(1) DEFAULT NULL,
  KEY `FKj2kht57b5ftwc4nkpn3vbc5b3` (`user_id`),
  CONSTRAINT `FKj2kht57b5ftwc4nkpn3vbc5b3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favourites`
--

LOCK TABLES `user_favourites` WRITE;
/*!40000 ALTER TABLE `user_favourites` DISABLE KEYS */;
INSERT INTO `user_favourites` VALUES (1,'Bar ubicado en Os Castros',1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0Ghttps://cdn.pixabay.com/photo/2018/05/13/20/14/octopus-3397766_1280.jpgt\0Ghttps://cdn.pixabay.com/photo/2018/05/16/16/43/octopus-3406293_1280.jpgx','Prestige',_binary ''),(152,'Cerveceria con restaurante y terraza en el barrio de Os Castros',152,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0�https://images.unsplash.com/photo-1474898856510-884a2c0be546?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dt\0�https://images.unsplash.com/photo-1709740198353-df155e1acf36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dx','Abrente e Lago',_binary ''),(302,'Bar ubicado en Os Castros',1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0Ghttps://cdn.pixabay.com/photo/2018/05/13/20/14/octopus-3397766_1280.jpgt\0Ghttps://cdn.pixabay.com/photo/2018/05/16/16/43/octopus-3406293_1280.jpgx','Prestige',_binary ''),(2,'Cerveceria con cocina gallega',11,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0Fhttps://cdn.pixabay.com/photo/2015/10/08/05/06/tortilla-977171_640.jpgt\0Ghttps://cdn.pixabay.com/photo/2018/08/31/05/40/coxinha-3643872_1280.jpgx','Fenix',_binary '\0'),(2,'Bar ubicado en Os Castros',1,_binary '�\�\0sr\0java.util.ArrayListx�\��\�a�\0I\0sizexp\0\0\0w\0\0\0t\0Ghttps://cdn.pixabay.com/photo/2018/05/13/20/14/octopus-3397766_1280.jpgt\0Ghttps://cdn.pixabay.com/photo/2018/05/16/16/43/octopus-3406293_1280.jpgx','Prestige',_binary '');
/*!40000 ALTER TABLE `user_favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_seq`
--

DROP TABLE IF EXISTS `user_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq` DISABLE KEYS */;
INSERT INTO `user_seq` VALUES (401);
/*!40000 ALTER TABLE `user_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-14  9:01:34
