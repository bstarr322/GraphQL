/**
 * mutation-type.js is the root js for all mutations.
 * In graphql Mutation handles Insert(RANGE_ADD),Update(FIELDS_CHANGE),Delete(NODE_DELETE/RANGE_DELETE) operations.
 * mutation-type.js is exported to schema.js.
 * http://facebook.github.io/relay/graphql/mutations.htm
 * https://facebook.github.io/relay/docs/guides-mutations.html
 * https://facebook.github.io/relay/docs/graphql-mutations.html
 */

import {
  GraphQLObjectType
} from 'graphql';

import {
  createGoalMutation, 
  updateGoalMutation, 
  deleteGoalMutation
} from './goal-mutations';

import { 
  completeActivitiesMutation,
  updateActivityContentMutation 
} from './activity-mutations';

export var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
  	createGoal: createGoalMutation,
  	deleteGoal: deleteGoalMutation,
  	completeActivities: completeActivitiesMutation,
  	updateActivityContent: updateActivityContentMutation
  }),
});