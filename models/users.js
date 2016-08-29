var mongoose = require('mongoose');
var assert = require('assert');
var bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cet-chat');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

  var userSchema = mongoose.Schema({
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    rooms: Array
  });
  userSchema.pre('save', function(next) {
      var user = this;

      // only hash the password if it has been modified (or is new)
      if (!user.isModified('password')) return next();

      // generate a salt
      bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) return next(err);

          // hash the password along with our new salt
          bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) return next(err);

              // override the cleartext password with the hashed one
              user.password = hash;
              next();
          });
      });
  });
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



module.exports = mongoose.model('User', userSchema);
