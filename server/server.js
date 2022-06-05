const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.get('/postdata', function(req, res){
    res.json({name: 'good'})
})