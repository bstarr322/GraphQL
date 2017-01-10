/**
 * In the query, the connection model provides a standard mechanism for slicing and paginating the result set. 
 * In the response, the connection model provides a standard way of providing cursors, and a way of telling the client when more results are available.
 * Connection model is a requirement for relay mutations.
 * https://facebook.github.io/relay/docs/graphql-connections.html
 * https://facebook.github.io/relay/graphql/connections.htm
 */
 
import {connectionDefinitions} from 'graphql-relay';
import goalType from '../models/goalsApi/goalType.js';

export const {connectionType: goalConnection, edgeType: goalEdge} = connectionDefinitions({ name: 'Goal', nodeType: goalType });
