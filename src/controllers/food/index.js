// let resPic;

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
        console.log('finding type', $scope.restaurants[0].restaurant.cuisines);
        // $scope.restaurants.forEach(restaurant => {
        //   respic = restaurant.restaurant.cuisines;
        //     switch(resPic) {
        //       case 'British': $scope.restaurant.picture = '';
        //       break;
        //       case 'Indian, Curry': $scope.restaurant.picture = '';
        //     }
        //   }
        // } )
      });
  }


  $scope.getEventTarget = function($event, resId) {
    $rootScope.resId =resId;
    console.log('resId is', $scope.resId);
  };
}

export default FoodCtrl;
