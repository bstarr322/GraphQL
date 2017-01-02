/**
 */

import {
	GraphQLObjectType,
	GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  fields: function () { return {
    userId: { 
    	type: GraphQLID,
    	resolve: user => user.id
    },
    name: { type: GraphQLString }
  }},
});
