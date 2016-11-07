app.service('postsService', function($http) {
 return {
  getPosts: function() {
   return $http.get('/api/posts').then(function(data) {
    return data.data;
   })
  },
  newPost: function(post) {
   return $http.post('/api/newpost', post).then(function(response) {
    return response.data
   })
  },
  editPost: function(post_id, user_id) {
   return $http.post
  }
 }
})
app.service('authService', function($http, $location) {
 return {
  signup: function(userObj) {
   return $http.post('/api/signup', userObj).then(function(data) {
    $location.path('/posts');
   })
  },
  login: function(userObj) {
   return $http.post('/api/login', userObj).then(function(response) {
    $location.path('/posts');
   })
  }
 }
})
app.service('cookieService', function($cookies) {
 return {
  decodeCookies: function(cookie) {
   return JSON.parse(atob(cookie)).userInfo.id;
  }
 }
})
