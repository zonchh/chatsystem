// deleting a user

module.exports = function(db, app) {
    app.post('api/deleteUsers', function (req, res) {
        const collection = db.collection("users");

        user = req.body.deleteUsername

        //find user in collection and delete
        collection.deleteOne({ username: user })
        res.send(true);
    });
}