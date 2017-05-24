// Import the Node.js Postgres Driver
var pg = require('pg');

// This function connects to a random cockroach database in our cluster.
function connect(callback) {
  // This is a list of ports in our CockroachDB Cluster
  var ports = [26257, 26258, 26259];

  // Select a Random Port from our CockroachDB Cluster
  var randomPort = ports[Math.floor(Math.random() * ports.length)];

  // Create a configuration object that uses the random port
  var config = {
    user: 'root',
    host: 'localhost',
    database: 'startrek',
    port: randomPort
  };

  // Connect to the database with the above configuration
  pg.connect(config, function(err, client, done) {
    if (err) {
      // If there was an error, log it, close the connection, and retry.
      console.error('Could not connect to Cockroachdb (' + randomPort + '): ', err);
      done();
      return connect(callback);
    }

    // Success! Log it and pass the client & callback to the calling function.
    console.log('Connected to cockroachdb (Port #' + randomPort + ')');
    callback(client, done);
  });
};

// Export our connect function so it can be used in other files.
module.exports.connect = connect;
