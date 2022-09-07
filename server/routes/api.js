var fs = require('fs');

module.exports = function(app, path) {
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
                for (i = 0; i < data.length; i++) {
                    if (user.username === data[i].userName) {
                        user.valid = true;
                        user.role = data[i].role;
                        user.email = data[i].email;
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
                for(i = 0; i < data.length; i++) {
                    console.log(data[i].userName);
                    if(user.username === data[i].username) {
                        console.log("User Already Exists");
                        valid = false;
                        break;
                    }
                }

                if(valid === true) {
                    data.push(user);
                    saveFile();
                }

                data.push(user);
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
    })
}