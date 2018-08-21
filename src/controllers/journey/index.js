function JourneyIndexCtrl($scope, $http) {

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
      });

    function getTfl() {
      $http({
        method: 'GET',
        url: `https://api.tfl.gov.uk/Journey/JourneyResults/${$scope.lat}%2C${$scope.lon}/to/${$scope.endLat}%2C-${$scope.endLon}/?mode=tube`,
        skipAuthorization: true
      })
        .then(res => {
          console.log(res.data);
        });
    }


  };

}


export default JourneyIndexCtrl;
