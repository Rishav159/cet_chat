var mongoose = require('mongoose');
var db = mongoose.connection;
var User = require('../models/users');
var Schema = mongoose.Schema;
db.on('error', console.error.bind(console, 'connection error:'));

  var roomSchema = mongoose.Schema({
    name: {type:String, required:true, unique:true},
    createdBy: {
      id : Schema.Types.ObjectId,
      name : {
        type:String
      }
    },
    members: Array
  });
  module.exports = mongoose.model('Room', roomSchema);
