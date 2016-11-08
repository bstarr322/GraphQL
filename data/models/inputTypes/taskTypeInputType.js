/**
 * Model of incoming taskType http request 
 */

import {
	GraphQLInputObjectType,
	GraphQLInt
} from 'graphql';


export default new GraphQLInputObjectType ({
	name: 'TaskTypeInput',
	fields: function() { return {
		id: { 
			type: GraphQLInt 
		}
	}}
});