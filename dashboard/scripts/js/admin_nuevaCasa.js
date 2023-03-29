$(document).ready(function(e){
    $("#formCasas").on('submit', function(e){
        e.preventDefault();

        if($("#idReg").val()==0){
            // Agregamos una nueva propiedad
            $.ajax({
                type: 'POST',
                url: 'scripts/php/admin_nueva_casa.php?com=nueva_casa',
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData:false,
                dataType: 'json',
                beforeSend: function(){
                    $('.submitBtn').attr("disabled","disabled");
                    $('#formCasas').css("opacity",".5");
                }
                // success: function(msg){
                //     console.log(msg)
                //     $.each(msg.data, function (i, item) {
                //         $('.statusMsg').html('');

                //         if(item.ok == 'ok'){
                //             $('#formCasas')[0].reset();
                //             $('.statusMsg').html('<span style="font-size:18px;color:#34A853">Form data submitted successfully.</span>');
                //         }else if(item.ok == 'err'){
                //             $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred in database, please try again.</span>');
                //         }else if(item.ok == 'noData'){
                //             $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred, missing data to enter.</span>');
                //         }
                //         $('#formCasas').css("opacity","");
                //         $(".submitBtn").removeAttr("disabled");
                //     })
                    
                // }
            }).done(function(rest){
                console.log(rest)
                $.each(rest.data, function (i, item) {
                    $('.statusMsg').html('');
                    if(item.ok == 'ok'){
                        $('#formCasas')[0].reset();
                        $('.statusMsg').html('<span style="font-size:18px;color:#34A853">Form data submitted successfully.</span>');
                    }else if(item.ok == 'err'){
                        $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred in database, please try again.</span>');
                    }else if(item.ok == 'noData'){
                        $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred, missing data to enter.</span>');
                    }
                    $('#formCasas').css("opacity","");
                    $(".submitBtn").removeAttr("disabled");
                    $("#uploadImage").show()
                    $("#imageHouse").hide()
                    $("#txtImage_house").val("")
                    $("#idReg").val(0)
                    $("#tblListadoCasas").DataTable().ajax.reload();
                })
            });

        }else if($("#idReg").val()>0){
            // Editamos la propiedad
            $.ajax({
                type: 'POST',
                url: 'scripts/php/admin_nueva_casa.php?com=edita_casa',
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData:false,
                dataType: "json",
                beforeSend: function(){
                    $('.submitBtn').attr("disabled","disabled");
                    $('#formCasas').css("opacity",".5");
                }
                // success: function(msg){
                //     console.log(msg)
                //     $.each(msg.data, function (i, item) {
                //         $('.statusMsg').html('');
                //         if(item.ok == 'ok'){
                //             $('#formCasas')[0].reset();
                //             $('.statusMsg').html('<span style="font-size:18px;color:#34A853">Form data submitted successfully.</span>');
                //         }else if(item.ok == 'err'){
                //             $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred in database, please try again.</span>');
                //         }else if(item.ok == 'noData'){
                //             $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred, missing data to enter.</span>');
                //         }
                //         $('#formCasas').css("opacity","");
                //         $(".submitBtn").removeAttr("disabled");
                //         $("#uploadImage").show()
                //         $("#imageHouse").hide()
                //         $("#txtImage_house").val("")
                //         $("#idReg").val(0)
                //     })
                    
                // }
            }).done(function(rest){
                console.log(rest)
                $.each(rest.data, function (i, item) {
                    $('.statusMsg').html('');
                    if(item.ok == 'ok'){
                        $('#formCasas')[0].reset();
                        $('.statusMsg').html('<span style="font-size:18px;color:#34A853">Form data submitted successfully.</span>');
                    }else if(item.ok == 'err'){
                        $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred in database, please try again.</span>');
                    }else if(item.ok == 'noData'){
                        $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred, missing data to enter.</span>');
                    }
                    $('#formCasas').css("opacity","");
                    $(".submitBtn").removeAttr("disabled");
                    $("#uploadImage").show()
                    $("#imageHouse").hide()
                    $("#txtImage_house").val("")
                    $("#idReg").val(0)
                    
                })
            });
        }
        
    });
    
    //file type validation
    $("#file").change(function() {
        var file = this.files[0];
        var imagefile = file.type;
        var match= ["image/jpeg","image/png","image/jpg"];
        if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]))){
            alert('Please select a valid image file (JPEG/JPG/PNG).');
            $("#file").val('');
            return false;
        }
    });
});


function listarCasas(){
    $('#tblListadoCasas').dataTable({
        destroy: true,
        retrieve: true,
        responsive: true,
        ajax: 'scripts/php/admin_nueva_casa.php?com=listarCasas',
        processing: true,
        type: 'POST',
      
          "oLanguage": {
      "sUrl": "./libs/datatables/tableLanguaje.txt"
      },
      "lengthMenu":   [[5, 10, 20, 50, -1], [5, 10, 20, 50, "Todos"]],
      "iDisplayLength": 5,
        columns: [
          { data: "id"},
          { data: "data_house"},
          { data: "image_house"}
        ],
         order:[[0,"asc"]],
      });
}

listarCasas()

var idRegistro

$("#tblListadoCasas").on( "click", "#btnEditHouse", function(){
    //Buscamos los datos de la casa a editar
    idRegistro = $(this).attr("data-id")
    $.ajax({
        url:"scripts/php/admin_nueva_casa.php",
        cache: false,
        data: {comm:"buscaDataHouse", idReg:idRegistro},
        dataType: "json",
        method: "POST"
    }).done(function(rest){
         $.each(rest.data, function (i, item) {
            $("#idReg").val(item.id)
            $("#txtNombreCasa").val(item.name_house)
            $("#txtDireccion").val(item.address_house)
            $("#txtDescripcion").val(item.description)
            $("#txtTamanoPropiedad").val(item.property_size)
            $("#txtPrecio").val(item.price)
            $("#cboTipoCasa").val(item.type_house)
            $("#txtTamanoPlano").val(item.flat_size)
            $("#cboEstadoCasa").val(item.status_house)
            $("#imgUpload").attr("src", item.src_image)
            $("#txtImage_house").val(item.image_house)
            $("#uploadImage").hide()
            $("#imageHouse").show()
         })
    })
})