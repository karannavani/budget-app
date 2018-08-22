function FoodCtrl($scope, $http, $rootScope) {
  navigator.geolocation.getCurrentPosition(userPosition => {
    $scope.userPosition = userPosition;
    $scope.lat = $scope.userPosition.coords.latitude;
    $scope.lon = $scope.userPosition.coords.longitude;
    getPlace();
  });

  function getPlace() {
    $http({
      method: 'GET',
      url: 'https://developers.zomato.com/api/v2.1/geocode',
      params: {
        lat: $scope.lat,
        lon: $scope.lon
      },
      headers: {
        'user-key': '125a8a276bc94fd7ea67e8662aa4606a'
      }
    })
      .then(res => {
        $scope.location = res.data.location;
        getRestaurants();
      });
  }

  function getRestaurants() {
    $http({
      method: 'GET',
      url: 'https://developers.zomato.com/api/v2.1/search',
      params: {
        entity_id: $scope.location.entity_id,
        entity_type: $scope.location.entity_type,
        lat: $scope.lat,
        lon: $scope.lon,
        radius: '300',
        sort: 'cost',
        order: 'asc'
      },
      headers: {
        'user-key': '125a8a276bc94fd7ea67e8662aa4606a'
      }
    })
      .then(res => {
        $scope.restaurants = res.data.restaurants;
        console.log('restaurants are', $scope.restaurants);
      });
  }
  $scope.getEventTarget = function($event, resId) {
    $rootScope.resId =resId;
    console.log('resId is', $scope.resId);
  };
}

export default FoodCtrl;
