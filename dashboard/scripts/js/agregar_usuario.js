
$("#btnGuardaUsuario").click(function(e){
    e.preventDefault()
    e.stopImmediatePropagation()

    $.ajax({
        url:"scripts/php/admin_guardaUsuarios.php",
        method: "POST",
        cache: false,
        data: {comm:'agregaUsuario', nombre:$("#txtNombre").val(), email:$("#txtCorreo").val(), clave:$("#txtPassword").val() },
        dataType: "json"
    }).done(function(rest){
        console.log(rest)
    //    $.each(rest.data, function (i, item) {
            
            if(rest.ok == "ok"){
                alert("Usuario registrado")
            }else {
                alert("Error al agregar al cliente a la venta de crédito, consulte al administrador del sistema")
            } 
    //    })
       
    }).fail(function(jqXHR,estado,error){
      console.log(estado);
      console.log(error);
    })
})

     
  
