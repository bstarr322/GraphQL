/**
 * Model for uploading file to file service api
 *
 */

import { 
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLInt 
} from 'graphql';

export default new GraphQLObjectType({
    name: 'UploadedFile',
    // All the fields parsed by multer on a single file, expect busId and url
    fields: {
        lastModified: { type: GraphQLString },
        name: { type: GraphQLString },
        size: { type: GraphQLInt },
        type: { type: GraphQLString },
        webkitRelativePath: { type: GraphQLString }
    }
});