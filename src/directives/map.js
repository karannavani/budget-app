/*global L*/
function Map() {
  return {
    restrict: 'A',
    link($scope, $element) {
      const DomElement = $element[0];
      const map = L.map(DomElement);
      console.log('+=+=+=+=+===+=====++=++++=+', $scope.resId);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      }).addTo(map);
      $scope.$watch('restaurant', () => {
        map.setView([$scope.restaurant.location.latitude, $scope.restaurant.location.longitude], 120);
        const makerLocation = [$scope.restaurant.location.latitude, $scope.restaurant.location.longitude];
        const marker =L.marker(makerLocation)
          .addTo(map);
        marker.bindPopup(`<p>${$scope.restaurant.name}</p>`);
      });
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(position => {
      //   });
      // }
    }};
}
export default Map;
