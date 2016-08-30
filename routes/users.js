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
        req.session.user = {};
        req.session.user.id = user._id;
        req.session.user.name = user.name;
        res.redirect('/dashboard')
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
            res.redirect('/dashboard')
          }else{
            res.send("Password doesn't match");
          }
        }
      });
    }
  });
});
router.post('/signout',function(req,res,next){
  delete req.session.user;
  res.status=200;
  res.send("You are now signed out ");
});

module.exports = router;
