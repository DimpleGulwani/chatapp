
//connects with nodeserver

const socket = io('http://localhost:8080');
//get dom elememnts on js server
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')

//audio that will p[lay on recievong message
var audio= new Audio('notification.mp3');



//funxction that will append event to the container
const append=(message,position)=>{

    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    if(position=='left')
    {
        audio.play();
    }
}
form.addEventListener('submit', (e)=>{
    //prevents reloading
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})


//ask new user name and let the server know
const username = prompt("Enter your name to join WeChat")
socket.emit('new-user-joined', username)

//if new user joins recieve the events from the server
socket.on('user-joined', username=>{
    append(`${username} joined the chat`, 'right');
})

//if server sends a message recieve it
socket.on('receive', data=>{
    append(`${data.username }: ${data.message}`, 'left')
})
//if user leaves the chat append the info to the container
socket.on('left', username=>{
    append(`${username} left the chat`, 'right');
})