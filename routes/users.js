var express = require('express');
var router = express.Router();
//var User = require('/user');
/* GET users listing. */
router.post('/signUp', function(req, res, next) {
  console.log("Sign up called");
  var newUser = {};
  newUser.name = req.body.name;
  newUser.pass = req.body.pass;
  console.log(newUser);
  var response = {
    msg: "Done"
  };
  res.send(response);
});

module.exports = router;
