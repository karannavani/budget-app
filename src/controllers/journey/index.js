function JourneyIndexCtrl($scope, $http, $auth, $rootScope) {
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
    const tflKey = 'app_id=68d28f58&app_key=3186ece70e4dc50cd4f9a7bcfd3fde3a';

    $http.get(`https://api.postcodes.io/postcodes/${$scope.endPoint}`)
      .then(res => {
        $scope.endLat = res.data.result.latitude;
        $scope.endLon = res.data.result.longitude;
        console.log('End Lat is', $scope.endLat);
        console.log('End Lon is', $scope.endLon);
        getTubeTfl();
        getBusTfl();
        getBikeTfl();
        getUber();
        getBikeTfl();
      });

    function getTubeTfl() {
      $http({
        method: 'GET',
        url: `https://api.tfl.gov.uk/Journey/JourneyResults/${$scope.lat}%2C${$scope.lon}/to/${$scope.endLat}%2C-${$scope.endLon}/?mode=tube&${tflKey}`,
        skipAuthorization: true
      })
        .then(res => {
          $scope.tubeDuration = res.data.journeys[0].duration;
          $scope.tubeCost = (res.data.journeys[0].fare.totalCost / 100).toFixed(2);
        });
    }

    function getBusTfl() {

      $http({
        method: 'GET',
        url: `https://api.tfl.gov.uk/Journey/JourneyResults/${$scope.lat}%2C${$scope.lon}/to/${$scope.endLat}%2C-${$scope.endLon}/?mode=bus&${tflKey}`,
        skipAuthorization: true
      })
        .then(res => {
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
          $scope.uberPoolCost = parseFloat((res.data.prices[0].high_estimate + res.data.prices[0].low_estimate)/2);
          $scope.uberXCost = parseFloat((res.data.prices[1].high_estimate + res.data.prices[1].low_estimate)/2);
          $scope.uberPoolDuration = (res.data.prices[0].duration)/100;
          $scope.uberXDuration = (res.data.prices[1].duration)/100;
        })
        .catch(err => console.log('An error with uber', err));
    }
    function getBikeTfl() {
      $http({
        method: 'GET',
        url: `https://api.tfl.gov.uk/Journey/JourneyResults/${$scope.lat}%2C${$scope.lon}/to/${$scope.endLat}%2C-${$scope.endLon}/?mode=cycle&cyclePreference=CycleHire&${tflKey}`,
        skipAuthorization: true
      })
        .then(res => {
          $scope.bikeDuration = res.data.journeys[0].duration;
          $scope.bikeCost = Math.ceil(res.data.journeys[0].duration/30) * 2;
        });
    }
  };

  $scope.deductJourney = function(event) {
    let cost;
    let type;
    let merchant;
    // console.log('event is', event.currentTarget.textContent);
    // console.log('daily budget is', $scope.user.dailyBudget);
    // console.log(event.srcElement.className);

    switch (event.srcElement.className.includes('')) {
      case event.srcElement.className.includes('bus'):
        console.log('Bus found');
        type = 'Transport – Bus';
        cost = $scope.busCost;
        merchant = 'TFL';
        break;
      case event.srcElement.className.includes('bike'):
        console.log('Bike found');
        type = 'Transport – Bike';
        cost = $scope.bikeCost;
        merchant = 'TFL';
        break;
      case event.srcElement.className.includes('tube'):
        console.log('Tube found');
        type = 'Transport – Tube';
        cost = $scope.tubeCost;
        merchant = 'TFL';
        break;
      case event.srcElement.className.includes('uberPool'):
        console.log('Uber Pool found');
        type = 'Transport – Uber Pool';
        cost = $scope.uberPoolCost;
        merchant = 'Uber';
        break;
      case event.srcElement.className.includes('uberX'):
        console.log('UberX found');
        type = 'Transport – UberX';
        cost = $scope.uberXCost;
        merchant = 'Uber';
        break;
      default:
        console.log('Not found');
    }
    console.log($scope.user.dailyBudget - cost);


    createExpense();

    function createExpense() {

      $http({
        method: 'POST',
        url: '/api/expenses',
        createdBy: $scope.user,
        data: { createdBy: $scope.user, cost: cost, merchant: merchant, type: type }
      })
        .then(() => $rootScope.$broadcast('flashMessage',
          { type: 'success',
            content: 'You created a new expense'
          }));
    }
  };

}


export default JourneyIndexCtrl;
