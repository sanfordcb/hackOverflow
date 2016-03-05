angular.module('hackoverflow.add-post', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($stateProvider) {
})

.controller('AddPostController', function ($scope, $rootScope, $state,
  $stateParams, Posts, ForumService) {
  $scope.title = '';
  $scope.body = '';
  $scope.forums = [];
  $scope.forum = ForumService.currentForum.model.forum;
  $scope.tags = [];
  $scope.votes = 0;

  $scope.getForums = function getForums() {
    Posts.getForums().then(function (data) {
      $scope.forums = data.sort();
      $scope.forums.unshift('Please choose a forum');
    });
  };

  $scope.submit = function () {
    Posts.createPost($scope.title, $scope.body, $scope.forum,
<<<<<<< HEAD
      $rootScope.user, new Date(), $scope.tags);
    $state.go('forums.posts', { 'forum': $scope.forum });
=======
      $rootScope.user, new Date(), $scope.tags, $scope.votes);
    $state.go('posts', { 'forum': $scope.forum });
>>>>>>> 4e2f03888eb4e8fae2400c2e4c8020e8790f9a3e
  };

  $scope.getForums();
});
