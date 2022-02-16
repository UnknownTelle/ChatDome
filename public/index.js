const sendMessage = document.getElementById('send_message');
const output = document.getElementById('output');
const roomName = document.getElementById('room_name');
const leaveRoom = document.getElementById('leave_room');

// getting the url data
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('name');
const room = urlParams.get('room');

const socket = io();

// join a room
socket.emit('joinRoom', {username, room});
// set room name
socket.on('RoomName', ({room}) => {
    sendRoomName(room);
})

// Gets messages from the server
socket.on('message', message => {
    showMessage(message);
    output.scrollTop = output.scrollHeight; // auto scroll
})

// Sends user message to the server
sendMessage.addEventListener('submit', (event) => {
    event.preventDefault();
    const msg = event.target.elements.message.value;
    socket.emit('sendMessage', msg);
    event.target.elements.message.value = '';
})

// Outputs messages to HTML
const showMessage = (message) => {
    output.innerHTML += '<p><b>' + message.username + ': </b>' + message.meg + '</p>';
}
// Sets room name
const sendRoomName = (room) => {
    roomName.innerText = 'ChatDome | ' + room;
}

// leave room button
leaveRoom.addEventListener('submit', () => {
    window.location = 'public\index.html'
})