var mes = []
var anio
var estado 
var numero_reservas = []
var noAutorizados = []
var autorizados = []
var pendientes = []
var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
var mes_anterior2
var bandera_pendiente=0
var bandera_autorizado =0
var bandera_noautorizado=0
var j = 0 

function graficasBarraporReservaciones(){

  $.ajax({
    url:"scripts/php/admin_indicadores_reservaciones.php",
    method: "POST",
    cache: false,
    data: {comm:'listarReservaciones'},
    dataType: "json"
 }).done(function(rest){
   j = 0 
   $.each(rest.data, function (i, item) {
        // mes = mes + '{"title":"'+item.casa+'","start":"'+item.fecha_llegada+'","end":"'+item.fecha_salida+'","backgroundColor":"'+item.background+'"},' 
        
        
        if (item.mes == mes_anterior2){
                   
            if (item.estado == 0 ){ //pendientes
                pendientes.push(item.num_reservas)
                bandera_pendiente = 1
                // $("#p"+j).text(item.renta_global+" USD")
            }else if (item.estado == 1 ){ //autorizados
                autorizados.push(item.num_reservas)
                bandera_autorizado = 1
                // $("#a"+j).text(item.renta_global+" USD")
            }else if (item.estado == 2 ){ //no autorizados
                noAutorizados.push(item.num_reservas)
                bandera_noautorizado = 1
                // $("#na"+j).text(item.renta_global+" USD")
            }
            mes_anterior2 = item.mes

        }else{

            if ( bandera_pendiente == 0 && bandera_autorizado == 0 && bandera_noautorizado == 0 ){ //si todos dan CERO, entonces en nuevo registro
                mes.push(meses[item.mes-1]+"-"+item.anio)
                // j = j + 1
                if (item.estado == 0 ){ //pendientes
                    pendientes.push(item.num_reservas)
                    bandera_pendiente = 1
                    // $("#p"+j).text(item.renta_global+" USD")
                }else if (item.estado == 1 ){ //autorizados
                    autorizados.push(item.num_reservas)
                    bandera_autorizado = 1
                    // $("#a"+j).text(item.renta_global+" USD")
                }else if (item.estado == 2 ){ //no autorizados
                    noAutorizados.push(item.num_reservas)
                    bandera_noautorizado = 1
                    // $("#na"+j).text(item.renta_global+" USD")
                }
                mes_anterior2 = item.mes
    
            }else{

                if (bandera_pendiente == 0){
                    pendientes.push("0")
                }
                if (bandera_autorizado == 0){
                    autorizados.push("0")
                }
                if (bandera_noautorizado == 0){
                    noAutorizados.push("0")
                }

                bandera_pendiente = 0
                bandera_autorizado = 0 
                bandera_noautorizado = 0

                // j = j + 1
                if (item.estado == 0 ){ //pendientes
                    pendientes.push(item.num_reservas)
                    bandera_pendiente = 1
                    // $("#p"+j).text(item.renta_global+" USD")
                }else if (item.estado == 1 ){ //autorizados
                    autorizados.push(item.num_reservas)
                    bandera_autorizado = 1
                    // $("#a"+j).text(item.renta_global+" USD")
                }else if (item.estado == 2 ){ //no autorizados
                    noAutorizados.push(item.num_reservas)
                    bandera_noautorizado = 1
                    // $("#na"+j).text(item.renta_global+" USD")
                }
                mes_anterior2 = item.mes
                mes.push(meses[item.mes-1]+"-"+item.anio)
            }
            
        }
        
   })

  //  console.log(mes)
  //  console.log(pendientes)
  //  console.log(autorizados)
  //  console.log(noAutorizados)

    var areaChartData = {
        labels  : mes, //['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label               : 'Pendientes',
            backgroundColor     : 'rgba(255,193,7,0.9)',
            borderColor         : 'rgba(255,193,7,0.8)',
            pointRadius          : false,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(255,193,7,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : pendientes //[28, 48, 40, 19, 86, 27, 90]
          },
          {
            label               : 'Autorizados',
            backgroundColor     : 'rgba(40, 167, 69, 1)',
            borderColor         : 'rgba(40, 167, 69, 1)',
            pointRadius         : false,
            pointColor          : 'rgba(40, 167, 69, 1)',
            pointStrokeColor    : '#c1c7d1',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data                : autorizados //[65, 59, 80, 81, 56, 55, 40]
          },
          {
            label               : 'No Autorizados',
            backgroundColor     : 'rgba(220, 53, 69, 1)',
            borderColor         : 'rgba(220, 53, 69, 1)',
            pointRadius         : false,
            pointColor          : 'rgba(220, 53, 69, 1)',
            pointStrokeColor    : '#c1c7d1',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data                : noAutorizados //[35, 29, 30, 31, 36, 35, 30]
          },
        ]
      }
  
      //-------------
      //- BAR CHART -
      //-------------
      var barChartCanvas = $('#barChart').get(0).getContext('2d')
      var barChartData = $.extend(true, {}, areaChartData)
      var temp0 = areaChartData.datasets[0]
      var temp1 = areaChartData.datasets[1]
      var temp2 = areaChartData.datasets[2]
      barChartData.datasets[0] = temp0
      barChartData.datasets[1] = temp1
      barChartData.datasets[2] = temp2
  
      var barChartOptions = {
        responsive              : true,
        maintainAspectRatio     : false,
        datasetFill             : false
      }
  
      new Chart(barChartCanvas, {
        type: 'bar',
        data: barChartData,
        options: barChartOptions
      })


  })
}




var pendientes_ingresos = []
var autorizados_ingresos =[]
var no_autorizados_ingresos=[]
var mes_ingresos = []
var bandera_pendiente_ingreso, bandera_autorizado_ingreso, bandera_noautorizado_ingreso
var mes_anterior2_ingreso

function graficaBarrasEnIngresos(){
  $.ajax({
      url:"scripts/php/admin_indicadores_reservaciones.php",
      method: "POST",
      cache: false,
      data: {comm:'listarReservaciones'},
      dataType: "json"
  }).done(function(rest){
   
    $.each(rest.data, function (i, item) {
                 
          if (item.mes == mes_anterior2_ingreso){
                    
              if (item.estado == 0 ){ //pendientes
                  pendientes_ingresos.push(item.renta_global)
                  bandera_pendiente_ingreso = 1
                  // $("#p"+j).text(item.renta_global+" USD")
              }else if (item.estado == 1 ){ //autorizados
                  autorizados_ingresos.push(item.renta_global)
                  bandera_autorizado_ingreso = 1
                  // $("#a"+j).text(item.renta_global+" USD")
              }else if (item.estado == 2 ){ //no autorizados
                  no_autorizados_ingresos.push(item.renta_global)
                  bandera_noautorizado_ingreso = 1
                  // $("#na"+j).text(item.renta_global+" USD")
              }
              mes_anterior2_ingreso = item.mes

          }else{

              if ( bandera_pendiente_ingreso == 0 && bandera_autorizado_ingreso == 0 && bandera_noautorizado_ingreso == 0 ){ //si todos dan CERO, entonces en nuevo registro
                  mes_ingresos.push(meses[item.mes-1]+"-"+item.anio)
                  // j = j + 1
                  if (item.estado == 0 ){ //pendientes
                      pendientes_ingresos.push(item.renta_global)
                      bandera_pendiente_ingreso = 1
                      // $("#p"+j).text(item.renta_global+" USD")
                  }else if (item.estado == 1 ){ //autorizados
                      autorizados_ingresos.push(item.renta_global)
                      bandera_autorizado_ingreso = 1
                      // $("#a"+j).text(item.renta_global+" USD")
                  }else if (item.estado == 2 ){ //no autorizados
                      no_autorizados_ingresos.push(item.renta_global)
                      bandera_noautorizado_ingreso = 1
                      // $("#na"+j).text(item.renta_global+" USD")
                  }
                  mes_anterior2_ingreso = item.mes
      
              }else{

                  if (bandera_pendiente_ingreso == 0){
                      pendientes_ingresos.push("0")
                  }
                  if (bandera_autorizado_ingreso == 0){
                      autorizados_ingresos.push("0")
                  }
                  if (bandera_noautorizado_ingreso == 0){
                      no_autorizados_ingresos.push("0")
                  }

                  bandera_pendiente_ingreso = 0
                  bandera_autorizado_ingreso = 0 
                  bandera_noautorizado_ingreso = 0

                  // j = j + 1
                  if (item.estado == 0 ){ //pendientes
                      pendientes_ingresos.push(item.renta_global)
                      bandera_pendiente_ingreso = 1
                      // $("#p"+j).text(item.renta_global+" USD")
                  }else if (item.estado == 1 ){ //autorizados
                      autorizados_ingresos.push(item.renta_global)
                      bandera_autorizado_ingreso = 1
                      // $("#a"+j).text(item.renta_global+" USD")
                  }else if (item.estado == 2 ){ //no autorizados
                      no_autorizados_ingresos.push(item.renta_global)
                      bandera_noautorizado_ingreso = 1
                      // $("#na"+j).text(item.renta_global+" USD")
                  }
                  mes_anterior2_ingreso = item.mes
                  mes_ingresos.push(meses[item.mes-1]+"-"+item.anio)
              }
              
          }
          
    })

    // console.log(mes)
    // console.log(pendientes)
    // console.log(autorizados)
    // console.log(noAutorizados)

      var areaChartData_ingresos = {
          labels  : mes_ingresos, //['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label               : 'Pendientes',
              backgroundColor     : 'rgba(255,193,7,0.9)',
              borderColor         : 'rgba(255,193,7,0.8)',
              pointRadius          : false,
              pointColor          : '#3b8bba',
              pointStrokeColor    : 'rgba(255,193,7,1)',
              pointHighlightFill  : '#fff',
              pointHighlightStroke: 'rgba(60,141,188,1)',
              data                : pendientes_ingresos //[28, 48, 40, 19, 86, 27, 90]
            },
            {
              label               : 'Autorizados',
              backgroundColor     : 'rgba(40, 167, 69, 1)',
              borderColor         : 'rgba(40, 167, 69, 1)',
              pointRadius         : false,
              pointColor          : 'rgba(40, 167, 69, 1)',
              pointStrokeColor    : '#c1c7d1',
              pointHighlightFill  : '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data                : autorizados_ingresos //[65, 59, 80, 81, 56, 55, 40]
            },
            {
              label               : 'No Autorizados',
              backgroundColor     : 'rgba(220, 53, 69, 1)',
              borderColor         : 'rgba(220, 53, 69, 1)',
              pointRadius         : false,
              pointColor          : 'rgba(220, 53, 69, 1)',
              pointStrokeColor    : '#c1c7d1',
              pointHighlightFill  : '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data                : no_autorizados_ingresos //[35, 29, 30, 31, 36, 35, 30]
            },
          ]
        }
    
        //-------------
        //- BAR CHART -
        //-------------
        var barChartCanvas_ingresos = $('#barChartIngresos').get(0).getContext('2d')
        var barChartData_ingresos = $.extend(true, {}, areaChartData_ingresos)
        var temp0_ingresos = areaChartData_ingresos.datasets[0]
        var temp1_ingresos = areaChartData_ingresos.datasets[1]
        var temp2_ingresos = areaChartData_ingresos.datasets[2]
        barChartData_ingresos.datasets[0] = temp0_ingresos
        barChartData_ingresos.datasets[1] = temp1_ingresos
        barChartData_ingresos.datasets[2] = temp2_ingresos
    
        var barChartOptions_ingresos = {
          responsive              : true,
          maintainAspectRatio     : false,
          datasetFill             : false
        }
    
        new Chart(barChartCanvas_ingresos, {
          type: 'bar',
          data: barChartData_ingresos,
          options: barChartOptions_ingresos
        })


  })


}


graficasBarraporReservaciones()
graficaBarrasEnIngresos()


$("#cboTipoGrafica").change(function(){
  if ( $(this).val() == 1 ){
    $("#barChart").show()
    $("#barChartIngresos").hide()
  }else if ( $(this).val() == 2 ){
    $("#barChart").hide()
    $("#barChartIngresos").show()
  }
  
})

var casas = []
var num_topten = []

function topTen(){
    $.ajax({
        url:"scripts/php/admin_indicadores_reservaciones.php",
        method: "POST",
        cache: false,
        data: {comm:'masrentadas', anio:$("#cboAnio").val() },
        dataType: "json"
     }).done(function(rest){
        // console.log(rest)
        casas = []
        num_topten = []
       $.each(rest.data, function (i, item) {
            // mes = mes + '{"title":"'+item.casa+'","start":"'+item.fecha_llegada+'","end":"'+item.fecha_salida+'","backgroundColor":"'+item.background+'"},'        
            if (item.ok == "ok"){
              $("#divSinDatos").hide()
              $("#donutChartTopTen").show()
              casas.push(item.nombre_casa)
              num_topten.push(item.num_reservas)
            }else{
              $("#donutChartTopTen").hide()
              $("#divSinDatos").show()
            }
            
       })
       
      //  console.log(casas)
      //  console.log(num_topten)
       //-------------
        //- DONUT CHART -
        //-------------
        // Get context with jQuery - using jQuery's .get() method.
        var donutChartCanvas = document.querySelector("#donutChartTopTen") //$('#donutChartTopTen').get(0).getContext('2d')
        var donutData        = {
          labels: casas,
        //   [
        //       'Chrome',
        //       'IE',
        //       'FireFox',
        //       'Safari',
        //       'Opera',
        //       'Navigator',
        //   ],
          datasets: [
            {
              data: num_topten, //[700,500,400,600,300,100],
              backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de','#e83e8c','#007bff','#6c757d','#17a2b8'],
            }
          ]
        }
        var donutOptions     = {
          maintainAspectRatio : false,
          responsive : true,
        }
        //Create pie or douhnut chart
        // You can switch between pie and douhnut using the method below.
        new Chart(donutChartCanvas, {
          type: 'doughnut',
          data: donutData,
          options: donutOptions
        })
    
    })
}


topTen()

$("#cboAnio").change(function(){
    console.log($("#cboAnio").val())
    topTen()
})



// *************************************************************************************
// ******************** Grafica anual de reservas autorizadas **************************

var mesAnual = []
var estadosAnual = []
var tituloEstado
var grafica

var mesAnualIngresos = []
var ingresoAnual = []

var ingreso_o_reserva



function graficaAnualporEstados(){
  
  ingreso_o_reserva = $("#cboReservacionIngresos").val()

  $.ajax({
    url:"scripts/php/admin_indicadores_reservaciones.php",
    method: "POST",
    cache: false,
    data: {comm:'listarReservacionesPorTipoAnual', anio_autorizadas:$("#cboAnioTipoEstado").val(), tipo_reserva:$("#cboEstado").val()},
    dataType: "json"
  }).done(function(rest){
      mesAnual = []
      estadosAnual = []
      mesAnualIngresos = []
      ingresoAnual =[]
   
    $.each(rest.data, function (i, item) {
        // mes = mes + '{"title":"'+item.casa+'","start":"'+item.fecha_llegada+'","end":"'+item.fecha_salida+'","backgroundColor":"'+item.background+'"},' 
        
        mesAnual.push(meses[item.mes-1])
        estadosAnual.push(item.num_reservas)

        mesAnualIngresos.push(meses[item.mes-1])
        ingresoAnual.push(item.renta_global)

        if (item.estado == 0){ //RESERVAS PENDIENTES
          grafica = "barChartAnualPendientes"
          graficaIngresos = "barChartAnualPendientesIngresos"
          if(ingreso_o_reserva == 1 ){ //1=grafica por reservas
            
            if(item.ok=="ok"){
              tituloEstado = "Pendientes"
              $("#divSinDatosAnual").hide()
              $("#barChartAnualPendientes").show()
              $("#chartPendientes").show()
              $("#chartAutorizados").hide()
              $("#chartNoAutorizados").hide()
              $("#barChartAnualPendientesIngresos").hide()

            }else{
              $("#barChartAnualPendientes").hide()
              $("#barChartAnualPendientesIngresos").hide()
              $("#divSinDatosAnual").show()
            }

          }else if (ingreso_o_reserva == 2){ //grafica por ingresos
            
            if(item.ok=="ok"){
              tituloEstado = "Pendientes"
              $("#divSinDatosAnual").hide()
              $("#barChartAnualPendientes").hide()
              $("#barChartAnualPendientesIngresos").show()
              $("#chartPendientes").show()
              $("#chartAutorizados").hide()
              $("#chartNoAutorizados").hide()

            }else{
              $("#barChartAnualPendientesIngresos").hide()
              $("#divSinDatosAnual").show()
            }
          }
          
          
        }else if (item.estado == 1){ //RESERVAS AUTORIZADAS
          grafica = "barChartAnualAutorizados"
          graficaIngresos = "barChartAnualAutorizadosIngresos"
          if(ingreso_o_reserva == 1 ){ //1=grafica por reservas
            
            if(item.ok == "ok"){
              tituloEstado = "Autorizados"
              $("#divSinDatosAnual").hide()
              $("#barChartAnualAutorizados").show()
              $("#barChartAnualAutorizadosIngresos").hide()
              $("#chartPendientes").hide()
              $("#chartAutorizados").show()
              $("#chartNoAutorizados").hide()
            }else{
              $("#barChartAnualAutorizados").hide()
              $("#divSinDatosAnual").show()
            }
          
          }else if (ingreso_o_reserva == 2){ //grafica por ingresos
            
            if(item.ok == "ok"){
              tituloEstado = "Autorizados"
              $("#divSinDatosAnual").hide()
              $("#barChartAnualAutorizados").hide()
              $("#barChartAnualAutorizadosIngresos").show()
              $("#chartPendientes").hide()
              $("#chartAutorizados").show()
              $("#chartNoAutorizados").hide()
            }else{
              $("#barChartAnualAutorizadosIngresos").hide()
              $("#divSinDatosAnual").show()
            }
          }
          
          

        }else if (item.estado == 2){ //NO AUTORIZADOS
          grafica = "barChartAnualNoAutorizados"
          graficaIngresos = "barChartAnualNoAutorizadosIngresos"
          if(ingreso_o_reserva == 1 ){ //1=grafica por reservas
            
            if(item.ok == "ok"){
              tituloEstado = "No Autorizados"
              $("#divSinDatosAnual").hide()
              $("#barChartAnualNoAutorizados").show()
              $("#barChartAnualNoAutorizadosIngresos").hide()
              $("#chartPendientes").hide()
              $("#chartAutorizados").hide()
              $("#chartNoAutorizados").show()
            }else{
              $("#barChartAnualNoAutorizados").hide()
              $("#divSinDatosAnual").show()
            }

          }else if (ingreso_o_reserva == 2){ //grafica por ingresos
            
            if(item.ok == "ok"){
              tituloEstado = "No Autorizados"
              $("#divSinDatosAnual").hide()
              $("#barChartAnualNoAutorizados").hide()
              $("#barChartAnualNoAutorizadosIngresos").show()
              $("#chartPendientes").hide()
              $("#chartAutorizados").hide()
              $("#chartNoAutorizados").show()
            }else{
              $("#barChartAnualNoAutorizadosIngresos").hide()
              $("#divSinDatosAnual").show()
            }

          }
          
          
        }
       
        
   })
  
  
   // ****** GRAFICA PARA NUMERO DE RESERVAS *****
    var areaChartDataAnual = {
        labels  : mesAnual, //['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label               : tituloEstado,
            backgroundColor     : 'rgba(215,147,42,0.9)',
            borderColor         : 'rgba(215,147,42,0.8)',
            pointRadius          : false,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(215,147,42,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : estadosAnual, //[0:28, 48, 40, 19, 86, 27, 90]
          }, 
        ]
      }
  
      //-------------
      //- BAR CHART -
      //-------------
      var barChartCanvas1 = $("#"+grafica).get(0).getContext('2d')
      var barChartData1 = $.extend(true, {}, areaChartDataAnual)
      var temp0 = areaChartDataAnual.datasets[0]
      // var temp1 = areaChartData.datasets[1]
      // var temp2 = areaChartData.datasets[2]
      barChartData1.datasets[0] = temp0
      // barChartData.datasets[1] = temp1
      // barChartData.datasets[2] = temp2

      var barChartOptions1 = {
        responsive              : true,
        maintainAspectRatio     : false,
        datasetFill             : false,
      }
  
      new Chart(barChartCanvas1, {
        type: 'bar',
        data: barChartData1,
        options: barChartOptions1

      })  


      // ****** GRAFICA PARA INGRESOS POR MES *****
    var areaChartDataAnual_INGRESOS = {
      labels  : mesAnualIngresos, //['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label               : tituloEstado,
          backgroundColor     : 'rgba(215,147,42,0.9)',
          borderColor         : 'rgba(215,147,42,0.8)',
          pointRadius          : false,
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(215,147,42,1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data                : ingresoAnual, //[0:28, 48, 40, 19, 86, 27, 90]
        }, 
      ]
    }

    //-------------
    //- BAR CHART -
    //-------------
    var barChartCanvas1_INGRESOSO = $("#"+graficaIngresos).get(0).getContext('2d')
    var barChartData1_INGRESOS = $.extend(true, {}, areaChartDataAnual_INGRESOS)
    var temp0_INGRESOS = areaChartDataAnual_INGRESOS.datasets[0]
    // var temp1 = areaChartData.datasets[1]
    // var temp2 = areaChartData.datasets[2]
    barChartData1_INGRESOS.datasets[0] = temp0_INGRESOS
    // barChartData.datasets[1] = temp1
    // barChartData.datasets[2] = temp2

    var barChartOptions1_INGRESOS = {
      responsive              : true,
      maintainAspectRatio     : false,
      datasetFill             : false,
    }

    new Chart(barChartCanvas1_INGRESOSO, {
      type: 'bar',
      data: barChartData1_INGRESOS,
      options: barChartOptions1_INGRESOS

    })  
  
  })

}


graficaAnualporEstados()

$("#cboAnioTipoEstado").change(function(){
  console.log($("#cboAnioTipoEstado").val())
  console.log($("#cboEstado").val())

  graficaAnualporEstados()
})

$("#cboEstado").change(function(){
  console.log($("#cboAnioTipoEstado").val())
  console.log($("#cboEstado").val())

  graficaAnualporEstados()
})


$("#cboReservacionIngresos").change(function(){
  if ( $(this).val() == 1){
   graficaAnualporEstados()
  }else if ( $(this).val() == 2){
    graficaAnualporEstados()
  }
})