import {connectionDefinitions} from 'graphql-relay';
import goalType from './models/goalType.js';

/*
  Connection Type is a requirement for mutations
  A feature that can be explored specifically for GoalType
  https://facebook.github.io/relay/docs/graphql-connections.html
  https://facebook.github.io/relay/graphql/connections.htm
*/

export const {connectionType: goalConnection, edgeType: goalEdge} = connectionDefinitions({ name: 'Goal', nodeType: goalType });
