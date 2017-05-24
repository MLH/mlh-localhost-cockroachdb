// Load Express and create a new application
var express = require('express')
var app = express()

// Serve files in the /public directory
app.use(express.static('public'));

// Call this function whenever someone requests the root path
app.get('/quote', function (req, res) {
  // Load the Database module
  var db = require('./db')

  // Connect to a node in our CockroachDB cluster
  db.connect(function(client, done) {
    // Get a random quote and pass it to the browser.
    client.query('SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1')
      .then(data => res.send(data.rows[0]))
      .then(() => done())
  })
})

// Start the server on port 5000
app.listen(5000)
