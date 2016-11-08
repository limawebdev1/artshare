var express = require('express');
var router = express.Router();
const knex = require('../knex')
const bcrypt = require('bcrypt')

/* GET home page. */
router.get('/posts', function(req, res, next) {
  knex('posts')
    .innerJoin('users', 'posts.user_id', 'users.id')
    .select('posts.id as id', 'username', 'title', 'description', 'img', 'votes', 'user_id')
    .then((posts) => {
      res.send(posts);
    })
});

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

router.post('/delpost', (req, res, next) => {
  knex('posts')
    .where('id', req.body.id)
    .del()
    .then(
      knex('posts')
        .then((posts) => {
          console.log(posts);
          res.send(posts);
        })
    );
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
