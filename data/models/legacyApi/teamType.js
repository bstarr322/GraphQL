/**
 * Model for getting team
 * from cpdone web service api.
 */

import { GraphQLObjectType, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
	name: 'LegacyTeam',
	fields: function() { return {
		teamId: {
			type: GraphQLID, 
			resolve: team => team.Id
		},
		parentId: {
			type: GraphQLID, 
			resolve: team => team.ParentId
		},
		status: {
			type: GraphQLID, 
			resolve: team => team.Status
		},
		title: {
			type: GraphQLID, 
			resolve: team => team.Title
		},

	}},
});
