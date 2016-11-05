exports.seed = function(knex) {
 return knex('comments').del()
  .then(() => {
   return knex('comments').insert([{
    user_id: 3,
    post_id: 1,
    description: `It's honestly...not that hardcore...also, I hate #hashtags`
   }, {
    user_id: 1,
    post_id: 1,
    description: `Shut up Lisa. I was an art student. You don't know what you're talking about. #stop #art #blessed`
   }, {
    user_id: 2,
    post_id: 5,
    description: `That's so pretty!!!!!`
   }]);
  });
};
