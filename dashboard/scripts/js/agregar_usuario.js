
var estadobtn = 1;

var btnEstado = document.getElementById("btnOCultaFormulario")
btnEstado.addEventListener("click", function(event){
    event.preventDefault();
    if(estadobtn===1) {
        btnEstado.classList.remove("btn-info")
        btnEstado.classList.add("btn-warning")
        btnEstado.innerText = "Ocultar"
        estadobtn = 0;
    }
    else if( estadobtn ===0) {
        btnEstado.classList.remove("btn-warning")
        btnEstado.classList.add("btn-info")
        btnEstado.innerText = "Nuevo"
        estadobtn = 1;
    }

})
// nuevos campos

var valido = false;
// crea una clave temporal
crearClaveTemporal()
function crearClaveTemporal(){
const especiales = "!#$%&/()?¿¡"
function generateString(length) {
    let result = '';
    const largoEspeciales = especiales.length;
    for ( let i = 0; i < length; i++ ) {
        result += especiales.charAt(Math.floor(Math.random() * largoEspeciales));
    }
    return result;
}
let especial = generateString(1);
   clave = Math.random().toString(36).slice(6)
    $("#txtPassword").val(especial+clave)
}
// >
// revisamos si es un correo valido 
const validarCorreoString = (email) => {
    return String(email).match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  var inputCorreo = document.getElementById("txtCorreo");
  var correomalo = document.getElementById("CorreoMalo");
const validarCorreo = () => {
    
    var correo = $("#txtCorreo").val()
    if (correo==''){
        valido = false;
        inputCorreo.classList.remove("is-invalid");
        inputCorreo.classList.remove("is-valid");
        correomalo.style.display = "none"
        inputCorreo.classList.remove("Correcto");
    }
    else if(validarCorreoString(correo)){
        inputCorreo.classList.remove("is-invalid");
        inputCorreo.classList.add("Correcto");
        inputCorreo.classList.add("is-valid");
        valido = true;
        correomalo.style.display = "none"
    } else{
   inputCorreo.classList.add("is-invalid");
    correomalo.style.display = "inline"
    inputCorreo.classList.remove("Correcto");
    valido = false
    }
    return false;
  }
  inputCorreo.oninput = validarCorreo
// >



$("#btnGuardaUsuario").click(function(e){
   var nombre = $("#txtNombre").val()
   var correo = $("#txtCorreo").val()
   var contra = $("#txtPassword").val()
    e.preventDefault()
    e.stopImmediatePropagation()
    if (valido ==false || nombre==0 ) {
        Toast.fire("llene los campos correctamente","","warning")
    }
    else {
            var ajax = new XMLHttpRequest();
            var metodo ="GET";
            var url = 'scripts/php/admin_guardaUsuarios.php?nombre='+nombre+'&email='+correo+'&clave='+contra;
            var asyn = true;
            ajax.open(metodo, url, asyn);
            ajax.send();
            ajax.onreadystatechange = function(){
            if(this.readyState ==4 && this.status ==200) {
            var datos = JSON.parse(this.responseText);
            
            if(datos.ok=='ok'){
          Toast.fire("usuario Agregado Correctamente!","","success")
          $("#formNuevoUsuario")[0].reset();
          reiniciaTabla()
          crearClaveTemporal()
          inputCorreo.classList.remove("is-valid");
            }
            else if(datos.error=='error') {
                Toast.fire("Hubo un error, comuniquese con Administración o intentelo nuevamente","","warning")
                $("#formNuevoUsuario")[0].reset();
                crearClaveTemporal()
                inputCorreo.classList.remove("is-valid");
            }
        }
        else {
            Toast.fire("Hubo un error, comuniquese con Administración o intentelo nuevamente","","warning")
            $("#formNuevoUsuario")[0].reset();
            crearClaveTemporal()
            inputCorreo.classList.remove("is-valid");
        }
            }
    }
})

verUsuarios()
function verUsuarios(){
$("#tblUsuarios").dataTable( {
    "ajax":{
        "url":"scripts/php/usuarios.php?consulta=verUsuarios",
        "dataSrc":""
    },
    "columns":[
        {"data":"id", visible:false},
        {"data":"nombre"},
        {"data":"email"},
        {"data":"estado"},
        {"data":"activo"},
        {"data":"accion"}
    ],
    order:[[0,'asc']]


})
}

function reiniciaTabla(){
    $("#tblUsuarios").DataTable().destroy();
    verUsuarios()
}


function BorrarUsuario(id){
    let estado =0;
    Toast2.fire({
   icon:'warning',
   title:'¿desea dar de baja al usuario?',
   confirmButtonText: 'Si',
   showDenyButton: true,
   denyButtonText: 'Cancelar'
    }).then((resultado) =>{
     if(resultado.isConfirmed) 
     {
        var ajax = new XMLHttpRequest();
        var metodo ="GET";
        var url = 'scripts/php/usuarios.php?consulta=bajaUsuario&id='+id+'&estado='+estado+'&activo=0';
        var asyn = true;
        ajax.open(metodo, url, asyn);
        ajax.send();
        ajax.onreadystatechange = function(){
        if(this.readyState ==4 && this.status ==200) {
        var datos =this.responseText;
        if(datos =="ok") {
            Toast.fire("Usuario Dado de Baja", "", "success")
            reiniciaTabla();
        }
        else if(datos=="error"){
            Toast.fire("Error, consulte con administración","","warning")
        }
        }
    }
}
   })
   }

   function ActivarCuenta(id){
    let estado =1;
    Toast2.fire({
   icon:'warning',
   title:'¿desea activar nuevamente la cuenta?',
   confirmButtonText: 'Si',
   showDenyButton: true,
   denyButtonText: 'Cancelar'
    }).then((resultado) =>{
     if(resultado.isConfirmed) 
     {
        var ajax = new XMLHttpRequest();
        var metodo ="GET";
        var url = 'scripts/php/usuarios.php?consulta=bajaUsuario&id='+id+'&estado='+estado+'&activo=0';
        var asyn = true;
        ajax.open(metodo, url, asyn);
        ajax.send();
        ajax.onreadystatechange = function(){
        if(this.readyState ==4 && this.status ==200) {
        var datos =this.responseText;
        if(datos =="ok") {
            Toast.fire("Usuario en linea nuevamente!", "", "success")
            reiniciaTabla();
            setTimeout(function() {
                enviarCorreo(id)},2000)
            
        }
        else if(datos=="error"){
            Toast.fire("Error, consulte con administración","","warning")
        }
        }
    }
}
   })
   }

   function enviarCorreo(id){
 var claveTemp = crearClaveTemporal2()
 
   var ajax = new XMLHttpRequest;
   var metodo = "GET";
   var url = 'scripts/php/usuarios.php?consulta=EnviarCorreo&id='+id+'&claveTemp='+claveTemp;
   var asyn = true;
   ajax.open(metodo, url, asyn);
   ajax.send();
   ajax.onreadystatechange = function(){
    if(this.readyState == 4 && this.status==200) {
        if(this.response =='ok')
        Toast.fire("Se ha envíado un correo al usuario con una contraseña nueva!","","warning")
        else {
            Toast.fire("hubo un error al envíar la nueva contraseña!","","error")
        }

    } else {Toast.fire("hubo un error al envíar el correo!","","")}
   }

   }

   
function crearClaveTemporal2(){
const especiales = "!#$%&/()?¿¡"
function generateString(length) {
    let result = '';
    const largoEspeciales = especiales.length;
    for ( let i = 0; i < length; i++ ) {
        result += especiales.charAt(Math.floor(Math.random() * largoEspeciales));
    }
    return result;
}
let especial = generateString(1);
   clave = Math.random().toString(36).slice(6)
     claveTemporal= especial+clave
    return claveTemporal
}

function olvidoClave(id){
    Toast2.fire({
        icon:'warning',
        title:'¿desea enviar nueva clave?, si acepta la clave anterior quedará inhabilitada!',
        confirmButtonText: 'Si',
        showDenyButton: true,
        denyButtonText: 'Cancelar'
         }).then((resultado) =>{
          if(resultado.isConfirmed) 
          {
            enviarCorreo(id)
            reiniciaTabla()
          }
})
}