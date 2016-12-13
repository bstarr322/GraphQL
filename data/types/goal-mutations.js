/**
 * goal-mutations.js is insert and delete operations specifically for goal type 
 * 
 */

import { 
  GraphQLString,
  GraphQLInt,
  GraphQLOutputType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';
import { 
  mutationWithClientMutationId, 
  fromGlobalId
} from 'graphql-relay';
import { 
  goalConnection,
  goalEdge 
} from './connections';

import goalInputType from '../models/inputTypes/goalInputType.js';
import goalService from '../services/goalService.js';
import { viewerType } from '../types/viewer-type'

//outputFields are to be discussed and decided 
export const createGoalMutation = mutationWithClientMutationId({
  name: 'CreateGoal',
  inputFields: { 
    goal: { type: goalInputType }, 
    goalType:{ type : GraphQLString }
  },
  outputFields: { 
    goalEdge: {
      type: goalEdge,
      resolve: (obj) => ({ node: [], cursor: obj.insertedId })
    },
    viewer: {
      type: viewerType
    }
  },
  mutateAndGetPayload: function(input,req){
	  return new goalService(getToken(req)).createGoal(input)
  }
});

export const deleteGoalMutation = mutationWithClientMutationId ({
  name: 'DeleteGoal',
  inputFields: {goalId: {type: GraphQLString}},
  outputFields: { 
    goalEdge: {
      type: goalEdge,
      resolve: (obj) => ({ node: [], cursor: obj.deletedId })
    },
    viewer: {
      type: viewerType
    }
  },
  mutateAndGetPayload: function(input,req){
    return new goalService(getToken(req)).deleteGoal(input)
  }
});

var getToken = function(request) {
  var token = extractAuthToken(request.headers);
  return generateAuthToken(token);
}

var extractAuthToken = function(headers) {
  return headers.authorization;
}

var generateAuthToken = function(token) {
  return { 'authorization' : token };
}
