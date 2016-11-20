app.service('postsService', function($http) {
 return {
  getPosts: function() {
   return $http.get('/api/posts').then(function(data) {
    return data.data;
   })
  },
  createPost: function(post) {
   return $http.post('/api/newpost', post).then(function(response) {
    return response.data
   })
  },
  editPost: function(id, title, desc, img) {
   var reqObj = {
    id: id,
    title: title,
    desc: desc,
    img: img
   };
   return $http.post('/api/editpost', reqObj).then(function(response) {
    return response.data;
   })
  },
  deletePost: function(id) {
   var reqObj = {
    id: id
   };
   return $http.post('/api/delpost', reqObj).then(function(response) {
    return response.data;
   })
 },
 changeVotes: function(num, id) {
   var reqObj = {num: num, id: id};
   return $http.post('/api/changeVote', reqObj).then(function(response){
     return response.data;
   })
 }
 }
})
app.service('commentsService', function($http) {
 return {
  getPosts: function() {
   return $http.get('/api/posts').then(function(data) {
    return data.data;
   })
  },
  createPost: function(post) {
   return $http.post('/api/newpost', post).then(function(response) {
    return response.data
   })
  },
  editPost: function(id, title, desc, img) {
   var reqObj = {
    id: id,
    title: title,
    desc: desc,
    img: img
   };
   return $http.post('/api/editpost', reqObj).then(function(response) {
    return response.data;
   })
  },
  deletePost: function(id) {
   var reqObj = {
    id: id
   };
   return $http.post('/api/delpost', reqObj).then(function(response) {
    return response.data;
   })
 },
 changeVotes: function(num, id) {
   var reqObj = {num: num, id: id};
   return $http.post('/api/changeVote', reqObj).then(function(response){
     return response.data;
   })
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
   return JSON.parse(atob(cookie)).userInfo.username;
  }
 }
})
