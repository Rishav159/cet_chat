var mongoose = require('mongoose');
var assert = require('assert');
mongoose.connect('mongodb://localhost/cet-chat');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  var userSchema = mongoose.Schema({
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    rooms: Array
  });

  var user = mongoose.model('user', userSchema);

  var insert = function(newUser){
    var newUser = new user({ username: newUser.name, password: newUser.pass });
    console.log(newUser.username);
    newUser.save(function (err, user) {
      var res = {};
      if (err) res.error = true;
      else res.error=false;
          return res;
    });
  }

});

module.exports = {
  insert:insert
}
