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
graphQLApp.options('/graphql', cors());

// Connection configuration of graphql schema to express
graphQLApp.use('/graphql', graphqlHTTP({ schema, graphiql: true, pretty: true }));
graphQLApp.listen(config.EXPRESS_PORT);
console.log('GraphQL server running on http://localhost:' + config.EXPRESS_PORT + '/graphql');