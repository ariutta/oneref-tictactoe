var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/public'));

function extractSharablePlayerData(player) {
  return {
    id: player.id,
    picture: player.picture,
    name: player.name,
    wins: player.wins,
    draws: player.draws,
    losses: player.losses
  };
}

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var currentGame = {};
io.sockets.on('connection', function(socket) {
  socket.on('invite', function(inviter) {
    const socketId = socket.id;
    inviter.id = socketId;
    //inviter.socketId = socket.id;
    currentGame.inviter = inviter;
    console.log('inviter');
    console.log(inviter);
    socket.broadcast.emit('invite', extractSharablePlayerData(inviter));
  });
  socket.on('accept', function(invitee) {
    const socketId = socket.id;
    invitee.id = socketId;
    /*
    invitee.socketId = socketId;
    if (!invitee.id) {
      invitee.id = socketId;
    } else if (invitee.id === currentGame.inviter.id) {
      console.log('Why are you playing against yourself?');
      invitee.id += socketId;
    }
    //*/
    currentGame.invitee = invitee;
    console.log('invitee');
    console.log(invitee);
    socket.broadcast.emit('accept', extractSharablePlayerData(invitee));
  });
  socket.on('move', function(data) {
    console.log('move');
    console.log(data);
    console.log('with id');
    console.log(socket.id);
    socket.broadcast.emit('move', data);
  });
});
server.listen(8080);
