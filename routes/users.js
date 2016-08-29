var express = require('express');
var router = express.Router();

var User = require('../models/users');
var Room = require('../models/room');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.post('/signUp', function(req, res, next) {
  console.log("Sign up called");
  var newUser = new User({username:req.body.name , password:req.body.pass});
  newUser.save(function (err, user) {
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
router.post('/signin',function(req,res,next){
  User.findOne({username:req.body.name},function(err,user){
    if(err){
      res.status=500;
      res.send(err);
    }else{
      console.log(user);
      bcrypt.compare(req.body.pass,user.password,function(err,result){
        if(err){
          res.status=500;
          res.send(err);
        }else{
          if(result){
            req.session.user = {};
            req.session.user.id = user._id;
            req.session.user.name = user.name;
            res.status=200;
            res.send("Your are now logged in !");
          }else{
            res.send("Password doesn't match");
          }
        }
      });
    }
  });
});
router.post('/room/joinroom',function(req,res,next){
  User.findByIdAndUpdate(req.session.user.id,
    {$addToSet: {"rooms": req.body.roomname}},
    {safe: true, upsert: true},
    function(err, user) {
        console.log(err);
    }
  );
  Room.update({name:req.body.roomname},{ $addToSet: { "members": req.body.user.id }}, function(err, room) {
          console.log(err);
  });
});

module.exports = router;
