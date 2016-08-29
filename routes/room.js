var express = require('express');
var router = express.Router();

var User = require('../models/room');
router.post('/createRoom', function(req,res,next){
  console.log("Create room called");
  var createRoom = new Room({
    name:req.body.name;
    createdBy:req.session.user.id;
    

  })



})
