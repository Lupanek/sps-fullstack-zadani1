-- Odstranění tabulek, pokud existují
DROP TABLE IF EXISTS visits;
DROP TABLE IF EXISTS visitors;
DROP TABLE IF EXISTS animals;

-- Vytvoření tabulky návštěvníků
CREATE TABLE visitors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL
);

-- Vytvoření tabulky zvířat
CREATE TABLE animals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  species TEXT NOT NULL
);

-- Vytvoření tabulky návštěv
CREATE TABLE visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id INTEGER NOT NULL,
  animal_id INTEGER NOT NULL,
  visit_date TEXT NOT NULL,
  FOREIGN KEY (visitor_id) REFERENCES visitors (id) ON DELETE CASCADE,
  FOREIGN KEY (animal_id) REFERENCES animals (id) ON DELETE CASCADE
);

-- Vytvoření indexů pro rychlejší vyhledávání
CREATE INDEX idx_visits_visitor ON visits (visitor_id);
CREATE INDEX idx_visits_animal ON visits (animal_id);
CREATE INDEX idx_visits_date ON visits (visit_date);