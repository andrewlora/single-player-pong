const { createServer } = require('node:http');
const { Server } = require('socket.io');
const sockets = require('./sockets');
const apiServer = require('./api');
const PORT = 3000;
const httpServer = createServer(apiServer);
const socketServer = new Server(httpServer);

httpServer.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

sockets.listen(socketServer);
