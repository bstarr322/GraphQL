/**
 * Model of incoming goalType http request 
 */

import { 
	GraphQLInputObjectType,
	GraphQLInt 
} from 'graphql';

export default new GraphQLInputObjectType ({
	name: 'GoalTypeInput',
 	fields: { 
 		id: { type: GraphQLInt } 
 	},
});