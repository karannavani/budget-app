function DashboardCtrl($rootScope, $scope, $http) {
  console.log('user is', $rootScope.user);
  $scope.user = $rootScope.user;
  $scope.mode = 'notEdit';

  $scope.editBudget = function(name){
    $scope.mode = 'edit';
    console.log(name);
  //something done to change the <strong> element into a text input
  };

  $scope.saveBudget = function(name){
    $scope.mode = 'notEdit';
    console.log(name);
    $scope.user.password = $rootScope.user.password;
    $scope.user.passwordConfirmation = $rootScope.user.password;
    $http({
      method: 'PUT',
      url: `/api/users/${$rootScope.user._id}`,
      data: $scope.user
    });
  };
  $scope.spendData = [4, 6];
  //something done to change the <strong> element into a text input
  $scope.donutChartConfig = {
    'globals': {
      'font-family': 'Lato',
      'font-weight': '100'
    },
    'graphset': [
      {
        'type': 'ring',
        'background-color': '#ffffff',
        'tooltip': {
          'visible': 0
        },
        'plotarea': {
          'margin': '0% 0% 0% 0%'
        },
        'plot': {
          'slice': 175,
          'ref-angl': 270,
          'detach': false,
          'hover-state': {
            'visible': false
          },
          'value-box': {
            'visible': true,
            'type': 'first',
            'connected': false,
            'placement': 'center',
            'text': `<span style='font-size:40px;'>Running Total</span><br>`,
            'rules': [
              {
                'rule': '%v > 50',
                visible: false
              }
            ],
            'font-color': '#000000',
            'font-size': '40px'
          },
          'animation': {
            'delay': 0,
            'effect': 2,
            'speed': '40000',
            'method': '0',
            'sequence': '1'
          }
        },
        'series': [
          {
            'values': [$scope.spendData[0]],
            'background-color': '#FDFD47',
            'border-color': '#282E3D',
            'border-width': '2px',
            'shadow': 0
          },
          {
            'values': [$scope.spendData[1]],
            'background-color': '#35D884',
            'border-color': '#282E3D',
            'border-width': '2px',
            'shadow': 0
          }
        ]
      }
    ]
  };

}

export default DashboardCtrl;
