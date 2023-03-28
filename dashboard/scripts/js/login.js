
var state = 1;
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
toastr.error('Usuario no encontrado!')
id =$("#inputUsuario").val("")
}
else if(estado ==1){
    toastr.success('coloca contraseña!')
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
        var datos = JSON.parse(this.responseText);
        // console.log(datos);
        // console.log(datos.length)
       if(datos.length ==0) {
        VerEstadoUsuario(0)
       }
       else{
        VerEstadoUsuario(1)
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
 var datos = JSON.parse(this.responseText);

}
if(datos.length ==0){
    toastr.error('contraseña invalida!')
    contra = $("#inputcontra").val("")
}
else {
    document.cookie = "key="+Math.random().toString(36).slice(2)
    document.cookie = "usermgold="+datos[0].nombre
    window.location.href = "https://marygoldhomes.com/dashboard";

   
}

}
}
// >

