function GoalsIndexCtrl($scope, $http, $rootScope) {
  const userGoals = [];
  // const progressArray = [];
  // let progressIndex = -1;

  $http({
    method: 'GET',
    url: '/api/goals'
  })
    .then(res => {

      res.data.forEach(goal => {
        if(goal.createdBy._id === $rootScope.user._id) {
          goal.progress = parseFloat((goal.alreadySaved/goal.cost)*100).toFixed(2);
          userGoals.push(goal);
        }
        console.log('Saved is',goal.alreadySaved );
        console.log(' Cost is', goal.cost);
      });

      console.log('User goal is ===>', userGoals);
      $scope.goals = userGoals;
    });

}


export default GoalsIndexCtrl;
