function JourneyIndexCtrl($scope, $http) {

  navigator.geolocation.getCurrentPosition(position => {
    console.log('Found position', position);
    $scope.position = position;
    console.log('scope position is', $scope.position.coords);
    $scope.lat = $scope.position.coords.latitude;
    $scope.lon = $scope.position.coords.longitude;
    console.log('lat is', $scope.lat);
    console.log('lon is', $scope.lon);
    getUberPrices();
  });

  function getUberPrices() {
    $http({
      method: 'GET',
      url: 'https://api.uber.com/v1.2/estimates/price',
      params: {
        start_latitude: $scope.lat,
        start_longitude: $scope.lon,
        end_latitude: 51.53,
        end_longitude: 0.07
      },
      headers: {
        Authorization: 'Token dxlEpZmVHfdFFkOr7nZ3SAfjcJvRb081DnQM_2KS'
      },
      skipAuthorization: true
    })
      .then(res => {
        $scope.priceUber = res.data;
        console.log('priceUber is', $scope.priceUber);
      })
      .catch(err => console.log('An error with uber', err));
  }
}







export default JourneyIndexCtrl;
