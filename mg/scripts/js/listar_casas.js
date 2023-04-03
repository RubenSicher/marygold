listarCasas()

var idRegistro

function listarCasas(){
    //Buscamos los datos de la casa a editar
    idRegistro = $(this).attr("data-id")
    $.ajax({
        url:"scripts/php/listar_casas.php",
        cache: false,
        data: {comm:"listarCasas"},
        dataType: "json",
        method: "POST"
    }).done(function(rest){
        $.each(rest.data, function (i, item) {
            // $("#idReg").val(item.id)
            // $("#txtNombreCasa").val(item.name_house)
            // $("#txtDireccion").val(item.address_house)
            // $("#txtDescripcion").val(item.description)
            // $("#txtTamanoPropiedad").val(item.property_size)
            // $("#txtPrecio").val(item.price)
            // $("#cboTipoCasa").val(item.type_house)
            // $("#txtTamanoPlano").val(item.flat_size)
            // $("#cboEstadoCasa").val(item.status_house)
            
            // if(item.src_image != ""){
            //     $("#imgUpload").attr("src", item.src_image)
            //     $("#txtImage_house").val(item.image_house)
            //     $("#uploadImage").hide()
            //     $("#imageHouse").show()
            // }else{
            //     $("#imgUpload").attr("src", "")
            //     $("#txtImage_house").val("")
            //     $("#uploadImage").show()
            //     $("#imageHouse").hide()
            // }
        })
    })
}

