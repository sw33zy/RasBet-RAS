/* Logico: */

-- -----------------------------------------------------
-- Schema rasbet
-- -----------------------------------------------------

DROP SCHEMA IF EXISTS `rasbet`;

CREATE SCHEMA IF NOT EXISTS `rasbet` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `rasbet` ;

CREATE TABLE Expert (
    email varchar(45) PRIMARY KEY NOT NULL,
    password varchar(45) NOT NULL
);

CREATE TABLE Gambler (
    email varchar(50) PRIMARY KEY NOT NULL,
    password varchar(50) NOT NULL,
    iddocument varchar(50) NOT NULL
);

CREATE TABLE Event (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    date datetime(6)  NOT NULL,
    sport varchar(50)  NOT NULL,
    state varchar(50)  NOT NULL,
    description varchar(200) 
);

CREATE TABLE Occurence (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    type varchar(50) NOT NULL,
    odd Float NOT NULL,
    win boolean NOT NULL,
    fk_Event_id int  NOT NULL
);

CREATE TABLE BetCard (
	id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    amount Float NOT NULL,
    currency varchar(50) NOT NULL,
    isOver boolean NOT NULL,
    fk_Gambler_email varchar(50) NOT NULL
);

CREATE TABLE BetCard_Occurrences (
	bet_card int NOT NULL ,
    fk_Occurence_id int NOT NULL AUTO_INCREMENT,
    moment_odd Float NOT NULL,
    PRIMARY KEY (fk_Occurence_id, bet_card) 
);

CREATE TABLE Notification (
	id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    description varchar(100) NOT NULL,
    fk_Gambler_email varchar(50) NOT NULL
);

CREATE TABLE Fact (
	id int NOT NULL AUTO_INCREMENT,
	type varchar(50) NOT NULL,
    fk_Event_id int NOT NULL,
    description varchar(120) NOT NULL,
    PRIMARY KEY (id, fk_Event_id) 
);

CREATE TABLE Element (
	id int NOT NULL AUTO_INCREMENT,
    fk_Event_id int NOT NULL,
    description varchar(50) NOT NULL,
    PRIMARY KEY (id, fk_Event_id) 
);

CREATE TABLE wallet (
	fk_Gambler_email varchar(50) NOT NULL,
    currency varchar(50) NOT NULL,
    balance Float NOT NULL,
    PRIMARY KEY (fk_Gambler_email, currency) 
);

CREATE TABLE Gambler_Follow_Event (
	fk_Gambler_email varchar(50) NOT NULL,
    event int NOT NULL,
    PRIMARY KEY (fk_Gambler_email, event) 
);
 
ALTER TABLE Occurence ADD CONSTRAINT FK_Occurence_2
    FOREIGN KEY (fk_Event_id)
    REFERENCES Event (id)
    ON DELETE RESTRICT;

ALTER TABLE wallet ADD CONSTRAINT FK_Wallet_1
    FOREIGN KEY (fk_Gambler_email)
    REFERENCES Gambler (email)
    ON DELETE RESTRICT;
 
ALTER TABLE BetCard ADD CONSTRAINT FK_BetCard_1
    FOREIGN KEY (fk_Gambler_email)
    REFERENCES Gambler (email)
    ON DELETE RESTRICT;

ALTER TABLE Notification ADD CONSTRAINT FK_Notification_1
    FOREIGN KEY (fk_Gambler_email)
    REFERENCES Gambler (email)
    ON DELETE RESTRICT;
 
ALTER TABLE BetCard_Occurrences ADD CONSTRAINT FK_BC_Occ_1
    FOREIGN KEY (fk_Occurence_id)
    REFERENCES Occurence (id)
    ON DELETE RESTRICT;

ALTER TABLE BetCard_Occurrences ADD CONSTRAINT FK_BC_Occ_2
    FOREIGN KEY (bet_card)
    REFERENCES BetCard (id)
    ON DELETE RESTRICT;
    
ALTER TABLE Fact ADD CONSTRAINT FK_Fact_1
	FOREIGN KEY (fk_Event_id)
    REFERENCES Event (id)
    ON DELETE RESTRICT;
    
ALTER TABLE Element ADD CONSTRAINT FK_Element_1
	FOREIGN KEY (fk_Event_id)
    REFERENCES Event (id)
    ON DELETE RESTRICT;
    
ALTER TABLE Gambler_Follow_Event ADD CONSTRAINT FK_Gambler_Follow_Event_1
	FOREIGN KEY (event)
    REFERENCES Event (id)
    ON DELETE RESTRICT;

ALTER TABLE Gambler_Follow_Event ADD CONSTRAINT FK_Gambler_Follow_Event_2
    FOREIGN KEY (fk_Gambler_email)
    REFERENCES Gambler (email)
    ON DELETE RESTRICT;