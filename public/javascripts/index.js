navigator.geolocation.getCurrentPosition((pos) => {
    console.log(pos.coords.latitude);
    console.log(pos.coords.longitude);
})
let chatToggle = false;
let newMessage = 0;
let usuari;
const socket = io();
window.onload=function(){
    login();
    let cHeader = document.getElementById("chatHeader")
    let cInput = document.getElementById("chatInput")
    cHeader.addEventListener('click',chatClick)
    cInput.addEventListener('keydown',chatInput)
}
function chatInput(ev){
    let cInput = document.getElementById("chatInput")
    if(ev.key == "Enter"){
        let input = cInput.innerHTML;
        cInput.innerHTML="";
        if(charLimit(input)){
            window.alert("Mensaje demasiado largo! No debe superar los 100 carácteres.")
            return;
        }
        ev.preventDefault();
        socket.emit("newMissatge",{name:usuari.name,username:usuari.username,message:input})
    }
}
function charLimit(string){
    if(string.length>100){
        return true;
    }
    return false;
}
socket.on('newMissatge',(body)=>{
    let cContent = document.getElementById("chatContent")
    let pending = document.getElementById('pendingMessage')
    let d = new Date();
    let missatge;
    if(chatToggle==false){
        pending.style.display="flex";
        newMessage++;
        pending.innerHTML=newMessage;
    }
    if(body.username == usuari.username){
        missatge=`<div id="missatgeCont" class="missatgeInnerMe"><div id='missatgeInner'>${body.message}</div><div id="missatgeInfo">${body.name} · ${d.getHours()}:${d.getMinutes()}</div></div>`
    }else{
        missatge=`<div id="missatgeCont" class="missatgeInnerOther"><div id='missatgeInner' >${body.message}</div><div id="missatgeInfo">${body.name} · ${d.getHours()}:${d.getMinutes()}</div></div>`    }
    cContent.innerHTML+="<div id='missatge'>"+missatge+"</div>";
})
function chatClick(){
    let pending = document.getElementById('pendingMessage')
    if(chatToggle){
        chat.style.bottom='-34%';
    }else{
        pending.style.display="none";
        newMessage=0;
        chat.style.bottom='0'; 
    }
    chatToggle = !chatToggle;
}

function login(){
    let roles=["user","admin"];
    let token = localStorage.getItem('session');
    fetch(location.origin+"/authUser?token="+token)
        .then(res =>{
            if(res.status==404){
                location.href="/";
                return;
            }
            return res.json()})
        .then((user)=>{
            document.getElementById("headerUsername").innerHTML="Hola "+user.name+" "+user.surname+"!";
            document.getElementById("headerRole").innerHTML="Rol: "+roles[user.role];
            usuari = user;
            if(roles[user.role]=="admin"){
                let admin=document.getElementById('adminPanel');
                admin.href="/admin"
                admin.innerHTML="<div>Admin</div>"
            }
        }).catch(err => console.error(err)) 
    document.getElementById("headerLogout").onclick=function(){
        localStorage.removeItem("session");
        location.href="/";
    }    
}