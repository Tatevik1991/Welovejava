var mongoose = require('mongoose');


var notes = mongoose.Schema({
    message: String,
    name: String,
    status: String,
    date:  Date,
    status18plus:String

});

var censoredWords = mongoose.Schema({
    word:String
});

var admin = mongoose.Schema({
    login:String,
    password:String
});

var subscribe= mongoose.Schema({
    email:String
});


mongoose.model("subscribe", subscribe);
mongoose.model("notes", notes);
mongoose.model("censoredWords", censoredWords);
mongoose.model("admin", admin);
mongoose.connect('mongodb://localhost/nodetest');

module.exports = mongoose;