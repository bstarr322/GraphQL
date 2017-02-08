/**
 * Model for uploading file to file service api
 *
 */

import { GraphQLInputObjectType, GraphQLString,GraphQLInt } from 'graphql';

export default new GraphQLInputObjectType ({
    name: 'UploadedFileInput',
    fields: function() { return {
        lastModified: { type: GraphQLString },
        name: { type: GraphQLString },
        size: { type: GraphQLInt },
        type: { type: GraphQLString },
        webkitRelativePath: { type: GraphQLString }
     }}
});