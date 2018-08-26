function DashboardCtrl($rootScope, $scope, $http) {
  // console.log('user is', $rootScope.user);
  $scope.user = $rootScope.user;
  $scope.mode = 'notEdit';
  const today = new Date;
  const slicedDate = today.toLocaleString().slice(0,10);
  let expenseDate;
  let totalCost = 0;
  $scope.donutChartConfig = {};

  // Allows the user to edit budget from dashboard – linked to the ng-switch block
  $scope.editBudget = function(name){
    $scope.mode = 'edit';
    console.log(name);
  //something done to change the <strong> element into a text input
  };

  // Updates the budget in the model with the edited budget
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
    $scope.$apply;
  };

  // making GET request to get user expenses in dashboard scope
  const userExpenses = [];
  $http({
    method: 'GET',
    url: '/api/expenses'
  })
    .then(res => {

      res.data.forEach(expense => {
        if(expense.createdBy._id === $rootScope.user._id) {
          userExpenses.push(expense);
          expenseDate = `${expense.createdAt.slice(8,10)}/${expense.createdAt.slice(5,7)}/${expense.createdAt.slice(0,4)}`;

          if (expenseDate === slicedDate) {
            totalCost = totalCost + expense.cost;
          }
        }
      });

      $rootScope.displayTotal= totalCost;
      // console.log('User expense is ===>', userExpenses);
      $scope.expenses = userExpenses;
      $rootScope.remainder = $rootScope.user.dailyBudget - $rootScope.displayTotal;
      $scope.spendData = [$rootScope.remainder, $rootScope.displayTotal];
      // console.log('this is scope data', $scope.spendData);
    });


  $rootScope.$watch('remainder', () => {
    if(($rootScope.remainder = $rootScope.user.dailyBudget - $rootScope.displayTotal)) {
      $scope.user.password = $rootScope.user.password;
      $scope.user.passwordConfirmation = $rootScope.user.password;
      newDay();
    }
  });

  // Favorite piece of code – Karan
  function newDay() {
    let today = new Date;
    today = today.toLocaleString().slice(0,10);

    if ($rootScope.user.loginArray.length === 0 || $rootScope.user.loginArray[0] !== today) {
      addSavings();
      $rootScope.user.loginArray.pop();
      $rootScope.user.loginArray.push(today);
      console.log('pushing to login array', $rootScope.user.loginArray);

      $http({
        method: 'PUT',
        url: `/api/users/${$rootScope.user._id}`,
        data: $rootScope.user
      });
    }
  }

  function addSavings() {
    console.log('pushing to savings array');
    $rootScope.user.savingsArray.push(parseInt($rootScope.remainder));
  }

  // $scope.$watch('user', () => {
  //   if($rootScope.user === user) {
  //
  //   }
  // });


  // Graph logic
  $scope.$watch('spendData', () => {

    let seriesConfig = [];
    if($scope.spendData){

      if($scope.remainder < 0) {
        seriesConfig = [{
          'values': [$scope.spendData[1]],
          'background-color': '#ff647a',
          'border-color': '#282E3D',
          'border-width': '0px',
          'shadow': 0
        }];
      } else {
        seriesConfig = [
          {
            'values': [$scope.spendData[0]],
            'background-color': '#10f785',
            'border-color': '#282E3D',
            'border-width': '0px',
            'shadow': 0
          },
          {
            'values': [$scope.spendData[1]],
            'background-color': '#ff647a',
            'border-color': '#282E3D',
            'border-width': '0px',
            'shadow': 0
          }

        ];
      }



      $scope.donutChartConfig = {
        'globals': {
          'font-family': 'Rubik',
          'font-weight': '100'
        },
        'graphset': [
          {
            'type': 'ring',
            'background-color': '#002d56',
            'tooltip': {
              'visible': 0
            },
            'plotarea': {
              'margin': '3% 3% 3% 3%'
            },
            'plot': {
              'slice': 155,
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
                'text': `<span style='font-size:30px;'>You've spent</span><br><span>£${totalCost.toFixed(2)}</span><br><span style='font-size:20px;'>You've got £${$rootScope.remainder.toFixed(2)} left</span>`,
                'rules': [
                  {
                    'rule': '%v > 50',
                    visible: false
                  }
                ],
                'font-color': 'white',
                'font-weight': 'bold',
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
            'series': seriesConfig
          }
        ]

      };


    }
  });//something done to change the <strong> element into a text input
}

export default DashboardCtrl;
