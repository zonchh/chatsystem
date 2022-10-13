// for deleting a group

module.exports = function(db, app) {
    app.post('/api/deleteGroups', function (req, res) {
        const groupscollection = db.collection("groups");
        const userscollection = db.collection("users");

        group = req.body.deleteGroupName;

        // search through groups collection for matching group name and delete
        groupscollection.deleteOne({ name: group }, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                console.log("Group Deleted");
            }
        })

        // search through users collection and remove matching group name
        userscollection.findOneAndUpdate({}, { $pull: { "groups": { name: group } } }, (err, data) => {
            if (err) {
                console.log(err);
            }
        })
        res.send(true);
    });
}