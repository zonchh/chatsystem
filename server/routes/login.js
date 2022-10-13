// login function -> look for user record with matching username and password inputted

module.exports = function(db, app) {
    app.post('/api/login', function (req, res) {
        const collections = db.collection('users');

        var user = {};

        username = req.body.inputUsername;
        password = req.body.inputPassword;

        user.valid = null;

        db.collection('users').find().toArray((err, users) => {
            var inputUsers = {};

            inputUsers.username = req.body.inputUsername
            inputUsers.password = req.body.inputPassword
            inputUsers.valid = null;

            try {
                for (i = 0; i < users.length; i++) {
                    if (inputUsers.username === users[i].username && inputUsers.password === users[i].password) {
                        inputUsers.valid = true;
                        inputUsers.role = users[i].role;
                        inputUsers.email = users[i].email;
                        break;
                    } else {
                        inputUsers.valid = false;
                    }
                }
            } catch (err) {
                console.log(users);
                console.log("Error:", err);
            }
            res.send(inputUsers);
        })
    })
}