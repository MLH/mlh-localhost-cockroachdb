// Connect to the startrek Database on a node in our CockroachDB cluster
var pg = require('pg');
var config = { user: 'root', database: 'startrek', port: 26257 }; //26257
var db = new pg.Pool(config);

// Log when we connect to the CockroachDB node
db.on('connect', function(client) { console.log("Connected to CockroachDB."); });

// Log any errors we encounter
db.on('error', function(err) { console.error("Error connecting to CockroachDB."); });

// Export the database connection so anyone can use it
module.exports = db;
