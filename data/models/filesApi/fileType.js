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
    name: 'File',
    // All the fields parsed by multer on a single file, expect busId and url
    fields: {
        originalname: {
            type: GraphQLString
        },
        mimetype: {
            type: GraphQLString
        },
        encoding: {
            type: GraphQLString
        },
        destination: {
            type: GraphQLString
        },
        filename: {
            type: GraphQLString
        },
        path: {
            type: GraphQLString
        },
        size: {
            type: GraphQLInt
        }
    }
});