import { 
  GraphQLString,
  GraphQLInt,
  GraphQLOutputType
} from 'graphql';
import { 
  mutationWithClientMutationId, 
  fromGlobalId
} from 'graphql-relay';
import { goalConnection } from './connections';
import { goalInputType,getGoalFields } from './models';
import { goalServices } from './services';
import { viewerType } from './viewer-type'

export const createGoalMutation = mutationWithClientMutationId({
  name: 'CreateGoal',
  inputFields: { 
                 input: { type: goalInputType },
                 goalType:{ type : GraphQLString }
               },
  outputFields: { result: { type: GraphQLString, resolve:  result => result.id } },
  mutateAndGetPayload: function(input){
	  return new goalServices().createGoal(input)
  }
});

export const updateGoalMutation = mutationWithClientMutationId ({
  name: 'UpdateGoal',
  inputFields: {
		input: {type: goalInputType},
		id: {type: GraphQLInt},
  },
  outputFields: getGoalFields(),
  mutateAndGetPayload: function(goal,id){
	return new goalServices().updateGoal(goal,id)
  }
});

export const deleteGoalMutation = mutationWithClientMutationId ({
  name: 'DeleteGoal',
  inputFields: {input: {type: GraphQLInt}},
  outputFields: {output: {type: GraphQLString}},
  mutateAndGetPayload: function(id){
    return new goalServices().deleteGoal(id)
  }
});