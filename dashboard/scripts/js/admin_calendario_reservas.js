var datos = ""

$.ajax({
    url:"scripts/php/admin_calendario_reservaciones.php",
    method: "POST",
    cache: false,
    data: {comm:'listarReservaciones'},
    dataType: "json"
 }).done(function(rest){
   
   $.each(rest.data, function (i, item) {
     datos = datos + '{"title":"'+item.casa+'","start":"'+item.fecha_llegada+'","end":"'+item.fecha_salida+'","backgroundColor":"'+item.background+'"},' 
   })

   
   //***** llenamos el calendario de la cancha 1 *******
    datosCancha1 = datos.substring(0, datos.length -1)
    datosCancha1 = "["+datosCancha1+"]"
    datosCancha1 = JSON.parse(datosCancha1)
    hoy = new Date();

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
        left: 'prevYear,prev,next,nextYear today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialDate: hoy,
    editable: false,
    selectable: true,
    businessHours: true,
    dayMaxEvents: true, // allow "more" link when too many events
    events: datosCancha1
    });
    calendar.render();


})

