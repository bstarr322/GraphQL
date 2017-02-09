/**
 * Express test server configurations
 */
import graphqlHTTP from 'express-graphql';
import express from 'express';
import cors from 'cors';
import schema from './data/schema.js';
import config from './config.js';
import {formatError} from './data/utilities/errorFormatter.js';
import multer from 'multer';
import logger from './log-config';


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

// Multer provides multipart form data parsing.
const storage = multer.memoryStorage();
graphQLApp.use('/graphql', multer({ storage: storage }).single('file'));

// Connection configuration of graphql schema to express 
graphQLApp.use('/graphql', graphqlHTTP(request => {
  const startTime = Date.now();
  return {
    schema: schema,
    graphiql: true,
    pretty: true,
    rootValue: {request: request},
    formatError: error => formatError(error),
    extensions({document, variables, operationName, result}) {
      var queries;
      var duration = Date.now()-startTime;

      if("viewer" in result.data) {
        queries = Object.keys(result.data.viewer).toString()
        logger.info("GraphQL Query Request - " + queries + " took [" + duration + "]ms");
      }
      
      return {duration: duration};
    }
  };
}));

graphQLApp.listen(config.EXPRESS_PORT);
console.log('GraphQL server running on http://localhost:' + config.EXPRESS_PORT + '/graphql');


