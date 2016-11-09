import {
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';

import viewerService from './services/viewerService.js';
import { viewerType } from './viewer-type';

export var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
	viewer: {
		type: viewerType,
		args: {viewerId: {type: GraphQLInt}},
		resolve: (_,args) => viewerService.getViewer(args.viewerId)
	}
  }),
});