// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:time', (req, res, next) => {
  let time = req.params.time;
  let date = Number(time) ? new Date(Number(time)) : new Date(time);
  date == 'Invalid Date' ? next('route') : false;
  req.utc = date.toUTCString();
  req.unix = date.getTime();
  next();
},
(req, res) => {
  res.json({"unix": req.unix, "utc": req.utc});
});

app.get('/api/:time', (req, res) => {
  res.json({"error": "Invalid Date"})
})

app.get('/api/', (req, res) => {
  res.json({"unix": Date.now(), "utc": new Date().toUTCString()})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
