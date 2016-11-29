/*
 * schema.js is exported to index.js for express.
 * https://facebook.github.io/relay/docs/thinking-in-graphql.html
 */

import { GraphQLSchema } from 'graphql';
import { queryType as query } from './types/query-type';
import { mutationType as mutation } from './types/mutation-type';

export default new GraphQLSchema({ query, mutation });
