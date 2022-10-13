// retrieve all users

module.exports = function(db, app) {
    app.get('/api/getUser', (req, res) => {
        const collection = db.collection("users");

        // search users collection, return all documents
        collection.find({}).toArray((err, data) => {
            res.send(data);
        })
    })
}