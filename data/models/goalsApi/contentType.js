/**
 * Model for getting content
 * from goals service api.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
} from 'graphql';

export default new GraphQLObjectType({
	name: 'GoalServiceContent',
	fields: function () { return {
		contentId: {
			type: GraphQLID, 
			resolve: content => content.id 
		},
		progress: { type: GraphQLString },
	}},
});