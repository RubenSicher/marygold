
     
	window.history.pushState(null, "", 'https://marygoldhomes.com/dashboard/');
  window.onpopstate = function() {
      window.history.pushState(null, "", 'https://marygoldhomes.com/dashboard/');
  }


document.getElementById("btnLogOut").addEventListener("click", function() {
  document.cookie = "usermgold="
  document.cookie = "key="
window.location.href="https://marygoldhomes.com/dashboard/login.html"

})


cok=document.cookie.split(';').map(cookie => cookie.split('=')).reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
var usuario = cok.usermgold 
if (cok.usermgold=="" || cok.key.lenght <7) {

    window.location.href="https://marygoldhomes.com/dashboard/login.html"
}
 verUsuario(usuario) 

 function verUsuario(user) {
  var ajax = new XMLHttpRequest();
  var metodo = "GET"
  var url='scripts/php/login.php?consulta=verUsuario&usuario='+user;
  var asyn = true;
  ajax.open(metodo, url, asyn);
  ajax.send();
  ajax.onreadystatechange = function () {
  if(this.readyState ==4 && this.status==200) {
    var datos = JSON.parse(this.responseText);
    if (datos.length ==0) {
      Toast.fire("La sesión ha cadudado!!!", "","warning");
      setTimeout(function(){
        document.cookie = "usermgold="
        document.cookie = "key="
      window.location.href="https://marygoldhomes.com/dashboard/login.html"
      },3000)
    }
  }
}
}