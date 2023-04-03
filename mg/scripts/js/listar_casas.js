listarCasas()

var lista_casas
var contenido_casas

function listarCasas(){
    lista_casas = ""
    contenido_casas = ""
    $.ajax({
        url:"scripts/php/listar_casas.php",
        cache: false,
        data: {comm:"listarCasas"},
        dataType: "json",
        method: "POST"
    }).done(function(rest){
        $.each(rest.data, function (i, item) {
            lista_casas += '<div class="item">\
                                <div class="banner-img-item">\
                                    <img src="'+item.src_image+'" alt="">\
                                </div>\
                            </div>'

            contenido_casas += '<div class="banner-content">\
            <span class="sub-title" data-animation-in="fadeInDown" data-delay-in=".2" data-duration-in=".6">'+item.name_house+'</span>\
            <h2 class="title" data-animation-in="fadeInDown" data-delay-in=".2" data-duration-in=".6">Bala Cynwyd Shopping Center</h2>\
            <p data-animation-in="fadeInUp" data-delay-in=".4" data-duration-in=".6">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui</p>\
            <ul class="list-wrap" data-animation-in="fadeInUp" data-delay-in=".6" data-duration-in=".6">\
                <li>\
                    <div class="icon"><i class="flaticon-018-rescale"></i></div>\
                    <div class="content">\
                        <p>Property size <br>174,000 sqft</p>\
                    </div>\
                </li>\
                <li>\
                    <div class="icon"><i class="flaticon-009-crane-truck"></i></div>\
                    <div class="content">\
                        <p>Status <br> Completed</p>\
                    </div>\
                </li>\
                <li>\
                    <div class="icon"><i class="flaticon-008-money-bag"></i></div>\
                    <div class="content">\
                        <p>Price Range <br>$10K - $50K</p>\
                    </div>\
                </li>\
                <li>\
                    <div class="icon"><i class="flaticon-017-apartment"></i></div>\
                    <div class="content">\
                        <p>Type <br> Community</p>\
                    </div>\
                </li>\
            </ul>\
            <a href="project-details.html" class="btn" data-animation-in="fadeInUp" data-delay-in=".6" data-duration-in=".6">\
                <div class="btn_m">\
                    <div class="btn_c">\
                        <div class="btn_t1">View details</div>\
                        <div class="btn_t2">View details</div>\
                    </div>\
                </div>\
            </a>\
        </div>'
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
        $("#banner_lista_casas").html(lista_casas)
        $("#banner_content_casas").html(contenido_casas)        
    })
}

