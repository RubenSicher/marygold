// function agregarUsuario(){

//     $.ajax({
//        url:"scripts/php/admin_guardaUsuarios.php",
//        method: "POST",
//        cache: false,
//        data: {comm:'agregaClienteCredito', idReg:$("#idventa").text(), idCliente:id },
//        dataType: "json"
//     }).done(function(rest){
      
//       $.each(rest.data, function (i, item) {
//         if(item.ok == "ok"){
//           $("#divClienteCredito, #divTipoVenta").show()
//           $("#txtNombreClienteCredito").text(item.nombre_cliente)
//           $("#modCredito").modal("hide")
//         }else {
//           alert("Error al agregar al cliente a la venta de crédito, consulte al administrador del sistema")
//         } 
//       })
      
//     }) 
  
//   }