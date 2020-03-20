const Seat = require('../models/seat.model');
const socket = require('socket.io');

exports.getAll = async (req, res) => {
    try {
      const results = await Seat.find();
      if(!results) res.status(404).json({ message: 'Not found' });
      else res.json(results);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

  exports.getRandom = async (req, res) => {
    try {
      const count = await Seat.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const results = await Seat.findOne().skip(rand);
      if(!results) res.status(404).json({ message: 'Not found' });
      else res.json(results);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

  exports.getById = async (req, res) => {
    try {
      const results = await Seat.findById(req.params.id);
      if(!results) res.status(404).json({ message: 'Not found' });
      else res.json(results);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

  exports.post = async (req, res) => {
    try {
      const { day, seat, client, email } = req.body;
      if(day && seat && client && email) {
        const results = await Seat.findOne({ day: day, seat: seat });
        if(results) res.json({message: 'The slot is already taken...'});
        else {
          const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
          await newSeat.save();
          const results = await Seat.find();
          req.io.set('transports', [ 'websocket' ]);
          req.io.emit('seatsUpdated');
          res.json({ message: 'OK' });
        }
      }
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.putById = async (req, res) => {
    const { day, seat, client, email } = req.body;
    try {
      const results = await(Seat.findById(req.params.id));
      if(results) {
        await Seat.updateOne({ _id: req.params.id }, { $set: {  day: day, seat: seat, client: client, email: email }});
        res.json( await Seat.find({ _id: req.params.id }));
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.deleteById = async (req, res) => {
    try {
      const results = await(Seat.findById(req.params.id));
      if(results){
        const deletedItem = await Seat.find({ _id: req.params.id });
        await Seat.deleteOne({_id: req.params.id});
        res.json({ deletedItem });
      }
      else res.status(404).json({ message: 'Not found' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }