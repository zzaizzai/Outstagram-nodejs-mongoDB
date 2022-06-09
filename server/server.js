const express = require('express');
const path = require('path');
const app = express();

const flash = require('connect-flash');
app.use(flash());


app.use(express.json());
var cors = require('cors');
app.use(cors());



const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://junsaiadmin:password1234@cluster0.akash.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, function (error, client) {
    if (error) { return console.log(error) }
    db = client.db('vue')
    app.listen(3000, function () {
        console.log('listening on 3000')
    })

})

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')

app.use(session({ secret: 'secretcode', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//Login

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), function (req, res) {
    req.session.save(function () {
        let user = {
            _id: req.user._id,
            displayName: req.user.displayName,
            id: req.user.id,
            content: req.user.content,
            profileUrl: req.user.profileUrl,
            role: req.user.role,
        }
        res.json({ user: user })
    })
})

function checklogin(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.redirect('/')
    }
}

app.get('/logout', function (req, res) {
    req.logout();
});

//check id and pw
passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
}, function (inputedID, inputedPW, done) {
    console.log(inputedID, inputedPW);
    db.collection('users').findOne({ id: inputedID }, function (error, result) {
        if (error) return done(error)
        if (!result) return done(null, false, { message: 'wrong ID' })
        if (inputedPW == result.pw) {
            return done(null, result)
        } else {
            return done(null, false, { message: 'wrong password' })
        }
    })
}));

passport.serializeUser(function (user, done) {
    console.log(user.id)
    done(null, user.id)
})

passport.deserializeUser(function (ID, done) {
    db.collection('users').findOne({ id: ID }, function (error, result) {
        console.log("passport2")
        done(null, result)
    })
})

app.post('/register', function (req, res) {
    var inputData =
    {
        displayName: req.body.displayName,
        id: req.body.id,
        pw: req.body.pw,
        content: "About Me",
        profileUrl: "none",
        role: 'normal',
        joinDate: new Date(),
    }

    db.collection('users').findOne({ id: inputData.id }, function (error, result) {
        console.log(result)
        if (result != null) {
            res.json({ error: 'This ID already exists' })
        } else {
            db.collection('users').insertOne(inputData, function (error2, result2) {
                //add check wether login ID exist already
                res.json({ success: 'Created Account' })
            })
        }
    })

})





app.post('/getposts', function (req, res) {
    console.log(req.body.postCount)
    db.collection('posts').find().limit(2).skip(req.body.postCount).sort({ "date": -1 }).toArray(function (error, result) {
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

app.use('/', express.static(path.join(__dirname, './../dist')))



