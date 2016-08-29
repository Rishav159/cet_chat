var express = require('express');
var router = express.Router();

var User = require('../models/room');
router.post('/createRoom', function(req,res,next){
  console.log("Create room called");
  var createRoom = new Room({
    name:req.body.name,
    createdBy:req.session.user.id,
    members:[req.session.user.id]
  })
  createRoom.save(function (err, user) {
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
});
