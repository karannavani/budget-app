function ProfileEditCtrl($scope, $http, $state, $rootScope) {
  $scope.updateProfile = function() {
    $scope.user.password = $rootScope.user.password;
    $scope.user.passwordConfirmation = $rootScope.user.password;
    $http({
      method: 'PUT',
      url: `/api/users/${$state.params.id}`,
      data: $scope.user
    })
      .then(() => $state.go('profileShow', { id: $state.params.id }));
  };


  $http({
    method: 'GET',
    url: `api/users/${$state.params.id}`
  })
    .then(res => $scope.user = res.data);
}

export default ProfileEditCtrl;
