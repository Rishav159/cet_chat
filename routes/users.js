var express = require('express');
var router = express.Router();

var User = require('../users');
/* GET users listing. */
router.post('/signUp', function(req, res, next) {
  console.log("Sign up called");
  var newUser = new User({name:req.body.name , password:req.body.pass});
  console.log(newUser);
  newUser.insert(function(response){
  res.send(response);
  });
});

module.exports = router;
