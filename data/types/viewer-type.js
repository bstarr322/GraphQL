/**
 * viewer-type.js root for all queries available to viewer/user
 * The top level entity to model the various data served to the user can be named as viewer.
 * viewer as a root query field of the GraphQL schema enables us to provide data based on the current user.
 * Purpose of viewer root query field -> https://goo.gl/fxFexR 
 */

/**
 * Node Interface Feature study if it is still needed
 * https://facebook.github.io/relay/docs/graphql-object-identification.html#content
 * https://facebook.github.io/relay/graphql/objectidentification.htm
 */

import { GraphQLObjectType,GraphQLString } from 'graphql';

import legacyApiFields from './viewerFields/legacyApiFields';
import goalServiceApiFields from './viewerFields/goalServiceApiFields';

export const viewerType = new GraphQLObjectType({
	name: 'Viewer',
	description: 'Logged In User, root for all queries available to viewer/user',
	fields: () => getViewerFields()
});

function getViewerFields() {
	return Object.assign({}, {
			viewerId: { type: GraphQLString, resolve: viewer => viewer.id },
			name: { type: GraphQLString }
		},		
		legacyApiFields,
		goalServiceApiFields
	)
}