const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const Post = require("../models/post");

chai.use(chaiHttp);

describe("site", () => {
  // Describe what you are testing
  it("Should have home page", done => {
    // Describe what should happen
    // In this case we test that the home page loads
    chai
      .request("localhost:3000")
      .get("/")
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.status.should.be.equal(200);
        return done(); // Call done if the test completed successfully.
      });
  });
});

describe("Posts", () => {
  it("should create with valid attributes at POST /posts", done => {

      var post = { title: "post title", url: "https://www.google.com", summary: "post summary" };

  Post.findOneAndRemove(post, function() {
    Post.find(function(err, posts) {
      var postCount = posts.count;
      chai
        .request("localhost:3000")
        .post("/posts")
        .send(post)
        .then(res => {
          Post.find(function(err, posts) {
            postCount.should.be.equal(posts.length + 1);
            res.should.have.status(200);
            return done();
          });
        })
        .catch(err => {
          return done(err);
        });
    });
  });
  });
});
