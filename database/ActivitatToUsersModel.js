var mongoose = require('mongoose');
let  activitats_to_usersSchema = new mongoose.Schema ({
    nomActivitat : String, 
    idUser: String 
})
module.exports = mongoose.model('Activitats a Usuaris', activitats_to_usersSchema); 
