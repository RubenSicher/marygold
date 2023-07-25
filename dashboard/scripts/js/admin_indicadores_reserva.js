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

$.ajax({
    url:"scripts/php/admin_indicadores_reservaciones.php",
    method: "POST",
    cache: false,
    data: {comm:'listarReservaciones'},
    dataType: "json"
 }).done(function(rest){
   
   $.each(rest.data, function (i, item) {
        // mes = mes + '{"title":"'+item.casa+'","start":"'+item.fecha_llegada+'","end":"'+item.fecha_salida+'","backgroundColor":"'+item.background+'"},' 
        

        if (item.mes == mes_anterior2){
                   
            if (item.estado == 0 ){ //pendientes
                pendientes.push(item.num_reservas)
                bandera_pendiente = 1
            }else if (item.estado == 1 ){ //autorizados
                autorizados.push(item.num_reservas)
                bandera_autorizado = 1
            }else if (item.estado == 2 ){ //no autorizados
                noAutorizados.push(item.num_reservas)
                bandera_noautorizado = 1
            }
            mes_anterior2 = item.mes

        }else{

            if ( bandera_pendiente == 0 && bandera_autorizado == 0 && bandera_noautorizado == 0 ){ //si todos dan CERO, entonces en nuevo registro
                mes.push(meses[item.mes-1]+"-"+item.anio)
                if (item.estado == 0 ){ //pendientes
                    pendientes.push(item.num_reservas)
                    bandera_pendiente = 1
                }else if (item.estado == 1 ){ //autorizados
                    autorizados.push(item.num_reservas)
                    bandera_autorizado = 1
                }else if (item.estado == 2 ){ //no autorizados
                    noAutorizados.push(item.num_reservas)
                    bandera_noautorizado = 1
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

                if (item.estado == 0 ){ //pendientes
                    pendientes.push(item.num_reservas)
                    bandera_pendiente = 1
                }else if (item.estado == 1 ){ //autorizados
                    autorizados.push(item.num_reservas)
                    bandera_autorizado = 1
                }else if (item.estado == 2 ){ //no autorizados
                    noAutorizados.push(item.num_reservas)
                    bandera_noautorizado = 1
                }
                mes_anterior2 = item.mes
                mes.push(meses[item.mes-1]+"-"+item.anio)
            }
            
        }
        
   })

   console.log(mes)
   console.log(pendientes)
   console.log(autorizados)
   console.log(noAutorizados)

    var areaChartData = {
        labels  : mes, //['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label               : 'Pendientes',
            backgroundColor     : 'rgba(215,147,42,0.9)',
            borderColor         : 'rgba(215,147,42,0.8)',
            pointRadius          : false,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(215,147,42,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : pendientes //[28, 48, 40, 19, 86, 27, 90]
          },
          {
            label               : 'Autorizados',
            backgroundColor     : 'rgba(195, 161, 107, 1)',
            borderColor         : 'rgba(195, 161, 107, 1)',
            pointRadius         : false,
            pointColor          : 'rgba(195, 161, 107, 1)',
            pointStrokeColor    : '#c1c7d1',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data                : autorizados //[65, 59, 80, 81, 56, 55, 40]
          },
          {
            label               : 'No Autorizados',
            backgroundColor     : 'rgba(207, 189, 160, 1)',
            borderColor         : 'rgba(207, 189, 160, 1)',
            pointRadius         : false,
            pointColor          : 'rgba(207, 189, 160, 1)',
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
        casas = []
        num_topten = []
       $.each(rest.data, function (i, item) {
            // mes = mes + '{"title":"'+item.casa+'","start":"'+item.fecha_llegada+'","end":"'+item.fecha_salida+'","backgroundColor":"'+item.background+'"},'        
            casas.push(item.nombre_casa)
            num_topten.push(item.num_reservas)
            
       })
    
       //-------------
        //- DONUT CHART -
        //-------------
        // Get context with jQuery - using jQuery's .get() method.
        var donutChartCanvas = $('#donutChart').get(0).getContext('2d')
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
              backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
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




    