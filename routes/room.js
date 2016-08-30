var express = require('express');
var router = express.Router();
var path=require('path');
var Rooms = require('../models/room');
/* GET home page. */
router.get('/:roomname',function(req,res,next){
  console.log(req.params.roomname + " Called");
  Rooms.find({name : req.params.roomname},function(err,room){
    if(err){
      res.status=500;
      res.send("There was some error");
    }else{
      if(room.length>0){
        console.log(room);
        res.sendFile(__dirname+'../public/room.html');
      }else{
        res.status=200;
        res.send("There is no such room !");
      }
    }
  });
});
router.get('/', function(req, res, next) {
  res.sendFile(__dirname+'../public/index.html');
});
module.exports = router;
