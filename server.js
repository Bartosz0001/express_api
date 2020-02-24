const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const testimonials = require('./routes/testimonials.routes.js');
const concerts = require('./routes/concerts.routes.js');
const seats = require('./routes/seats.routes.js');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use('/api', testimonials);
app.use('/api', concerts); 
app.use('/api', seats); 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});