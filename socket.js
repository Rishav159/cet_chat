
module.exports = {
  addsockets : function(io){
    io.on('connection',function(socket){
      console.log("A user connected");
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
      socket.on('createRoom',function(room){
        console.log(room.name);
        socket.room = room;
        socket.id = 1;
        socket.name = "Rishi";
      });
      socket.on('joinRoom',function(room){
        console.log(socket.name + " wants to join "+room);
        socket.join(room);
        socket.room = room;
      });
      socket.on('leaveRoom',function(room){
        console.log(socket.name + " left room "+room);
        delete socket.room;
      });
      socket.on('sendMessage',function(message){
        console.log(socket.name+ " says " + message + " in room "+socket.room);
        var msg = {
          sender : socket.name,
          message : message
        }
        socket.sockets.in(socket.room).emit("chat",msg);
      });
    });
    return io;
  }
};
