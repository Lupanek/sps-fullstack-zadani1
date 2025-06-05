const express = require('express');
const db = require('../database/db');

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM animals', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM animals WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Animal not found' });
    res.json(row);
  });
});

router.post('/', (req, res) => {
  const { name, species } = req.body;
  
  if (!name || !species) {
    return res.status(400).json({ error: 'Name and species are required' });
  }
  
  db.run(
    'INSERT INTO animals (name, species) VALUES (?, ?)',
    [name, species],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      db.get('SELECT * FROM animals WHERE id = ?', [this.lastID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(row);
      });
    }
  );
});

router.put('/:id', (req, res) => {
  const { name, species } = req.body;
  
  if (!name || !species) {
    return res.status(400).json({ error: 'Name and species are required' });
  }
  
  db.run(
    'UPDATE animals SET name = ?, species = ? WHERE id = ?',
    [name, species, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Animal not found' });
      
      db.get('SELECT * FROM animals WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
      });
    }
  );
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM animals WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Animal not found' });
    res.json({ message: 'Animal deleted successfully' });
  });
});

module.exports = router;