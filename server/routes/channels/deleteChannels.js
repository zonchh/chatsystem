// delete a channel

module.exports = function(db, app) {
    app.post('/api/deleteChannels', function (req, res) {
        const groupcollection = db.collection("groups");
        const usercollection = db.collection("users");

        channel = req.body.deleteChannelName;
        group = req.body.deleteChannelGroupName;

        //check if channel exists and pull channel from group array
        groupcollection.findOneAndUpdate({ "name": group }, { $pull: { "channels": channel } }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Deleted Channel");
            }
        })

        // check if channel exists in users.groups and pull from the array
        usercollection.updateMany({ "groups.name": group }, { $pull: { "groups.$.channel": channel } }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Deleted Channel")
            }
        })
    });
}