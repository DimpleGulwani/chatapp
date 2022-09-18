// node server which will handle socket io connections

// header('Allow-Control-Allow-Origin: *')
// header('Allow-Control-Allow-Origin: POST,GET,OPTIONS.PUT,DELETE')
// header('Allow-Control-Allow-Origin: Content-Type,X-Auth-Token,Origin,Authorization')
const io = require('socket.io')(8080);
const users = {};

 io.on('connection', socket=>{
    //if any new user joins let other users connected to the server know
     socket.on('new-user-joined', username=>{
        
         users[socket.id] = username;
         //jis insaan ne join kiya usko chodkr sbko event emit krega ki user joined
         socket.broadcast.emit('user-joined', username);
     });
//if someone sends the memessage broadcast it to other ppl
     socket.on('send', message=>{
         socket.broadcast.emit('receive', {message: message, username: users[socket.id]})
     });
//if someone leaves the chat let other users know
     socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
    
 })