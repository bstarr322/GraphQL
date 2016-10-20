import {
  GraphQLObjectType
} from 'graphql';

import {
  createGoalMutation, 
  updateGoalMutation, 
  deleteGoalMutation
} from './goal-mutations';

/*
	Mutation handles Insert,Update,Delete
	Mutation has to work with node interface
	To be modified once further once post method is ready
*/

export var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
	createGoal: createGoalMutation,
	updateGoal: updateGoalMutation,
	deleteGoal: deleteGoalMutation
  }),
});