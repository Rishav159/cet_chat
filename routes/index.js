var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname+'../public/index.html');
});
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
