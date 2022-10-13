// retrieve all groups

module.exports = function(db, app) {
    app.get('/api/getGroups', function (req, res) {
        const collection = db.collection("groups");

        // search through groups collection and retrieve all documents
        collection.find({}).toArray((err, groups) => {
            res.send(groups);
        })

    })
}