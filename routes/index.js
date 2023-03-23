let express = require('express');
const { render, listen } = require('../app');
let router = express.Router();
let database = require('./database');

let db = new database()
router.use(express.json())



router.get('/', function(req,res, next){
  res.render('login');
});
router.get('/inici', function(req,res, next){
  res.render('inici');
});

router.get('/calendari', function(req,res, next){
  res.render('calendari');
  
});

router.get('/localitzacio', function(req,res, next){
  res.render('localitzacio');
  
});


router.get('/admin', function(req, res, next){
  res.render('adminMenu'); 
})


router.get('/usuaris', function(req, res, next){
  res.render('adminUsers');
})

router.get("/activitats", function(req, res, next){
  res.render('adminActivitats')
})

router.get('/addUser', function(req, res, next){
  console.log("zp")
  res.render('addUser'); 

}); 


router.get('/mostrarUsers', function(req, res, next){
  a = db.mostrarUsers(); 
  a.then((doc)=>doc)
  .then((arr) => {
  res.send(arr)
  })
})

router.get('/mostrarActivitats', function(req, res, next){
  a = db.mostrarActivitats(); 
  a.then((doc)=>doc)
  .then((arr) => {
  res.send(arr)
  })
})

router.get('/contact', function(req, res, next){
  res.render('contact'); 
})

router.get('/getActivities', function(req,res, next){
  a = db.retornaActivitats();
  a.then((doc)=>doc)
  .then((arr) =>{
    res.send(arr)
  })
});

router.get('/getMyActivities', function(req,res, next){
  a = db.retornaActivitatsperId(req.query.id,req.query.role);
  a.then((doc)=>doc)
  .then((arr) =>{
    res.send(arr)
  })
});


router.get('/authUser', function(req,res, next){
  if(req.query.token){
    console.log("login");
    r= db.authUser(req.query.token)
    r.then((doc)=>doc)
    .then((arr)=>{
      if(r!=null){
        res.send(JSON.stringify(arr))
      }else{
        res.status(404);
        res.send();
      }
    })   
  }
});


router.post('/login', function(req,res, next){
  if(req.body.username){
      console.log("login");
      r= db.verificaUser(req.body.username,req.body.pswd)
      r.then((doc)=>doc)
      .then((arr)=>{
        if(r!=null){
          res.send(JSON.stringify(arr))
        }else{
          res.status(404);
          res.send();
        }
      })
  }else{
      res.render('login')
      console.log("not login");
  }
});

router.post('/addActivities', function(req, res, next){
  if (req.body.activitat){
    a = db.afegirActivitat(req.body.activitat, req.body.data,req.body.nom,req.body.cognom)
    a.then((doc)=>doc)
    .then((arr) =>{
      if(a!=null){
        res.send(arr)
      }else{
        res.status(404); 
        res.send(); 
      }
    })
  }
})
router.delete('/deleteActivity', function(req, res, next){
  if (req.query.id){
    db.borrarActivity(req.query.id);
  }
  res.send(); 
}); 
router.delete('/deleteUser', function(req, res, next){
  if (req.query.username){
    db.borrarUser(req.query.username);
  }
  res.send(); 
}); 
router.put('/modifyUser', function(req, res, next ){
  if (req.query.username){
    db.modificaUsuari(req.query.username, req.query.role, req.query.nom, req.query.cognom); 
  }
  res.send(); 
}); 
router.post('/afegirUser', function(req, res, next ){
  if (req.query.username){
    db.afegirUsuari(req.query.username, req.query.password, req.query.role, req.query.nom, req.query.cognom); 
  }
  res.send(); 
}); 



module.exports = router;  

