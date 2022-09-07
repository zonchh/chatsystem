var fs = require('fs');

module.exports = function(app, path) {

    // for matching credentials (logging in)
    app.post("/api/login", function(req, res) {
        fs.readFile("G:/Uni/Year 4 Tri 2/Software Frameworks/Assignment/chat/server/data/users.json", "utf-8", (err, jsonString) => {
            var user = {};

            user.username = req.body.inputUsername;
            user.valid = null;


            if (err) {
                console.log("Error:", err);
                return;
            }
            try {
                var data = JSON.parse(jsonString);
                for (i = 0; i < data.users.length; i++) {
                    if (user.username === data.users[i].username) {
                        user.valid = true;
                        user.role = data.users[i].role;
                        user.email = data.users[i].email;
                        break;
                    } else {
                        user.valid = false;
                    }
                }
                res.send(user);
            } catch (err) {
                console.log("Error parsing JSON String:", err);
            }
        });
    });

    // for adding a user
    app.post("/api/addUser", function (req, res) {
        fs.readFile("G:/Uni/Year 4 Tri 2/Software Frameworks/Assignment/chat/server/data/users.json", "utf-8", (err, jsonString) => {
            var user = {};

            valid = true;

            user.username = req.body.inputUsername;
            user.email = req.body.inputEmail;
            user.role = req.body.inputRole;

            if (err) {
                console.log("Error:", err);
                return;
            }
            try {
                var data = JSON.parse(jsonString);
                for(i = 0; i < data.users.length; i++) {
                    console.log(data.users[i].username);
                    if(user.username === data.users[i].username) {
                        console.log("User Already Exists");
                        valid = false;
                        break;
                    }
                }

                if(valid === true) {
                    data.users.push(user);
                    saveFile();
                }

                data.users.push(user);
                function saveFile() {
                    var entry = JSON.stringify(data);
                    fs.writeFile("G:/Uni/Year 4 Tri 2/Software Frameworks/Assignment/chat/server/data/users.json", entry, function(err) {
                        if(err) {
                            console.log(err);
                        }
                    });
                }
                res.send(valid)
            }
            catch (err) {
                console.log("Error:", err);
            }
        });
    });

    // for deleting a user
    app.post("/api/deleteUser", function (req, res) {
        fs.readFile("G:/Uni/Year 4 Tri 2/Software Frameworks/Assignment/chat/server/data/users.json", "utf-8", (err, jsonString) => {
        deleteUsername = req.body.deleteUsername;

        if (err) {
            console.log(err);
            return;
        }
        try {
            var data = JSON.parse(jsonString);
            for(i=0; i < data.users.length; i++) {
                if(deleteUsername === data.users[i].username) {
                    data.users.splice(i, 1);
                } 
            }
            var deleted = JSON.stringify(data);
            fs.writeFile("G:/Uni/Year 4 Tri 2/Software Frameworks/Assignment/chat/server/data/users.json", deleted, function(err) {
                if(err) {
                    console.log(err);
                }
            })
            res.send(true);
        }
        catch(err) {
            console.log("Error:", err);
        }

        });
    });

}