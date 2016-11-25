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

// models
import goalInputType from './models/inputTypes/goalInputType.js';
import goalService from './services/goalService.js';
import { viewerType } from './viewer-type'

export const createGoalMutation = mutationWithClientMutationId({
  name: 'CreateGoal',
  inputFields: { 
    input: { type: goalInputType }, 
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
  mutateAndGetPayload: function(input,goalType,req){
	  return new goalService(getToken(req)).createGoal(input,goalType)
  }
});

export const updateGoalMutation = mutationWithClientMutationId ({
  name: 'UpdateGoal',
  inputFields: { 
    input: {type: goalInputType}, 
    goalType:{ type : GraphQLString }, 
    goalId: {type: GraphQLInt},
  },
  outputFields: { 
    goalEdge: {
      type: goalEdge,
      resolve: (obj) => ({ node: [], cursor: obj.updatedId })
    },
    viewer: {
      type: viewerType
    }
  },
  mutateAndGetPayload: function(goal,id){
    return new goalService().updateGoal(goal,id)
  }
});

export const deleteGoalMutation = mutationWithClientMutationId ({
  name: 'DeleteGoal',
  inputFields: {input: {type: GraphQLInt}},
  outputFields: {output: {type: GraphQLString}},
  mutateAndGetPayload: function(id){
    return new goalService().deleteGoal(id)
  }
});

var getToken = function(request) {
  var token = extractAuthToken(request.headers);
  return generateAuthToken(token);
}

var extractAuthToken = function(headers) {
  //return headers.authorization;
  return 'nothing';
}

var generateAuthToken = function(token) {
  return { 'authorization' : token };
}