let cost;
let type;
let merchant;

function ProfileShowCtrl($http, $scope, $state, $rootScope, $window) {
  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}`
  })
    .then(res => {
      console.log('Found a user', res.data);
      $scope.user = res.data;
    });

  // $rootScope.user.savingsArray.forEach
  $rootScope.mySavings = $rootScope.user.savingsArray.reduce( (accumulator, currentValue) => accumulator + currentValue, 0);
  console.log('my savings is', $rootScope.mySavings);

  $scope.goToLogin = function() {
    $window.open('/api/monzo', '_blank');
  };

  $scope.fetchMonzo = function() {
    $http({
      method: 'GET',
      url: '/api/transactions',
      skipAuthorization: true
    })
      .then(res => {
        console.log('transactions is', res.data);
        $scope.monzoTransactions = res.data;
        calculateSpending();
      });
    $http({
      method: 'GET',
      url: '/api/pots',
      skipAuthorization: true
    })
      .then(res => {
        console.log('pots is', res.data);
        $scope.monzoPots = res.data;
      });
    $http({
      method: 'GET',
      url: '/api/balance',
      skipAuthorization: true
    })
      .then(res => {
        console.log('balance is', res.data);
        $scope.monzoBalance = (res.data/100).toFixed(2);
      });

  };

  $scope.moveSavings = function(event) {
    $http({
      method: 'GET',
      url: '/api/movesavings',
      params: {
        amount: $scope.mySavings * 100,
        id: event.target.id
      },
      skipAuthorization: true
    })
      .then(res => {
        console.log('res is', res.data);
        $scope.monzoPots = res.data;
      });
  };

  function calculateSpending() {
    const spentTodayArr = [];
    $scope.monzoTransactions.forEach(transaction => {
      // console.log(Math.abs(transaction.amount/100).toFixed(2));
      if(transaction.scheme !== 'uk_retail_pot') {
        spentTodayArr.push(parseFloat(Math.abs(transaction.amount/100).toFixed(2)));
        cost = (parseFloat(Math.abs(transaction.amount/100).toFixed(2)));
        merchant = transaction.merchant.name;
        type = transaction.category;
        createExpense();
      }
    });
    console.log('spent array is', spentTodayArr);
    $scope.spentToday = spentTodayArr.reduce((a, b) => a + b, 0);
    console.log('spent today is', $scope.spentToday);

  }

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


}

export default ProfileShowCtrl;
