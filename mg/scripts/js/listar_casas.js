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
                                            <h3 class="title">New Central Garden</h3>\
                                            <span><a href="javascript:openDate('+item.id+')">view date</a></span>\
                                            <h5>'+item.price+' USD <p> night</p></h5>\
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


var fechasNOdisponibles = []

function openDate(idCasa){
    $.ajax({
        url:"scripts/php/listar_casas.php",
        cache: false,
        data: {comm:"fechasNOdisponibles", idCasa:idCasa},
        dataType: "json",
        method: "POST"
    }).done(function(rest){
        $.each(rest.data, function (i, item) {
            fecha_salida = new Date(item.fecha_salida)
            fecha_llegada = new Date(item.fecha_llegada)
            
            while(fecha_salida.getTime() >= fecha_llegada.getTime()){
                fecha_llegada.setDate(fecha_llegada.getDate() + 1);
                console.log(fecha_llegada.getDate() + '/' + (fecha_llegada.getMonth() + 1) + '/' + fecha_llegada.getFullYear());

                if (fecha_llegada.getMonth() + 1 <= 9 ){
                    mes = ("0"+String(fecha_llegada.getMonth()+1))
                }else{
                    mes = String(fecha_llegada.getMonth()+1)
                }

                if ( fecha_llegada.getDate() <= 9){
                    dia = ('0'+String(fecha_llegada.getDate()))
                }else{
                    dia = String(fecha_llegada.getDate())
                }
                fechas = dia + '/' + mes + '/' + fecha_llegada.getFullYear()
                fechasNOdisponibles.push(fechas)
            }

        })
        console.log(fechasNOdisponibles)
        bloquearDias(fechasNOdisponibles)
        $("#modal_fechasDisponibles").modal("show")
    })
}

function bloquearDias(fechasNoDisp){
    hoy = new Date()
    if (hoy.getMonth() + 1 <= 9 ){
        mes = ("0"+String(hoy.getMonth()+1))
    }else{
        mes = String(hoy.getMonth()+1)
    }

    if ( hoy.getDate() <= 9){
        dia = ('0'+String(hoy.getDate()))
    }else{
        dia = String(hoy.getDate())
    }
    fechaSol = mes+'/'+dia+'/'+hoy.getFullYear()
    console.log(fechaSol)

    // jQuery('#fecha_llegada, #fecha_salida').datepicker({
    //     minDate: new Date(),
    //   });

    $("#fecha_llegada").datepicker({
        changeMonth : true,
        changeYear : true,
        autoclose: true,
        firstDay : 1,
        startDate: '-1d',
        todayHighlight: true,
        // minDate : -1,
        // yearRange : '2022:' + String((new Date()).getFullYear() + 1),
        format: "dd/mm/yyyy",
        language: "en",
        datesDisabled: fechasNoDisp,
    });

    $("#fecha_salida").datepicker({
        changeMonth : true,
        changeYear : true,
        autoclose: true,
        firstDay : 1,
        todayHighlight: true,
        // minDate : new Date(2005, 0, 1),
        // startDate: '24/07/2023',
        // yearRange : '2022:' + String((new Date()).getFullYear() + 1),
        format: "dd/mm/yyyy",
        language: "en",
        datesDisabled: fechasNoDisp,
    });
    
}

jQuery(document).on('change', '#fecha_llegada', () => {
    // var element = event.target;
    // console.log(element.value);
    f = $("#fecha_llegada").val()
    cadena = f.split("/")
    console.log(cadena)
    ff = cadena[0]+"/"+cadena[1]+"/"+cadena[2]
    console.log(ff)
    jQuery('#fecha_salida').datepicker('setStartDate', ff);
});

jQuery(document).on('change', '#fecha_salida', () => {
    fs = $("#fecha_salida").val()
    cadena_salida = fs.split("/")
    console.log(cadena_salida)
    ffs = cadena_salida[0]+"/"+cadena_salida[1]+"/"+cadena_salida[2]
    console.log(ffs)
    jQuery('#fecha_llegada').datepicker('setEndDate', ffs);
})


