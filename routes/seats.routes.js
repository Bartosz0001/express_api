const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
  });

  router.route('/seats/:id').get((req, res) => {
    const id = req.params.id;  
    res.json(db.seats[db.seats.findIndex(index => (index.id == id))]);
  });

  router.route('/seats/').post((req, res) => {
    const { day, seat, client, email } = req.body;
    if(day && seat && client && email){
      if(db.seats.some(item => (item.day == day && item.seat == seat))) {
        res.json({message: 'The slot is already taken...'});
      }
      else {
        const id = Math.floor(Math.random() * 10000);
        db.seats.push({id: id, day: day, seat: seat, client: client, email: email});
        res.json({message: 'OK'});
      }
    }
});

router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = req.params.id;
    db.seats[db.seats.findIndex(index => (index.id == id))] = {id: id, day: day, seat: seat, client: client, email: email};
    res.json({message: 'OK'});
});

router.route('/seats/:id').delete((req, res) => {
    const id = req.params.id;
    db.seats.splice(db.seats.findIndex(index => (index.id == id)), 1);
    res.json({message: 'OK'});
});

module.exports = router;