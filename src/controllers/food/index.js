function FoodCtrl($scope, $http, $rootScope) {
  navigator.geolocation.getCurrentPosition(userPosition => {
    $scope.userPosition = userPosition;
    $scope.lat = $scope.userPosition.coords.latitude;
    $scope.lon = $scope.userPosition.coords.longitude;
    console.log('lat is', $scope.lat);
    console.log('lon is', $scope.lon);
    getPlace();
  });

  function getPlace() {
    $http({
      method: 'GET',
      url: '/api/food',
      params: {
        lat: $scope.lat,
        lon: $scope.lon
      }
    })
      .then(res => {
        console.log('res.data ->', res.data);
        $scope.restaurants = res.data.restaurants;
        console.log('location from scope is', $scope.restaurants);
      });
  }


  $scope.getEventTarget = function($event, resId) {
    $rootScope.resId =resId;
    console.log('resId is', $scope.resId);
  };
}

export default FoodCtrl;
