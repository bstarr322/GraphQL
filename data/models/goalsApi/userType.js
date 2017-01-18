/**
 * model for goalUserType in goalservice api
 */

import {
	GraphQLObjectType,
	GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'GoalServiceUser',
  fields: function () { return {
    userId: { 
    	type: GraphQLID,
    	resolve: user => user.id
    },
    name: { type: GraphQLString }
  }},
});
