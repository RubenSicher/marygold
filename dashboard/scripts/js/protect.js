
  
     
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

if (cok.usermgold=="" || cok.key.lenght <7) {

    window.location.href="https://marygoldhomes.com/dashboard/login.html"
}