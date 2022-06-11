const express = require('express');
const path = require('path');
const app = express();
const { ObjectId } = require('mongodb')

// const http = require('http').createServer(app);
const { Server } = require("socket.io");
// const io = new Server(http);
app.use(express.json());

const cors = require('cors');
app.use(cors());

const flash = require('connect-flash');
app.use(flash());



//it takes 24hours to set socket setting
const http = require('http')
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        transports: ['websocket', 'polling'],
        methods: ["GET", "POST"],
        credentials: true,
    },
    allowEIO3: true
})



io.on('connection', (socket) => {
    console.log('soket on')

    socket.on('JOIN_ROOM', (chatroom) => {
        console.log('joined chatroom')
        socket.join(chatroom._id);
    })

    socket.on('ROOM_SEND', (message) => {
        console.log('emitted a message')
        // console.log(message)
        io.to(message.parentUid).emit('ROOM_MESSAGE', message)
    })

    // socket.on('SEND_MESSAGE', (data) => {
    //     console.log(data)
    //     io.emit('MESSAGE', data)
    // });

});




const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://junsaiadmin:password1234@cluster0.akash.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, function (error, client) {
    if (error) { return console.log(error) }
    db = client.db('vue')

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


app.post('/createchatroom', function (req, res) {
    // console.log(req.body.oponentUserData)
    // console.log(req.body.myUserData)
    let isChatRoomExist = false
    var chatData = {
        who: [req.body.oponentUserData.userName, req.body.myUserData.userName],
        whoUid: [req.body.oponentUserData.uid, req.body.myUserData.uid],
        date: new Date(),
        latestDate: new Date(),
    }
    db.collection('chatroom').find({ whoUid: req.body.myUserData.uid }).toArray().then((result) => {
        result.forEach(doc => {
            console.log(doc)

            //check chatroom whether exist or not
            if (doc.whoUid.includes(req.body.oponentUserData.uid) && doc.whoUid.includes(req.body.myUserData.uid) && (doc.whoUid[0] != doc.whoUid[1])) {
                isChatRoomExist = true
                console.log("chatroom with")


            } else if (doc.whoUid.includes(req.body.oponentUserData.uid) && doc.whoUid.includes(req.body.myUserData.uid) && (doc.whoUid[0] == doc.whoUid[1])) {
                isChatRoomExist = true
                console.log("chatroom with me exist")

            } else {

            }
        })
        console.log(isChatRoomExist)

        //if check is false, make new chatroom
        if (isChatRoomExist) {
            console.log('go to chatroom')
            res.json({ isChatRoomExist: isChatRoomExist })

        } else {
            console.log('create new chatroom')
            db.collection('chatroom').insertOne(chatData, (error, result) => {
                console.log(result)
                res.json({ isChatRoomExist: isChatRoomExist })
            })
        }
    })

})



app.post('/getchatroom', function (req, res) {
    // console.log(req.body.user)
    db.collection('chatroom').find({ whoUid: req.body.user.uid }).sort({ "latestDate": -1 }).toArray().then((result) => {
        res.json({ chatrooms: result })
    })
})
app.post('/getmessages', function (req, res) {
    // console.log(req.body.chatroom)
    db.collection('messages').find({ parentUid: req.body.chatroom._id }).sort({ "date": -1 }).toArray().then((result) => {
        // console.log(result)
        res.json({ messages: result })
    })
})


app.post('/sendmessage', function (req, res) {
    // console.log(req.body.message)
    db.collection('messages').insertOne(req.body.message, (error, result) => {
    })
    db.collection('chatroom').updateOne({ _id: ObjectId(req.body.message.parentUid) }, { $set: { 'latestDate': new Date()} }, (error2, result2) => {
        if (error2) { return console.log(error2) }
    })
    console.log('send message done')
})


app.use('/', express.static(path.join(__dirname, './../dist')))


server.listen(3000, function () {
    console.log('listening on 3000')
})