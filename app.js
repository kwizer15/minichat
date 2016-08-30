const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io').listen(httpServer);
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public.src'));

io.on('connection', (socket) => {
  socket.on('newUser', (data) => {
    socket.broadcast.emit('preventNewUser', {username: data});
  });
  socket.on('sendMsg', (data) => {
    io.sockets.emit('receiveMsg', data);
  });
});

httpServer.listen(5236, () => {
  console.log("Listening on " + 5236);
});
