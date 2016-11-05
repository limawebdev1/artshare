app.service('postsService', function($http){
  return {
    getPosts: function(){
      return $http.get('/api/posts').then(function(data){
        return data.data;
      })
    },
    newPost: function(post){
      return $http.post('/api/newpost', post).then(function(response){
        return response.data
      })
    }
  }
})
