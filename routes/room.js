var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var User = require('../models/users');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
router.post('/createRoom', function(req,res,next){
  User.findById(req.body.user.id,function(err,user){
    if(err){
      console.log(err);
      res.status=500;
      res.send("There was some error");
    }else{
      var createRoom = new Room({
        name:req.body.name,
        createdBy:user,
        $addToSet: { "members": user }
      });
      createRoom.save(function (err, room) {
          var msg;
          if (err){
            console.log(err);
            res.status = 502;
            msg=err;
          }else{
            res.status = 200;
            msg="Done !";
          }
          res.send(msg);
        });
    }
  });
});
router.post('/getRooms',function(req,res,next){
  Room.find({},function(err,docs){
    console.log(docs);
    if(err){
      res.status=500;
      res.send("There was some problem !");
    }else{
      for(var i=0;i<docs.length;i++){
        var id = docs[i].createdBy;
        var name;
        User.findById(id).exec(function(err,userobj){
          console.log("Step 1");
          if(err){
            res.status=500;
            res.send("Room problem");
          }else{
            console.log("Step 2");
            name=userobj.username;
            docs[i].createdBy=name;
          }
        }.bind(this));
      }
      res.send(docs);
    }
  });
});
router.post('/joinroom',function(req,res,next){
  User.findById(req.body.user.id,function(err,user){
    if(err){
      console.log(err);
      res.status=500;
      res.send("There was some error");
    }else{
      Room.update({name:req.body.roomname},{ $addToSet: { "members": user }}, function(err, room) {
          if(err){
            console.log(err);
            res.status=500;
            res.send("There was some error");
          }else{
            res.status=200;
            res.send("Joined room " + room.name);
          }
      });
    }
  });
});
module.exports = router;
