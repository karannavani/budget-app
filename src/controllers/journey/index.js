function JourneyIndexCtrl($scope, $http, $auth ) {

  $scope.getPayload = $auth.getPayload;
  navigator.geolocation.getCurrentPosition(position => {
    console.log('Found position', position);
    $scope.position = position;
    console.log('scope position is', $scope.position.coords);
    $scope.lat = $scope.position.coords.latitude;
    $scope.lon = $scope.position.coords.longitude;
    console.log('lat is', $scope.lat);
    console.log('lon is', $scope.lon);
  });

  $scope.$watch('endPoint', () => {
    if($scope.endPoint) {
      console.log('End point is', $scope.endPoint);
    }
  });

  $scope.generateOptions = function() {
    $http.get(`https://api.postcodes.io/postcodes/${$scope.endPoint}`)
      .then(res => {
        $scope.endLat = res.data.result.latitude;
        $scope.endLon = res.data.result.longitude;
        console.log('End Lat is', $scope.endLat);
        console.log('End Lon is', $scope.endLon);
        getUber();
      });

    function getUber() {
      console.log('uber start lat', $scope.lat);
      $http({
        method: 'GET',
        url: '/api/uberRouteOptions',
        params: {
          lat: $scope.lat,
          lon: $scope.lon,
          endLat: $scope.endLat,
          endLon: $scope.endLon
        },
        skipAuthorization: true
      })
        .then(res => {
          $scope.uberPoolCost = parseFloat((res.data.prices[0].high_estimate + res.data.prices[0].low_estimate)/2);
          $scope.uberXCost = parseFloat((res.data.prices[1].high_estimate + res.data.prices[1].low_estimate)/2);
          $scope.uberPoolDuration = (res.data.prices[0].duration)/100;
          $scope.uberXDuration = (res.data.prices[1].duration)/100;
          console.log('uberPoolDuration', $scope.uberXDuration);
        });
    }
  };



}
export default JourneyIndexCtrl;
