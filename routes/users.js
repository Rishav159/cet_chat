var express = require('express');
var router = express.Router();

var User = require('../users');
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

module.exports = router;
