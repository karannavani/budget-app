function JourneyIndexCtrl($scope, $http, $auth) {
  $scope.getPayload = $auth.getPayload;
  console.log('payload is', $scope.getPayload().sub);
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
        getTfl();
        getUber();
        getBikeTfl();
      });

    function getTfl() {
      $http({
        method: 'GET',
        url: `https://api.tfl.gov.uk/Journey/JourneyResults/${$scope.lat}%2C${$scope.lon}/to/${$scope.endLat}%2C-${$scope.endLon}/?mode=tube`,
        skipAuthorization: true
      })
        .then(res => {
          console.log(res.data.journeys[0]);
          $scope.tubeDuration = res.data.journeys[0].duration;
          $scope.tubeCost = (res.data.journeys[0].fare.totalCost / 100).toFixed(2);
        });
      $http({
        method: 'GET',
        url: `https://api.tfl.gov.uk/Journey/JourneyResults/${$scope.lat}%2C${$scope.lon}/to/${$scope.endLat}%2C-${$scope.endLon}/?mode=bus`,
        skipAuthorization: true
      })
        .then(res => {
          console.log(res.data.journeys[0]);
          $scope.busDuration = res.data.journeys[0].duration;
          $scope.busCost = (res.data.journeys[0].fare.totalCost / 100).toFixed(2);
        });
    }

    function getUber() {
      $http({
        method: 'GET',
        url: 'https://api.uber.com/v1.2/estimates/price',
        params: {
          start_latitude: $scope.lat,
          start_longitude: $scope.lon,
          end_latitude: $scope.endLat,
          end_longitude: $scope.endLon
        },
        headers: {
          Authorization: 'Token dxlEpZmVHfdFFkOr7nZ3SAfjcJvRb081DnQM_2KS'
        },
        skipAuthorization: true
      })
        .then(res => {
          console.log('user data is', res.data);
          $scope.priceUberPool = parseFloat((res.data.prices[0].high_estimate + res.data.prices[0].low_estimate)/2);
          $scope.priceUberX = parseFloat((res.data.prices[1].high_estimate + res.data.prices[1].low_estimate)/2);
          console.log('priceUberPool is', res.data.prices[0].estimate);
          console.log('priceUberX is', res.data.prices[1].estimate);
          $scope.timeUberPool = (res.data.prices[0].duration)/100;
          $scope.timeUberX = (res.data.prices[1].duration)/100;
          console.log('timeUberPool is', (res.data.prices[0].duration)/100);
          console.log('timeUberX is', (res.data.prices[1].duration)/100);


        })
        .catch(err => console.log('An error with uber', err));
    }

    function getBikeTfl() {
      $http({
        method: 'GET',
        url: `https://api.tfl.gov.uk/Journey/JourneyResults/${$scope.lat}%2C${$scope.lon}/to/${$scope.endLat}%2C-${$scope.endLon}/?mode=cycle&cyclePreference=CycleHire`,
        skipAuthorization: true
      })
        .then(res => {
          console.log(res.data.journeys[0]);
          $scope.bikeDuration = res.data.journeys[0].duration;
          $scope.bikeCost = Math.ceil((res.data.journeys[0].duration - 30)/30) * 2;
        });
    }

    $scope.deductJourney = function($event) {
      // $rootScope.user.dailyBudget - amount;
      console.log('event is', $event.currentTarget);
      $scope.user.dailyBudget - amount;
    };
  };

}


export default JourneyIndexCtrl;
