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
                        // $('.statusMsg').html('<span style="font-size:18px;color:#34A853">Form data submitted successfully.</span>');
                        Toast.fire("Se guardo correctamente", "","success")
                    }else if(item.ok == 'err'){
                        // $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred in database, please try again.</span>');
                        Toast.fire("Ocurrio un problema en la base de datos", "","warning")
                    }else if(item.ok == 'noData'){
                        // $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred, missing data to enter.</span>');
                        Toast.fire("Ocurrio un problema, datos perdidos", "","warning")
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
                        Toast.fire("Actualizado correctamente", "","success")
                        // $('.statusMsg').html('<span style="font-size:18px;color:#34A853">Form data submitted successfully.</span>');
                    }else if(item.ok == 'err'){
                        Toast.fire("Ocurrio un problema en la base de datos", "","warning")
                        // $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred in database, please try again.</span>');
                    }else if(item.ok == 'noData'){
                        Toast.fire("Ocurrio un problema, datos perdidos", "","warning")
                        // $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred, missing data to enter.</span>');
                    }
                    $('#formCasas')[0].reset();
                    $('#formCasas').css("opacity","");
                    $(".submitBtn").removeAttr("disabled");
                    $("#uploadImage").show()
                    $("#imageHouse").hide()
                    $("#txtImage_house").val("")
                    $("#idReg").val(0)
                    $("#tblListadoCasas").DataTable().ajax.reload();                    
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
            // alert('Please select a valid image file (JPEG/JPG/PNG).');
            Toast.fire("Selecciona una imagen valida (JPEG/JPG/PNG)", "","warning")
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

$("#btnDeleteImage").click(function(){
    name_image = $("#txtImage_house").val()
    idRegistro = $("#idReg").val()

    $.ajax({
        url:"scripts/php/admin_nueva_casa.php",
        cache: false,
        data: {comm:"DeleteImage", name_image:name_image, idReg:idRegistro},
        dataType: "json",
        method: "POST"
    }).done(function(rest){
         $.each(rest.data, function (i, item) {
            if (item.ok == "ok"){
                // alert("Delete image correctly")
                Toast.fire("Se borró imagen", "","success")
                $("#txtImage_house").val("")
                $("#imgUpload").attr('src', '')
                $("#uploadImage").show()
                $("#imageHouse").hide()
            }else if (item.ok == "noOk"){
                Toast.fire("Error, la imagen no fue eliminada", "","error")
                // alert("Error, the image was not removed")
            }
         })
    })
})

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
            $("#cboModeloCasa").val(item.modelo)
            
            if(item.src_image != ""){
                $("#imgUpload").attr("src", item.src_image)
                $("#txtImage_house").val(item.image_house)
                $("#uploadImage").hide()
                $("#imageHouse").show()
            }else{
                $("#imgUpload").attr("src", "")
                $("#txtImage_house").val("")
                $("#uploadImage").show()
                $("#imageHouse").hide()
            }
            
            
         })
    })
})

var src_imagen

$("#tblListadoCasas").on( "click", "#btnDeleteHouse", function(){
    if (confirm("This action will delete the record, are you sure?")) {
        idRegistro = $(this).attr("data-id")
        // obtenemos el src de la imagen para buscarla en el server y eliminarla
        src_imagen = $("#img"+idRegistro).attr("src")
        name_image_array = src_imagen.split('/')
        name_imagen = name_image_array[2]
        console.log(name_imagen)
        $.ajax({
            url:"scripts/php/admin_nueva_casa.php",
            cache: false,
            data: {comm:"eliminaDataHouse", idReg:idRegistro, src_imagen:name_imagen},
            dataType: "json",
            method: "POST"
        }).done(function(rest){
             $.each(rest.data, function (i, item) {
                             
                if (item.ok=='ok') {
                    // alert("se elimino el registro")
                    Toast.fire("Se eliminón el registro", "","success")

                }else if (item.ok = 'noOk') {
                    // alert("No se elimino el registro")
                    Toast.fire("Ocurrio un error, no se elimino el registro", "","error")
                }
                $("#tblListadoCasas").DataTable().ajax.reload();  
             })
        })
    }else{
        console.log("no borrar")
    }
})


$.ajax({
    method: "POST",
    url:"scripts/php/admin_nuevoModelo.php",
    cache: false,
    dataType: "json",
    data: {comm:"getModelos"}
}).done(function(rest){
    //rest.tipo
  $.each(rest.data, function (i, item) {
    $('#cboModeloCasa').append(new Option(item.nombre, item.id));
  });
})


$("#tblListadoCasas").on( "click", "#btnGalleryHouse", function(){
    idRegistro = $(this).attr("data-id")

    $("#imagen_galeria1,#imagen_galeria2,#imagen_galeria3,#imagen_galeria4,#imagen_galeria5,#imagen_galeria6").attr("src", "")
    $("#name_image1,#name_image2,#name_image3,#name_image4,#name_image5,#name_image6").val("")

    $.ajax({
        method: "POST",
        url:"scripts/php/admin_nueva_casa.php",
        cache: false,
        dataType: "json",
        data: {comm:"getGallery", idReg:idRegistro}
    }).done(function(rest){

      $.each(rest.data, function (i, item) {
        
        if(item.image1 != ""){
            $("#imagen_galeria1").attr("src", item.image1)
            $("#name_image1").val(item.name_image1)
            $("#div_upload1").hide()
            $("#div_imagen_galeria1").show()
        }else{
            $("#div_upload1").show()
            $("#div_imagen_galeria1").hide()
            $("#name_image1").val("")
        }

        if(item.image2 != ""){
            $("#imagen_galeria2").attr("src", item.image2)
            $("#name_image2").val(item.name_image2)
            $("#div_upload2").hide()
            $("#div_imagen_galeria2").show()
        }else{
            $("#div_upload2").show()
            $("#div_imagen_galeria2").hide()
            $("#name_image2").val("")
        }

        if(item.image3 != ""){
            $("#imagen_galeria3").attr("src", item.image3)
            $("#name_image3").val(item.name_image3)
            $("#div_upload3").hide()
            $("#div_imagen_galeria3").show()
        }else{
            $("#div_upload3").show()
            $("#div_imagen_galeria3").hide()
            $("#name_image3").val("")
        }

        if(item.image4 != ""){
            $("#imagen_galeria4").attr("src", item.image4)
            $("#name_image4").val(item.name_image4)
            $("#div_upload4").hide()
            $("#div_imagen_galeria4").show()
        }else{
            $("#div_upload4").show()
            $("#div_imagen_galeria4").hide()
            $("#name_image4").val("")
        }

        if(item.image5 != ""){
            $("#imagen_galeria5").attr("src", item.image5)
            $("#name_image5").val(item.name_image5)
            $("#div_upload5").hide()
            $("#div_imagen_galeria5").show()
        }else{
            $("#div_upload5").show()
            $("#div_imagen_galeria5").hide()
            $("#name_image5").val("")
        }
        
        if(item.image6 != ""){
            $("#imagen_galeria6").attr("src", item.image6)
            $("#name_image6").val(item.name_image6)
            $("#div_upload6").hide()
            $("#div_imagen_galeria6").show()
        }else{
            $("#div_upload6").show()
            $("#div_imagen_galeria6").hide()
            $("#name_image6").val("")
        }


      });

      $("#modalGallery").modal("show")
    })

    
})

var cual_imagen

$(".btn_imagen").click(function(){
    
    cual_imagen =  $(this).attr("data-id")
    console.log(cual_imagen)

    document.getElementById("fileTypeImage"+cual_imagen).click();  
    
})



function validar(){
    
    if (cual_imagen == 1 || cual_imagen == 2 || cual_imagen == 3 || cual_imagen == 4 || cual_imagen == 5 || cual_imagen == 6 ){
        console.log($("#fileTypeImage"+cual_imagen).val())
        guardarImagen_galeria()
    }else{
        console.log("SIN VALIDAR")
    }
}

function guardarImagen_galeria(){
    const form = document.getElementById("formImage"+cual_imagen)
    formData = new FormData(form)
    formData.append("idReg",idRegistro) 
    formData.append("cual_imagen",cual_imagen)
    
    $.ajax({
        type: 'POST',
        url: 'scripts/php/admin_nueva_casa.php?com=guardaGaleria',
        data: formData,
        contentType: false,
        cache: false,
        processData:false,
        dataType: 'json'        
    }).done(function(rest){
        console.log(rest)
        $.each(rest.data, function (i, item) {
            
            if(item.ok == 'ok'){
                // $('#formCasas')[0].reset();
                // $('.statusMsg').html('<span style="font-size:18px;color:#34A853">Form data submitted successfully.</span>');
                
                if(item.si_subio == ""){
                    Toast.fire("Ocurrio un problema al subir la imagen", "","warning")    
                }else{
              
                    Toast.fire("Se guardo correctamente", "","success")
                    $("#imagen_galeria"+cual_imagen).attr("src","./imagenes/galeria/"+item.si_subio)
                    $("#div_upload"+cual_imagen).hide()
                    $("#div_imagen_galeria"+cual_imagen).show()
                    $("#name_image"+cual_imagen).val(item.si_subio)

                }
            }else if(item.ok == 'err'){
                // $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred in database, please try again.</span>');
                Toast.fire("Ocurrio un problema en la base de datos", "","warning")
            }else if(item.ok == 'noData'){
                // $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred, missing data to enter.</span>');
                Toast.fire("Ocurrio un problema, datos perdidos", "","warning")
            }
            // $('#formCasas').css("opacity","");
            // $(".submitBtn").removeAttr("disabled");
            // $("#uploadImage").show()
            // $("#imageHouse").hide()
            // $("#txtImage_house").val("")
            // $("#idReg").val(0)
            
        })
    });

}

var id_image

$(".delete_image").click(function(){
    id_image = $(this).attr("data-id")
    name_image_gallery = $(this).next().val()
    console.log(id_image)
    console.log(idRegistro)
    console.log(name_image_gallery)


    $.ajax({
        url:"scripts/php/admin_nueva_casa.php",
        cache: false,
        data: {comm:"DeleteImageGallery", name_image_gallery:name_image_gallery, idReg:idRegistro, id_imagen:id_image},
        dataType: "json",
        method: "POST"
    }).done(function(rest){
        $.each(rest.data, function (i, item) {
            if (item.ok == "ok"){
                
                Toast.fire("Se borró imagen", "","success")
                $("#imagen_galeria"+id_image).attr("src","")
                $("#div_upload"+id_image).show()
                $("#div_imagen_galeria"+id_image).hide()
                $("#name_image"+id_image).val("")

            }else if (item.ok == "noOk"){
                Toast.fire("Error, la imagen no fue eliminada", "","error")
               
            }
        })
    })
    
})