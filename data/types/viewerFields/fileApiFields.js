import { GraphQLString } from 'graphql';

// file service api models
import uploadedFileType from '../../models/filesApi/uploadedFileType.js';

// file services 
import fileService from '../../services/fileService.js';

// infrastructure
import httpParser from '../../utilities/httpParser.js'

export default {
	downloadFile: {
		type: uploadedFileType,
		args: {fileId: {type: GraphQLString}, businessId: {type: GraphQLString}},
		resolve:  (_,args, req) => new fileService(httpParser(req)).downloadFile(args.fileId, args.businessId)
	}
}
