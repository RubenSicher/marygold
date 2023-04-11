
function listarInteresados(){
    $('#tblListadoSolicitudes').dataTable({
        destroy: true,
        retrieve: true,
        responsive: true,
        ajax: 'scripts/php/admin_listarInteresados.php?com=listarInteresados',
        processing: true,
        type: 'POST',
      
          "oLanguage": {
      "sUrl": "./libs/datatables/tableLanguaje.txt"
      },
      "lengthMenu":   [[5, 10, 20, 50, -1], [5, 10, 20, 50, "Todos"]],
      "iDisplayLength": 5,
        columns: [
          { data: "id"},
          { data: "name"},
          { data: "phone"},
          { data: "date"},
          { data: "message"},
          { data: "status"},
          { data: "interested"}
        ],
         order:[[0,"asc"]],
      });
}

listarInteresados()

var idRegistro 
var change_attended

$("#tblListadoSolicitudes").on("click",".btnAttended",function(){
    idRegistro = $(this).attr("id")
    attended = $(this).attr("data-a")
    if(attended==1){
        msg = "Este resgistro cambiara a 'NO ATENDIDO'"
        change_attended = 0
    }else if(attended==0){
        msg = "Este resgistro cambiara a 'ATENDIDO'"
        change_attended = 1
    }

    if(confirm(msg)){
        $.ajax({
            url:"scripts/php/admin_listarInteresados.php",
            cache: false,
            data: {comm:"cambiaAttended", idReg:idRegistro, change_attended:change_attended},
            dataType: "json",
            method: "POST"
        }).done(function(rest){
             $.each(rest.data, function (i, item) {      
                if(item.ok = 'ok'){
                    console.log("cambio correcto")
                }else{
                    console.log("error")
                }
             })
             $("#tblListadoSolicitudes").DataTable().ajax.reload();  
        })
    }

})


$("#tblListadoSolicitudes").on("click",".btnInterested",function(){
    idRegistro = $(this).attr("id")
    $("#modalInteresado").modal("show")
})

$(".btnInteresado").click(function(){
    change_interested = $(this).attr("data-i")

    $.ajax({
        url:"scripts/php/admin_listarInteresados.php",
        cache: false,
        data: {comm:"cambiaInterested", idReg:idRegistro, change_interested:change_interested},
        dataType: "json",
        method: "POST"
    }).done(function(rest){
         $.each(rest.data, function (i, item) {      
            if(item.ok = 'ok'){
                console.log("cambio correcto")
            }else{
                console.log("error")
            }
         })
         $("#tblListadoSolicitudes").DataTable().ajax.reload();  
         $("#modalInteresado").modal("hide")
    })

})