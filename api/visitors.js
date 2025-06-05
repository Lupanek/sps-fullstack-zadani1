const express = require('express');
const db = require('../database/db');

const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM visitors', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM visitors WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Visitor not found' });
    res.json(row);
  });
});

router.post('/', (req, res) => {
  const { firstname, lastname } = req.body;
  
  if (!firstname || !lastname) {
    return res.status(400).json({ error: 'First name and last name are required' });
  }
  
  db.run(
    'INSERT INTO visitors (firstname, lastname) VALUES (?, ?)',
    [firstname, lastname],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      db.get('SELECT * FROM visitors WHERE id = ?', [this.lastID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(row);
      });
    }
  );
});

router.put('/:id', (req, res) => {
  const { firstname, lastname } = req.body;
  
  if (!firstname || !lastname) {
    return res.status(400).json({ error: 'First name and last name are required' });
  }
  
  db.run(
    'UPDATE visitors SET firstname = ?, lastname = ? WHERE id = ?',
    [firstname, lastname, req.params.id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Visitor not found' });
      
      db.get('SELECT * FROM visitors WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
      });
    }
  );
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM visitors WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Visitor not found' });
    res.json({ message: 'Visitor deleted successfully' });
  });
});

module.exports = router;

