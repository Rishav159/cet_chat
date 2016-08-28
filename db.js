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

  var newUser = new user({ username: 'Sandy', password: 'fuckyou' });
  console.log(newUser.username);

  newUser.save(function(){
    user.find(function (err, user) {
      if (err) return console.error(err);
      console.log(user);
    });
  });

  //assert.equal(query.exec().constructor, require('bluebird'));



});
