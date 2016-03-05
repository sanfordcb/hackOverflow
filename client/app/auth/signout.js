angular.module('hackoverflow.signout', [
  'hackoverflow.services',
  'satellizer'
])

.controller('SignoutController',
  function($scope, $rootScope, $auth, $state, Auth) {
    $auth.logout();
  }
);
