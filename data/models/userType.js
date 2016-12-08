/**
 */

import {
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  fields: function () { return {
    userId: { 
    	type: GraphQLString,
    	resolve: user => user.id
    },
    name: { type: GraphQLString }
  }},
});
