angular.module('hackoverflow.answers', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('AnswersController',
  function ($scope, $rootScope, $stateParams, $state, Answers, Posts, TimeService) {
  $scope.answers = [];
  $scope.post = {};
  $scope.postId = $stateParams.postId;
  $scope.newAnswerBody = '';
  $scope.theUser = $rootScope.user;
  $scope.TimeService = TimeService;

  $scope.getData = function getData(postId) {
    Posts.getPosts(postId).then(function(result) {
      $scope.post = result.data;
      $scope.getAnswers();
    })
  }

  $scope.getAnswers = function getAnswers() {
    Answers.getAnswers($scope.post._id).then(function(result) {
      $scope.answers = result.data;
  };

  $scope.editAnswer = function editAnswer(postId, answer) {
    console.log(postId, answer);
    Answers.editAnswer(postId, answer);
    $scope.getAnswers();
    console.log('$scope answers' + $scope.answers);
  };

  $scope.deleteAnswer = function deleteAnswer(postId, answerId) {
    Answers.deleteAnswer(postId, answerId);
    $scope.getAnswers();
  };

  $scope.deletePost = function deletePost(postId) {
    Posts.deletePost(postId);
    $state.go('forums.posts', {forum: $stateParams.forum});
  };

  $scope.submit = function () {
    Answers.createAnswer($scope.post._id, $scope.newAnswerBody, $rootScope.user, new Date());
    $scope.newAnswerBody = '';
    $scope.getAnswers();
  };

  $scope.getData($scope.postId);
});
