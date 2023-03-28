
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
            console.log(datos)
            
            if(datos.ok=='ok'){
          Toast.fire("usuario Agregado Correctamente!","","success")
          $("#formNuevoUsuario")[0].reset();
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
