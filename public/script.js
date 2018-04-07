const socket = io();

$('form').submit(() => {
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});
socket.on('chat message', msg => {
  $('#messages').append($('<li>').text(msg));
});

$('#m').on('keyup', () => {
  if($('#messages').find('li').last().text() !== 'User is Typing Something Cool!') {
    socket.emit('typing', 'User is Typing Something Cool!')
  }
});

socket.on('typing', message => {
  $('#messages').append($('<li>').text(message));
});
