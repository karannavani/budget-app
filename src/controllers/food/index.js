function FoodCtrl($scope) {
  navigator.geolocation.getCurrentPosition(userPosition => {
    $scope.userPosition = userPosition;
    console.log('user position is', $scope.userPosition);
  });
}s

export default FoodCtrl;
