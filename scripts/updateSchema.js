/**
 * Generate schema.json and schema.graphql
 * generated through package.json
 */

import {graphql} from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';
import fs from 'fs';
import path from 'path';
import schema from '../data/schema.js';
import config from '../config.js';

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
        path.join(__dirname, '../data/schema.json'),
        JSON.stringify(result, null, 2)
    );
    console.log("JSON schema created");
  }
})();

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, '../data/schema.graphql'),
  printSchema(schema)
);
