const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://127.0.0.1:5500'], // Allow both origins
      methods: ['GET', 'POST']
    }
  });
  
  app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'], // Allow both origins
    methods: ['GET', 'POST']
  }));
app.use(bodyParser.json());

app.post('/api/sendMessage', (req, res) => {
  const { message } = req.body;
  io.emit('message', { sender: 'User', message });
  res.json({ reply: 'This is an automated reply from the admin.' }); // You can replace this with actual logic
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (msg) => {
    console.log(msg, 32)
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
