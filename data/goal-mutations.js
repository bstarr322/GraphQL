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
import { goalConnection } from './connections';

// models
import goalInputType from './models/inputTypes/goalInputType.js';
import { goalService } from './services/goalService.js';
import { viewerType } from './viewer-type'

export const createGoalMutation = mutationWithClientMutationId({
  name: 'CreateGoal',
  inputFields: { input: { type: goalInputType },goalType:{ type : GraphQLString }},
  outputFields: { result: { type: GraphQLString, resolve: function (result) { 
	  if (result["data"].id == null) {
		  return result["data"];
	  } else {
		  return result["data"].id;
	  }
    }
  }},
  mutateAndGetPayload: function(input){
	  return new goalService().createGoal(input)
  }
});

export const updateGoalMutation = mutationWithClientMutationId ({
  name: 'UpdateGoal',
  inputFields: {
		input: {type: goalInputType},
		id: {type: GraphQLInt},
  },
  outputFields: function () {
    return {
        id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        businessId: {type: GraphQLString},
        isBusinessCritical: {type: GraphQLBoolean},
        isSequential: {type: GraphQLBoolean},
        startDate: {type: GraphQLString},
        };
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