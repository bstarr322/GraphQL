import {
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';

import { viewerServices } from './services';
import { viewerType } from './viewer-type';
import { nodeField } from './models';

export var queryType = new GraphQLObjectType({
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