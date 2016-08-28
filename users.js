var mongoose = require('mongoose');
var assert = require('assert');
var bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
mongoose.connect('mongodb://localhost/cet-chat');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  var userSchema = mongoose.Schema({
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    rooms: Array
  });


  userSchema.methods.insert = function(newUser){
    //generate salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
       if (err) return next(err);

       // hash the password using our new salt
          bcrypt.hash(newUser.pass, salt, function(err, hash) {
              if (err) return next(err);

              // override the cleartext password with the hashed one
              newUser.pass = hash;
              next();
          });
    });

    var newUser = new user({ username: newUser.name, password: newUser.pass });
    console.log(newUser.username);
    newUser.save(function (err, user) {
      var res = {};
      if (err) res.error = true;
      else res.error=false;
          return res;
    });
  }

  userSchema.methods.checkUser = function(inputUser){
    var pass; var chkres={};
    chkres.err=false;
    user.findOne({name: inputUser.name},function(err,user){
      pass=user.pass;
      bcrypt.compare(inputUser.pass, pass, function(err, isMatch) {
        if (err)
          chkres.err=true;
          else {
            chkres.isMatch=isMatch;
          }

        //cb(null, isMatch);
      });
      return chkres;
    });

  }

var user = mongoose.model('user', userSchema);

});

module.exports = mongoose.model('User', userSchema);
