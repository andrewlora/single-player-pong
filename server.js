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

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
