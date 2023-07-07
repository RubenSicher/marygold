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


function crear_inputFechas(idC){
    txtfechas = ""

    txtfechas = '<label>Arrival time</label>\
                <input class="form-control" id="fecha_llegada'+idC+'" type="text" data-provide="datepicker" autocomplete="off"/>\
                <label>Departure time</label>\
                <input class="form-control" id="fecha_salida'+idC+'" type="text" data-provide="datepicker" autocomplete="off"/>\
                <div style="text-align: center;" class="mb-5 mt-5">\
                    <button class="btn btn-primary" id="btnEnviarReservacion">Save changes</button>\
                </div>'

    $("#bodymodal_fechas").html(txtfechas)       
}

var fechasNOdisponibles = []
var idCasaGlobal

function openDate(idCasa){
    crear_inputFechas(idCasa)
    fechasNOdisponibles = []
    idCasaGlobal = idCasa
    // $('#fecha_llegada').val('').datepicker('update')
    // $("#fecha_llegada").datepicker("clearDates");
    // $('#fecha_llegada').datepicker('update','');
    // $('#fecha_llegada').val('').datepicker('destroy').datepicker();
    // $('#fecha_llegada').datepicker('setDate', null);
    // $('#fecha_llegada').datepicker('setDate', "01/06/2023");
    // $('#fecha_llegada').datepicker("setDate", new Date());

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
        $('#modal_fechasDisponibles').modal({backdrop: 'static',keyboard: false})
        $("#modal_fechasDisponibles").modal("show")
    })
}

var f_llegada, f_salida

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
    console.log(fechasNoDisp)

    f_llegada = "#fecha_llegada"+idCasaGlobal
    f_salida = "#fecha_salida"+idCasaGlobal

    
    $("#fecha_llegada"+idCasaGlobal).datepicker({
        changeMonth : true,
        changeYear : true,
        autoclose: true,
        firstDay : 1,
        startDate: '+0d',
        todayHighlight: true,
        // minDate : -1,
        // yearRange : '2022:' + String((new Date()).getFullYear() + 1),
        format: "dd/mm/yyyy",
        language: "en",
        datesDisabled: fechasNoDisp
        // beforeShowDay: function(d){
            // console.log("Entro datepicker")
        //     console.log(d)
        //     var dia =  d.getDate()
        //     var mes = (d.getMonth()+1)
        //     var anio = d.getFullYear()

        //     if (mes<= 9 ){
        //         mes = ("0"+String(mes))
        //     }
        
        //     if ( dia <= 9){
        //         dia = ('0'+String(dia))
        //     }

        //     var fecha = dia+'/'+mes+'/'+anio;
        //     console.log(fecha)
            
        //     if ( $.inArray(fecha, fechasNoDisp) != -1 ){
        //         console.log("1")
        //         return [true, "miclase","Available"]
        //     }else{
        //         console.log("2")
        //         return [false, "","Unavailable"]
        //     }
        // }
    });

    $("#fecha_salida"+idCasaGlobal).datepicker({
        changeMonth : true,
        changeYear : true,
        autoclose: true,
        firstDay : 1,
        todayHighlight: true,
        startDate: '+0d',
        // minDate : new Date(2005, 0, 1),
        // startDate: '24/07/2023',
        // yearRange : '2022:' + String((new Date()).getFullYear() + 1),
        format: "dd/mm/yyyy",
        language: "en",
        datesDisabled: fechasNoDisp
    });
    
}

var f , ff

jQuery(document).on('change', f_llegada, () => {
    // var element = event.target;
    // console.log(element.value);

    f = $("#fecha_llegada"+idCasaGlobal).val()
    cadena = f.split("/")
    console.log(cadena)
    ff = cadena[0]+"/"+cadena[1]+"/"+cadena[2]
    console.log(ff)
    jQuery('#fecha_salida'+idCasaGlobal).datepicker('setStartDate', ff);
});

jQuery(document).on('change', f_salida, () => {
    $("#fecha_llegada"+idCasaGlobal).val(f)
    if( $("#fecha_salida"+idCasaGlobal).val() == ""){
        fs = ff
    }else{
        fs = $("#fecha_salida"+idCasaGlobal).val()
    }
    
    cadena_salida = fs.split("/")
    console.log(cadena_salida)
    ffs = cadena_salida[0]+"/"+cadena_salida[1]+"/"+cadena_salida[2]
    console.log(ffs)
    jQuery('#fecha_llegada'+idCasaGlobal).datepicker('setEndDate', ffs);
})

$("#btnCerrarModalFechas").click(function(){
    $('#modal_fechasDisponibles').modal('hide');
})



// ************************************************************
// ******************** nuevo cliente *************************

function registrarCliente(){
    generar_clave()
}

const rango = Object.freeze({
    min: 10000,
    max: 99999
})

var clave
function generar_clave(){
   
    clave = Math.floor(Math.random()*(rango.max-rango.min+1)+rango.min);
    console.log(clave);

    setTimeout(function(){
        guardarCliente()
    }, 2000)
    
}

function guardarCliente(){
    $.ajax({
        url:"scripts/php/listar_casas.php",
        cache: false,
        data: { comm:"guardarCliente", 
                nombre: $("#txtNombre").val(),
                celular: $("#txtTelefono").val(),
                email: $("#txtEmail").val(),
                clave: clave
            },
        dataType: "json",
        method: "POST"
    }).done(function(rest){
        $.each(rest.data, function (i, item) {
            console.log(item.ok)
            console.log(item.num_rows)
            if(item.ok == "ok"){
                console.log("guardo cliente")
                $("#idTempCliente").val(item.id)
                $("#nombreTempCliente").val(item.nombre)
                enviarCorreoCliente()
            }else if(item.ok == "noOk"){
                console.log("no guardo cliente, ya existe email")
                $("#spanEmail").show()
                setTimeout( function(){
                    $("#spanEmail").hide()
                }, 20000)
            }else if (item.ok == "err"){
                alert("Ocurrio un problema, vuelva a intentarlo")
            }
        })
    })
}

function enviarCorreoCliente(){
    $.ajax({
		url: "scripts/php/listar_casas.php",
		cache:false,
		// dataType:"json",
        method: "POST",
		data: {
            comm: "enviarCorreo",
            nombre: $("#txtNombre").val(),
            email: $("#txtEmail").val(),
            celular: $("#txtTelefono").val(),
            clave: clave
		}
	}).done(function(rest){
		console.log(rest)
        if(rest == "ok"){
            // $("#txtNombre, #txtEmail, #txtTelefono").val("")
            alert("Correo enviado correctamente!")
            $("#div_registronuevousuario").hide()
            $("#div_clave_activacion").show()
        }
	}).fail(function(jqXHR,estado,error){
		console.log(estado);
		console.log(error);
	})
}


$("#btnActivarCuenta").click(function(e){
    e.preventDefault()
    e.stopPropagation()
    if( $("#txtClave").val() == "" ){
        $("#spanClave").show()
        setTimeout( function(){
            $("#spanClave").hide()
        }, 20000)
    }else{
        activarCuentaCliente()
    }
})

function activarCuentaCliente(){
    $.ajax({
        url:"scripts/php/listar_casas.php",
        cache: false,
        data: { comm:"activaCliente", 
                idReg: $("#idTempCliente").val()
            },
        dataType: "json",
        method: "POST"
    }).done(function(rest){
        $.each(rest.data, function (i, item) {
            if(item.ok == "ok"){
                // alert("La cuenta se activó correctamente!")
                // $("#modal_registro").modal("hide")
                $("#idCliente").val( $("#idTempCliente").val() )
                $("#nombreCliente").text( $("#nombreTempCliente").val() )
                $("#div_clave_activacion").hide()
                $("#bodymodal_fechas").show()
                $("#div_datosCliente").show()
            }else {
                alert("Ocurrio un problema vuelva a intentarlo")
            }
        })
    })
}

$("#btnReenviarCorreo").click(function(){
    console.log("reenviar correo")
    enviarCorreoCliente()
})

$("#bodymodal_fechas").on("click", "#btnEnviarReservacion", function(){
    if ( $("#idCliente").val() == "" ){
        $("#bodymodal_fechas").hide()
        $("#div_registronuevousuario").show()
    }else{
        console.log("enviar reserva por correo")
    }
})

$("#btnYaSoyCliente").click(function(){
    $("#div_registronuevousuario").hide()
    $("#div_yasoycliente").show()
})

function iniciarSesion(){
    if( $("#txtEmailLogeo").val() == "" || $("#txtClaveLogeo").val() == "" ){
        console.log("No ingreso correo")
    }else{

        $.ajax({
            url:"scripts/php/listar_casas.php",
            cache: false,
            data: { comm:"buscarCliente", 
                    email: $("#txtEmailLogeo").val(),
                    clave: $("#txtClaveLogeo").val()
                },
            dataType: "json",
            method: "POST"
        }).done(function(rest){
            $.each(rest.data, function (i, item) {
                if(item.ok == "ok"){
                   
                    $("#idCliente").val( item.id )
                    $("#nombreCliente").text( item.nombre)
                    
                    $("#div_yasoycliente").hide()
                    $("#bodymodal_fechas").show()

                }else if(item.ok == "noOk") {
                    alert("Datos incorrectos, vuelve a intentarlo")
                }
            })
        })
    }
}
