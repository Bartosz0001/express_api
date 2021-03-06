const express = require('express');
const cors = require('cors');
const testimonials = require('./routes/testimonials.routes.js');
const concerts = require('./routes/concerts.routes.js');
const seats = require('./routes/seats.routes.js');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const helmet = require('helmet');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

let s3 = new aws.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
});

mongoose.connect(`mongodb+srv://${s3.accessKeyId}:${s3.secretAccessKey}@cluster0-tia6e.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);
io.set('transports', [ 'websocket' ]);

io.on('connection', (socket) => {
  console.log('New socket!', socket.id);
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonials);
app.use('/api', concerts); 
app.use('/api', seats); 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

