/**
 * Model for getting team
 * from cpdone web service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLInt
} from 'graphql';

// self reference on children nodes
import teamTreeType from './teamTreeType.js'

export default new GraphQLObjectType({
	name: 'GoalServiceTeamTree',
	fields: function() { return {
		teamId: {
			type: GraphQLID, 
			resolve: team => team.id
		},
		name: { type: GraphQLString },
		type: { type: GraphQLString },
		percentage: { type: GraphQLInt },
		children: { type: new GraphQLList(teamTreeType) }
	}},
});
