// Import the required libraries
var graphqlHTTP = require('express-graphql');
var express = require('express');

// Import the data you created above
var schema = require('./schema.js');
// Configuration
var config = require('./config.js');

express()
  .use('/graphql', graphqlHTTP({ schema: schema.schema, pretty: true }))
  .listen(config.EXPRESS_PORT);

console.log('GraphQL server running on http://localhost:' + config.EXPRESS_PORT + '/graphql');
