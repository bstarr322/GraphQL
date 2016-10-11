import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import { 
  nodeField
} from 'graphql-relay';

import {
  viewerServices
} from './services.js';

import {
  viewerQuery
} from './viewer-type'

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Logged In User',
  fields: viewerQuery()
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  node: nodeField, 
  fields: () => ({
	viewer: {
		type: viewerType,
		args: {viewerId: {type: GraphQLInt}},
		resolve: (_,args) => new viewerServices().getViewer(args.viewerId)
	}
  }),
});

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
  })
});

export const schema = new GraphQLSchema({
  query: queryType,
});
