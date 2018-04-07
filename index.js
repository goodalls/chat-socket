const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(request, response){
  response.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket)=>{
  console.log('a user connected');

  socket.on('disconnect', ()=>{
    console.log('user disconnected');
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('typing', (message) => {
    console.log(message);
    io.emit('typing', message);
  })

});

http.listen(3000, ()=>{
  console.log('listening on *:3000');
});