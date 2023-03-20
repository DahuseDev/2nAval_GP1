window.onload = function () {
    login();
    mostrarUsuaris();
    mostrarActivitats();  
    let cHeader = document.getElementById("chatHeader")
    let cInput = document.getElementById("chatInput")
    cHeader.addEventListener('click',chatClick)
    cInput.addEventListener('keydown',chatInput)
    document.getElementById("afegirUsuariBtn").addEventListener("click",()=>{
        document.getElementById('afegirUsuari').style.display="flex";
    }) 
    document.getElementById("enviar").addEventListener("click",addUser) 


    let exit = document.getElementById("x"); 
    exit.addEventListener("click", windowOcultar); 

    let enviar = document.getElementById("enviar"); 
    enviar.addEventListener("click", windowOcultar2); 


}

function mostrarUsuaris(){
    let mostrarUsers = document.getElementById("mostrarUsers"); 
    let requestOptions= {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    fetch(location.origin+"/mostrarUsers", requestOptions)
    .then(res => res.json())
    .then(result => {
        let mostrarUsers = document.getElementById("mostrarUsers"); 
        let output = " "; 

        output="<div id='user'><div id = 'username'>Username</div><div id = 'name'>Name</div><div id = 'surname'>Surname</div><div id = 'role'>Role</div><div id='borrarh'></div><div class='modificarh'></div></div>"; 

        for(const r of result){
            let role = `<select class="${r.username}-role">`
            if(r.role==1){
                role+="<option value='0'>User</option><option value='1' selected>Admin</option></select>"
            }else{
                role+="<option value='0' selected>User</option><option value='1'>Admin</option></select>"
            }
            output+=`<div id="user"><div id="username">${r.username}</div><div id="name" class="${r.username}-name" contentEditable>${r.name}</div><div id="surname"' class="${r.username}-surname" contentEditable>${r.surname}</div><div id="role">${role}</div><div class="borrar" id ='${r.username}' onclick="borrarUser(this.id)">x</div><div class="modificar" id ='${r.username}' onclick="modificaUser(this.id)"><img src="https://cdn-icons-png.flaticon.com/512/9893/9893155.png"/></div></div>`  
        }

        output+= "</tbody></table>"; 
        mostrarUsers.innerHTML = output; 
    })
    .catch(error => console.log("error", error));     
}


function mostrarActivitats (){
    let mostrarActivitats = document.getElementById("mostrarActivitats"); 
    let requestOptions= {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    fetch(location.origin+"/mostrarActivitats", requestOptions)
    .then(res => res.json())
    .then(result => {
        let mostrarActivitats = document.getElementById("mostrarActivitats"); 
        let output = " "; 

        output="<div id='activitat'><div id = 'nomActivitat'>Nom de la activitat</div><div id = 'data'>Data</div><div id='borrarA'></div></div>"; 
        for(const r of result){
            output+=`<div id="activitat"><div id="nomActivitat" class="${r._id}-nomActivitat">${r.nomActivitat}</div><div id="data" class="${r._id}-data">${r.data}</div><div class="borrar" id ='${r._id}' onclick="borrarActivitat(this.id)">x</div></div>`  
        }

        output+= "</tbody></table>"; 
        mostrarActivitats.innerHTML = output; 
    })
    .catch(error => console.log("error", error));  
}




function borrarUser(username){   
    if(window.confirm("Vols eliminar l'usuari "+username+"?"))    
    fetch(location.origin+"/deleteUser?username="+username, {method: 'DELETE'})
    .then(res => res.json)
    .then(result => {
        mostrarUsuaris()
    })   
}

function modificaUser(username){ 
    let name = document.getElementsByClassName(`${username}-name`)[0].innerHTML;  
    let surname = document.getElementsByClassName(`${username}-surname`)[0].innerHTML;  
    let role = document.getElementsByClassName(`${username}-role`)[0].value;
    if(window.confirm("Vols modificar l'usuari "+username+"?"))    
        fetch(location.origin+"/modifyUser?username="+username+"&role="+role+"&nom="+name+"&cognom="+surname, {method: 'PUT'})
        .then(res => res.json)
        .then(result => {
            mostrarUsuaris()
    })
}

function borrarActivitat(id){   
    let name = document.getElementsByClassName(`${id}-nomActivitat`)[0].innerHTML;  
    let date = document.getElementsByClassName(`${id}-data`)[0].innerHTML;  
    if(window.confirm("Vols eliminar l'activitat "+name+" a la data "+date+"?"))    
    fetch(location.origin+"/deleteActivity?id="+id, {method: 'DELETE'})
    .then(res => res.json)
    .then(result => {
        mostrarActivitats()
    })   
}

function addUser(){
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    let role = document.getElementById('role').value
    let nom = document.getElementById('nom').value
    let cognom = document.getElementById('cognom').value
    fetch(location.origin+"/afegirUser?username="+username+"&password="+password+"&role="+role+"&nom="+nom+"&cognom="+cognom, {method: 'POST'})
    .then(res => res.json)
    .then(result => {
        mostrarUsuaris()
    })
}


function windowOcultar(){
    let finestra = document.getElementById("afegirUsuari"); 
    finestra.style.display = "none"; 
}

function windowOcultar2(){
    let finestra = document.getElementById("afegirUsuari"); 
    finestra.style.display = "none"; 
}

