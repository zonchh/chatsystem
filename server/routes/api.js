var fs = require('fs');

module.exports = function(req, res) {
    fs.readFile("G:/Uni/Year 4 Tri 2/Software Frameworks/Assignment/chat/server/data/users.json", "utf-8", (err, jsonString) => {
        var user = {};

        user.username = req.body.inputUsername;
        user.valid = null;

        console.log(user);

        if (err) {
            console.log("Error:", err);
            return;
        }
        try {
            var userArray = JSON.parse(jsonString);
            for (i = 0; i < userArray.length; i++) {
                console.log(userArray.userName)
                console.log(user.username);
                if (user.username === userArray[i].userName) {
                    user.valid = true;
                    user.role = userArray[i].role;
                    user.email = userArray[i].email;
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
};