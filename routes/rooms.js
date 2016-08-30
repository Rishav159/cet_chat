var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var User = require('../models/users');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
router.post('/createRoom', function(req,res,next){
  User.findById(req.session.user.id,function(err,user){
    if(err){
      console.log(err);
      res.status=500;
      res.send("There was some error");
    }else{
      var userobj = {
        id : user._id,
        name : user.username
      }
      //console.log(userobj);
      var createRoom = new Room({
        name:req.body.name,
        createdBy:userobj,
        members : new Array(userobj)
      });
      //console.log(createRoom);
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
      res.send(docs);
    }
  });
});

module.exports = router;
