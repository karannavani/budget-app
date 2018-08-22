function RestaurantCtrl($scope, $http, $rootScope) {
  $scope.resId = $rootScope.resId;
  console.log('scope resID', $scope.resId);
  findRestaurant();
  function findRestaurant() {
    $http({
      method: 'GET',
      url: 'https://developers.zomato.com/api/v2.1/restaurant',
      params: {
        res_id: $scope.resId
      },
      headers: {
        'user-key': '125a8a276bc94fd7ea67e8662aa4606a'
      },
      skipAuthorization: true
    })
      .then(res => {
        $scope.restaurant = res.data;
        console.log('show restaurant data is', $scope.restaurant);
      });
  }
}

export default RestaurantCtrl;
