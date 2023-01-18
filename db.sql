CREATE TABLE `clients` (
	`id_client` int NOT NULL AUTO_INCREMENT,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`email` varchar(50) NOT NULL UNIQUE,
	`password` varchar(255) NOT NULL,
	`phone_number` varchar(11),
	`county` varchar(20),
	`city` varchar(20),
	`zip_code` varchar(20),
	`street` varchar(20),
	`street_number` int,
	`client_code` varchar(25) NOT NULL UNIQUE,
	PRIMARY KEY (`id_client`)
);

CREATE TABLE `EMPLOYEES` (
	`id_employee` int NOT NULL AUTO_INCREMENT,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`email` varchar(50) NOT NULL UNIQUE,
	`password` varchar(50) NOT NULL,
	`phone_number` varchar(11) NOT NULL,
	`city` varchar(20),
	`county` varchar(20),
	`zip_code` varchar(20),
	`street` varchar(20),
	`street_number` int,
	`wage` int NOT NULL,
	`role` varchar(10) NOT NULL,
	PRIMARY KEY (`id_employee`)
);

CREATE TABLE `deposits` (
	`id_deposit` int NOT NULL AUTO_INCREMENT,
	`x_pos` FLOAT NOT NULL,
	`y_pos` FLOAT NOT NULL,
	`manager_id` int,
	`schedule_start` varchar(10) NOT NULL,
	`schedule_end` varchar(10) NOT NULL,
	PRIMARY KEY (`id_deposit`)
);

CREATE TABLE `packages` (
	`id_package` int NOT NULL AUTO_INCREMENT,
	`weight` int NOT NULL,
	`cost` int NOT NULL,
	`sender_id` int NOT NULL,
	`receiver_id` int NOT NULL,
	`driver_id` int,
	PRIMARY KEY (`id_package`)
);

CREATE TABLE `vehicles` (
	`id_vehicle` int NOT NULL AUTO_INCREMENT,
	`model` varchar(50) NOT NULL,
	`county` varchar(2) NOT NULL,
	`number` int NOT NULL,
	`alpha_characters` varchar(3) NOT NULL,
	`driver_id` int,
	PRIMARY KEY (`id_vehicle`)
);

CREATE TABLE `status` (
	`id_status` int NOT NULL AUTO_INCREMENT,
	`status` varchar(50) NOT NULL, 
	PRIMARY KEY (`id_status`)
);

CREATE TABLE `package_status` (
	`id_pack_status` int NOT NULL AUTO_INCREMENT,
	`package_id` int NOT NULL,
	`status_id` int NOT NULL,
	PRIMARY KEY (`id_pack_status`)
);

ALTER TABLE `deposits` ADD CONSTRAINT `deposits_fk0` FOREIGN KEY (`manager_id`) REFERENCES `employees`(`id_employee`);

ALTER TABLE `packages` ADD CONSTRAINT `PACKAGES_fk0` FOREIGN KEY (`sender_id`) REFERENCES `clients`(`id_client`);

ALTER TABLE `packages` ADD CONSTRAINT `PACKAGES_fk1` FOREIGN KEY (`receiver_id`) REFERENCES `clients`(`id_client`);

ALTER TABLE `packages` ADD CONSTRAINT `PACKAGES_fk2` FOREIGN KEY (`driver_id`) REFERENCES `employees`(`id_employee`);

ALTER TABLE `VEHICLES` ADD CONSTRAINT `VEHICLES_fk0` FOREIGN KEY (`driver_id`) REFERENCES `EMPLOYEES`(`id_employee`);

ALTER TABLE `package_status` ADD CONSTRAINT `PACKAGE_STATUS_fk0` FOREIGN KEY (`package_id`) REFERENCES `packages`(`id_package`);

ALTER TABLE `package_status` ADD CONSTRAINT `PACKAGE_STATUS_fk1` FOREIGN KEY (`status_id`) REFERENCES `status`(`id_status`);

INSERT INTO employees (first_name, last_name, email, password, phone_number, city, county, zip_code, street, street_number, wage, role) VALUES('Andrei', 'Radu', 'andrei@curier.io', '$2b$10$SlGGGbSy9yuMT5FrPaPIAOuPZKZHic37g7iybl/R1zmD7Bo8hMvRy', '0734291655', 'Bucharest', 'Bucharest', '354201', 'Iuliu Maniu', 20, 10000, 'admin');

--query pentru a selecta toate pachetele
SELECT *
FROM packages P, package_status PS, status S
WHERE PS.status_id = S.id_status AND P.id_package = PS.package_id;

--query pt a selecta toate pachetele care sunt in curs de livrare de un anumit sofer
SELECT *
FROM packages P, package_status PS, status S
WHERE P.id_package = PS.package_id AND PS_status_id = '1' AND E.id_employee IN (
	SELECT id_employee
	FROM employees
	WHERE email = ''
); 







