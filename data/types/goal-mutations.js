/**
 * goal-mutations.js is insert and delete operations specifically for goal type 
 * 
 */

import { 
  GraphQLString,
  GraphQLInt,
  GraphQLOutputType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';
import { 
  mutationWithClientMutationId, 
  fromGlobalId
} from 'graphql-relay';
import { 
  goalConnection,
  goalEdge 
} from './connections';

import goalInputType from '../models/inputTypes/goalInputType.js';
import goalService from '../services/goalService.js';
import { viewerType } from '../types/viewer-type.js';
import contentService from '../services/contentService.js';
import userService from '../services/userService.js';

//outputFields are to be discussed and decided 
export const createGoalMutation = mutationWithClientMutationId({
  name: 'CreateGoal',
  inputFields: { 
    goal: { type: goalInputType }
  },
  outputFields: { 
    goalEdge: {
      type: goalEdge,
      resolve: (obj) => ({ node: [], cursor: obj.insertedId })
    },
    viewer: {
      type: viewerType
    }
  },
  mutateAndGetPayload: function(input,req){
    //return chained promises until creategoal
    return chainedPromisesForCreateGoal(input,req);
  }
});

//loop through all tasks with collection and chain all promises 
function chainedPromisesForCreateGoal(input,req){
  //promise tasks
  input.goal.tasks.forEach(function(task, idx, array) {
    if('collection' in task){
      var promiseTask = new contentService(getToken(req)).getContentByCollectionIdAndBusinessId(task.collection.collectionId, input.goal.businessId)
      promiseTask.then(function(data){
        input.goal.tasks[idx].collection.contents = data;
        if (idx === array.length - 1){ 
          promiseTeams(input,req);
        }
      })
    }
  });
}

//loop through all teams and chain all promises
function promiseTeams(input,req){
  input.goal.teams.forEach((team, idx, array) => {
    var promiseTeam = new userService(getToken(req)).getUserIdsByBusinessAndTeam(team.id, input.goal.businessId)
    promiseTeam.then(function(data) {
      input.goal.teams[idx].users = data;
      if (idx === array.length - 1){ 
        promiseCreateGoal(input,req);
      }
    });
  });
} 

//pass newly formed input to CreateGoal
function promiseCreateGoal(input,req){
  return new goalService(getToken(req)).createGoal(input);
}

export const deleteGoalMutation = mutationWithClientMutationId ({
  name: 'DeleteGoal',
  inputFields: {goalId: {type: GraphQLString}},
  outputFields: { 
    goalEdge: {
      type: goalEdge,
      resolve: (obj) => ({ node: [], cursor: obj.deletedId })
    },
    viewer: {
      type: viewerType
    }
  },
  mutateAndGetPayload: function(input,req){
    return new goalService(getToken(req)).deleteGoal(input);
  }
});


var getToken = function(request) {
  var token = extractAuthToken(request.headers);
  return generateAuthToken(token);
}

var extractAuthToken = function(headers) {
  return "nothing"; //headers.authorization;
}

var generateAuthToken = function(token) {
  return { 'authorization' : token };
}
