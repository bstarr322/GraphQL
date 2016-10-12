import graphqlHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';
import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import {schema} from './data/schema.js';
import config from './config.js';

const graphQLApp = express();

//enable cors pre-flight request
graphQLApp.use(cors());
graphQLApp.options('/graphql', cors());

graphQLApp.use('/graphql', graphqlHTTP({ schema, graphiql: true, pretty: true }));
graphQLApp.listen(config.EXPRESS_PORT);

console.log('GraphQL server running on http://localhost:' + config.EXPRESS_PORT + '/graphql');

// copy pasted, to be analyzed and studied but basically for~
// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  var result = await (graphql(schema, introspectionQuery));
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
      fs.writeFileSync(
        path.join(__dirname, './data/schema.json'),
        JSON.stringify(result, null, 2)
    );
    console.log("JSON schema created");
  }
})();

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, './data/schema.graphql'),
  printSchema(schema)
);
