// add a group to collection

module.exports = function(db, app) {
    app.post('/api/addGroups', function (req, res) {
        const collection = db.collection("groups");

        group = {}
        group.name = req.body.groupname;
        group.channels = [];
        group.group_assistant = [];

        //check if group exists
        collection.find({ name: group.name }).count((err, count) => {
            if (count === 0) {
                // insert group name, empty channel, and empty group assistant
                collection.insertOne(group);
                res.send(true);
            } else {
                res.send(false);
            }
        });
    });
}