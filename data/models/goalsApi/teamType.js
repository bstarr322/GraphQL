/**
 * Model for getting team
 * from cpdone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList
} from 'graphql';

import userType from './userType';

export default new GraphQLObjectType({
	name: 'GoalServiceTeam',
	fields: function() { return {
		teamId: {
			type: GraphQLID, 
			resolve: team => team.id
		},
		name: { type: GraphQLString },
		manager: { type: new GraphQLList(userType) }
	}},
});
