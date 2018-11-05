// export functions to server.js
//Controller handling post POST request w/the server
const Post = require('../models/post');


module.exports = app => {

//NEW
    //Create new DB object Called POST
    app.post("/posts/new", (req, res) => {
        // Instance of POST model
        const post = new Post(req.body);
        // Save the model in DB
        post.save((err, post) => {
            // redirect
            return res.redirect(`/`);
        })
        console.log(req.body);
    });


//SHOW
app.get("/posts/:id", function(req, res) {
  // LOOK UP THE POST
  Post.findById(req.params.id)
    .then(post => {
      res.render("post-show.hbs", { post });
    })
    .catch(err => {
      console.log(err.message);
    });
});

};
