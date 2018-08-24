function MonzoAuthCtrl($http, $scope, $window) {

  goToAuth();

  function goToAuth() {
    $window.location.href = '/api/oauth/callback';
  }
}

export default MonzoAuthCtrl;
