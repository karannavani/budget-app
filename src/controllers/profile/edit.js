function ProfileEditCtrl($scope, $http, $state) {
  $scope.updateProfile = function() {
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
