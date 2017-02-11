/**
 * query-type.js is the root js for all queries.
 * In graphql Query handles Select operations.
 * query-type.js is exported to schema.js
 *
 */

import { GraphQLObjectType } from 'graphql';

import viewerType from './viewer-type';

export var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
	viewer: {
		type: viewerType,
		resolve: viewer => "user"
	}
  }),
});