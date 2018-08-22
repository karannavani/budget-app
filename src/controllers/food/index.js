function FoodCtrl($scope, $http) {
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
        console.log('location from scope is', $scope.location);
        // getRestaurants();
      });
  }

//   function getRestaurants() {
//     $http({
//       method: 'GET',
//       url: '/api/food',
//       params: {
//         entity_id: $scope.location.entity_id,
//         entity_type: $scope.location.entity_type,
//         lat: $scope.lat,
//         lon: $scope.lon,
//         radius: '300',
//         sort: 'cost',
//         order: 'asc'
//       }
//     })
//       .then(res => {
//         $scope.restaurants = res.data.restaurants;
//         console.log('restaurants are', $scope.restaurants);
//       });
//   }
//   $scope.getEventTarget = function($event, resId) {
//     $rootScope.resId =resId;
//     console.log('resId is', $scope.resId);
//   };
}

export default FoodCtrl;
