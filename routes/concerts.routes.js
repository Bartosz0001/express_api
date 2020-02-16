const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
  });

  router.route('/concerts/:id').get((req, res) => {
    const id = req.params.id;  
    res.json(db.concerts[db.concerts.findIndex(index => (index.id == id))]);
  });

  router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const id = Math.floor(Math.random() * 10000);
    db.concerts.push({id: id, performer: performer, genre: genre, price: price, day: day, image: image});
    res.json({message: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const id = req.params.id;
    db.concerts[db.concerts.findIndex(index => (index.id == id))] = {id: id, performer: performer, genre: genre, price: price, day: day, image: image};
    res.json({message: 'OK'});
});

router.route('/concerts/:id').delete((req, res) => {
    const id = req.params.id;
    db.concerts.splice(db.concerts.findIndex(index => (index.id == id)), 1);
    res.json({message: 'OK'});
});

module.exports = router;