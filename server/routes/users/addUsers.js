// adding a user

module.exports = function(db, app) {
    app.post('api/addUsers', function (req, res) {
        const collection = db.collection("users");
        var inputUser = {}

        const valid = true;

        inputUser.username = req.body.username;
        inputUser.password = req.body.password;
        inputUser.email = req.body.email;
        inputUser.role = req.body.role;
        inputUser.groups = [{}]

        console.log(inputUser);

        //check if user exists
        collection.find({username: inputUser.username }).count((err, count) => {
            console.log(count);
            //if doesn't exist, add to database, if it does, don't add to database
            if (count == 0) {
                collection.insertOne(inputUser);
                res.send(true);
            } else {
                res.send(false);
            }
        })

    });
}