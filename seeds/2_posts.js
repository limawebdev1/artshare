exports.seed = function(knex) {
 return knex('posts').del()
  .then(() => {
   return knex('posts').insert([{
    user_id: 1,
    title: 'Super hardcore skull drawing',
    description: `Look at its anatomical precision. I didn't even search for an image and I sketched this badass skull. Just in time for Halloween. #inspired #spooktacular #blessed`,
    votes: 2,
    img: '../images/skull.jpg'
   }, {
    user_id: 2,
    title: 'Lily Pads by Monet',
    description: `Oops...told my friend Lisa that this was by Picasso, but it's actually by Monet like in the Titanic. Like Lisa said, there's absolutely nothing geometric about this. But yeah...it's my favorite.`,
    votes: 30,
    img: 'https://fpsbutest.files.wordpress.com/2012/12/tumblr_m5vezabvga1rwb7i1o1_500.jpg'
   }, {
    user_id: 3,
    title: 'Loose Lips',
    description: 'This is by one of my favorite artists, David Choe. I like how that large piece on the side of her face/back of her head kind of looks like a controller but also like a stereo.',
    votes: 49,
    img: '../images/choe.jpg'
   }, {
    user_id: 5,
    title: 'I am a work of art.',
    description: 'The title says it all...really...I am a work of art. Loook at my majestic stance. I am a king.',
    votes: 4,
    img: '../images/bens.jpg'
   }, {
    user_id: 4,
    title: 'Mountainscape on woman',
    description: `This is a piece of artwork by Mimi Kvinge. I really like how she uses watercolor in this piece. I almost missed the woman that's hidden in this the waves.`,
    votes: 10,
    img: '../images/kelsey.jpg'
   }, {
    user_id: 3,
    title: 'Two-faced',
    description: 'Made with pastel chalks. I meant to use the pastel chalks over the summer for a competition/chalk festival, but they ended up cancelling it, so I drew this instead.',
    votes: 5,
    img: '../images/thing.jpg'
   }, {
    user_id: 6,
    title: 'Dots to Lines Tattoo',
    description: `This is my favorite tattoo artist I've found I think. I really like his line work. It's very precise and abstract. But above all, it's siiicckkk.`,
    votes: 2,
    img: 'http://inflictinginktattoo.com/wp-content/uploads/2014/07/dot-to-lines-tattoos.png'
   }]);
  });
};
