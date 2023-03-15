
document.getElementById('verUsiarios').addEventListener ("click", function(){
id =$("#usuario").val()
pass = $("#pass").val()



var ajax = new XMLHttpRequest();
var metodo = "GET";
var url = 'scripts/php/obtiene_datos.php?consulta=buscarUsuario&id='+id+"&pass="+pass;
var asyn = true;
ajax.open(metodo, url, asyn );
ajax.send();

ajax.onreadystatechange = function() {

if(this.readyState ==4 && this.status == 200){
    var datos = JSON.parse(this.responseText);
    console.log(datos[0].nombre);
}

}
})