var express = require('express');
var router = express.Router();
const knex = require('../knex')
const bcrypt = require('bcrypt')

/* GET home page. */
router.get('/posts', function(req, res, next) {
  knex('posts')
    .then((posts) => {
      res.send(posts);
    })
});

module.exports = router;
