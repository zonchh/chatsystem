//deleting user from a group

module.exports = function(db, app) {
    app.post('api/deleteUsersGroups', function (req, res) {
        const collection = db.collection("users");

        user = req.body.deleteGroupFromUser;
        group = req.body.deleteGroupUserGroup;

        //find user in collection and delete
        collection.findOneAndUpdate({ username: user }, { $pull: { "groups": { name: group } }}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Deleted Successfully");
                res.send(data);
            }
        })
    });
}