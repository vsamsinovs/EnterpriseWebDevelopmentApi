require('babel-polyfill')

var supertest = require("supertest");
var app = require("./../server");
var should = require("should");



describe("posts API unit test", function () {
  this.timeout(120000);

  it("should return collection of JSON documents", function (done) {
    supertest(server)
      .get("/api/posts")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it("should add a post", function (done) {
    supertest(server)
      .post('/api/posts')
      .send({ name: "post 99", address: "123 Strand St" })
      .expect("Content-type", /json/)
      .expect(201)
      .end(function (err, res) {
        res.status.should.equal(201);
        res.body.should.have.property('_id');
        done();
      });
  });

  it("should delete post", function (done) {
    const superserver = supertest(server);
    superserver
      .get("/api/posts")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        const id = res.body[0]._id;
        superserver
          .delete("/api/posts/" + id)
          .expect("Content-type", /json/)
          .expect(200)
          .end(function (err, res) {
            res.body._id.should.equal(id);
            done();
          }
          );
      }
      );
  });


  it("should update post", function (done) {
    const superserver = supertest(server);
    superserver
      .get("/api/posts")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {

        const id = res.body[0]._id,
          name = res.body[0].name,
          address = res.body[0].address;

        superserver
          .put("/api/posts/" + id)
          .send({ name: name + 1, address: address + 1 })
          .expect("Content-type", /json/)
          .expect(200) // THis is HTTP response
          .end(function (err, res) {

            should.exist(res.body);
            res.status.should.equal(200);

            res.body.should.have.property('_id');
            res.body.name.should.equal(name + 1);
            res.body.address.should.equal(address + 1);
            done();
          });
      });
  });
});

