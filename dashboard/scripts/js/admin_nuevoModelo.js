


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