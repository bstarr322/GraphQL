/**
 * Model for fetching errors in cpdone-goal-service
 * default type for errors in cpdone-goal-service is string
 *
 */

import {
	GraphQLObjectType,
	GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
	name: 'ErrorMessage',
	fields: function() { return {
		error: { 
			type: GraphQLString
		}
	}},
});