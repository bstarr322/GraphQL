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
  deleteGoalMutation
} from './goal-mutations';

import { 
  completeActivitiesMutation,
} from './activity-mutations';

import fileType from '../models/filesApi/fileType.js'
import { uploadFileMutation } from './file-mutations';
import fileService from '../services/fileService.js'
import httpParser from '../utilities/httpParser'

export var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createGoal: createGoalMutation,
    deleteGoal: deleteGoalMutation,
    completeActivities: completeActivitiesMutation,
    uploadFile: uploadFileMutation
  })
});