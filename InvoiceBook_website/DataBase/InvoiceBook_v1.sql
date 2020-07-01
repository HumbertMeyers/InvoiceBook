-- ****************** SqlDBM: MySQL ******************;
-- ***************************************************;

-- ************************************** `User`

CREATE TABLE `User`
(
  `id`       int(11) NOT NULL ,
  `nom`      varchar(50) NOT NULL ,
  `email`    varchar(100) NOT NULL ,
  `password` varchar(100) NOT NULL ,

  PRIMARY KEY (`id`)
);


-- ************************************** `Fournisseur`

CREATE TABLE `Fournisseurs`
(
 	`id`        int(11) NOT NULL ,
 	`id_User`   int(11) NOT NULL ,
 	`nom`       varchar(45) NOT NULL ,
 	`numeroTVA` varchar(20) NOT NULL ,

	PRIMARY KEY (`id`, `id_User`),
  UNIQUE KEY `FournisseurUniqueParUser` (`nom`, `id_User`),
  KEY `id_User` (`id_User`),
  CONSTRAINT `FK_UserFournisseur` FOREIGN KEY (`id_User`) REFERENCES User(`id`)
);


-- ************************************** `Clients`

CREATE TABLE `Clients`
(
    `id`        int(11) NOT NULL ,
    `id_User`   int(11) NOT NULL ,
    `nom`       varchar(45) NOT NULL ,
    `numeroTVA` varchar(20) NULL ,

    PRIMARY KEY (`id`, `id_User`),
    UNIQUE KEY `ClientUniqueParUser` (`nom`, `id_User`),
    KEY `id_User` (`id_User`),
    CONSTRAINT `FK_UserClient` FOREIGN KEY (`id_User`) REFERENCES User(`id`)
);


-- ************************************** `Factures`

CREATE TABLE `Factures`
(
    `id`              int(11) NOT NULL ,
    `dateFacturation` date NOT NULL ,
    `numeroFacture`   varchar(45) NOT NULL ,
    `montant`         double(11,2) NOT NULL ,
    `nomDeFichier`    varchar(45) NOT NULL ,
    `id_User`         int(11) NOT NULL ,
    `id_Fournisseur`  int(11) NULL ,
    `id_Client`       int(11) NULL ,

    PRIMARY KEY (`id`),
    KEY `id_User` (`id_User`),
    CONSTRAINT `FK_UserFacture` FOREIGN KEY (`id_User`) REFERENCES User(`id`),
    KEY `id_Fournisseur` (`id_Fournisseur`),
    CONSTRAINT `FK_FournisseurFacture` FOREIGN KEY (`id_Fournisseur`) REFERENCES Fournisseurs(`id`),
    KEY `id_Client` (`id_Client`),
    CONSTRAINT `FK_ClienFacture` FOREIGN KEY (`id_Client`) REFERENCES Clients(`id`)
);
