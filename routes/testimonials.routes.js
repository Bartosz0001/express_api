const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
  });

  router.route('/testimonials/random').get((req, res) => {
    res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
  });

  router.route('/testimonials/:id').get((req, res) => {
    const id = req.params.id;  
    res.json(db.testimonials[db.testimonials.findIndex(index => (index.id == id))]);
  });

  router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const id = Math.floor(Math.random() * 10000);
    db.testimonials.push({id: id, author: author, text: text});
    res.json({message: 'OK'});
});

router.route('/testimonials/:id').put((req, res) => {
    const { author, text } = req.body;
    const id = req.params.id;
    db.testimonials[db.testimonials.findIndex(index => (index.id == id))] = {id: id, author: author, text: text};
    res.json({message: 'OK'});
});

router.route('/testimonials/:id').delete((req, res) => {
    const id = req.params.id;
    db.testimonials.splice(db.testimonials.findIndex(index => (index.id == id)), 1);
    res.json({message: 'OK'});
});

module.exports = router;