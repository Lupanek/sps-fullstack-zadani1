const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Vytvoření databáze
const db = new sqlite3.Database(path.join(__dirname, 'zoo.db'));

// Načtení schématu
const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

// Načtení seed dat
const seedSQL = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

// Spuštění skriptu
db.serialize(() => {
  // Vytvoření tabulek
  db.exec(schemaSQL, (err) => {
    if (err) {
      console.error('Chyba při vytváření schématu:', err.message);
      return;
    }
    console.log('Databázové schéma bylo úspěšně vytvořeno.');

    // Vložení seed dat
    db.exec(seedSQL, (err) => {
      if (err) {
        console.error('Chyba při vkládání seed dat:', err.message);
        return;
      }
      console.log('Seed data byla úspěšně vložena.');
    });
  });
});

// Uzavření databáze po dokončení
db.close((err) => {
  if (err) {
    console.error('Chyba při uzavírání databáze:', err.message);
    return;
  }
  console.log('Databáze byla úspěšně uzavřena.');
});