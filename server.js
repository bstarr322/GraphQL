/**
 * Express test server configurations
 */
import { DocumentNode } from 'graphql';
import graphqlHTTP from 'express-graphql';
import express from 'express';
import cors from 'cors';
import schema from './data/schema.js';
import config from './config.js';
import {formatError} from './data/utilities/errorFormatter.js'

const graphQLApp = express();

// enable cors pre-flight request
graphQLApp.use(cors());

/**
 * Allows cross origin request for this service
 * @ref https://www.npmjs.com/package/cors
 */
var corsOptions = {
  origin: config.CORS_CLIENT
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

graphQLApp.options('/graphql', 
	config.IS_CORS_ENABLED ? cors(corsOptions) : cors());

// Connection configuration of graphql schema to express 
graphQLApp.use('/graphql', graphqlHTTP(request => {
  const startTime = Date.now();
  return {
    schema: schema,
    extensions() {
      return { runTime: Date.now() - startTime };
    },
    graphiql: true,
    pretty: true,
    formatError: error => formatError(error)
  };
}));

graphQLApp.listen(config.EXPRESS_PORT);
console.log('GraphQL server running on http://localhost:' + config.EXPRESS_PORT + '/graphql');


