'use strict';

angular.module('credentialServices', ['ngResource']).
    factory('Credential', function($resource){
  return $resource('/api/credentials/:credentialId', {}, {
    query: {method:'GET', params:{credentialId:'all'}, isArray:true},
    get: {method: 'GET', params:{credentialId: '@id'}}
  });
});
