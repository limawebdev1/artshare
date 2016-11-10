app.controller('main', function($scope, $cookies, postsService, cookieService, $location) {
 $scope.view = false;
 $scope.vm = {};
 $scope.searchTxt = "";
 $scope.vm.add = false;
 $scope.vm.edit = false;
 $scope.type = 'date';
 $scope.hidePost = true;
 $scope.sDate = true;
 $scope.sVotes = false;
 $scope.sTitle = false;
 $scope.commentDisp = false;
 $scope.vm.posts = [];
 $scope.vm.allPosts = [];
 postsService.getPosts().then((data) => {
  $scope.vm.posts = data;
  $scope.vm.allPosts = data;
  $scope.sortBy('date');
 })
 $scope.$watch('searchTxt', function(val) {
  if (val == undefined) {
   val = '';
  }
  val = val.toLowerCase();
  $scope.vm.posts = $scope.vm.allPosts.filter(function(obj) {
   return obj.title.toLowerCase().indexOf(val) != -1 || obj.description.toLowerCase().indexOf(val) != -1;
  });
  $scope.sortBy($scope.type);
 });
 $scope.validate = function() {
  $scope.valid = true;
  if ($scope.title == undefined) {
   $scope.noTitle = true;
   $scope.valid = false;
  }
  if ($scope.img == undefined) {
   $scope.noImg = true;
   $scope.valid = false;
  }
  if ($scope.desc == undefined) {
   $scope.noDesc = true;
   $scope.valid = false;
  }
  if ($scope.valid == true) {
   var obj = {
    id: $scope.vm.posts.length+2,
    title: $scope.title,
    author: $scope.author,
    img: $scope.img,
    description: $scope.desc,
    votes:0
   };
   postsService.createPost(obj).then((response) => {
     $scope.vm.allPosts.push(obj);
     $scope.vm.posts.push(obj);
     $scope.sortBy($scope.type);
   })
   $scope.title = undefined;
   $scope.img = undefined;
   $scope.author = undefined;
   $scope.desc = undefined;
   $scope.newPost = false;
  }
 }
 $scope.sortBy = function(type) {
  if (type == 'date') {
   $scope.vm.posts = $scope.vm.posts.sort(function(obj1, obj2) {
    return obj2.id - obj1.id;
   });
   $scope.type = 'date'
  }
  if (type == 'votes') {
   $scope.vm.posts = $scope.vm.posts.sort(function(obj1, obj2) {
    return obj2.votes - obj1.votes;
   });
   $scope.type = 'votes'
  }
  if (type == 'title') {
   $scope.vm.posts = $scope.vm.posts.sort(function(obj1, obj2) {
    var nameA = obj1.title.toUpperCase();
    var nameB = obj2.title.toUpperCase();
    if (nameA < nameB) {
     return -1;
    }
    if (nameA > nameB) {
     return 1;
    }
    return 0;
   });
   $scope.type = 'title';
  }
 }

 $scope.cookies = $cookies.getAll();
 $scope.$watch('cookies', function() {
  if ($cookies.getAll().artshare) {
   $scope.$emit('cookiesDetected')
  }
 })
 $scope.$on('cookiesDetected', function() {
  $scope.username = cookieService.decodeCookies($cookies.get('artshare'));
 })
 $scope.editPost = function(id, title, desc, img) {
  postsService.editPost(id, title, desc, img).then(function(response) {});
 };
 $scope.deletePost = function(id) {
  postsService.deletePost(id).then(function(response) {
    $scope.vm.allPosts.forEach((post, i, arr) => {
      id == post.id ? arr.splice(i,1):null
    })
    $scope.vm.posts.forEach((post,i,arr) => {
      id == post.id ? arr.splice(i,1):null
    })
  });
 }
 $scope.logout = function() {
  $cookies.remove('artshare')
  $cookies.remove('artshare.sig')
  $scope.username = null
 }
})

app.controller('auth', function($scope, $cookieStore, authService) {
 $scope.login = (userObj) => {
  authService.login(userObj).then(function(response) {});
 };
 $scope.signup = (userObj) => {
  authService.signup(userObj).then(function(response) {});
 }
})
