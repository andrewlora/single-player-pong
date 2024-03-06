let readyPlayerCount = 0;
function listen(io) {
  const pongNamespace = io.of('/pong');
  pongNamespace.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    let room;
    socket.on('ready', () => {
      room = 'room' + Math.floor(readyPlayerCount / 2);
      socket.join(room);
      console.log(`Player ready ${socket.id} into a room ${room}`);
      readyPlayerCount++;
      if (readyPlayerCount % 2 === 0) {
        pongNamespace.in(room).emit('startGame', socket.id); // to all connected clients
      }
    });
    socket.on('paddleMove', (paddleData) => {
      // socket.broadcast.emit('paddleMove', paddleData); // except the sender
      socket.to(room).emit('paddleMove', paddleData); // except the sender into the room
    });
    socket.on('ballMove', (ballData) => {
      // socket.broadcast.emit('ballMove', ballData); // except the sender
      socket.to(room).emit('ballMove', ballData); // except the sender into the room
    });
    socket.on('disconnect', (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`);
      socket.leave(room);
    });
  });
}

module.exports = {
  listen,
};
