// add a user to a channel

module.exports = function(db, app) {
    app.post('/api/addUsersChannels', function (req, res) {
        const collection = db.collection("users");

        username = req.body.inviteUsername;
        group = req.body.inviteGroup;
        channel = req.body.inviteChannel;

        //check if channel exists in collection
        collection.find({ "username": username, "groups": { $elemMatch: { "name": group, "channels": channel } } }).count((err, count) => {
            if (err) {
                console.log(err);
            } else if (count === 0) {
                // take user inputs and update the channel with the matching record
                collection.findOneAndUpdate({ username: username, "groups.name": group }, { $push: {"groups.$.channels": channel }})
                res.send(true);
            } else {
                res.send(false);
            }
        })
    });
}