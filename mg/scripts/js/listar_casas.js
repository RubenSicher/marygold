//  setTimeout(function(){
//    window.addEventListener("load", (event)=>{listarCasas()}) 
//    },1500)   


var lista_casas
var lista_bloques
var cont = 1
var bloque
var display
var bloque_ant = 0

function listarCasas(idMod){
    lista_casas = ""
    lista_bloques = ""
    cont = 1
    bloque_ant = 0
    $.ajax({
        url:"scripts/php/listar_casas.php",
        cache: false,
        data: {comm:"listarCasas", modelo:idMod},
        dataType: "json",
        method: "POST"
    }).done(function(rest){
        $.each(rest.data, function (i, item) {
            
            // obtenemos las casas del modelo seleccionado
            if( cont <=20){
                bloque = 1
                display = ''
            }else if (cont>20 && cont <=40) {
                bloque = 2
                display = 'style="display:none;"'
            }else if (cont>40 && cont <=60) {
                bloque = 3
                display = 'style="display:none;"'
            }else if (cont>60 && cont <=80) {
                bloque = 4
                display = 'style="display:none;"'
            }else if (cont>80 && cont <=100) {
                bloque = 5
                display = 'style="display:none;"'
            }else if (cont>100 && cont <=120) {
                bloque = 6
                display = 'style="display:none;"'
            }


            cont += 1
            lista_casas += '<div class="col-xl-3 col-lg-4 col-md-6 bloque'+bloque+'" '+display+'>\
                                    <div class="project-item">\
                                        <div class="project-thumb">\
                                            <a href="#"><img src="'+item.src_image+'" style="width:100%; height:175px"></a>\
                                        </div>\
                                        <div class="project-content">\
                                            <h3 class="title"><a href="project-details.html">New Central Garden</a></h3>\
                                            <span>Baltimore, MD</span>\
                                        </div>\
                                    </div>\
                                </div>'

            if(bloque_ant != bloque){
                lista_bloques += '<li class="page-item"><a class="page-link btnBloque" data-bloque='+bloque+'>'+bloque+'</a></li>'
                bloque_ant = bloque
            }
            
            
    
        })

        $("#listaCasas").html(lista_casas)
        $("#listBloques").html(lista_bloques)       
        
    })
}


$(".btnModelo").on("click", function(){
    id_modelo = $(this).attr("data-mod")
    console.log(id_modelo)
    $("#divModelos").hide()
    $(".titulo_tipoModelo").text("MODELO "+id_modelo)
    $("#divCasas, #divTituloModelo").show()

    listarCasas(id_modelo)
})


$("#listBloques").on("click", ".btnBloque", function(){
    bloque_seleccionado = $(this).attr("data-bloque")
    console.log(bloque_seleccionado)

    for(i=1; i<=bloque; i++){
        console.log(i)
        $(".bloque"+i).hide()
    }

    $(".bloque"+bloque_seleccionado).show()
})


$("#backModelos").click(function(){
    $("#divModelos").show()
    $("#divCasas, #divTituloModelo").hide()

})