const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const PORT = 3000;
const app = express();
app.use(express.static(join(__dirname, '/public')));
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }),
);
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/public', 'index.html'));
});
const server = createServer(app);
const io = new Server(server);

let readyPlayerCount = 0;

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('ready', () => {
    console.log('Player ready', socket.id);
    readyPlayerCount++;
    if (readyPlayerCount === 2) {
      io.emit('startGame', socket.id);
    }
  });
  socket.on('paddleMove', (paddleData) => {
    socket.broadcast.emit('paddleMove', paddleData);
  });
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
