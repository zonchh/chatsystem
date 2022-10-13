// add a channel to groups

module.exports = function(db, app) {
    app.post('/api/addChannels', function (req, res) {
        const collection = db.collection("groups");

        groupname = req.body.inputGroup;
        channelname = req.body.inputChannel;

        //check if channel exists
        collection.find({ "name": groupname, "channels": { $elemMatch: { $in: [ channelname ] } } }).count((err, count) => {
            //if channel doesn't exist, add to database
            if (count === 0) {
                collection.findOneAndUpdate({ "name": groupname }, { $push: { "channels": channelname }});
                res.send(true);
            } else {
                res.send(false);
            }
        });
    });
}