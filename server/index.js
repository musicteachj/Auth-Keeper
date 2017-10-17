// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser'); //middleware which parses HTTP request bodies and makes them available in req.body
const morgan = require('morgan');  //HTTP request logger middleware
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// DB Setup
mongoose.connect('mongodb://dbusername:password@ds121665.mlab.com:21665/jambook');

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));  //parse bodies of all incoming requests into JSON

app.use(express.static(path.join(__dirname, '/dist')));

// Allow cross-origin resource sharing
app.use(cors());
app.options('*', cors());

// Application Routes
router(app);
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
