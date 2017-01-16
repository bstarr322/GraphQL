/**
 * Model of incoming ActivityContent http request  
 */

import {
	GraphQLInputObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLBoolean
} from 'graphql';

import membershipInputType from './membershipInputType';

export default new GraphQLInputObjectType ({
	name: 'ActivityContentInput',
	fields: function() { return { 
		userId: { type: GraphQLString },
		contentId: { type: GraphQLString },
		isComplete: { type: GraphQLBoolean },
		membershipPoints: { type: new GraphQLList(membershipInputType) }
	}},
});