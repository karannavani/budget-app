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
      }
    });
    console.log('spent array is', spentTodayArr);
    $scope.spentToday = spentTodayArr.reduce((a, b) => a + b, 0);
    console.log('spent today is', $scope.spentToday);

  }

  // $scope.myConfig = {
  //   type: 'hbar',
  //   backgroundColor : 'none',
  //   tooltip:{visible:false},
  //   scaleX : {
  //     lineColor : 'transparent',
  //     tick : {
  //       visible : false
  //     },
  //     labels : [ 'Dev', 'R&D', 'Testing'],
  //     item : {
  //       fontColor : '#e8e8e8',
  //       fontSize : 16
  //     }
  //   },
  //   scaleY :{
  //     visible : false,
  //     lineColor : 'transparent',
  //     guide : {
  //       visible : false
  //     },
  //     tick : {
  //       visible : false
  //     }
  //   },
  //   plotarea : {
  //     marginLeft : '80',
  //     marginTop : '30',
  //     marginBottom : '30'
  //   },
  //   plot : {
  //     stacked : true,
  //     barsSpaceLeft : '20px',
  //     barsSpaceRight : '20px',
  //     valueBox : {
  //       visible : true,
  //       text : '%v0%',
  //       fontColor : '#2A2B3A',
  //       fontSize: 14
  //     },
  //     tooltip : {
  //       borderWidth : 0,
  //       borderRadius : 2
  //     },
  //     animation:{
  //       effect:3,
  //       sequence:3,
  //       method:3
  //     }
  //   },
  //   series : [
  //     {
  //       values : [3,2,6],
  //       borderRadius : '50px 0px 0px 50px',
  //       backgroundColor : '#E71D36',
  //       rules : [
  //         {
  //           rule : '%i === 0',
  //           backgroundColor : '#E71D36'
  //         },
  //         {
  //           rule : '%i === 1',
  //           backgroundColor : '#2EC4B6'
  //         },
  //         {
  //           rule : '%i === 2',
  //           backgroundColor : '#FF9F1C'
  //         }
  //       ]
  //     },
  //     {
  //       values : [7,8,4],
  //       borderRadius : '0px 50px 50px 0px',
  //       backgroundColor : '#E71D36',
  //       //alpha : 0.8,
  //       rules : [
  //         {
  //           rule : '%i === 0',
  //           backgroundColor : '#e85d6f'
  //         },
  //         {
  //           rule : '%i === 1',
  //           backgroundColor : '#90eae2'
  //         },
  //         {
  //           rule : '%i === 2',
  //           backgroundColor : '#f7be70'
  //         }
  //       ]
  //     }
  //   ]
  // };


}

export default ProfileShowCtrl;
