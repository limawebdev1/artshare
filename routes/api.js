var express = require('express');
var router = express.Router();
const knex = require('../knex')
const bcrypt = require('bcrypt')

/* GET home page. */
router.get('/posts', function(req, res, next) {
  knex('posts')
    .innerJoin('users', 'posts.user_id', 'users.id')
    .select('posts.id as id', 'username', 'title', 'description', 'img', 'votes', 'user_id', 'comments', 'updated_at')
    .then((posts) => {
      posts.sort(function(a, b){
        return a.id - b.id
      })
      knex('comments')
      .innerJoin('users', 'comments.user_id', 'users.id')
      .select('comments.id as id', 'username', 'description', 'post_id')
      .then((comments) => {
        for(var i = 0; i < comments.length; i++){
          var index = comments[i].post_id - 1;
          posts[index].comments.push(comments[i]);
        }
        res.json(posts);
      })
    })
});

router.post('/newpost', (req, res, next) => {
  knex('posts')
    .returning('*')
    .insert({
      title: req.body.title,
      user_id: req.session.userInfo.id,
      img: req.body.img,
      description: req.body.description,
      votes: 0,
      comments: []
    })
    .then((data1) => {
      knex('posts')
        .innerJoin('users', 'posts.user_id', 'users.id')
        .select('posts.id as id', 'username', 'title', 'description', 'img', 'votes', 'user_id', 'comments', 'updated_at')
        .then((posts) => {
          posts.sort(function(a, b){
            return a.id - b.id
          })
          knex('comments')
          .innerJoin('users', 'comments.user_id', 'users.id')
          .select('comments.id as id', 'username', 'description', 'post_id')
          .then((comments) => {
            comments.sort(function(a, b){
              return a.id - b.id
            })
            for(var i = 0; i < comments.length; i++){
              var index = comments[i].post_id - 1;
              posts[index].comments.push(comments[i]);
            }
            res.json(posts);
          })
        })
    });
})

router.post('/editpost', (req, res, next) => {
  knex('posts')
    .where('id', req.body.id)
    .returning('*')
    .update({
      title: req.body.title,
      description: req.body.desc,
      img: req.body.img
    })
    .then((post) => {
      res.send(post);
    })
})
router.post('/changeVote', (req, res, next) => {
  knex('posts')
    .where('id', req.body.id)
    .then((post) => {
      var postVotes = post[0].votes;
      knex('posts')
      .where('id', req.body.id)
      .returning('*')
      .update({
        votes: postVotes+req.body.num
      })
      .then((result) => {
        knex('posts')
          .innerJoin('users', 'posts.user_id', 'users.id')
          .select('posts.id as id', 'username', 'title', 'description', 'img', 'votes', 'user_id', 'comments', 'updated_at')
          .then((posts) => {
            posts.sort(function(a, b){
              return a.id - b.id
            })
            knex('comments')
            .innerJoin('users', 'comments.user_id', 'users.id')
            .select('comments.id as id', 'username', 'description', 'post_id')
            .then((comments) => {
              for(var i = 0; i < comments.length; i++){
                var index = comments[i].post_id - 1;
                posts[index].comments.push(comments[i]);
              }
              res.json(posts);
            })
          })
      })
    })
})

router.post('/delpost', (req, res, next) => {
  knex('posts')
    .where('id', req.body.id)
    .del()
    .then(
      (posts) => {
        knex('posts')
          .then((posts1) => {
            res.send(posts1);
          })
      }
    );
})

router.post('/comment', (req, res, next) => {
  knex('users')
    .where('username', req.body.username)
    .then((user) => {
      var user_id = user[0].id;
      knex('comments')
        .insert({
          user_id: user_id,
          post_id: req.body.post_id,
          description: req.body.description
        })
        .then((comment) => {
          knex('posts')
            .innerJoin('users', 'posts.user_id', 'users.id')
            .select('posts.id as id', 'username', 'title', 'description', 'img', 'votes', 'user_id', 'comments', 'updated_at')
            .then((posts) => {
              posts.sort(function(a, b){
                return a.id - b.id
              })
              knex('comments')
              .innerJoin('users', 'comments.user_id', 'users.id')
              .select('comments.id as id', 'username', 'description', 'post_id')
              .then((comments) => {
                for(var i = 0; i < comments.length; i++){
                  var index = comments[i].post_id - 1;
                  posts[index].comments.push(comments[i]);
                }
                res.json(posts);
              })
            })
        })
    })
})
router.post('/editComment', (req, res, next) => {
  knex('comments')
    .where('id', req.body.id)
    .update({
      description: req.body.description
    })
    .then((comment) => {
      knex('posts')
        .innerJoin('users', 'posts.user_id', 'users.id')
        .select('posts.id as id', 'username', 'title', 'description', 'img', 'votes', 'user_id', 'comments', 'updated_at')
        .then((posts) => {
          posts.sort(function(a, b){
            return a.id - b.id
          })
          knex('comments')
          .innerJoin('users', 'comments.user_id', 'users.id')
          .select('comments.id as id', 'username', 'description', 'post_id')
          .then((comments) => {
            for(var i = 0; i < comments.length; i++){
              var index = comments[i].post_id - 1;
              posts[index].comments.push(comments[i]);
            }
            res.json(posts);
          })
        })
    })
})
router.post('/delComment', (req, res, next) => {
  console.log(req.body);
  knex('comments')
    .where('id', req.body.id)
    .del()
    .then((comment) => {
      knex('posts')
        .innerJoin('users', 'posts.user_id', 'users.id')
        .select('posts.id as id', 'username', 'title', 'description', 'img', 'votes', 'user_id', 'comments', 'updated_at')
        .then((posts) => {
          posts.sort(function(a, b){
            return a.id - b.id
          })
          knex('comments')
          .innerJoin('users', 'comments.user_id', 'users.id')
          .select('comments.id as id', 'username', 'description', 'post_id')
          .then((comments) => {
            for(var i = 0; i < comments.length; i++){
              var index = comments[i].post_id - 1;
              posts[index].comments.push(comments[i]);
            }
            res.json(posts);
          })
        })
    })
})
router.post('/signup', (req, res, next) => {
  knex('users')
  .where('username', req.body.username)
  .then((users) => {
    if(users.length === 0){
      knex('users')
      .returning('username')
      .insert({
        username: req.body.username,
        hashed_pw: bcrypt.hashSync(req.body.password, 12)
      })
      .then((user) => {
        delete user[0].hashed_pw;
        req.session.userInfo = user[0];
        res.send('User signed up!');
      })
    }else{
      console.log('user already exists');
    }
  })
})

router.post('/login', (req, res, next) => {
  knex('users')
    .where('username', req.body.username)
    .then((user) => {
      if(user.length === 0){
        console.log('not a user');
      }else{
        if(bcrypt.compareSync(req.body.password, user[0].hashed_pw)){
          delete user[0].hashed_pw;
          req.session.userInfo = user[0];
          res.send('User logged in');
        }else{
          console.log('Wrong password');
        }
      }
    })
})

module.exports = router;
