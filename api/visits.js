const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Získání seznamu všech návštěv
router.get('/', (req, res) => {
  const query = `
    SELECT v.id, v.visit_date, v.visitor_id, v.animal_id,
           vis.firstname, vis.lastname,
           a.name, a.species
    FROM visits v
    JOIN visitors vis ON v.visitor_id = vis.id
    JOIN animals a ON v.animal_id = a.id
    ORDER BY v.visit_date DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { visitor_id, animal_id, visit_date } = req.body;
  
  if (!visitor_id || !animal_id || !visit_date) {
    return res.status(400).json({ error: 'Visitor ID, animal ID, and visit date are required' });
  }
  
  db.run(
    'INSERT INTO visits (visitor_id, animal_id, visit_date) VALUES (?, ?, ?)',
    [visitor_id, animal_id, visit_date],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      const query = `
        SELECT v.id, v.visit_date, 
               vis.id as visitor_id, vis.firstname, vis.lastname,
               a.id as animal_id, a.name, a.species
        FROM visits v
        JOIN visitors vis ON v.visitor_id = vis.id
        JOIN animals a ON v.animal_id = a.id
        WHERE v.id = ?
      `;
      
      db.get(query, [this.lastID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(row);
      });
    }
  );
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM visits WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Visit not found' });
    res.json({ message: 'Visit deleted successfully' });
  });
});

// Získání detailu konkrétní návštěvy
router.get('/:id', (req, res) => {
  const query = `
    SELECT v.id, v.visit_date, v.visitor_id, v.animal_id,
           vis.firstname, vis.lastname,
           a.name, a.species
    FROM visits v
    JOIN visitors vis ON v.visitor_id = vis.id
    JOIN animals a ON v.animal_id = a.id
    WHERE v.id = ?
  `;
  
  db.get(query, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Visit not found' });
    res.json(row);
  });
});

module.exports = router;

