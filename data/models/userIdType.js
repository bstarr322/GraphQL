/**
 * Todo: refactor so that one property objects do not need 
 * a model like this.
 */

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

export default new GraphQLObjectType({
  name: 'UserId',
  fields: function () { return {
    ids: { type: new GraphQLList(GraphQLString) }
  }},
});
