/**
 * activity-mutations.js is insert update delete operations regarding activites
 * 
 */

import { GraphQLString, GraphQLList } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import completeActivityInputType from '../models/inputTypes/completeActivityInputType.js';
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
  mutateAndGetPayload: (input,req) => {
    return new activityService(httpParser(req)).completeActivities(input.body, input.businessId);
  }
});