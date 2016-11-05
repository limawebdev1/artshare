app.controller('main', function($scope, postsService) {
  $scope.vm = {};
  console.log('getting to controller');
  postsService.getPosts().then((data) => {
    $scope.vm.posts = data;
  })
})

app.controller('auth', function($scope){
  //  $cookieStore, authService
})
