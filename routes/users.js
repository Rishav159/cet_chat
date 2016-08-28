var express = require('express');
var router = express.Router();
var User = require('/user');
/* GET users listing. */
router.post('/signUp', function(req, res, next) {
  var newUser = {};
  newUser.name = req.body.name;
  newUser.pass = req.body.pass;
  var response = User.insert(newUser);
  if(response.err){
    res.send(response.msg);
  }else{
    res.send("Added succesfully");
  }
});

module.exports = router;
