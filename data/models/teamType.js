/**
 * Model for getting teams in tree form
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
	name: 'Team',
	fields: function() { return {
		teamId: {
			type: new GraphQLNonNull(GraphQLID), 
			resolve: team => team.id
		},
	}},
});
