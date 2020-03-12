const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
    try {
      const results = await Testimonial.find();
      if(!results) res.status(404).json({ message: 'Not found' });
      else res.json(results);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

  exports.getRandom = async (req, res) => {
    try {
      const count = await Testimonial.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const results = await Testimonial.findOne().skip(rand);
      if(!results) res.status(404).json({ message: 'Not found' });
      else res.json(results);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

  exports.getById = async (req, res) => {
    try {
      const results = await Testimonial.findById(req.params.id);
      if(!results) res.status(404).json({ message: 'Not found' });
      else res.json(results);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }

  exports.post = async (req, res) => {
    try {
      const { author, text } = req.body;
      const newTestimonial = new Testimonial({ author: author, text: text });
      await newTestimonial.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.putById = async (req, res) => {
    const { author, text } = req.body;
    try {
      const results = await(Testimonial.findById(req.params.id));
      if(results) {
        await Testimonial.updateOne({ _id: req.params.id }, { $set: {  author: author, text: text }});
        res.json( await Testimonial.find({ _id: req.params.id }));
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
}

exports.deleteById = async (req, res) => {
    try {
      const results = await(Testimonial.findById(req.params.id));
      if(results){
        const deletedItem = await Testimonial.find({ _id: req.params.id });
        await Testimonial.deleteOne({_id: req.params.id});
        res.json({ deletedItem });
      }
      else res.status(404).json({ message: 'Not found' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }