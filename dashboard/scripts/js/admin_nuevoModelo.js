


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



$(document).ready(function(e){
  $("#formModelos").on('submit', function(e){
      e.preventDefault();

      if($("#idReg").val()==0){
          // Agregamos un nuevo modelo
          $.ajax({
              type: 'POST',
              url: 'scripts/php/admin_nuevoModelo.php?com=nuevo_modelo',
              data: new FormData(this),
              contentType: false,
              cache: false,
              processData:false,
              dataType: 'json',
              beforeSend: function(){
                  $('.submitBtn').attr("disabled","disabled");
                  $('#formCasas').css("opacity",".5");
              }
             
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
                  $('#formModelos').css("opacity","");
                  $(".submitBtn").removeAttr("disabled");
                  $("#uploadImage").show()
                  $("#imageHouse").hide()
                  $("#txtImage_house").val("")
                  $("#idReg").val(0)
                  $("#tblListadoModelos").DataTable().ajax.reload();
              })
          });

      }else if($("#idReg").val()>0){
          // Editamos el modelo
          $.ajax({
              type: 'POST',
              url: 'scripts/php/admin_nuevoModelo.php?com=edita_modelo',
              data: new FormData(this),
              contentType: false,
              cache: false,
              processData:false,
              dataType: "json",
              beforeSend: function(){
                  $('.submitBtn').attr("disabled","disabled");
                  $('#formCasas').css("opacity",".5");
              }
             
          }).done(function(rest){
              console.log(rest)
              $.each(rest.data, function (i, item) {
                  $('.statusMsg').html('');
                  if(item.ok == 'ok'){
                      $('.statusMsg').html('<span style="font-size:18px;color:#34A853">Form data submitted successfully.</span>');
                  }else if(item.ok == 'err'){
                      $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred in database, please try again.</span>');
                  }else if(item.ok == 'noData'){
                      $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred, missing data to enter.</span>');
                  }
                  $('#formModelos')[0].reset();
                  $('#formCasas').css("opacity","");
                  $(".submitBtn").removeAttr("disabled");
                  $("#uploadImage").show()
                  $("#imageHouse").hide()
                  $("#txtImage_house").val("")
                  $("#idReg").val(0)
                  $("#tblListadoModelos").DataTable().ajax.reload();                    
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

function listarModelos(){
  $('#tblListadoModelos').dataTable({
      destroy: true,
      retrieve: true,
      responsive: true,
      ajax: 'scripts/php/admin_nuevoModelo.php?com=listarModelos',
      processing: true,
      type: 'POST',
    
        "oLanguage": {
    "sUrl": "./libs/datatables/tableLanguaje.txt"
    },
    "lengthMenu":   [[5, 10, 20, 50, -1], [5, 10, 20, 50, "Todos"]],
    "iDisplayLength": 5,
      columns: [
        { data: "id"},
        { data: "data_model"},
        { data: "image_house"}
      ],
       order:[[0,"asc"]],
    });
}

listarModelos()

$("#btnDeleteImage").click(function(){
  name_image = $("#txtImage_house").val()
  idRegistro = $("#idReg").val()

  $.ajax({
      url:"scripts/php/admin_nuevoModelo.php",
      cache: false,
      data: {comm:"DeleteImage", name_image:name_image, idReg:idRegistro},
      dataType: "json",
      method: "POST"
  }).done(function(rest){
       $.each(rest.data, function (i, item) {
          if (item.ok == "ok"){
              alert("Delete image correctly")
              $("#txtImage_house").val("")
              $("#imgUpload").attr('src', '')
              $("#uploadImage").show()
              $("#imageHouse").hide()
          }else if (item.ok == "noOk"){
              alert("Error, the image was not removed")
          }
       })
  })
})


var idRegistro

$("#tblListadoModelos").on( "click", "#btnEditModel", function(){
    //Buscamos los datos de la casa a editar
    idRegistro = $(this).attr("data-id")
    $.ajax({
        url:"scripts/php/admin_nuevoModelo.php",
        cache: false,
        data: {comm:"buscaDataModel", idReg:idRegistro},
        dataType: "json",
        method: "POST"
    }).done(function(rest){
         $.each(rest.data, function (i, item) {
            $("#idReg").val(item.id)
            $("#txtNombreModelo").val(item.nombre)
                        
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


$("#tblListadoModelos").on( "click", "#btnDeleteModel", function(){
  if (confirm("This action will delete the record, are you sure?")) {
      idRegistro = $(this).attr("data-id")
      // obtenemos el src de la imagen para buscarla en el server y eliminarla
      src_imagen = $("#img"+idRegistro).attr("src")
      name_image_array = src_imagen.split('/')
      name_imagen = name_image_array[2]
      console.log(name_imagen)
      $.ajax({
          url:"scripts/php/admin_nuevoModelo.php",
          cache: false,
          data: {comm:"eliminaDataModel", idReg:idRegistro, src_imagen:name_imagen},
          dataType: "json",
          method: "POST"
      }).done(function(rest){
           $.each(rest.data, function (i, item) {
                           
              if (item.ok=='ok') {
                  alert("se elimino el registro")

              }else if (item.ok = 'noOk') {
                  alert("No se elimino el registro")
              }
              $("#tblListadoModelos").DataTable().ajax.reload();  
           })
      })
  }else{
      console.log("no borrar")
  }
})