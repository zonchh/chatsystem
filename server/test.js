var chai = require("chai");

var chaiHttp = require("chai-http");

var should = chai.should();

chai.use(chaiHttp);

describe("Server test", () => {
    before(() => {
        console.log("Before the test")
    });
    after(() => {
        console.log("After the test")
    });
    
    // GET
    describe("/api/getUsers", () => {
        it("send user array if successful", () => {
            chai.request("http://localhost:3000")
                .get("/api/getUsers")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done();
                });
        });
    });
    
    // GET
    describe("/api/getGroups", () => {
        it("send groups array if successful", () => {
            chai.request("http://localhost:3000")
                .get("/api/getGroups")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    done();
                });
        });
    });

    // DELETE
    describe("/api/deleteGroups", () => {
        it("send true if successful", () => {
            chai
            .request("http://localhost:3000")
            .post("/api/deleteGroups")
            .send({ 
                deleteGroupName: "Food"
            })
            .end((err, res) => {
                res.body.should.be.a("boolean");
            })
        })
    })

    // ADD
    describe("/api/addUsers", () => {
        it("send true if successful", () => {
            chai
            .requst("http://localhost:3000")
            .post("/api/addUsers")
            .send({
                inputUsername: "new user",
                inputRole: "user",
                inputEmail: "email@email.com",
                inputPassword: "password"
            })
            .end((err, res) => {
                res.body.should.be.a("boolean")
            });
        });
    });

    // ADD
    describe("/api/addGroups", () => {
        it("send true if successful", () => {
            chai
            .request("http://localhost:3000")
            .post("/api/addGroups")
            .send({
                groupname: "new group"
            })
            .end((err, res) => {
                res.body.should.be.a("boolean");
            });
        })
    });

})