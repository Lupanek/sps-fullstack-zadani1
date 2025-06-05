const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Cesta k databázi
const dbPath = path.join(__dirname, 'zoo.db');

// Funkce pro inicializaci databáze
function initializeDatabase() {
  // Kontrola, zda databáze existuje
  const dbExists = fs.existsSync(dbPath);
  
  // Vytvoření připojení k databázi
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Chyba při připojení k databázi:', err.message);
      return;
    }
    console.log('Připojeno k SQLite databázi.');
    
    // Pokud databáze neexistuje, vytvoříme schéma a vložíme seed data
    if (!dbExists) {
      console.log('Databáze neexistuje, vytvářím novou...');
      
      // Načtení schématu
      const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
      
      // Načtení seed dat
      const seedSQL = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
      
      // Vytvoření tabulek a vložení dat
      db.serialize(() => {
        db.exec(schemaSQL, (err) => {
          if (err) {
            console.error('Chyba při vytváření schématu:', err.message);
            return;
          }
          console.log('Databázové schéma bylo úspěšně vytvořeno.');
          
          db.exec(seedSQL, (err) => {
            if (err) {
              console.error('Chyba při vkládání seed dat:', err.message);
              return;
            }
            console.log('Seed data byla úspěšně vložena.');
          });
        });
      });
    }
  });
  
  return db;
}

// Vytvoření a export instance databáze
const db = initializeDatabase();

module.exports = db;
module.exports.initializeDatabase = initializeDatabase;