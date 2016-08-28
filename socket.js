
module.exports = {
  addsockets : function(io){
    io.on('connection',function(socket){
      console.log("A user connected");
    });
    return io;
  }
};
