const console = require('console');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socket = require('socket.io');
const router = express.Router();

const dbConnect = require('./config/dbConnect');
const Users = require('./models/userModel');
const Rooms = require('./models/roomModel');

const app = express();
const server = http.createServer(app)
const io = socket(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//connecting mongodb
mongoose.connect(dbConnect)
    .then(() => console.log('MongoDb is connected'))
    .catch((err) => console.log(err));

// socket connection
io.on('connection', socket => {
    console.log(socket.id);

    socket.on('joinRoom', async ({ username, room }) => {
        try { // finds room or will create it with an empty messages array
            let res = await Rooms.findOne({ "room": room });
            if (!res) {
                await Rooms.create({ 'room': room, messages: [{ username: String, message: String }] })
            }
        } catch (error) {
            console.log(error);
        }
        try { // Adds user to the Users collection
            let user = await Users.create(
                { 'id': socket.id, 'username': username, 'room': room });

            socket.join(user.room);
            socket.emit('message', formateMeg('Bot ', 'Welcome to ChatDome')); // welcome message
            socket.broadcast.to(user.room).emit('message', formateMeg('Bot', user.username + ' has joined')); //Broadcast new user connection
            io.to(user.room).emit('RoomName', { room: room }); //Place room title

        } catch (error) {
            console.log(error);
        }
    })

    // Called when client sends message to the server
    socket.on('sendMessage', async (message) => {
        try {
            let user = await Users.findOne({ 'id': socket.id });
            let res = await Rooms.findOneAndUpdate({ 'room': user.room }, {
                $push: {
                    messages: [{
                        username: user.username,
                        message: message
                    }]
                }
            }, { upsert: true });

            io.to(user.room).emit('message', formateMeg(user.username, message));
        } catch (err) {
            console.log(err);
        }
    })

    // Called when clean has disconected
    socket.on('disconnect', async () => {
        try {
            let user = await Users.findOne({ 'id': socket.id });
            if (user) {
                io.to(user.room).emit('message', formateMeg('Bot', user.username + ' has left'));
            }
        } catch (err) {
            console.log(err);
        }
    })

});

// routes
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})
app.get('/dome', async (req, res) => {
    res.sendFile(path.join(__dirname + '/public/dome.html'));
})

server.listen(3000, () => {
    console.log('server working on')
});

// Formate incoming messages
const formateMeg = (username, meg) => {
    return { username, meg }
}

const findMessages = async (socketId) => {
    try {
        let user = await Users.findOne({ 'id': socketId })
        let result = await Rooms.findOne({ 'room': user.room });
        //socket.emit('message', formateMeg(result.messages.username, result.messages.message));
        return result;
    } catch (err) { console.log(err); }
}