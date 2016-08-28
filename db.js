var mongoose = require('mongoose');
var assert = require('assert');
mongoose.connect('mongodb://localhost/cet-chat');
mongoose.Promise = require('bluebird');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  var userSchema = mongoose.Schema({
    username: String,
    password: String,
    rooms: Array
  });

  var user = mongoose.model('user', userSchema);

  var newUser = new user({ username: 'Sandy', password: 'fuckyou' });
  console.log(newUser.username);

  var query = newUser.save();
  assert.equal(query.exec().constructor, require('bluebird'));

  user.find(function (err, user) {
    if (err) return console.error(err);
    console.log(user);
  })

});
