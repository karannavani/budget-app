function ProfileShowCtrl($http, $scope, $state) {
  $http({
    method: 'GET',
    url: `/api/profile/${$state.params.id}`
  })
    .then(res => {
      console.log('Found a user', res.data);
      $scope.user = res.data;
    });
}

export default ProfileShowCtrl;
