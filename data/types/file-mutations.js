/**
 * activity-mutations.js is insert update delete operations regarding activites
 * 
 */

import { GraphQLString } from 'graphql';
import { 
  mutationWithClientMutationId, 
  fromGlobalId
} from 'graphql-relay';


import fileService from '../services/activityService';
import uploadedFileType from '../models/filesApi/uploadedFileType.js'
import fileType from '../models/filesApi/fileType.js'
import httpParser from '../utilities/httpParser.js'

export const uploadFileMutation = mutationWithClientMutationId({
  name: 'UploadFile',
  inputFields: { 
    businessId: { type: GraphQLString }
  },
  outputFields: {
    clientMutationId: { type: GraphQLString }
  },
  mutateAndGetPayload: (rootValue,request) => {
    console.log(rootValue)
    return null; //new fileService(httpParser(req)).uploadFile(rootValue.body.file, rootValue.body.businessId);
  }
});