-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 30 juil. 2020 à 13:44
-- Version du serveur :  10.4.13-MariaDB
-- Version de PHP : 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `meyersinvoice`
--

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `id_Client` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `numeroTVA` varchar(20) DEFAULT NULL,
  `id_User` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `factures`
--

CREATE TABLE `factures` (
  `id_Facture` int(11) NOT NULL,
  `dateFacturation` date NOT NULL,
  `montant` decimal(11,2) NOT NULL,
  `nomDeFichier` varchar(100) NOT NULL,
  `id_Cient` int(11) DEFAULT NULL,
  `id_Fournisseur` int(11) DEFAULT NULL,
  `id_User` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `fournisseurs`
--

CREATE TABLE `fournisseurs` (
  `id_Fournisseur` int(11) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `numeroTVA` varchar(20) NOT NULL,
  `id_User` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id_User` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id_Client`),
  ADD UNIQUE KEY `Clients_nom_id_User_903991cc_uniq` (`nom`,`id_User`),
  ADD KEY `Clients_id_User_6ddb5412_fk_User_id_User` (`id_User`);

--
-- Index pour la table `factures`
--
ALTER TABLE `factures`
  ADD PRIMARY KEY (`id_Facture`),
  ADD KEY `Factures_id_Cient_26fdb6fb_fk_Clients_id_Client` (`id_Cient`),
  ADD KEY `Factures_id_Fournisseur_6b3d0524_fk_Fournisseurs_id_Fournisseur` (`id_Fournisseur`),
  ADD KEY `Factures_id_User_2d9e2cfa_fk_User_id_User` (`id_User`);

--
-- Index pour la table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  ADD PRIMARY KEY (`id_Fournisseur`),
  ADD UNIQUE KEY `Fournisseurs_nom_id_User_1108f4ef_uniq` (`nom`,`id_User`),
  ADD KEY `Fournisseurs_id_User_60654e14_fk_User_id_User` (`id_User`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_User`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `clients`
--
ALTER TABLE `clients`
  MODIFY `id_Client` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `factures`
--
ALTER TABLE `factures`
  MODIFY `id_Facture` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  MODIFY `id_Fournisseur` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id_User` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `Clients_id_User_6ddb5412_fk_User_id_User` FOREIGN KEY (`id_User`) REFERENCES `user` (`id_User`);

--
-- Contraintes pour la table `factures`
--
ALTER TABLE `factures`
  ADD CONSTRAINT `Factures_id_Cient_26fdb6fb_fk_Clients_id_Client` FOREIGN KEY (`id_Cient`) REFERENCES `clients` (`id_Client`),
  ADD CONSTRAINT `Factures_id_Fournisseur_6b3d0524_fk_Fournisseurs_id_Fournisseur` FOREIGN KEY (`id_Fournisseur`) REFERENCES `fournisseurs` (`id_Fournisseur`),
  ADD CONSTRAINT `Factures_id_User_2d9e2cfa_fk_User_id_User` FOREIGN KEY (`id_User`) REFERENCES `user` (`id_User`);

--
-- Contraintes pour la table `fournisseurs`
--
ALTER TABLE `fournisseurs`
  ADD CONSTRAINT `Fournisseurs_id_User_60654e14_fk_User_id_User` FOREIGN KEY (`id_User`) REFERENCES `user` (`id_User`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
