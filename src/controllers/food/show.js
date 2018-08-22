function RestaurantCtrl($scope, $http, $rootScope) {
  $scope.resId = $rootScope.resId;
  console.log('from the front end controller', $scope.resId);
  // findRestaurant();
  // function findRestaurant() {
  $http({
    method: 'GET',
    url: '/api/food/:id',
    params: {
      res_id: $scope.resId
    }
  })
    .then(res => {
      console.log('we are in the then block');
      console.log('this is our res ==========================>', res);
      $scope.restaurant = res.data;
      console.log('show restaurant data is', $scope.restaurant);
    });
  // }
}
export default RestaurantCtrl;
