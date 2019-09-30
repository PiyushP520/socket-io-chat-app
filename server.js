const express = require('express');
const app = express();
var http = require('http');
var path = require('path');

app.set('port', 3000);

var server = http.Server(app);
var io = require('socket.io').listen(server);

app.use('/app', function (req, res, next) {
    res.send("Hello Socket IO");
});

app.use('/', express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) => {
    res.sendFile(__dirname, 'dist', 'index.html');
});

io.on('connection', function (socket) {
    console.log('new connection is made');
    socket.on('join', function (data) {
        socket.join(data.room);
        io.in(data.room).emit('greeting', { user: data.name, message: "has joined this room..." });
    })

    socket.on('sendMsg', function (data) {
        io.in(data.room).emit('receiveMsg', { user: data.name, message: data.msg });
    })

    socket.on('leave', function (data) {
        console.log(data.msg);
        io.in(data.room).emit('left room', { user: data.name, message: "has left the room" });
        socket.leave(data.room);
    })
});

server.listen(3000, function () {
    console.log("server running on port 3000");
});