-- Vložení návštěvníků
INSERT INTO visitors (firstname, lastname) VALUES ('Jan', 'Novák');
INSERT INTO visitors (firstname, lastname) VALUES ('Marie', 'Svobodová');
INSERT INTO visitors (firstname, lastname) VALUES ('Petr', 'Černý');
INSERT INTO visitors (firstname, lastname) VALUES ('Lucie', 'Dvořáková');
INSERT INTO visitors (firstname, lastname) VALUES ('Tomáš', 'Procházka');

-- Vložení zvířat
INSERT INTO animals (name, species) VALUES ('Leo', 'Lev');
INSERT INTO animals (name, species) VALUES ('Dumbo', 'Slon');
INSERT INTO animals (name, species) VALUES ('Melman', 'Žirafa');
INSERT INTO animals (name, species) VALUES ('Gloria', 'Hroch');
INSERT INTO animals (name, species) VALUES ('Alex', 'Tygr');
INSERT INTO animals (name, species) VALUES ('Marty', 'Zebra');

-- Vložení návštěv
INSERT INTO visits (visitor_id, animal_id, visit_date) VALUES (1, 1, '2023-01-15');
INSERT INTO visits (visitor_id, animal_id, visit_date) VALUES (1, 3, '2023-01-15');
INSERT INTO visits (visitor_id, animal_id, visit_date) VALUES (2, 2, '2023-02-20');
INSERT INTO visits (visitor_id, animal_id, visit_date) VALUES (3, 4, '2023-03-10');
INSERT INTO visits (visitor_id, animal_id, visit_date) VALUES (4, 5, '2023-04-05');
INSERT INTO visits (visitor_id, animal_id, visit_date) VALUES (5, 6, '2023-05-12');
INSERT INTO visits (visitor_id, animal_id, visit_date) VALUES (2, 1, '2023-06-18');