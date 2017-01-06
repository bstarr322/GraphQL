/**
 * express server configurations
 * 
 */

import graphqlHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';
import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import schema from './data/schema.js';
import config from './config.js';

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

graphQLApp.listen(config.EXPRESS_PORT);
console.log('GraphQL server running on http://localhost:' + config.EXPRESS_PORT + '/graphql');