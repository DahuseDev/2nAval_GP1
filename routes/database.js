var mongoose = require('mongoose'); 
let md5 = require('md5')



class database{
    
    constructor(){
        mongoose.set('strictQuery', false); 
        this.conectar().catch(err => console.log("Error: "+err))
        this.UserModel = require('../database/Usermodel');
        this.ActivitatModel = require('../database/Activitatmodel');
        this.Activitats_to_usersModel = require('../database/ActivitatToUsersModel');
    }

    

    async conectar(){
        try{
            await mongoose.connect('mongodb://127.0.0.1:27017/gp1');
            console.log("Conectat a la base de dades");
        }
        catch(err){
            throw new err("No s'ha pogut conectar a la base de dades ")
        }
    }

    async authUser(token){
        r= await this.UserModel.findOne({ token: token}).lean()
        .then(docs=>{
            if(docs){
                let output= {'id':docs._id,'username': docs.username,name: docs.name, 'surname': docs.surname, 'role': docs.role};
                return output;
            }
            return null;
        });  
        return r;
    }

    async verificaUser(postUsername,postPswd){
        
        r= await this.UserModel.findOne({ username: postUsername}).lean()
        .then(docs=>{
            if(docs && docs.password==postPswd){
                let output= {'id':docs._id,'username': docs.username,name: docs.name, 'surname': docs.surname, 'role': docs.role,'token':docs.token};
                return output;
            }
            return null;
        });  
        return r;
    }

    async retornaActivitats(){
        return await this.ActivitatModel.find({})
    }

    async retornaActivitatsperId(idUser,roleUser){
        if(roleUser=="1"){
            return await this.Activitats_to_usersModel.find({}).select({nomActivitat:1, _id:0}); 
        }else{
            return await this.Activitats_to_usersModel.find({idUser:idUser}).select({nomActivitat:1, _id:0}); 
        }
    }

    async afegirActivitat(postActivitat, postData,postNom,postCognom){
        await this.ActivitatModel.collection.insertOne({nomActivitat: postActivitat, data: postData, nomAutor: postNom, cognomAutor: postCognom}); 
    }

    async borrarActivity(deleteID){
        return await this.ActivitatModel.deleteOne({_id: deleteID}); 
    }

    async mostrarUsers(){
        return await this.UserModel.find({}); 
    }

    async mostrarActivitats(){
        return await this.ActivitatModel.find({}); 
    }

    async borrarUser(deleteUsername){
        return await this.UserModel.deleteOne({username: deleteUsername}); 
    }

    async modificaUsuari(putUsername, putRole, putNom, putCognom){
        console.log(putUsername+"-"+putRole+"-"+putNom+"-"+putCognom)
        return await this.UserModel.findOneAndUpdate({username: putUsername},{role: putRole, name: putNom, surname: putCognom}) 
    }

    async afegirUsuari(postUsername,postPassword, postRole, postNom, postCognom){
        return await this.UserModel.collection.insertOne({username: postUsername, password: postPassword, role: postRole, name: postNom, surname: postCognom,token:md5(postUsername)}); 
    }
}



 


module.exports = database;



// const consulta = UserModel.find({});        
// consulta.select('name surname').where("role").eq(1)
// consulta.exec((err, alumnes) => {
//     (err)?console.log(err):"";
//     console.log(alumnes);
// });


// mongoose.connect('mongodb://127.0.0.1:27017/alumnes',
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   }
// );

// const mdb = mongoose.connection; 
// mdb.once("open",  () => { 
//     console.log("s'ha conectat a la base de dades"); 
// }); 








/*
let http = require("http");
let fs = require('fs');
let qs = require('querystring');
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let cadenaConnexio = 'mongodb://127.0.0.1:27017/gp2';
class database{
    constructor(response){
        this.response=response;
    }
    retornaActivitats(){
        let activitats;
        MongoClient.connect(cadenaConnexio, async (err, client) =>{
            assert.equal(null, err);
            let db = client.db('gp2');
            activitats=await db.collection('calendari').find().toArray();
            this.response.end(JSON.stringify(activitats));
        });
    }
    insertActivitat(postData,postUser,postActivitat,postNom,postCognom){
        MongoClient.connect(cadenaConnexio, async (err, client) =>{
            assert.equal(null, err);
            console.log("Connexió correcta");
            let db = client.db('gp2');
            await db.collection('calendari').insertOne({data:postData,usuari:postUser,activitat:postActivitat,nom:postNom,cognom:postCognom});
            this.response.end();
        });
    }
    verificaUser(postUsername,postPswd){
        MongoClient.connect(cadenaConnexio, async (err, client) =>{
            assert.equal(null, err);
            console.log("Connexió correcta");
            let db = client.db('gp2');
            let user= await db.collection('usuaris').findOne({username:postUsername,password:postPswd});
            console.log(user)
            if(user){
                console.log("autenticat");
                this.response.write(JSON.stringify(user));
                this.response.end();
            }else{
                console.log("aquest usuari no existeix");
                this.response.write('error');
                this.response.end();
            }   
        });
    }
}
module.exports = database;*/