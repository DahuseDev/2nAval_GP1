let xhr = new XMLHttpRequest();

socket.on('newActivitat',async ()=>{
    getActivities()
})
window.onload = function(){
    login();
    let cHeader = document.getElementById("chatHeader")
    let cInput = document.getElementById("chatInput")
    cHeader.addEventListener('click',chatClick)
    cInput.addEventListener('keydown',chatInput)
    fetch(location.origin+"/authUser?token="+localStorage.getItem('session'))
        .then(res =>res.json())
        .then((user)=>{
            usuari=user;
            fetch(location.origin+`/getMyActivities?id=${user.id}&role=${user.role}`)
                .then(res=>res.json())
                .then((acts=>{
                    let selEv=document.getElementById('selectEvent');
                    for(act of acts){
                        selEv.innerHTML+="<option value=\""+act.nomActivitat+"\">"+act.nomActivitat+"</option>";
                    }
                    document.getElementById('formEvents').addEventListener('submit',addEvent);
                }))
            getActivities();
        }).catch(err => console.error(err))

}
function addEvent(){
    let form = document.getElementById('formEvents');
    socket.emit("addActivitat",{"activitat":form.activitat.value,"data":form.data.value,"user":usuari.username,"nom":usuari.name,"cognom":usuari.surname})
}
function getActivities(){
    xhr.open("GET", `/getActivities`);
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText)
            draw(JSON.parse(this.responseText));
        }
    });
    xhr.send();
}
function draw(activitats){
    let canvas = document.getElementById('tauler');
    let AMPLADA=950;
    let ALTURA=550;
    let AMPLADACell=Math.round((AMPLADA-40)/7);
    let ALTURACell= Math.round((ALTURA-40)/5);
    if (canvas.getContext){
        let ctx = canvas.getContext('2d');
        ctx.reset();
        let alternaColor=1;
        let dies=["DILLUNS","DIMARTS","DIMECRES","DIJOUS","DIVENDRES","DISSABTE","DIUMENGE"];
        let numDies=["27/02","28/02","1/03","2/03","3/03","4/03","5/03","6/03","7/03","8/03","9/03","10/03","11/03","12/03","13/03","14/03","15/03","16/03","17/03","18/03","19/03","20/03","21/03","22/03","23/03","24/03","25/03","26/03","27/03","28/03","29/03","30/03","31/03","1/04","2/04"];
        ctx.translate(0,40)
        ctx.strokeRect(-40,-40,40,40);
        ctx.save();
        for(let x=0;x<7;x++){
            ctx.textAlign="center";
            ctx.strokeRect(x*AMPLADACell,-40,AMPLADACell,40);
            ctx.fillText(dies[x],(x*AMPLADACell)+AMPLADACell/2,-15,AMPLADACell);
        }
        for(let x=0;x<7;x++){
            dia=x-7; 
            alternaColor=true;             
            for(let y=0;y<5;y++){
                dia+=7;
                diaActual=numDies[dia].split("/")[0];
                mesActual=numDies[dia].split("/")[1];
                ctx.restore();
                ctx.save();
                ctx.fillStyle="lightblue";
                if(alternaColor)ctx.fillStyle="aliceblue";
                ctx.fillRect(x*AMPLADACell,y*ALTURACell,AMPLADACell,ALTURACell);
                ctx.strokeRect(x*AMPLADACell,y*ALTURACell,AMPLADACell,ALTURACell);
                alternaColor=!alternaColor;
                if(mesActual==03){
                    ctx.fillStyle="black";
                }else{ctx.fillStyle="grey";}
                
                ctx.translate(x*AMPLADACell,y*ALTURACell);
                ctx.fillText(diaActual,20,20);
                ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
                ctx.fillRect(0,0,AMPLADACell, 30);
                ctx.beginPath();
                ctx.moveTo(0,30);
                ctx.lineTo(AMPLADACell, 30);
                ctx.stroke();
                if(mesActual==03){
                    act=1;
                    for(let activitat of activitats){
                        if(activitat.data.split("-")[2]==toTwoDigits(diaActual)&&activitat.data.split("-")[1]==mesActual){
                            ctx.fillStyle='green';
                            ctx.fillRect(AMPLADACell*0.05,(act*33),AMPLADACell*0.9,30)
                            ctx.fillStyle='black';
                            ctx.fillText(activitat.nomActivitat,10,13+(33*act));
                            ctx.fillStyle='darkred';
                            ctx.fillText(activitat.nomAutor + " "+activitat.cognomAutor,10,23+(33*act));
                            act++;
                        }
                    }
                }
            }
        }
    }
}
function toTwoDigits(num){
    if(num.length==1){
        num="0"+num;
    }
    return num;
}
