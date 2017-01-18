/**
 * Model for getting user details
 * from cpdone web service api.
 */

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'LegacyUser',
  fields: function () { return {
    userId: { 
      type: GraphQLString,
      resolve: user => user.Id 
    },
    firstName: { 
      type: GraphQLString,
      resolve: user => user.FirstName 
    },
    lastName: { 
      type: GraphQLString,
      resolve: user => user.LastName 
    },
    fullName: { 
      type: GraphQLString,
      resolve: user => user.FullName 
    },
    state: { 
      type: GraphQLString,
      resolve: user => user.State 
    },
    city: { 
      type: GraphQLString,
      resolve: user => user.City 
    }
  }},
});
