const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
var cors = require('cors');
app.use(cors());

const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://junsaiadmin:password1234@cluster0.akash.mongodb.net/?retryWrites=true&w=majority', function (error, client) {
    if (error) { return console.log(error) }
    db = client.db('vue')
    app.listen(3000, function () {
        console.log('listening on 3000')
    })

})



app.post('/getposts', function (req, res) {
    console.log(req.body.postCount)
    db.collection('posts').find().limit(1).skip(req.body.postCount).sort({ "date": -1 }).toArray(function (error, result) {
        console.log(result)
        res.json({ posts: result })

    })
})

app.post('/postdata', function (req, res) {
    console.log(req.body.name)
    res.json({ name: 'good' })

})
app.post('/uploadpost', function (req, res) {
    console.log(req.body.post)
    db.collection('posts').insertOne(req.body.post, (error, result) => {
        console.log('upload done')
    })

})