const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
      const results = await Concert.find();
      if(!results) res.status(404).json({ message: 'Not found' });
      else res.json(results);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

  exports.getRandom = async (req, res) => {
    try {
      const count = await Concert.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const results = await Concert.findOne().skip(rand);
      if(!results) res.status(404).json({ message: 'Not found' });
      else res.json(results);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

  exports.getById = async (req, res) => {
    try {
      const results = await Concert.findById(req.params.id);
      if(!results) res.status(404).json({ message: 'Not found' });
      else res.json(results);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

  exports.post = async (req, res) => {
    try {
      const { performer, genre, price, day, image } = req.body;
      const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
      await newConcert.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.putById = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
      const results = await(Concert.findById(req.params.id));
      if(results) {
        await Concert.updateOne({ _id: req.params.id }, { $set: {  performer: performer, genre: genre, price: price, day: day, image: image }});
        res.json( await Concert.find({ _id: req.params.id }));
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.deleteById = async (req, res) => {
    try {
      const results = await(Concert.findById(req.params.id));
      if(results){
        const deletedItem = await Concert.find({ _id: req.params.id });
        await Concert.deleteOne({_id: req.params.id});
        res.json({ deletedItem });
      }
      else res.status(404).json({ message: 'Not found' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }