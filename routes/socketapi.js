const io = require( "socket.io" )();
const socketapi = {
    io: io
};

var userId=[];
 var username=[];

// Add your socket.io logic here!
io.on("connection", function( socket ) {
    socket.on('newUser',function(name){
        userId.push(socket.id);
         username.push(name);
         console.log(name)
        socket.broadcast.emit('userJoined', name)
    })  
    socket.on('msg',function(msg){
        const index =userId.indexOf(socket.id)
        // console.log(socket.id)
        username[index]
        console.log(username[index])
        // console.log(userId)
        socket.broadcast.emit('naya',{msg:msg,users:username[index]})
    
    })
    socket.on('disconnect', function (user) {
        const index=userId.indexOf(socket.id)
        socket.emit('disconnected',{user:username[index]});
        username.splice(index,1)
        userId.splice(index,1)
        
  
    });
  
});


// end of socket.io logic


module.exports = socketapi;