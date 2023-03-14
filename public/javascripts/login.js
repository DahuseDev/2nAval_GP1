var xhr = new XMLHttpRequest();
username=""
window.onload = function () {
  loginbtn = document.getElementById('loginbtn');
  loginbtn.addEventListener('click', login);
  loginerror=document.getElementById("loginerror");
}
function login() {
  username = document.getElementById('login_username').value;
  password = document.getElementById('login_password').value;
  user = { "username": username, "pswd": password }
  xhr.open("POST", `/login`);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if(xhr.status == 404) {
        loginerror.style.display="block";
        return;
      }
      usuari=JSON.parse(this.responseText);
      output={'id':usuari.id,'username':usuari.username,'rol':usuari.role,'name':usuari.name,'surname':usuari.surname};
      sessionStorage.removeItem("sessionerror");
      localStorage.setItem("session",usuari.token);
      location.href="inici";
    }
  })
  xhr.send("username="+username+"&pswd="+password);
}

