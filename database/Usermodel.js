var mongoose = require('mongoose');
let userSchema = new mongoose.Schema ({
    username: String,
    password: String, 
    role: String, 
    name: String,
    surname: String,
    token: String
})
module.exports = mongoose.model('User', userSchema); 