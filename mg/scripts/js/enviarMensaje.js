var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000
  });



var nombre
var tel 
var envia = document.getElementById("btnSolicita")

envia.addEventListener("click", function(){
nombre = document.getElementById("inputname");
tel = document.getElementById("inputNum");
mens = document.getElementById("mensaje");


if (nombre.value ==0 || tel.value ==0) {
Toast.fire("No deje Campos Vacios","","warning");

} 
else if (tel.value.length<10 || tel.value.length>13) {
    Toast.fire("número telefónico invalido","","warning");
 }
 else if (mens.value ==0) {
Toast.fire("No olvides Dejar un mensaje!","","warning");
mens.classList.add("campo")
setTimeout(function(){
    mens.classList.remove("campo")
},3000)


 }
 else {
  var ajax = new XMLHttpRequest;
  var metodo = "GET"
  var url = 'scripts/php/enviarSolicitud.php?con=guardarSolicitud&nombre='+nombre.value+'&tel='+tel.value+'&mens='+mens.value
  var asyn = true;
  ajax.open(metodo, url, asyn);
  ajax.send();
  ajax.onreadystatechange = function () {
    if(this.readyState ==4 && this.status == 200){
       state = this.responseText
       if (state== "ok") {
        Toast.fire("Tu mensaje fue enviado!, pronto nos pondremos en contacto contigo!","","success")
        nombre.value ="";
        tel.value ="";
        mens.value ="";
       } 
       else{
        Toast.fire("hubo un error intentelo nuevamente","","error")
    }
    } 
  }

 }
})
