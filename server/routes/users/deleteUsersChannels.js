// delete user from a channel

module.exports = function(db, app) {
    app.post('/api/deleteUsersChannels', function (req, res) {
        const collection = db.collection("users");

        user = req.body.removeChannelUsername;
        group = req.body.removeChannelGroupName;
        channel = req.body.removeChannelFromUser;

        // search through users collection and remove channel from document with matching username
        collection.findOneAndUpdate({ username: user, "groups.name": group }, { $pull: { "groups.$.channels": channel } }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.send(data);
            }
        })
    });
}