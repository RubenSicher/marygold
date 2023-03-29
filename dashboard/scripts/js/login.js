
// campos de contraseña 
var state = 1;
var id;
var contra;
var userID;
var datosContra 
var logUsuario
contra = document.getElementById("revelaContra")
contra.addEventListener("click", function(){
    if(state ==1) {
    document.getElementById("inputcontra").type ="text"
    state = 0;
    contra.classList.remove("fa-eye")
    contra.classList.add("fa-eye-slash")
    } 
    else if(state ==0){
        document.getElementById("inputcontra").type ="password"
        state=1;
        contra.classList.remove("fa-eye-slash")
        contra.classList.add("fa-eye")
    }
})
var state2=1
contranueva = document.getElementById("revelacontranueva")
contranueva.addEventListener("click", function(){
    if(state2 ==1) {
    document.getElementById("nuevaClave").type ="text"
    state2 = 0;
    contranueva.classList.remove("fa-eye")
    contranueva.classList.add("fa-eye-slash")
    } 
    else if(state2 ==0){
        document.getElementById("nuevaClave").type ="password"
        state2=1;
        contranueva.classList.remove("fa-eye-slash")
        contranueva.classList.add("fa-eye")
    }
})
var state3=1
contranuevac = document.getElementById("revelacontranuevaC")
contranuevac.addEventListener("click", function(){
    if(state3 ==1) {
    document.getElementById("nuevaclaveC").type ="text"
    state3 = 0;
    contranuevac.classList.remove("fa-eye")
    contranuevac.classList.add("fa-eye-slash")
    } 
    else if(state3 ==0){
        document.getElementById("nuevaclaveC").type ="password"
        state3=1;
        contranuevac.classList.remove("fa-eye-slash")
        contranuevac.classList.add("fa-eye")
    }
})
// >

// cambios al login 

document.getElementById("btnregresa").addEventListener("click", function(){

document.getElementById("inputUsuarioDiv").style.display ="block"
document.getElementById("inputcontraDiv").style.display ="none"
id =$("#inputUsuario").val("")
}) 

pass = $("#inputcontra").val()
var estado

// agregar evento al clik enter 
var input = document.getElementById("inputUsuario");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buscarUsuario()
  }
});
var input2 = document.getElementById("inputcontra");
input2.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buscaContra()
  }
});
// agregar evento al click para buscar contraseña


// acciona los botones para buscar 
document.getElementById("buscaUsuario").addEventListener("click",buscarUsuario)
document.getElementById("btnbuscacontra").addEventListener("click",buscaContra)

// btn busca usuario <
function buscarUsuario() {
if($("#inputUsuario").val()=='')
{
document.getElementById("inputUsuario").classList.add("is-invalid")
}
 else {
    consultaID();
    

}
}
// buscando al uusuario <
function VerEstadoUsuario(estado){
if(estado==0) {
  Toast.fire("Usurio No encontrado!", "","error")
id =$("#inputUsuario").val("")
}
else if(estado ==1){
  Toast.fire("Coloca la clave que se te asignó!", "","warning")
document.getElementById("inputUsuarioDiv").style.display ="none"
document.getElementById("inputcontraDiv").style.display ="block"
}
else if(estado ==2){
  Toast.fire("Coloca tu clave!", "","warning")
document.getElementById("inputUsuarioDiv").style.display ="none"
document.getElementById("inputcontraDiv").style.display ="block"
}
// >
}
// >
// btn busca contraseña <

function buscaContra() {
if($("#inputcontra").val()=='')
{
document.getElementById("inputcontra").classList.add("is-invalid")
}
 else {
    buscarContra()
}
}
// >

// retira estilo de input < 
document.getElementById("inputUsuario").addEventListener("input", function(){
document.getElementById("inputUsuario").classList.remove("is-invalid")
})
document.getElementById("inputcontra").addEventListener("input", function(){
document.getElementById("inputcontra").classList.remove("is-invalid")
})
// >



// consultamos id < 
function consultaID() {   
    id =$("#inputUsuario").val()
    var ajax = new XMLHttpRequest();
    var metodo = "GET";
    var url = 'scripts/php/login.php?consulta=buscarUsuario&id='+id;
    var asyn = true;
    ajax.open(metodo, url, asyn );
    ajax.send();
    ajax.onreadystatechange = function() {
    if(this.readyState ==4 && this.status == 200){
      if(this.response==""){
        VerEstadoUsuario(0)
      } else {
        var datos = JSON.parse(this.responseText);
        // console.log(datos);
        // console.log(datos.length)
       if(datos[0].estado==0)
       {
        Toast.fire("Perfil inhabilitado, consulte con administración","","error")
       }
       else if(datos[0].activo ==0) {
        VerEstadoUsuario(1)
       }
       else if (datos[0].activo ==1){
        VerEstadoUsuario(2)
       }    
    }
 }
}
}
// <

// buscamos contraseña <
function buscarContra() {
contra = $("#inputcontra").val()
id =$("#inputUsuario").val()
var ajax = new XMLHttpRequest();
var metodo ="GET";
var url = 'scripts/php/login.php?consulta=buscarpass&pass='+contra+'&id='+id;
var asyn = true;

ajax.open(metodo, url, asyn);
ajax.send();
ajax.onreadystatechange = function(){
if(this.readyState ==4 && this.status ==200) {
  datosContra = JSON.parse(this.responseText);
if (datosContra.length>0) {
logUsuario = datosContra[0].nombre
let estado = datosContra[0].activo
userID = datosContra[0].id
if (estado ==0) {
  document.getElementById("inputcontraDiv").style.display ="none"
 document.getElementById("frmNuevacontraseña").style.display = "block"
Toast.fire("Es tu primera vez Ingresando, por favor Cambia tu contraseña!","","warning")
}
else if (estado==1){
    document.cookie = "key="+Math.random().toString(36).slice(2)
    document.cookie = "usermgold="+logUsuario
    window.location.href = "https://marygoldhomes.com/dashboard";
}
} else {
  Toast.fire("contraseña Invalida","","error")
}
// if(datos.length ==0){
//     toastr.error('contraseña invalida!')
//     contra = $("#inputcontra").val("")
// }
// else {
//     document.cookie = "key="+Math.random().toString(36).slice(2)
//     document.cookie = "usermgold="+datos[0].nombre
//     window.location.href = "https://marygoldhomes.com/dashboard";

   
// }
      }
  }
}

// cambio de contrasñea para nuevo usuarios
var nuevaClave = document.getElementById("nuevaclaveC")
nuevaClave.oninput = function(){
  if(nuevaClave.value =="")   
  {document.getElementById("nuevaclaveC").classList.remove("is-invalid")}
}

document.getElementById("btnCambiapass").addEventListener("click", function(){
  if($("#nuevaClave").val()===$("#nuevaclaveC").val() && nuevaClave.value.length>=7 ){
 var ajax = new XMLHttpRequest;
 var metodo ="GET";
 var url = 'scripts/php/login.php?consulta=CambiarClave&nuevaClave='+nuevaClave.value+'&idClave='+userID;
 var asyn = true;
 ajax.open(metodo, url, asyn);
 ajax.send();
 ajax.onreadystatechange = function() {
 if(this.readyState ==4 && this.status ==200) {
   let datos2 = this.responseText;
 
   if (datos2 == 'ok'){
   Toast.fire("Clave Modificada!,Bienvenido", "","success")
   document.getElementById("nuevaclaveC").classList.remove("is-invalid")
   setTimeout(function(){
    document.cookie = "key="+Math.random().toString(36).slice(2)
    document.cookie = "usermgold="+logUsuario
    window.location.href = "https://marygoldhomes.com/dashboard";
   },2000)
  } else Toast.fire("hubo un error Intentelo nuevamente o comuniquese con Administración","","error")
}
 }
   }
   else if(nuevaClave.value.length<7){
    Toast.fire("La clave debe contener más de 7 caracteres", "","warning")
  }
   else 
 {
  document.getElementById("nuevaclaveC").classList.add("is-invalid")
  Toast.fire("las claves deben coincidir", "","warning")
 }
})
document.getElementById("btnMantienePass").addEventListener("click", function(){
  // console.log(userID)
  Toast2.fire({
    icon:'warning',
    title:'¿Desea Mantener la misma Clave?',
    confirmButtonText: 'Si',
    showDenyButton: true,
    denyButtonText: 'Cancelar'
     }).then((resultado) =>{
      if(resultado.isConfirmed) 
      {
        var ajax = new XMLHttpRequest;
        var metodo ="GET";
        var url = 'scripts/php/login.php?consulta=mantieneClave&idClave='+userID;
        var asyn = true;
        ajax.open(metodo, url, asyn);
        ajax.send();
        ajax.onreadystatechange = function() {
        if(this.readyState ==4 && this.status ==200) {
          let datos2 = this.responseText;
        
          if (datos2 == 'ok'){
          Toast.fire("Clave Modificada!,Bienvenido", "","success")
          document.getElementById("nuevaclaveC").classList.remove("is-invalid")
          setTimeout(function(){
           document.cookie = "key="+Math.random().toString(36).slice(2)
           document.cookie = "usermgold="+logUsuario
           window.location.href = "https://marygoldhomes.com/dashboard";
          },2000)
         } else Toast.fire("hubo un error Intentelo nuevamente o comuniquese con Administración","","error")
       }
       }
      }

     
})
})
// >


