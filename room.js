var mongoose = require('mongoose');
var assert = require('assert');
mongoose.connect('mongodb://localhost/cet-chat');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var roomSchema = mongoose.Schema({
    name: {type:String, required:true, unique:true},
    createdBy: {type:String, required:true},
    members: Array
  });
roomSchema.methods.insert = function(){
  var newRoom= new room({name : this.name, createdBy: this.id , member: [id]});
  newRoom.save(function (err, user) {
    var res = {};
    if (err) res.error = true;
    else res.error=false;
        return res;
  });





}
