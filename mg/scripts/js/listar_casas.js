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
                                            <span><a href="javascript:openGallery('+item.id+')">gallery</a></span>\
                                            <h5 id="price'+item.id+'" data-price='+item.price+'>'+item.price+' USD <p>night</p></h5>\
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

    txtfechas = '<div style="display:flex; justify-content: space-between;">\
                    <div style="padding: 10px 20px 10px; border: 1px solid #bd9a68; border-radius: 10px; width: 49%">\
                        <label style="position:absolut; top:20px; left:25px; font-size:13px; cursor:auto; color:#bd9a68 ">Arrival time</label>\
                        <input class="form-control" style="border:0px; background: #fff7eb; text-align:center;"  type="text" id="fecha_llegada'+idC+'" data-provide="datepicker" autocomplete="off"/>\
                    </div>\
                    <div style="padding: 10px 20px 10px; border: 1px solid #bd9a68; border-radius: 10px; width: 49%">\
                        <label style="position:absolut; top:20px; left:25px; font-size:13px; cursor:auto; color:#bd9a68 ">Departure time</label>\
                        <input class="form-control" style="border:0px; background: #fff7eb; text-align:center;" id="fecha_salida'+idC+'" type="text" data-provide="datepicker" autocomplete="off"/>\
                    </div>\
                </div>\
                <div style="text-align: center;" class="mb-3 mt-4">\
                    <button class="btn btn-primary" id="btnEnviarReservacion" style="width: 100%; justify-content: center;">Send reservation by mail</button>\
                </div>'

    $("#bodymodal_fechas").html(txtfechas)       
}


// ***********************************************************************
// **********************  ver galeria ***********************************
function openGallery(idCasa){
    $("#imagen_galeria1,#imagen_galeria2,#imagen_galeria3,#imagen_galeria4,#imagen_galeria5,#imagen_galeria6").attr("src", "../../../dashboard/imagenes/galeria/no-image.png")  
    $.ajax({
        method: "POST",
        url:"scripts/php/listar_casas.php",
        cache: false,
        dataType: "json",
        data: {comm:"getGallery", idReg:idCasa}
    }).done(function(rest){

      $.each(rest.data, function (i, item) {
        
        if(item.image1 != ""){
            $("#imagen_galeria1").attr("src", item.image1)  
        }

        if(item.image2 != ""){
            $("#imagen_galeria2").attr("src", item.image2)
        }

        if(item.image3 != ""){
            $("#imagen_galeria3").attr("src", item.image3)
        }

        if(item.image4 != ""){
            $("#imagen_galeria4").attr("src", item.image4)
        }

        if(item.image5 != ""){
            $("#imagen_galeria5").attr("src", item.image5)
        }
        
        if(item.image6 != ""){
            $("#imagen_galeria6").attr("src", item.image6)
        }


      });

      $("#modalGallery").modal("show")
    })
}

$("#btnCerrarModalGallery").click(function(){
    $("#modalGallery").modal("hide")
})


// ************************************************************************
// ******************  reservar casa **************************************
var fechasNOdisponibles = []
var idCasaGlobal

function openDate(idCasa){
    crear_inputFechas(idCasa)
    fechasNOdisponibles = []
    idCasaGlobal = idCasa

    $("#txt_dias_renta").text(0)
    $("#txt_precio_renta").text("0 USD")
    $("#txt_total_renta").text("0 USD")
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
            // console.log("fecha_item: "+fecha_llegada)
            while(fecha_salida.getTime() >= fecha_llegada.getTime()){
                fecha_llegada.setDate(fecha_llegada.getDate() + 1);
                // console.log(fecha_llegada.getDate() + '/' + (fecha_llegada.getMonth() + 1) + '/' + fecha_llegada.getFullYear());

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
        // console.log(fechasNOdisponibles)
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
    // console.log(fechaSol)
    // console.log(fechasNoDisp)

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

$("#bodymodal_fechas").on('change', f_llegada, () => {
    // var element = event.target;
    // console.log(element.value);

    f = $("#fecha_llegada"+idCasaGlobal).val()
    cadena = f.split("/")
    // console.log(cadena)
    ff = cadena[0]+"/"+cadena[1]+"/"+cadena[2]
    // console.log(ff)
    jQuery('#fecha_salida'+idCasaGlobal).datepicker('setStartDate', ff);
    calcular_renta()
});

$("#bodymodal_fechas").on('change', f_salida, () => {
    $("#fecha_llegada"+idCasaGlobal).val(f)
    if( $("#fecha_salida"+idCasaGlobal).val() == ""){
        fs = ""
    }else{
        fs = $("#fecha_salida"+idCasaGlobal).val()
        
        cadena_salida = fs.split("/")
        // console.log(cadena_salida)
        ffs = cadena_salida[0]+"/"+cadena_salida[1]+"/"+cadena_salida[2]
        // console.log(ffs)
        jQuery('#fecha_llegada'+idCasaGlobal).datepicker('setEndDate', ffs);
        calcular_renta()
    }
    
    
})

function calcular_renta(){
    if( $("#fecha_llegada"+idCasaGlobal).val() == "" || $("#fecha_salida"+idCasaGlobal).val() == "" ){
        console.log("Falta una fecha")
    }else{
       
        f1 = $("#fecha_llegada"+idCasaGlobal).val().split("/")
        f2 = $("#fecha_salida"+idCasaGlobal).val().split("/")
        f11 = f1[2]+"/"+f1[1]+"/"+f1[0]
        f22 = f2[2]+"/"+f2[1]+"/"+f2[0]

        fecha_llegada_seleccionada = new Date( f11 ).getTime()
        fecha_salida_seleccionada  = new Date( f22 ).getTime()
      
        var dias_enMinutos = fecha_salida_seleccionada - fecha_llegada_seleccionada
        dias_seleccionados =  dias_enMinutos/(1000*60*60*24)

        precio = $("#price"+idCasaGlobal).attr("data-price")
        // console.log(precio)

        precio_total = parseFloat(precio) * parseFloat(dias_seleccionados)

        $("#txt_dias_renta").text(dias_seleccionados)
        $("#txt_precio_renta").text(precio+" USD")
        $("#txt_total_renta").text(precio_total+" USD")
       

    }
}

$("#btnCerrarModalFechas").click(function(){
    if ( $("#idCliente").val() != "" ){
        $("#div_datosCliente").show()
    }else{
        $("#div_datosCliente").hide()
    }
    
    $("#bodymodal_fechas").show()
    $("#div_costorenta").show()
    $("#div_registronuevousuario").hide()
    $("#div_clave_activacion").hide()
    $("#div_yasoycliente").hide()
    $("#div_reservacionExistosa").hide()
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
                alert("There was a problem, please try again")
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
            alert("Mail sent successfully!")
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
                alert("There was a problem, please try again")
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
        $("#div_costorenta").hide()
        $("#div_registronuevousuario").show()
    }else{
        console.log("enviar reserva por correo")
        enviarCorreoReservacion()
    }
})

function enviarCorreoReservacion(){
    $.ajax({
		url: "scripts/php/listar_casas.php",
		cache:false,
		// dataType:"json",
        method: "POST",
		data: {
            comm: "enviarCorreoReservacion",
            nombre: $("#nombreCliente").text(),
            email: $("#emailCliente").val(),
            celular: $("#celCliente").val(),
            fi: $("#fecha_llegada"+idCasaGlobal).val(),
            ff: $("#fecha_salida"+idCasaGlobal).val()
		}
	}).done(function(rest){
		console.log(rest)
        if(rest == "ok"){
            $("#div_reservacionExistosa").show()
            $("#div_registronuevousuario").hide()
            $("#div_costorenta").hide()
            $("#bodymodal_fechas").hide()
            guardarReservacion()
        }
	}).fail(function(jqXHR,estado,error){
		console.log(estado);
		console.log(error);
	})
}

function guardarReservacion(){
    f1 = $("#fecha_llegada"+idCasaGlobal).val()
    cadena_i = f1.split("/")
    fi = cadena_i[2]+"/"+cadena_i[1]+"/"+cadena_i[0]
    
    f2 = $("#fecha_salida"+idCasaGlobal).val()
    cadena_f = f2.split("/")
    ff = cadena_f[2]+"/"+cadena_f[1]+"/"+cadena_f[0]
    
    precio_por_dia = $("#txt_precio_renta").text().split(" ")
    ppd = precio_por_dia[0]

    precio_gloabl = $("#txt_total_renta").text().split(" ")
    pg = precio_gloabl[0]

    $.ajax({
        url:"scripts/php/listar_casas.php",
        cache: false,
        data: { comm:"guardaReservacion", 
                idCliente: $("#idCliente").val(),
                idCasa: idCasaGlobal,
                fi: fi,
                ff: ff,
                dias: $("#txt_dias_renta").text() ,
                renta_por_dia: ppd,
                renta_global: pg 
            },
        dataType: "json",
        method: "POST"
    }).done(function(rest){
        $.each(rest.data, function (i, item) {
            if(item.ok == "ok"){
               console.log("se guardo reservacion en BD")
            }else {
                console.log("There was a problem, please try again")
            }
        })
    }) 
}


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
                    $("#emailCliente").val(item.email)
                    $("#celCliente").val(item.cel)
                    
                    $("#div_yasoycliente").hide()
                    $("#bodymodal_fechas").show()
                    $("#div_datosCliente").show()
                    $("#div_costorenta").show()

                }else if(item.ok == "noOk") {
                    alert("Incorrect data, try again")
                }
            })
        })
    }
}


$("#btnNoRecuerdoclave").click(function(){
    if( $("#txtEmailLogeo").val() == "" ){
        alert("You must add an email account.!")      
    }else{
        
        $.ajax({
            url:"scripts/php/listar_casas.php",
            cache: false,
            data: { comm:"buscarCorreo", 
                    email: $("#txtEmailLogeo").val()
                },
            dataType: "json",
            method: "POST"
        }).done(function(rest){
            $.each(rest.data, function (i, item) {
                if(item.ok == "ok"){
                    clave = item.clave
                    enviarCorreoCliente_otravez(clave)

                }else if(item.ok == "noOK") {
                    alert("Wrong email, try again")
                }
            })
        })
    }  
    
})

function enviarCorreoCliente_otravez(cla){
    $.ajax({
		url: "scripts/php/listar_casas.php",
		cache:false,
		// dataType:"json",
        method: "POST",
		data: {
            comm: "enviarCorreo",
            email: $("#txtEmailLogeo").val(),
            clave: cla
		}
	}).done(function(rest){
		console.log(rest)
        if(rest == "ok"){
            // $("#txtNombre, #txtEmail, #txtTelefono").val("")
            alert("Mail sent successfully!")
            // $("#div_registronuevousuario").hide()
            // $("#div_clave_activacion").show()
        }
	}).fail(function(jqXHR,estado,error){
		console.log(estado);
		console.log(error);
	})
}
