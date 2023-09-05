
function listarReservacionesPendientes(){
  $('#tblListaPendientes').dataTable({
      destroy: true,
      retrieve: true,
      responsive: true,
      ajax: 'scripts/php/admin__reservaciones.php?com=listarReservacionesPendientes',
      processing: true,
      type: 'POST',
    
        "oLanguage": {
    "sUrl": "./libs/datatables/tableLanguaje.txt"
    },
    "lengthMenu":   [[5, 10, 20, 50, -1], [5, 10, 20, 50, "Todos"]],
    "iDisplayLength": 5,
      columns: [
        { data: "id"},
        { data: "cliente"},
        { data: "fecha_llegada"},
        { data: "fecha_salida"},
        { data: "nombre_casa"},
        { data: "direccion_casa"},
        { data: "modelo"},
        { data: "image_house"}
      ],
       order:[[0,"desc"]],
    });
}

listarReservacionesPendientes()

var idRegistro

$("#tblListaPendientes").on( "click", "#btnAutorizar", function(){
    //Buscamos los datos de la casa a editar
    idRegistro = $(this).attr("data-id")
    $.ajax({
        url:"scripts/php/admin__reservaciones.php",
        cache: false,
        data: {comm:"autorizacion", idReg:idRegistro, estado:1},
        dataType: "json",
        method: "POST"
    }).done(function(rest){
         console.log(rest)
         $.each(rest.data, function (i, item) {
            if(item.ok=="ok"){
              Toast.fire("authorized reservation", "","success")
              $("#tblListaPendientes").DataTable().ajax.reload(); 
              $("#tblListaAutorizadas").DataTable().ajax.reload();
            }else {
              //   alert("No se elimino el registro")
              Toast.fire("Error", "","error")
              $("#tblListaPendientes").DataTable().ajax.reload(); 
              $("#tblListaAutorizadas").DataTable().ajax.reload();
            }          
         })
    })
})


$("#tblListaPendientes").on( "click", "#btnNoAutorizar", function(){
  // if (confirm("This action will delete the record, are you sure?")) {
      idRegistro = $(this).attr("data-id")
      // obtenemos el src de la imagen para buscarla en el server y eliminarla
    
      $.ajax({
          url:"scripts/php/admin__reservaciones.php",
          cache: false,
          data: {comm:"autorizacion", idReg:idRegistro, estado:2},
          dataType: "json",
          method: "POST"
      }).done(function(rest){
           $.each(rest.data, function (i, item) {
                           
              if (item.ok=='ok') {
                //   alert("se elimino el registro")
                Toast.fire("unauthorized reservation", "","success")
                $("#tblListaPendientes").DataTable().ajax.reload();
                $("#tblListaNoAutorizadas").DataTable().ajax.reload();
              }else if (item.ok == 'err') {
                //   alert("No se elimino el registro")
                Toast.fire("Error", "","error")
                $("#tblListaPendientes").DataTable().ajax.reload();
                $("#tblListaNoAutorizadas").DataTable().ajax.reload();
              }

           })
      })
  // }else{
  //     console.log("no borrar")
  // }
})


function listarReservacionesAutorizadas(){
  $('#tblListaAutorizadas').dataTable({
      destroy: true,
      retrieve: true,
      responsive: true,
      ajax: 'scripts/php/admin__reservaciones.php?com=listarReservacionesAutorizadas',
      processing: true,
      type: 'POST',
    
        "oLanguage": {
    "sUrl": "./libs/datatables/tableLanguaje.txt"
    },
    "lengthMenu":   [[5, 10, 20, 50, -1], [5, 10, 20, 50, "Todos"]],
    "iDisplayLength": 5,
      columns: [
        { data: "id"},
        { data: "cliente"},
        { data: "fecha_llegada"},
        { data: "fecha_salida"},
        { data: "nombre_casa"},
        { data: "direccion_casa"},
        { data: "modelo"},
        { data: "image_house"}
      ],
       order:[[0,"asc"]],
    });
}

listarReservacionesAutorizadas()

function listarReservacionesNoAutorizadas(){
  $('#tblListaNoAutorizadas').dataTable({
      destroy: true,
      retrieve: true,
      responsive: true,
      ajax: 'scripts/php/admin__reservaciones.php?com=listarReservacionesNoAutorizadas',
      processing: true,
      type: 'POST',
    
        "oLanguage": {
    "sUrl": "./libs/datatables/tableLanguaje.txt"
    },
    "lengthMenu":   [[5, 10, 20, 50, -1], [5, 10, 20, 50, "Todos"]],
    "iDisplayLength": 5,
      columns: [
        { data: "id"},
        { data: "cliente"},
        { data: "fecha_llegada"},
        { data: "fecha_salida"},
        { data: "nombre_casa"},
        { data: "direccion_casa"},
        { data: "modelo"},
        { data: "image_house"}
      ],
       order:[[0,"asc"]],
    });
}

listarReservacionesNoAutorizadas()


$("#tblListaAutorizadas, #tblListaNoAutorizadas").on( "click", "#btnPendiente", function(){
  // if (confirm("This action will delete the record, are you sure?")) {
      idRegistro = $(this).attr("data-id")
      // obtenemos el src de la imagen para buscarla en el server y eliminarla
    
      $.ajax({
          url:"scripts/php/admin__reservaciones.php",
          cache: false,
          data: {comm:"autorizacion", idReg:idRegistro, estado:0},
          dataType: "json",
          method: "POST"
      }).done(function(rest){
           $.each(rest.data, function (i, item) {
                           
              if (item.ok=='ok') {
                //   alert("se elimino el registro")
                Toast.fire("pending reservation", "","success")
                $("#tblListaPendientes").DataTable().ajax.reload();
                $("#tblListaNoAutorizadas").DataTable().ajax.reload();
                $("#tblListaAutorizadas").DataTable().ajax.reload();
              }else if (item.ok == 'err') {
                //   alert("No se elimino el registro")
                Toast.fire("Error", "","error")
                $("#tblListaPendientes").DataTable().ajax.reload();
                $("#tblListaNoAutorizadas").DataTable().ajax.reload();
                $("#tblListaAutorizadas").DataTable().ajax.reload();
              }

           })
      })
  // }else{
  //     console.log("no borrar")
  // }
})