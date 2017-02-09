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
    fileName: { type: GraphQLString }
  },
  outputFields: {
    file: { 
      type: fileType,
      resolve: (payload, args, options) => {
        console.log(payload);
        console.log(args);
        console.log(options);
        const file = options.rootValue.request.file
        console.log(file);
      }
    },
    clientMutationId: { type: GraphQLString }
  },
  mutateAndGetPayload: (input) => {
    console.log(input)
    return null; //new fileService(httpParser(req)).uploadFile(rootValue.body.file, rootValue.body.businessId);
  }
});