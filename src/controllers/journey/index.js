function JourneyIndexCtrl($scope, $http, $auth) {

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
    $scope.isClicked = true;
    getEndPoint();


    function getEndPoint() {
      $http({
        method: 'GET',
        url: '/api/getendpoint',
        params: {
          postcode: $scope.endPoint
        }
      })
        .then(res => {
          console.log('get endpoint res is');
          $scope.endLat = res.data.result.latitude;
          $scope.endLon = res.data.result.longitude;
          console.log('End Lat is', $scope.endLat);
          console.log('End Lon is', $scope.endLon);
          getTfl();
          getBikeTfl();
          getUber();
        });
    }


    function getTfl() {
      $http({
        method: 'GET',
        url: '/api/tflOptions',
        skipAuthorization: true,
        params: {
          lat: $scope.lat,
          lon: $scope.lon,
          endLat: $scope.endLat,
          endLon: $scope.endLon,
          mode: 'tube'
        }
      })
        .then(res => {
          $scope.tubeDuration = res.data.journeys[0].duration;
          $scope.tubeCost = (res.data.journeys[0].fare.totalCost / 100).toFixed(2);
          console.log($scope.tubeDuration, $scope.tubeCost);
        });

      $http({
        method: 'GET',
        url: '/api/tflOptions',
        skipAuthorization: true,
        params: {
          lat: $scope.lat,
          lon: $scope.lon,
          endLat: $scope.endLat,
          endLon: $scope.endLon,
          mode: 'bus'
        }
      })
        .then(res => {
          $scope.busDuration = res.data.journeys[0].duration;
          $scope.busCost = (res.data.journeys[0].fare.totalCost / 100).toFixed(2);
          console.log($scope.busDuration, $scope.busCost);
        });
    }

    function getBikeTfl() {
      $http({
        method: 'GET',
        url: '/api/bikeOptions',
        skipAuthorization: true,
        params: {
          lat: $scope.lat,
          lon: $scope.lon,
          endLat: $scope.endLat,
          endLon: $scope.endLon,
          mode: 'cycle'
        }
      })
        .then(res => {
          $scope.bikeDuration = res.data.journeys[0].duration;
          $scope.bikeCost = Math.ceil(res.data.journeys[0].duration/30) * 2;
          console.log($scope.bikeDuration, $scope.bikeCost);
        });
    }
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
