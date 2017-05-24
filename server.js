// Load Express and Database Libraries
var express = require('express')
var db = require('./db')

// Create a new Express application
var app = express()

// Serve files in the /public directory
app.use(express.static('public'))

// Call this function whenever someone requests the /quote path
app.get('/quote', function (req, res) {
  // Get a random quote and pass it to the browser.
  db.query('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1')
    .then(data => res.send(data.rows[0]))
    .catch(err => res.send({ error: "BRB! Connecting to CockroachDB" }))
})

// Start the server on port 5000
app.listen(5000, () => console.log("Listening on http://localhost:5000/"));
