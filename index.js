import graphqlHTTP from 'express-graphql';
import express from 'express';
import cors from 'cors';
import {schema} from './data/schema.js';
import config from './config.js';

const graphQLApp = express();

//enable cors pre-flight request
graphQLApp.use(cors());
graphQLApp.options('/graphql', cors());

graphQLApp.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true, pretty: true }));
graphQLApp.listen(config.EXPRESS_PORT);

console.log('GraphQL server running on http://localhost:' + config.EXPRESS_PORT + '/graphql');
