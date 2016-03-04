angular.module('hackoverflow.forums', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {

})

.controller('ForumsController',
  function ($scope, $stateParams, $state, Posts, Answers, TimeService, ForumService) {
    $scope.switchForum = function switchForum(forum) {
      $scope.forum = forum;
      ForumService.currentForum.model.forum = forum;
      $scope.getForums();
    };
    $scope.getForums = function getForums(forum) {
      Posts.getForums().then(function (data) {
        $scope.forums = data.data.sort();
      });
    };
    $scope.getForums();
  }
);
