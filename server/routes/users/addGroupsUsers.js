// adding a user to a group

module.exports = function(db, app) {
    app.post("api/addGroupsUsers", function (req, res) {
        const collection = db.collection("users");

        newgroup = {};
        newgroup.name = req.body.inviteGroupName;
        newgroup.channels = [];
        username = req.body.inviteGroupUsername

        // search through users collection and update document with matching username
        collection.findOneAndUpdate( { username: username }, { $push: { groups: newgroup } }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.send(data);
            }
        })
    });
}