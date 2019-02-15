// server.js
// where your node app starts

// init project
var express = require('express');
var db = require('./db');
var child_process = require('child_process')

var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Call this function whenever someone requests the /quote path
app.get("/quote", function (req, res) {
  console.log("Received request to /quote from frontend");
  // Get a random quote and pass it to the browser.
  db.query('SELECT * FROM startrek.quotes ORDER BY RANDOM() LIMIT 1')
    .then(data => res.send(data.rows[0]))
    .catch(err => {
      console.log('DB error:', err);
      return res.send({ error: "BRB! Connecting to CockroachDB" });
    })
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
   console.log('Your app is listening on port ' + listener.address().port);
});

// launch the cockroach DB script
//child_process.exec("sh run_cockroach.sh")
