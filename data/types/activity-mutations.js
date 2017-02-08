/**
 * activity-mutations.js is insert update delete operations regarding activites
 * 
 */

import { 
  GraphQLString,
  GraphQLInt,
  GraphQLOutputType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList,
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

import completeActivityInputType from '../models/inputTypes/completeActivityInputType.js';
import viewerType from '../types/viewer-type.js';
import activityService from '../services/activityService';

import httpParser from '../utilities/httpParser.js'

export const completeActivitiesMutation = mutationWithClientMutationId({
  name: 'CompleteActivities',
  inputFields: { 
    body: { type: new GraphQLList(completeActivityInputType) },
    businessId: { type: GraphQLString }
  },
  outputFields: { 
    clientMutationId: { type: GraphQLString }
  },
  mutateAndGetPayload: function(input,req){
    return new activityService(httpParser(req)).completeActivities(input.body, input.businessId);
  }
});
