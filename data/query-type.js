import {
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';

import { viewerServices } from './services';
import { viewerType } from './viewer-type';

export var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
	viewer: {
		type: viewerType,
		args: {viewerId: {type: GraphQLInt}},
		resolve: (_,args) => new viewerServices().getViewer(args.viewerId)
	}
  }),
});