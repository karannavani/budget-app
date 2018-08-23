function MonzoCtrl($http, $scope, $window) {

  $scope.goToLogin = function() {
    $window.location.href = '/api/monzo';
  };
}

export default MonzoCtrl;
