var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/cet-chat');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

  var roomSchema = mongoose.Schema({
    name: {type:String, required:true, unique:true},
    createdBy: {type:String, required:true},
    members: Array
  });
  module.exports = mongoose.model('Room', roomSchema);
