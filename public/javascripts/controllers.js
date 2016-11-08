app.controller('main', function($scope, $cookies, postsService, cookieService) {
  $scope.vm = {};
  postsService.getPosts().then((data) => {
    $scope.vm.posts = data;
  })
  $scope.cookies = $cookies.getAll();
  $scope.$watch('cookies', function(){
    if($cookies.getAll().artshare){
      $scope.$emit('cookiesDetected')
    }
  })
  $scope.$on('cookiesDetected', function(){
    $scope.username = cookieService.decodeCookies($cookies.get('artshare'));
  })
  $scope.editPost = function(id, title, desc, img){
    postsService.editPost(id, title, desc, img).then(function(response){});
  };
  $scope.logout = function(){
    $cookies.remove('artshare')
    $cookies.remove('artshare.sig')
    $scope.username = null
  }
})

app.controller('auth', function($scope, $cookieStore, authService){
  $scope.login = (userObj) => {
    authService.login(userObj).then(function(response){});
  };
  $scope.signup = (userObj) => {
    authService.signup(userObj).then(function(response){});
  }
})
