-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 05 Janvier 2016 à 17:03
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `jweb`
--

-- --------------------------------------------------------

--
-- Structure de la table `base_product`
--

CREATE TABLE IF NOT EXISTS `base_product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `rating` float NOT NULL,
  `type_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_baseproduct_type_id` (`type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Contenu de la table `base_product`
--

INSERT INTO `base_product` (`id`, `name`, `description`, `image`, `rating`, `type_id`) VALUES
(1, 'Super Dog', 'Un super chien qui deviendra votre meilleur amis !', 'http://www.programme.tv/media/cache/relative_max_355x272/upload/epgs/2013/01/krypto-le-superchien_29597517_1.jpg', 5, 1),
(2, 'bonbon marsien', 'bonbon au nucléaire pour vous souhaitez la bienvenue sur Mars !', 'http://www.autourdubonbon.com/436-large_default/nuclear-gum.jpg', 2, 2),
(3, 'igloo high tech', 'Un peu rond, mais au moins vous n''aurez pas froid l''été.', 'http://planete-mars.com/wp-content/uploads/2015/09/SFERO_exterieur_sans_texte.jpg', 0.1, 4),
(7, 'Sabloïne', 'Du sable blanc, pur, qui fera grandir vos rêves', 'http://www.ctvnews.ca/polopoly_fs/1.966639.1348262627!/httpImage/image.jpeg_gen/derivatives/landscape_960/image.jpeg', 2.2, 2),
(8, 'Palais de rêve', 'Palais style Eucarien, en très bon état avec vue sur la mer.. Murs solident qui ne sont jamais tombé, idéal pour protéger vos femmes.', 'http://017ceef6c63d58be7d0b-54fdb269da09e5374665f5eb35cabb49.r77.cf1.rackcdn.com/mmc/chateau-sable-plage-jeux.jpg', 0.1, 4),
(9, 'Chateau aristotique', 'Beau chateau en bord de mer. Quelque fissure à colmater.', 'http://www.tourismelandes.com/sites/landesv3/files/styles/large/public/chateau_de_sable.jpg?itok=2_r98pYU', 0.1, 4),
(10, 'Billet destination Mars', 'Participer à l''aventure du siècle ! parter avec le prochain cargo vers Mars !', 'https://i.ytimg.com/vi/jx0-YMuz8M4/maxresdefault.jpg', 5, 23),
(11, 'Billet destination Terre', 'Nostalgique ? Fatigué de tout ce sable ? Vous souhaitez revoir la planète bleu ? rentrez à la maison !', 'https://media-mediatemple.netdna-ssl.com/wp-content/uploads/images/space-photography/earth_space.jpg', 5, 23),
(12, 'Ebi Yakisoba', 'Nouilles sautées aux crevettes', 'http://www.resto-de-bordeaux.com/wp-content/uploads/2014/11/nouilles-wok-fufu-bordeaux.jpg', 0.1, 10),
(13, 'Ramen', 'Les classiques Ramen du Naruto !', 'http://img.over-blog-kiwi.com/0/53/31/15/ob_9f83d2_img-0183.jpg', 0.1, 10),
(14, 'Donburi Tonkatsu', 'Porc pané sur lit de riz et soja', 'https://irs2.4sqi.net/img/general/600x600/11305760_wcpludsy01AmXvoOHBKTmDkeqdsrbt8CLZlDtM0Y23A.jpg', 0.1, 10),
(15, 'Alorym', 'petit serviteur vert qui deviendra votre amis', 'http://www.ludeek.com/wp-content/uploads/2014/09/extraterrestre-jeux.jpg', 0.1, 22),
(16, 'Théroym', 'petit lampe qui fait des bruits mignon', 'http://vignette1.wikia.nocookie.net/club-penguin/images/5/51/Puffle_Extraterrestre_Jaune.png/revision/latest?cb=20151119201129&path-prefix=fr', 0.1, 22),
(17, 'ArgoNoMIA', 'parfait pour empêcher les grenouilles d''envahir votre bassin !', 'http://a137.idata.over-blog.com/300x216/4/96/79/28/spore/un-truc-.-qui-ressemble-a-un-machin--png', 0.1, 22),
(18, 'CapsuleMarsOne', 'Logement tout confort pour les aventuriers de Mars', 'http://img0.mxstatic.com/wallpapers/8490cfd9c45f703e379ba1f8483c5a7a_large.jpeg', 0.1, 4),
(19, 'Deco Hight-TECH joly3', 'Nouvelle déco sortie de nulle part!', 'http://www.florenceporcel.com/wp-content/uploads/2013/08/habitat-mars-one.png', 0.1, 20);

-- --------------------------------------------------------

--
-- Structure de la table `cart`
--

CREATE TABLE IF NOT EXISTS `cart` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cart_user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Contenu de la table `cart`
--

INSERT INTO `cart` (`id`, `name`, `user_id`) VALUES
(27, 'panier', 3),
(28, 'le panier duNiglo', 3),
(29, 'default', 7),
(30, 'order', 3);

-- --------------------------------------------------------

--
-- Structure de la table `cart_product_list`
--

CREATE TABLE IF NOT EXISTS `cart_product_list` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `cart_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cartproductlist_cart_id` (`cart_id`),
  KEY `fk_cartproductlist_product_id` (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Contenu de la table `cart_product_list`
--

INSERT INTO `cart_product_list` (`id`, `quantity`, `cart_id`, `product_id`) VALUES
(6, 3, 27, 15),
(7, 1, 27, 16),
(8, 1, 27, 17),
(9, 1, 27, 18),
(10, 1, 27, 19),
(11, 1, 28, 18),
(12, 1, 29, 16),
(13, 1, 29, 17),
(14, 1, 29, 15),
(15, 1, 29, 19),
(16, 2, 30, 15);

-- --------------------------------------------------------

--
-- Structure de la table `databasechangelog`
--

CREATE TABLE IF NOT EXISTS `databasechangelog` (
  `ID` varchar(255) NOT NULL,
  `AUTHOR` varchar(255) NOT NULL,
  `FILENAME` varchar(255) NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `ORDEREXECUTED` int(11) NOT NULL,
  `EXECTYPE` varchar(10) NOT NULL,
  `MD5SUM` varchar(35) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `TAG` varchar(255) DEFAULT NULL,
  `LIQUIBASE` varchar(20) DEFAULT NULL,
  `CONTEXTS` varchar(255) DEFAULT NULL,
  `LABELS` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `databasechangelog`
--

INSERT INTO `databasechangelog` (`ID`, `AUTHOR`, `FILENAME`, `DATEEXECUTED`, `ORDEREXECUTED`, `EXECTYPE`, `MD5SUM`, `DESCRIPTION`, `COMMENTS`, `TAG`, `LIQUIBASE`, `CONTEXTS`, `LABELS`) VALUES
('00000000000001', 'jhipster', 'classpath:config/liquibase/changelog/00000000000000_initial_schema.xml', '2015-12-21 20:33:31', 1, 'EXECUTED', '7:e5d421759980df5ea9b5cd2ebcfd994c', 'createTable, createIndex (x2), createTable (x2), addPrimaryKey, createTable, addForeignKeyConstraint (x3), loadData, dropDefaultValue, loadData (x2), createTable (x2), addPrimaryKey, createIndex (x2), addForeignKeyConstraint', '', NULL, '3.4.1', NULL, NULL),
('20151221193638', 'jhipster', 'classpath:config/liquibase/changelog/20151221193638_added_entity_Status.xml', '2015-12-21 20:57:21', 2, 'EXECUTED', '7:1f0d9390517d3d81784a411c3c2fd402', 'createTable', '', NULL, '3.4.1', NULL, NULL),
('20151221193744', 'jhipster', 'classpath:config/liquibase/changelog/20151221193744_added_entity_Payment.xml', '2015-12-21 20:57:22', 3, 'EXECUTED', '7:b5a76680fab470b14453ecf4d7145fb4', 'createTable', '', NULL, '3.4.1', NULL, NULL),
('20151221193900', 'jhipster', 'classpath:config/liquibase/changelog/20151221193900_added_entity_Cart.xml', '2015-12-21 20:57:23', 4, 'EXECUTED', '7:b8c83e3fe98fb26f2ded43d1293ef2c9', 'createTable, addForeignKeyConstraint', '', NULL, '3.4.1', NULL, NULL),
('20151221194044', 'jhipster', 'classpath:config/liquibase/changelog/20151221194044_added_entity_Delivery.xml', '2015-12-21 20:57:29', 5, 'EXECUTED', '7:4d1d088d198ae12fb7f3390990c6e4c2', 'createTable, addForeignKeyConstraint (x4)', '', NULL, '3.4.1', NULL, NULL),
('20151221194238', 'jhipster', 'classpath:config/liquibase/changelog/20151221194238_added_entity_Type.xml', '2015-12-21 20:57:30', 6, 'EXECUTED', '7:806fc7b016ff3d71733a873bf53a4e0f', 'createTable', '', NULL, '3.4.1', NULL, NULL),
('20151221194403', 'jhipster', 'classpath:config/liquibase/changelog/20151221194403_added_entity_BaseProduct.xml', '2015-12-21 20:57:31', 7, 'EXECUTED', '7:b586a9aa3733309ae9f7b143412ffca3', 'createTable, addForeignKeyConstraint', '', NULL, '3.4.1', NULL, NULL),
('20151221194540', 'jhipster', 'classpath:config/liquibase/changelog/20151221194540_added_entity_Promotion.xml', '2015-12-21 20:57:31', 8, 'EXECUTED', '7:aea492b42e464fb1ec7bdec97337b9c5', 'createTable', '', NULL, '3.4.1', NULL, NULL),
('20151221194822', 'jhipster', 'classpath:config/liquibase/changelog/20151221194822_added_entity_Product.xml', '2015-12-21 20:57:33', 9, 'EXECUTED', '7:3a4cfcd397d1d248182dffc68a0681ba', 'createTable, addForeignKeyConstraint (x2)', '', NULL, '3.4.1', NULL, NULL),
('20151221195016', 'jhipster', 'classpath:config/liquibase/changelog/20151221195016_added_entity_CartProductList.xml', '2015-12-21 20:57:36', 10, 'EXECUTED', '7:f4acdc7196b7796c6cf76ca8de292ecf', 'createTable, addForeignKeyConstraint (x2)', '', NULL, '3.4.1', NULL, NULL),
('20151221195417', 'jhipster', 'classpath:config/liquibase/changelog/20151221195417_added_entity_MarketPlace.xml', '2015-12-21 20:57:37', 11, 'EXECUTED', '7:9ac6273c8f4f94fbaa709b873fe40c94', 'createTable, addForeignKeyConstraint', '', NULL, '3.4.1', NULL, NULL),
('20151221195522', 'jhipster', 'classpath:config/liquibase/changelog/20151221195522_added_entity_News.xml', '2015-12-21 20:57:38', 12, 'EXECUTED', '7:e06d59c84be3ed17bf77f1261e64aa81', 'createTable, dropDefaultValue, addForeignKeyConstraint', '', NULL, '3.4.1', NULL, NULL),
('20151221195619', 'jhipster', 'classpath:config/liquibase/changelog/20151221195619_added_entity_MarketProductList.xml', '2015-12-21 20:57:41', 13, 'EXECUTED', '7:a07e34ee9ccb985298e9ed6d59cdc204', 'createTable, addForeignKeyConstraint (x2)', '', NULL, '3.4.1', NULL, NULL),
('20151229120310', 'jhipster', 'classpath:config/liquibase/changelog/20151229120310_added_entity_MarketPlace.xml', '2015-12-29 15:36:00', 14, 'EXECUTED', '7:54959db65380b0279fd6419af02eac99', 'createTable, addForeignKeyConstraint', NULL, NULL, '3.4.1', NULL, NULL),
('20151229120930', 'jhipster', 'classpath:config/liquibase/changelog/20151229120930_added_entity_Product.xml', '2015-12-29 15:36:00', 15, 'EXECUTED', '7:1ff7b143f7508e1ea92aa4fbfe5abc82', 'createTable, addForeignKeyConstraint (x2)', NULL, NULL, '3.4.1', NULL, NULL),
('20160105020052', 'jhipster', 'classpath:config/liquibase/changelog/20160105020052_added_entity_Subscription.xml', '2016-01-05 03:07:17', 16, 'EXECUTED', '7:55e424bacaf341f3e2ad15e4c4513710', 'createTable, addForeignKeyConstraint', '', NULL, '3.4.1', NULL, NULL),
('20160105142400', 'jhipster', 'classpath:config/liquibase/changelog/20160105142400_added_entity_Subscription.xml', '2016-01-05 15:31:55', 17, 'EXECUTED', '7:7a7f9826f5a343a3e228dd23acc7f434', 'createTable, addForeignKeyConstraint', '', NULL, '3.4.1', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `databasechangeloglock`
--

CREATE TABLE IF NOT EXISTS `databasechangeloglock` (
  `ID` int(11) NOT NULL,
  `LOCKED` bit(1) NOT NULL,
  `LOCKGRANTED` datetime DEFAULT NULL,
  `LOCKEDBY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `databasechangeloglock`
--

INSERT INTO `databasechangeloglock` (`ID`, `LOCKED`, `LOCKGRANTED`, `LOCKEDBY`) VALUES
(1, b'0', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `delivery`
--

CREATE TABLE IF NOT EXISTS `delivery` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status_id` bigint(20) DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `cart_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_id` (`cart_id`),
  KEY `fk_delivery_status_id` (`status_id`),
  KEY `fk_delivery_payment_id` (`payment_id`),
  KEY `fk_delivery_user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `delivery`
--

INSERT INTO `delivery` (`id`, `status_id`, `payment_id`, `user_id`, `cart_id`) VALUES
(1, 5, 3, 3, 28),
(6, 5, 1, 3, 27);

-- --------------------------------------------------------

--
-- Structure de la table `jhi_authority`
--

CREATE TABLE IF NOT EXISTS `jhi_authority` (
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `jhi_authority`
--

INSERT INTO `jhi_authority` (`name`) VALUES
('ROLE_ADMIN'),
('ROLE_USER');

-- --------------------------------------------------------

--
-- Structure de la table `jhi_persistent_audit_event`
--

CREATE TABLE IF NOT EXISTS `jhi_persistent_audit_event` (
  `event_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `principal` varchar(255) NOT NULL,
  `event_date` timestamp NULL DEFAULT NULL,
  `event_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `idx_persistent_audit_event` (`principal`,`event_date`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=79 ;

--
-- Contenu de la table `jhi_persistent_audit_event`
--

INSERT INTO `jhi_persistent_audit_event` (`event_id`, `principal`, `event_date`, `event_type`) VALUES
(1, 'admin', '2015-12-21 19:58:16', 'AUTHENTICATION_SUCCESS'),
(2, 'admin', '2015-12-28 00:01:32', 'AUTHENTICATION_SUCCESS'),
(3, 'user', '2015-12-28 00:17:22', 'AUTHENTICATION_SUCCESS'),
(4, 'admin', '2015-12-28 00:19:51', 'AUTHENTICATION_SUCCESS'),
(5, 'user', '2015-12-28 00:20:05', 'AUTHENTICATION_SUCCESS'),
(6, 'admin', '2015-12-28 10:32:08', 'AUTHENTICATION_SUCCESS'),
(7, 'admin', '2015-12-29 12:11:34', 'AUTHENTICATION_SUCCESS'),
(8, 'user', '2015-12-29 12:53:16', 'AUTHENTICATION_SUCCESS'),
(9, 'admin', '2015-12-30 02:00:50', 'AUTHENTICATION_SUCCESS'),
(10, 'user', '2015-12-30 02:02:20', 'AUTHENTICATION_SUCCESS'),
(11, 'admin', '2015-12-30 02:03:59', 'AUTHENTICATION_SUCCESS'),
(12, 'admin', '2015-12-30 02:04:39', 'AUTHENTICATION_SUCCESS'),
(13, 'Admin', '2015-12-30 16:30:04', 'AUTHENTICATION_FAILURE'),
(14, 'admin', '2015-12-30 16:30:08', 'AUTHENTICATION_SUCCESS'),
(15, 'admin', '2015-12-30 19:42:30', 'AUTHENTICATION_SUCCESS'),
(16, 'admin', '2015-12-30 20:39:31', 'AUTHENTICATION_SUCCESS'),
(17, 'admin', '2015-12-31 07:19:38', 'AUTHENTICATION_SUCCESS'),
(18, 'admin', '2015-12-31 07:19:53', 'AUTHENTICATION_SUCCESS'),
(19, 'admin', '2016-01-01 15:57:08', 'AUTHENTICATION_SUCCESS'),
(20, 'system', '2016-01-01 16:03:38', 'AUTHENTICATION_FAILURE'),
(21, 'admin', '2016-01-01 16:04:09', 'AUTHENTICATION_SUCCESS'),
(22, 'draym', '2016-01-01 16:05:06', 'AUTHENTICATION_SUCCESS'),
(23, 'admin', '2016-01-01 16:15:47', 'AUTHENTICATION_SUCCESS'),
(24, 'admin', '2016-01-01 16:34:42', 'AUTHENTICATION_SUCCESS'),
(25, 'admin', '2016-01-01 22:33:39', 'AUTHENTICATION_SUCCESS'),
(26, 'leniglo', '2016-01-01 22:34:55', 'AUTHENTICATION_SUCCESS'),
(27, 'draym', '2016-01-02 01:35:15', 'AUTHENTICATION_SUCCESS'),
(28, 'admin', '2016-01-02 01:45:19', 'AUTHENTICATION_SUCCESS'),
(29, 'admin', '2016-01-02 01:47:11', 'AUTHENTICATION_SUCCESS'),
(30, 'user', '2016-01-02 03:20:03', 'AUTHENTICATION_SUCCESS'),
(31, 'admin', '2016-01-02 17:26:20', 'AUTHENTICATION_SUCCESS'),
(32, 'user', '2016-01-02 19:00:50', 'AUTHENTICATION_SUCCESS'),
(33, 'admin', '2016-01-02 19:01:14', 'AUTHENTICATION_SUCCESS'),
(34, 'admin', '2016-01-02 19:31:27', 'AUTHENTICATION_SUCCESS'),
(35, 'leniglo', '2016-01-03 15:52:32', 'AUTHENTICATION_FAILURE'),
(36, 'leniglo', '2016-01-03 15:52:39', 'AUTHENTICATION_SUCCESS'),
(37, 'admin', '2016-01-03 22:15:55', 'AUTHENTICATION_SUCCESS'),
(38, 'draym', '2016-01-04 01:05:08', 'AUTHENTICATION_SUCCESS'),
(39, 'admin', '2016-01-04 01:15:39', 'AUTHENTICATION_SUCCESS'),
(40, 'draym', '2016-01-04 01:16:05', 'AUTHENTICATION_SUCCESS'),
(41, 'admin', '2016-01-04 03:00:31', 'AUTHENTICATION_SUCCESS'),
(42, 'draym', '2016-01-04 19:32:09', 'AUTHENTICATION_SUCCESS'),
(43, 'admin', '2016-01-04 22:02:49', 'AUTHENTICATION_SUCCESS'),
(44, 'admin', '2016-01-04 22:19:08', 'AUTHENTICATION_SUCCESS'),
(45, 'admin', '2016-01-04 22:21:13', 'AUTHENTICATION_SUCCESS'),
(46, 'draym', '2016-01-04 23:13:56', 'AUTHENTICATION_FAILURE'),
(47, 'draym', '2016-01-04 23:14:01', 'AUTHENTICATION_FAILURE'),
(48, 'draym', '2016-01-04 23:14:07', 'AUTHENTICATION_SUCCESS'),
(49, 'draym', '2016-01-05 01:22:25', 'AUTHENTICATION_SUCCESS'),
(50, 'admin', '2016-01-05 01:38:20', 'AUTHENTICATION_SUCCESS'),
(51, 'draym', '2016-01-05 01:45:03', 'AUTHENTICATION_SUCCESS'),
(52, 'admin', '2016-01-05 02:08:16', 'AUTHENTICATION_SUCCESS'),
(53, 'leniglo', '2016-01-05 13:09:27', 'AUTHENTICATION_FAILURE'),
(54, 'leniglo', '2016-01-05 13:09:32', 'AUTHENTICATION_SUCCESS'),
(55, 'draym', '2016-01-05 13:57:06', 'AUTHENTICATION_SUCCESS'),
(56, 'admin', '2016-01-05 13:59:32', 'AUTHENTICATION_SUCCESS'),
(57, 'draym', '2016-01-05 14:14:54', 'AUTHENTICATION_SUCCESS'),
(58, 'admin', '2016-01-05 14:16:23', 'AUTHENTICATION_SUCCESS'),
(59, 'admin', '2016-01-05 14:19:43', 'AUTHENTICATION_SUCCESS'),
(60, 'leniglo', '2016-01-05 14:20:06', 'AUTHENTICATION_SUCCESS'),
(61, 'draym', '2016-01-05 14:27:33', 'AUTHENTICATION_SUCCESS'),
(62, 'draym', '2016-01-05 14:36:21', 'AUTHENTICATION_SUCCESS'),
(63, 'alocam', '2016-01-05 15:33:25', 'AUTHENTICATION_FAILURE'),
(64, 'alocam', '2016-01-05 15:33:30', 'AUTHENTICATION_FAILURE'),
(65, 'admin', '2016-01-05 15:33:40', 'AUTHENTICATION_SUCCESS'),
(66, 'alomac', '2016-01-05 15:34:01', 'AUTHENTICATION_FAILURE'),
(67, 'alomac', '2016-01-05 15:34:06', 'AUTHENTICATION_SUCCESS'),
(68, 'admin', '2016-01-05 15:45:06', 'AUTHENTICATION_SUCCESS'),
(69, 'alomac', '2016-01-05 15:51:00', 'AUTHENTICATION_SUCCESS'),
(70, 'LeSuper', '2016-01-05 15:51:52', 'AUTHENTICATION_FAILURE'),
(71, 'lesuper', '2016-01-05 15:51:56', 'AUTHENTICATION_FAILURE'),
(72, 'admin', '2016-01-05 15:52:03', 'AUTHENTICATION_SUCCESS'),
(73, 'supermediator', '2016-01-05 15:52:32', 'AUTHENTICATION_SUCCESS'),
(74, 'admin', '2016-01-05 15:53:42', 'AUTHENTICATION_SUCCESS'),
(75, 'supermediator', '2016-01-05 15:54:54', 'AUTHENTICATION_SUCCESS'),
(76, 'admin', '2016-01-05 15:57:22', 'AUTHENTICATION_SUCCESS'),
(77, 'alomac', '2016-01-05 16:01:08', 'AUTHENTICATION_SUCCESS'),
(78, 'admin', '2016-01-05 16:02:19', 'AUTHENTICATION_SUCCESS');

-- --------------------------------------------------------

--
-- Structure de la table `jhi_persistent_audit_evt_data`
--

CREATE TABLE IF NOT EXISTS `jhi_persistent_audit_evt_data` (
  `event_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`,`name`),
  KEY `idx_persistent_audit_evt_data` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `jhi_persistent_audit_evt_data`
--

INSERT INTO `jhi_persistent_audit_evt_data` (`event_id`, `name`, `value`) VALUES
(1, 'remoteAddress', '127.0.0.1'),
(1, 'sessionId', 'DACCA969D815D91D961181AD2476E82C'),
(2, 'remoteAddress', '127.0.0.1'),
(2, 'sessionId', '45BDF182B1847E1126C58AEEB29194D0'),
(3, 'remoteAddress', '127.0.0.1'),
(3, 'sessionId', 'C3DA5870091B421D265AC819A161675A'),
(4, 'remoteAddress', '127.0.0.1'),
(4, 'sessionId', '6CAB42473CC7BC8E45A22BDFEA76E571'),
(5, 'remoteAddress', '127.0.0.1'),
(5, 'sessionId', '78B7E08A168A00C97AF5AAC672279D4D'),
(6, 'remoteAddress', '127.0.0.1'),
(6, 'sessionId', '6A7C8C60323B82BF938817DBAC5CED89'),
(7, 'remoteAddress', '127.0.0.1'),
(7, 'sessionId', '887FAA90CFE831B424D13A816294620E'),
(8, 'remoteAddress', '127.0.0.1'),
(8, 'sessionId', '4A8C788A964C4FAD1D9D6B3A5BAC6BE2'),
(9, 'remoteAddress', '127.0.0.1'),
(9, 'sessionId', 'F9D10A5F04EC4023B26DC4299B94C666'),
(10, 'remoteAddress', '127.0.0.1'),
(10, 'sessionId', '12FE917EAC7A075DDCA6750501AB445C'),
(11, 'remoteAddress', '127.0.0.1'),
(11, 'sessionId', '68F314A481629DE1292B05202F995997'),
(12, 'remoteAddress', '127.0.0.1'),
(12, 'sessionId', '111BF60AC82A12706EBDD145B88D21F6'),
(13, 'message', 'Bad credentials'),
(13, 'type', 'org.springframework.security.authentication.BadCredentialsException'),
(14, 'remoteAddress', '127.0.0.1'),
(14, 'sessionId', '239FA2E2C822A143AED265B51CB37362'),
(15, 'remoteAddress', '127.0.0.1'),
(15, 'sessionId', 'A2977F93E37767FB90259E87393D5D4F'),
(16, 'remoteAddress', '127.0.0.1'),
(16, 'sessionId', '38A586615FDB5B714A6AC22AF3FA7490'),
(17, 'remoteAddress', '127.0.0.1'),
(17, 'sessionId', '08B739289862382FCB2BAA3EFCF645C7'),
(18, 'remoteAddress', '127.0.0.1'),
(18, 'sessionId', '7D8B10CC2DB9207DDD5E2D3C5C07D8CA'),
(19, 'remoteAddress', '127.0.0.1'),
(19, 'sessionId', 'AFF962478B99E68651EB0344664401B8'),
(20, 'message', 'Bad credentials'),
(20, 'type', 'org.springframework.security.authentication.BadCredentialsException'),
(21, 'remoteAddress', '127.0.0.1'),
(21, 'sessionId', 'AC66BDC7396226DA4EE2DF3F366B4C56'),
(22, 'remoteAddress', '127.0.0.1'),
(22, 'sessionId', 'EF7B6B81F4225486755C979A807AAF7F'),
(23, 'remoteAddress', '127.0.0.1'),
(23, 'sessionId', '4E02A9632968BABBD7390FF7F08440FF'),
(24, 'remoteAddress', '127.0.0.1'),
(24, 'sessionId', 'D9E33A31F4B129EA475586290D2231F3'),
(25, 'remoteAddress', '89.158.151.55'),
(25, 'sessionId', 'CBF1706BB56A267BB16B5CF1383D85C5'),
(26, 'remoteAddress', '5.65.114.87'),
(26, 'sessionId', '2297BADF5E5602EA1426AA9D1E564E48'),
(27, 'remoteAddress', '127.0.0.1'),
(27, 'sessionId', 'D6E4DF4359A70A2ACCE0C1144BA0D86C'),
(28, 'remoteAddress', '127.0.0.1'),
(28, 'sessionId', 'AF048169CF2705E956AC9041076043E5'),
(29, 'remoteAddress', '127.0.0.1'),
(29, 'sessionId', '1C2503EE1279811C570D1CBEE4A75390'),
(30, 'remoteAddress', '127.0.0.1'),
(30, 'sessionId', 'E7DFA302F22C887F80D66E03EB6A0B9D'),
(31, 'remoteAddress', '127.0.0.1'),
(31, 'sessionId', '45B37DA78463350BB4D7655199853105'),
(32, 'remoteAddress', '127.0.0.1'),
(32, 'sessionId', '3D65711397948D994E53EFEF3BB720D3'),
(33, 'remoteAddress', '127.0.0.1'),
(33, 'sessionId', '6534E6C7F1FCF8F543E748D40C429084'),
(34, 'remoteAddress', '127.0.0.1'),
(34, 'sessionId', '280E27308761BB004C1EF294E7AFCC47'),
(35, 'message', 'Bad credentials'),
(35, 'type', 'org.springframework.security.authentication.BadCredentialsException'),
(36, 'remoteAddress', '5.65.114.87'),
(36, 'sessionId', '0AC0582BCEB533988F85ECC19B9D82DD'),
(37, 'remoteAddress', '127.0.0.1'),
(37, 'sessionId', '686DC659054F8BEA198BE1A98386A4EA'),
(38, 'remoteAddress', '127.0.0.1'),
(38, 'sessionId', '9C4F57E209787A8831F6F3D9DC5F0702'),
(39, 'remoteAddress', '127.0.0.1'),
(39, 'sessionId', '8F4F358BE219C158D83FEE9CAD167830'),
(40, 'remoteAddress', '127.0.0.1'),
(40, 'sessionId', '4606F76C7EBEB80DAD364D83FD62EA3D'),
(41, 'remoteAddress', '127.0.0.1'),
(41, 'sessionId', 'C6669D20D83E9A8FA884A26092C7417B'),
(42, 'remoteAddress', '127.0.0.1'),
(42, 'sessionId', '49E918E4CA429EF8F5C0EB0B4561D523'),
(43, 'remoteAddress', '127.0.0.1'),
(43, 'sessionId', 'A7D2EFE1BD078B47D115EFB21F6572CE'),
(44, 'remoteAddress', '127.0.0.1'),
(44, 'sessionId', '08416BFFF038F88CB1B283E5DD2027FD'),
(45, 'remoteAddress', '85.170.212.203'),
(45, 'sessionId', 'ED6247E0D3CFE363E6C3F81F51387FED'),
(46, 'message', 'Bad credentials'),
(46, 'type', 'org.springframework.security.authentication.BadCredentialsException'),
(47, 'message', 'Bad credentials'),
(47, 'type', 'org.springframework.security.authentication.BadCredentialsException'),
(48, 'remoteAddress', '89.158.151.55'),
(48, 'sessionId', '9EAC77BA57726AFDE0D628503BAD1EC5'),
(49, 'remoteAddress', '127.0.0.1'),
(49, 'sessionId', '352BDA9FBDFA78015148424A4C2A7A50'),
(50, 'remoteAddress', '127.0.0.1'),
(50, 'sessionId', 'C770934B2AE41620CE05539F7739E378'),
(51, 'remoteAddress', '127.0.0.1'),
(51, 'sessionId', '00E94D62CF03D1AEEAC35913ADB19223'),
(52, 'remoteAddress', '127.0.0.1'),
(52, 'sessionId', '80A9F914F79FA2BE469C287892517294'),
(53, 'message', 'Bad credentials'),
(53, 'type', 'org.springframework.security.authentication.BadCredentialsException'),
(54, 'remoteAddress', '2.222.205.208'),
(54, 'sessionId', 'A591028192F9E26EEA97017EED7999ED'),
(55, 'remoteAddress', '127.0.0.1'),
(55, 'sessionId', 'F056FECA9692451B8CBBE3B50E184BEC'),
(56, 'remoteAddress', '127.0.0.1'),
(56, 'sessionId', '75ED052F9D913803C93B34BBA290849F'),
(57, 'remoteAddress', '127.0.0.1'),
(57, 'sessionId', '21FA1115653AFD009110D9BEAE97A7B9'),
(58, 'remoteAddress', '127.0.0.1'),
(58, 'sessionId', '021A44E1AEB0651EEE95A3CD54B40E95'),
(59, 'remoteAddress', '2.222.205.208'),
(59, 'sessionId', '0064E5FAFA396D4274224E64E35FF171'),
(60, 'remoteAddress', '2.222.205.208'),
(60, 'sessionId', '12DE3C4F143B2978B1CAC6EE10FBD721'),
(61, 'remoteAddress', '127.0.0.1'),
(61, 'sessionId', '987C4D8F65CEE743161788AE118F3E36'),
(62, 'remoteAddress', '127.0.0.1'),
(62, 'sessionId', '35DB6AD2D101C1798C1C89BE3C62C6FD'),
(63, 'message', 'Bad credentials'),
(63, 'type', 'org.springframework.security.authentication.BadCredentialsException'),
(64, 'message', 'Bad credentials'),
(64, 'type', 'org.springframework.security.authentication.BadCredentialsException'),
(65, 'remoteAddress', '127.0.0.1'),
(65, 'sessionId', 'C7AC782B49A06BDF4CB312BCDFE93D35'),
(66, 'message', 'Bad credentials'),
(66, 'type', 'org.springframework.security.authentication.BadCredentialsException'),
(67, 'remoteAddress', '127.0.0.1'),
(67, 'sessionId', 'C0B2E2A35E0CF71EA249403C97EC01E1'),
(68, 'remoteAddress', '127.0.0.1'),
(68, 'sessionId', '78CD2595024C1F538F6BEA7DC049AEB4'),
(69, 'remoteAddress', '127.0.0.1'),
(69, 'sessionId', '2F501A93F3793D48789DE59F05FEAAB0'),
(70, 'message', 'Bad credentials'),
(70, 'type', 'org.springframework.security.authentication.BadCredentialsException'),
(71, 'message', 'Bad credentials'),
(71, 'type', 'org.springframework.security.authentication.BadCredentialsException'),
(72, 'remoteAddress', '127.0.0.1'),
(72, 'sessionId', '962E473A7B5D0FEA52F0B9AAB8589DC1'),
(73, 'remoteAddress', '127.0.0.1'),
(73, 'sessionId', '4E397EA51EBF03A7E6C62F4CC8AEA40E'),
(74, 'remoteAddress', '127.0.0.1'),
(74, 'sessionId', '5E3675AA2ABCA0DC77AADD5E5C20DDB4'),
(75, 'remoteAddress', '127.0.0.1'),
(75, 'sessionId', '3E9BEE3EA0BCD59BB31A6EE0D1A33BC5'),
(76, 'remoteAddress', '127.0.0.1'),
(76, 'sessionId', 'C714EBAA19EF6C8B9B825BAF6FAE013D'),
(77, 'remoteAddress', '127.0.0.1'),
(77, 'sessionId', '9EDFD7D61B3BD26EF09EA9FC582D7739'),
(78, 'remoteAddress', '127.0.0.1'),
(78, 'sessionId', '699F65A33A6F2F7B81B9F379249CBE53');

-- --------------------------------------------------------

--
-- Structure de la table `jhi_persistent_token`
--

CREATE TABLE IF NOT EXISTS `jhi_persistent_token` (
  `series` varchar(255) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `token_value` varchar(255) NOT NULL,
  `token_date` date DEFAULT NULL,
  `ip_address` varchar(39) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`series`),
  KEY `fk_user_persistent_token` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `jhi_persistent_token`
--

INSERT INTO `jhi_persistent_token` (`series`, `user_id`, `token_value`, `token_date`, `ip_address`, `user_agent`) VALUES
('64qSowxMceoz1ca4gu6WGg==', 3, 'JWXugiVkdwnQjKiuHSbLLQ==', '2015-12-31', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'),
('8hoN0mGtIlCshewy1YqpTw==', 4, 'E4etYKrXg1W9kAdJcYn6cw==', '2015-12-29', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0'),
('9rzZNaRDsVV607bXFXiVEQ==', 7, 'YkkkPqoxP5hd83nHiJOxxg==', '2016-01-05', '2.222.205.208', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:45.0) Gecko/20100101 Firefox/45.0'),
('bH23Wthix93ava/4L7r75A==', 5, 'n0jRgXBsHItKl02gHlfPtw==', '2016-01-05', '89.158.151.55', 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0'),
('c8DunR0aqHx3Qyuom+RNzQ==', 3, '6hKV+NqeI043kewGzPmdxg==', '2016-01-05', '85.170.212.203', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'),
('eGOdY6MGKtb4R+eZ9T94eg==', 3, 'pd3mCR07SNJTRxhkHEiGlQ==', '2016-01-04', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'),
('qZTtrFbM8OtEXPnueK/YFg==', 3, 'pGLZqQjLFaWRhgQlMeU6IQ==', '2016-01-05', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0'),
('v1QUcqOvJ4T4Cwpi9KlsmQ==', 7, 'fRC8flrKJAJOAJFQsB0oYQ==', '2016-01-05', '2.222.205.208', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'),
('W+emTEQCl+/J049oWhs3RA==', 5, 'AzDky60dIgu+30n/xHVKrw==', '2016-01-05', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0'),
('Yo6nARjjrsuqz7TziwXL2A==', 3, 'J5+ebE3rFbU0V3N4iG/q7A==', '2016-01-01', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36');

-- --------------------------------------------------------

--
-- Structure de la table `jhi_user`
--

CREATE TABLE IF NOT EXISTS `jhi_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password_hash` varchar(60) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `activated` bit(1) NOT NULL,
  `lang_key` varchar(5) DEFAULT NULL,
  `activation_key` varchar(20) DEFAULT NULL,
  `reset_key` varchar(20) DEFAULT NULL,
  `created_by` varchar(50) NOT NULL,
  `created_date` timestamp NOT NULL,
  `reset_date` timestamp NULL DEFAULT NULL,
  `last_modified_by` varchar(50) DEFAULT NULL,
  `last_modified_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  UNIQUE KEY `idx_user_login` (`login`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `idx_user_email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Contenu de la table `jhi_user`
--

INSERT INTO `jhi_user` (`id`, `login`, `password_hash`, `first_name`, `last_name`, `email`, `activated`, `lang_key`, `activation_key`, `reset_key`, `created_by`, `created_date`, `reset_date`, `last_modified_by`, `last_modified_date`) VALUES
(1, 'system', '$2a$10$mE.qmcV0mFU5NcKh73TZx.z4ueI/.bDWbj0T1BYyqP481kGGarKLG', 'System', 'System', 'system@localhost', b'1', 'en', NULL, NULL, 'system', '2015-12-21 19:33:28', NULL, NULL, NULL),
(2, 'anonymousUser', '$2a$10$j8S5d7Sr7.8VTOYNviDPOeWX8KcYILUVJBsYV83Y5NtECayypx9lO', 'Anonymous', 'User', 'anonymous@localhost', b'1', 'en', NULL, NULL, 'system', '2015-12-21 19:33:28', NULL, NULL, NULL),
(3, 'admin', '$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC', 'Administrator', 'Administrator', 'admin@localhost', b'1', 'en', NULL, NULL, 'system', '2015-12-21 19:33:28', NULL, NULL, NULL),
(4, 'user', '$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K', 'User', 'User', 'user@localhost', b'1', 'en', NULL, NULL, 'system', '2015-12-21 19:33:28', NULL, NULL, NULL),
(5, 'draym', '$2a$10$eLRECfOOiTF35To4t7v/bug/D4WlubU4q.Dzp9k1e9mlGLmNqHlsa', NULL, NULL, 'kevin.draym@gmail.com', b'1', 'en', '09660873491152372215', NULL, 'anonymousUser', '2016-01-01 15:59:51', NULL, 'admin', '2016-01-01 16:04:41'),
(6, 'alomac', '$2a$10$ciCUbXlHOLSOhKBZym8Ic.T7QbspUY8t9dMh85hY0UF448.dHnYmu', NULL, NULL, 'alomac58@outlook.com', b'1', 'fr', '97247827421382926195', NULL, 'anonymousUser', '2016-01-01 16:02:23', NULL, 'admin', '2016-01-04 22:34:48'),
(7, 'leniglo', '$2a$10$PlMzn9MuMzzJjPgoV.fkM.corDll/6hR08Ba3FcoaJzw96xA95Bea', NULL, NULL, 'lefrantguillaume@gmail.com', b'1', 'en', '61442200018381324085', NULL, 'anonymousUser', '2016-01-01 22:34:32', NULL, 'admin', '2016-01-02 21:24:54'),
(9, 'supermediator', '$2a$10$HDqbG/nIT/p/NIdfPb7ioe78zisnc3QEWcliC.1Ooa0NlWfLYDb7u', NULL, NULL, 'lesuper@outlook.com', b'1', 'en', NULL, NULL, 'anonymousUser', '2016-01-04 22:02:30', NULL, 'admin', '2016-01-04 22:04:47');

-- --------------------------------------------------------

--
-- Structure de la table `jhi_user_authority`
--

CREATE TABLE IF NOT EXISTS `jhi_user_authority` (
  `user_id` bigint(20) NOT NULL,
  `authority_name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`authority_name`),
  KEY `fk_authority_name` (`authority_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `jhi_user_authority`
--

INSERT INTO `jhi_user_authority` (`user_id`, `authority_name`) VALUES
(1, 'ROLE_ADMIN'),
(3, 'ROLE_ADMIN'),
(1, 'ROLE_USER'),
(3, 'ROLE_USER'),
(4, 'ROLE_USER'),
(5, 'ROLE_USER'),
(6, 'ROLE_USER'),
(7, 'ROLE_USER'),
(9, 'ROLE_USER');

-- --------------------------------------------------------

--
-- Structure de la table `market_place`
--

CREATE TABLE IF NOT EXISTS `market_place` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `rating` float NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `market_place`
--

INSERT INTO `market_place` (`id`, `name`, `image`, `description`, `rating`, `user_id`) VALUES
(1, 'MarsOne', 'http://2.bp.blogspot.com/-Fkz3TY9sN7I/UOX7XO7M-hI/AAAAAAAAP7Y/sNiwtnkr-Es/s1600/Mars_One_whitebkgrd.png', 'La Boutique officielle de la colonie MarsONE.', 5, 3),
(2, 'Vendeur de copain', 'https://bleudeterre.files.wordpress.com/2008/01/copain11.png', 'copain pour toujours', 3, 6),
(3, 'Le marchand de Sable', 'http://www.jds.fr/medias/image/le-marchand-de-sable-12394-1200-630.jpg', 'Je vend du sable, j''en ai beaucoup', 4, 5),
(4, 'La Gourmande', 'https://siecle21eeuw21.files.wordpress.com/2015/12/nucleaire20oui20merci201000x10001.png?w=417&h=417', 'viens, viens.. viens goutez tout mes produits', 2, 9),
(5, 'FUFU, JAPANESE NOODLE BAR', 'http://i24.servimg.com/u/f24/12/64/39/30/img_0610.jpg', 'Livraison de nouilles et ramen traditionnels !', 0, 7);

-- --------------------------------------------------------

--
-- Structure de la table `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` timestamp NOT NULL,
  `content` varchar(255) NOT NULL,
  `market_place_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_news_marketplace_id` (`market_place_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Contenu de la table `news`
--

INSERT INTO `news` (`id`, `title`, `date`, `content`, `market_place_id`) VALUES
(1, 'Welcome to MarsONE', '2015-12-30 20:00:00', 'New products arrival!', 1),
(2, 'Adopt new friends', '2015-12-30 20:00:00', 'Buy your new friends, now!', 2),
(3, 'New products coming soon!', '2015-12-31 20:00:00', 'Happy new year!', 1),
(6, 'Website open tomorrow !', '2016-01-05 02:12:23', 'Website open tomorrow ! you will can buy everything here !', 1),
(7, 'Ouverture de la marketplace en ligne !', '2016-01-05 14:09:25', 'Venez visiter notre marketplace en ligne !', 5);

-- --------------------------------------------------------

--
-- Structure de la table `payment`
--

CREATE TABLE IF NOT EXISTS `payment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `payment`
--

INSERT INTO `payment` (`id`, `name`, `image`) VALUES
(1, 'CB', 'https://phgarin.files.wordpress.com/2014/04/cb_de_paiement.png'),
(2, 'Paypal', 'https://www.paypal.com/fr_FR/FR/i/logo/PayPal_mark_180x113.gif'),
(3, 'Bitcoin', 'https://bitcoin.org/img/icons/logotop.svg');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `valid` bit(1) NOT NULL,
  `stock` int(11) NOT NULL,
  `price` float NOT NULL,
  `sill` int(11) NOT NULL,
  `base_product_id` bigint(20) DEFAULT NULL,
  `promotion_id` bigint(20) DEFAULT NULL,
  `market_place_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_baseproduct_id` (`base_product_id`),
  KEY `fk_product_promotion_id` (`promotion_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=39 ;

--
-- Contenu de la table `product`
--

INSERT INTO `product` (`id`, `valid`, `stock`, `price`, `sill`, `base_product_id`, `promotion_id`, `market_place_id`) VALUES
(15, b'1', 50, 800, 10, 7, 1, 3),
(16, b'1', 10, 150000, 0, 8, 1, 3),
(17, b'1', 3, 79, 2, 9, 3, 3),
(18, b'1', 98, 85000, 50, 10, 6, 1),
(19, b'1', 99, 200000, 10, 11, 1, 1),
(20, b'1', 0, 9, 1, 12, 5, 5),
(21, b'1', 50, 8, 5, 13, 5, 5),
(22, b'1', 50, 10, 5, 14, 1, 5),
(23, b'1', 10, 780, 10, 15, 1, 2),
(24, b'1', 4, 35, 2, 16, 1, 2),
(25, b'1', 0, 125, 4, 17, 1, 2),
(26, b'1', 1, 456, 3, 1, 1, 2),
(27, b'1', 70, 700, 20, 18, 1, 1),
(28, b'1', 1, 1235, 2, 19, 1, 1),
(29, b'1', 40, 4, 30, 2, 1, 4),
(30, b'1', 1, 478, 3, 3, 1, 1),
(31, b'1', 1, 783, 3, 15, 1, 4),
(32, b'1', 1, 456, 2, 18, 1, 4),
(33, b'1', 7, 70, 3, 13, 1, 4),
(34, b'1', 2, 15000, 1, 1, 1, 4),
(35, b'1', 5, 1500, 3, 1, 1, 1),
(36, b'1', 30, 12, 50, 2, 1, 1),
(37, b'1', 12, 75, 2, 2, 1, 5),
(38, b'1', 14, 8, 7, 2, 5, 2);

-- --------------------------------------------------------

--
-- Structure de la table `promotion`
--

CREATE TABLE IF NOT EXISTS `promotion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `percent` int(11) NOT NULL,
  `reduction` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `promotion`
--

INSERT INTO `promotion` (`id`, `name`, `percent`, `reduction`) VALUES
(1, 'None', 0, 0),
(2, 'Soldes d''Hiver', 70, 0),
(3, 'Soldes d''Été', 40, 0),
(5, 'Promo de Lancement', 5, 0),
(6, 'Promo de Bienvenue', 0, 20);

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

CREATE TABLE IF NOT EXISTS `status` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(2, 'Cart preview'),
(3, 'Payment method'),
(4, 'Command summary'),
(5, 'Done'),
(6, 'Canceled');

-- --------------------------------------------------------

--
-- Structure de la table `subscription`
--

CREATE TABLE IF NOT EXISTS `subscription` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_market_place` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_subscription_user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `subscription`
--

INSERT INTO `subscription` (`id`, `id_market_place`, `user_id`) VALUES
(3, 1, 7),
(4, 1, 5),
(5, 2, 5);

-- --------------------------------------------------------

--
-- Structure de la table `type`
--

CREATE TABLE IF NOT EXISTS `type` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Contenu de la table `type`
--

INSERT INTO `type` (`id`, `name`) VALUES
(1, 'Animalerie'),
(2, 'Confiserie'),
(4, 'Bâtiment'),
(5, 'Jeux'),
(6, 'Véhicule'),
(7, 'Accessoires'),
(8, 'Outils'),
(9, 'Informatique'),
(10, 'Nourriture'),
(11, 'High-Tech'),
(12, 'Instruments'),
(13, 'Livres'),
(14, 'Vêtements'),
(15, 'Loisirs'),
(16, 'Secteur Industriel'),
(17, 'Secteur Scientifique'),
(18, 'Musiques'),
(19, 'Extérieur&Jardin'),
(20, 'Intérieur&Déco'),
(21, 'Humains'),
(22, 'Aliens'),
(23, 'Voyage');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `base_product`
--
ALTER TABLE `base_product`
  ADD CONSTRAINT `fk_baseproduct_type_id` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`);

--
-- Contraintes pour la table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`);

--
-- Contraintes pour la table `cart_product_list`
--
ALTER TABLE `cart_product_list`
  ADD CONSTRAINT `fk_cartproductlist_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  ADD CONSTRAINT `fk_cartproductlist_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Contraintes pour la table `delivery`
--
ALTER TABLE `delivery`
  ADD CONSTRAINT `fk_delivery_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  ADD CONSTRAINT `fk_delivery_payment_id` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`),
  ADD CONSTRAINT `fk_delivery_status_id` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `fk_delivery_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`);

--
-- Contraintes pour la table `jhi_persistent_audit_evt_data`
--
ALTER TABLE `jhi_persistent_audit_evt_data`
  ADD CONSTRAINT `fk_evt_pers_audit_evt_data` FOREIGN KEY (`event_id`) REFERENCES `jhi_persistent_audit_event` (`event_id`);

--
-- Contraintes pour la table `jhi_persistent_token`
--
ALTER TABLE `jhi_persistent_token`
  ADD CONSTRAINT `fk_user_persistent_token` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`);

--
-- Contraintes pour la table `jhi_user_authority`
--
ALTER TABLE `jhi_user_authority`
  ADD CONSTRAINT `fk_authority_name` FOREIGN KEY (`authority_name`) REFERENCES `jhi_authority` (`name`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`);

--
-- Contraintes pour la table `market_place`
--
ALTER TABLE `market_place`
  ADD CONSTRAINT `fk_marketplace_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`);

--
-- Contraintes pour la table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `fk_news_marketplace_id` FOREIGN KEY (`market_place_id`) REFERENCES `market_place` (`id`);

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_product_baseproduct_id` FOREIGN KEY (`base_product_id`) REFERENCES `base_product` (`id`),
  ADD CONSTRAINT `fk_product_promotion_id` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`);

--
-- Contraintes pour la table `subscription`
--
ALTER TABLE `subscription`
  ADD CONSTRAINT `fk_subscription_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
