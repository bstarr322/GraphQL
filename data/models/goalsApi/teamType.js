/**
 * Model for getting team
 * from cpdone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLID,
	GraphQLList
} from 'graphql';

export default new GraphQLObjectType({
	name: 'GoalServiceTeam',
	fields: function() { return {
		teamId: {
			type: GraphQLID, 
			resolve: team => team.id
		},
		title: { type: GraphQLString }
	}},
});
