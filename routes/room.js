var express = require('express');
var router = express.Router();
var path=require('path');
var Rooms = require('../models/room');
var User = require('../models/users');
var mongoose = require('mongoose');
/* GET home page. */
router.get('/:roomname/joinroom',function(req,res,next){
  User.findById(req.session.user.id,function(err,user){
    //Find the user in the user database
    if(err){
      console.log(err);
      res.status=500;
      res.send("There was some error");
    }else{
      var userobj = {
        id : user._id,
        name : user.username
      };
      //User found now update the room
      Rooms.update({name:req.params.roomname},{ $addToSet: { "members": userobj }}, function(err) {
          if(err){
            console.log(err);
            res.status=500;
            res.send("There was some error");
          }else{
            //User joined the room..now serve the room page
            console.log("User joined that room");
            //res.status=200;
            res.redirect('/room/'+req.params.roomname);
          }
      });
    }
  });
});

router.get('/:roomname/roomdata',function(req,res,next){
  Rooms.findOne({name : req.params.roomname},function(err,room){
    if(err){
      res.status=500;
      res.send("There was some error");
    }else{
      //If room is found
      if(room){
        res.status=200;
        res.send(room);
      }else{
        //Room not found
        res.status=200;
        res.send("There is no such room !");
      }
    }
  });
});
router.get('/:roomname/leaveroom',function(req,res,next){
  Rooms.findOne({name : req.params.roomname},function(err,room){
    if(err){
      res.status=500;
      res.send("There was some error");
    }else{
      //If room is found
      if(room){
        var userid  = mongoose.Types.ObjectId(req.session.user.id);
        Rooms.update({name:room.name},{ $pull: { "members": {"id" : userid} }}, function(err,n) {
            if(err){
              console.log(err);
              res.status=500;
              res.send("There was some error");
            }else{
              //User joined the room..now serve the room page
              console.log(n);
              console.log("User left that room");
              //res.status=200;
              res.redirect('/dashboard');
            }
        });
      }else{
        //Room not found
        res.status=200;
        res.redirect('/dashboard');
      }
    }
  });
});
router.get('/:roomname',function(req,res,next){
  console.log(req.params.roomname + " Called");
  //Find the given room
  Rooms.findOne({name : req.params.roomname},function(err,room){
    if(err){
      res.status=500;
      res.send("There was some error");
    }else{
      //If room is found
      if(room){
        console.log(room);
        var ispresent=false;
        //Check if the logged in user is present in the room
        for(var i=0;i<room.members.length;i++){
          //console.log("Comparing "+room.members[i].id+" and "+ req.session.user.id);
          if(room.members[i].id == req.session.user.id){
            ispresent = true;break;
          }
        }
        //If present , then simply serve the room page
        if(ispresent){
          console.log("User already present in the room");
          res.sendFile(path.resolve(__dirname+'/../public/room.html'));
        }
        else{
          //Otherwise join that room
          console.log("User not present in the room tryin to join");
          res.redirect('/room/'+req.params.roomname+'/joinroom');
        }
      }else{
        //Room not found
        res.status=200;
        res.send("There is no such room !");
      }
    }
  });
});

router.get('/', function(req, res, next) {
  res.sendFile(__dirname+'/../public/index.html');
});
module.exports = router;
