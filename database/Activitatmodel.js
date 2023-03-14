var mongoose = require('mongoose');
let activitatSchema = new mongoose.Schema ({
    nomActivitat : String, 
    data: String 
})
module.exports = mongoose.model('Activitat', activitatSchema); 
