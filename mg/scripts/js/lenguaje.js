
var inicio = document.getElementById("txtInicio");
var economia = document.getElementById("txtEconomia");
var mercado = document.getElementById("txtMercado");
var proj = document.getElementById("txtArrenda");
var cont = document.getElementById("txtContactoM");
var txtConroeB = document.getElementById("conroeT");
var txtConroe = document.getElementById("txtConroe");
var txtActualidad = document.getElementById("txtActualidad");
var txtActualidadP = document.getElementById("txtActualidadP");
var ttecon = document.getElementById("tituloEconomia");
var txtInversion = document.getElementById("txtInversion");
var pfrInversion = document.getElementById("pfrInversion");
var txtArquileres = document.getElementById("txtArquileres");
var pAlquileres = document.getElementById("pAlquileres");
var txtCompra = document.getElementById("txtCompra");
var pCompra = document.getElementById("pCompra");
var txtCompra2 = document.getElementById("txtCompra2");
var pCompra2 = document.getElementById("pCompra2");
var MercadoInmo = document.getElementById("MercadoInmo");
var pMercadoInmo = document.getElementById("pMercadoInmo");
var txtBtr = document.getElementById("txtBtr");
var txtbtr2 = document.getElementById("txtbtr2");
var tltDueños = document.getElementById("tltDueños");
var subrenter = document.getElementById("subrenter");
// porcentajes 
var spanhom = document.getElementById("spanhom");
var spnMuj = document.getElementById("spnMuj");
var spanCas = document.getElementById("spanCas");
var spanNocas = document.getElementById("spanNocas");
var spanhom2 = document.getElementById("spanhom2");
var spnMuj2 = document.getElementById("spnMuj2");
var spanCas2 = document.getElementById("spanCas2");
var spanNocas2 = document.getElementById("spanNocas2");

var pMaryGold = document.getElementById("pMaryGold");
var conmas = document.getElementById("conmas");
var conmas2 = document.getElementById("conmas2");
var titleDis = document.getElementById("titleDis");
var or = document.getElementById("1h");
var tr = document.getElementById("2h");
var thr = document.getElementById("3h");
var ttr = document.getElementById("tc");

var txtResumenPro = document.getElementById("txtResumenPro");
var prRes = document.getElementById("prRes");

var orec = document.getElementById("1rec");
var orecd = document.getElementById("1recd");
var trec = document.getElementById("2rec");
var trecd = document.getElementById("2recd");
var threc = document.getElementById("3rec");
var threcd = document.getElementById("3recd");

var ttLinet = document.getElementById("ttLinet");

var txtMensaje = document.getElementById("txtMensaje");
var ttMensaje = document.getElementById("ttMensaje");
var inputname = document.getElementById("inputname");
var inputNum = document.getElementById("inputNum");
var mensaje = document.getElementById("mensaje");
var btnSolicita = document.getElementById("btnSolicita");

var ftContact = document.getElementById("ftContact");




var estado = 1
cambiarEstado()
document.getElementById("espa").addEventListener("click", function(){

   if (estado ==1) {
    estado =2
    cambiarEstado()
   } 
})
document.getElementById("ing").addEventListener("click", function(){

   if (estado ==2) {
    estado =1
    cambiarEstado()
   } 
})


function cambiarEstado(){
if (estado == 1) {

inicio.innerText = "home"
economia.innerText = "Economy"
mercado.innerText = "Real State Market"
proj.innerText = "Marygold Project"
cont.innerText = "Contact"
txtConroe.innerText = "Conroe is currently growing at a rate of 3.62% per year and its population has increased 7.50% since the most recent census. Stretching for more than 73 miles, Conroe has a population density of 1,344 people per square mile.\
The Office of Management and Budget classifies Conroe as a principal city within the Houston–The Woodlands–SugarLand metropolitan area"
txtActualidad.innerText = "Present"
txtActualidadP.innerText = "Currently, commercial development in the area is focused on the I-45 North corridor, so visitors or residents have to travel more than 4 miles or more to access shopping centers in The Woodlands. \
The subject market area is approximately 40% developed, with a general mix of low-density and predominantly residential supporting commercial interests. Commercial uses are generally along major traffic arteries or in nearby planned business parks within The Woodlands-Conroe"
ttecon.innerText = "Economy"
txtInversion.innerText = "Investment"
pfrInversion.innerText = "Investment firms are building rental communities in the Conroe and Montgomery area to help meet growing rental demand."
txtArquileres.innerText = "Rentals"
pAlquileres.innerText = "The Houston Association of Realtors [HAR], reported that the number of leased home rentals in the Houston area increased 24.8% from May 2021 to May 2022."
txtCompra.innerText = "Sales"
pCompra.innerText = "Texas leads the nation in institutional purchases with 28% of homes purchased by institutional investors in 2021, more than double the national average of 13%."
txtCompra2.innerText = "Purchase"
pCompra2.innerText = "Locally, NAR data showed that 29% of properties purchased in Montgomery County in 2021 were purchased by institutional buyers."
MercadoInmo.innerText = "Real State Market"
pMercadoInmo.innerText = "Market trends in the Conroe and Montgomery area, such as rising interest rates, fluctuating rents, and rapid home sales, made the area a target for institutional buyers; since in 2019-2022 mortgage rates were below 3% and suddenly in 2022 they are above 6%, doubling interest rates, so people hardly qualify for the house they wanted to buy, and they look shored to rent."
txtBtr.innerText = "Today, Build to Rent can be considered a “windfall” for ROI; as it allows investors to control the cost and rate of absorption, for what is anticipated to be the fastest growing segment over the next five years."
txtbtr2.innerText = "The City of Conroe voted May 26 to increase the minimum lot width for a 40-foot-wide subdivision to 50 feet."
tltDueños.innerText = "OWNERS VS RENTALS"
subDueños.innerText = "Owners"
subrenter.innerText = "Tenants"
// %porcentajes 
spanhom.innerText = "% men"
spnMuj.innerText = "% Female"
spanCas.innerText = "% Married"

spanNocas2.innerText = "% Singles"
spanhom2.innerText = "% men"
spnMuj2.innerText = "% Female"
spanCas2.innerText = "% Married"
spanNocas2.innerText = "% Singles"

pMaryGold.innerText = "The property consists of 19 acres located on the eastern portion of Loop 336, which surrounds Conroe. The circuit has an average daily traffic of 20 to 30 thousand cars. The property has 872 feet of frontage on Loop 336, so road visibility is exceptional."
conmas.innerText = "Know More"
conmas2.innerText = "Know More"
titleDis.innerText = "Distribution"
or.innerText = "1 room"
tr.innerText = "2 rooms"
thr.innerText = "3 rooms"
ttr.innerText = "Total Units: 206"
txtResumenPro.innerText = "Property Summary"
prRes.innerText = "The complex consists of 19 achres in which 185 units distributed in buildings of 1, 2 and 3 bedrooms will be built. Each unit will be independent and will have a size between 750 and 1200 f2. It will have different amenities for the tastes of the whole family."
orec.innerText = " 1 Room (duplex)"
orecd.innerText = "74 UNITS - 36%"
trec.innerText = " 2 Rooms"
trecd.innerText = "108 UNITS - 52%"
threc.innerText = " 3 Rooms"
threcd.innerText = "24 UNITS - 12%"

ttLinet.innerText = "PROJECT TIME LINE"
txtMensaje.innerText = "Send us a message"
ttMensaje.innerText = "LETS MAKE SOMETHING TOGETHER!!"
inputname.placeholder = "your name"
inputNum.placeholder = "your phone number"
mensaje.placeholder = "your message"

btnSolicita.innerText = "Send Message"
ftContact.innerText = "Contact"





}

if (estado ==2) {
inicio.innerText = "Inicio"
economia.innerText = "Economía"
mercado.innerText = "Mercado Inmobilario"
proj.innerText = " Proyecto Marygold"
cont.innerText = "Contacto"
txtConroe.innerText = "Conroe está creciendo actualmente a una tasa del 3.62% anual y su población ha aumentado un 7.50% desde el censo más reciente. Con una extensión de más de 73 millas, Conroe tiene una densidad de población de 1,344 personas por milla cuadrada.\
La Oficina de Administración y Presupuesto clasifica a Conroe como una ciudad principal dentro del área metropolitana de Houston–The Woodlands–SugarLand"
txtActualidad.innerText = "ACTUALIDAD"
txtActualidadP.innerText = "Actualmente el desarrollo comercial del área esta focalizado en el corredor vial de I-45 North, por lo que los visitantes o residentes tienen que movilizarse hasta más de 4 millas o más para poder acceder a los centros comerciales en The Woodlands. \
El área de mercado en cuestión tiene aproximadamente un 40% de desarrollo, con una mezcla general de intereses comerciales de apoyo predominantemente residenciales y de baja densidad. Los usos comerciales generalmente se encuentran a lo largo de las principales arterias de tráfico o en los parques empresariales planificados cercanos dentro de The Woodlands-Conroe"
ttecon.innerText = "Economía"
txtInversion.innerText = "Inversión"
pfrInversion.innerText = "Firmas de inversión están construyendo comunidades para alquilar en el área de Conroe y Montgomery para ayudar a satisfacer la creciente demanda de alquiler."
txtArquileres.innerText = "Alquileres"
pAlquileres.innerText = "La Asociación de Agentes Inmobiliarios de Houston [HAR], informó que el número de alquileres de viviendas arrendadas en el área de Houston aumentó un 24,8 % de mayo de 2021 a mayo de 2022."
txtCompra.innerText = "Ventas"
pCompra.innerText = "Texas lidera la nación en compras institucionales con el 28 % de viviendas compradas por inversionistas institucionales en 2021, más del doble del promedio nacional del 13 %."
txtCompra2.innerText = "Compra"
pCompra2.innerText = "A nivel local, los datos de NAR mostraron que el 29 % de las propiedades adquiridas en el condado de Montgomery en 2021 fueron adquiridas por compradores institucionales.."
MercadoInmo.innerText = "Mercado Inmobiliario"
 pMercadoInmo.innerText = "Las tendencias del mercado en el área de Conroe y Montgomery, como el aumento de las tasas de interés, los alquileres fluctuantes y las ventas rápidas de viviendas, convirtieron al área en un objetivo para los compradores institucionales; ya que en 2019-2022 las tasas hipotecarias estaban por debajo del 3% y de repente en 2022 están por encima del 6%, duplicando las tasas de interés, por lo que las personas difícilmente califican para la casa que querían comprar, y se ven orilladas a alquilar."
 txtBtr.innerText = "Hoy en día la construcción para alquilar [Build to Rent] puede considerarse como una “ganancia inesperada” para el retorno de la inversión; ya que permite a los inversores controlar el costo y la tasa de absorción, por lo que se prevé será el segmento de más rápido crecimiento durante los próximos cinco años."
 txtbtr2.innerText = "La ciudad de Conroe votó el 26 de mayo para aumentar el ancho mínimo del lote para una subdivisión de 40 pies de ancho a 50 pies"
 tltDueños.innerText = "Dueños vs Arrendatarios"
 subDueños.innerText = "Dueños"
 subrenter.innerText = "Arrendatarios"

spanhom.innerText = "% Hombres"
spnMuj.innerText = "% Mujeres"
spanCas.innerText = "% Casados"
spanNocas.innerText = "% Solteros"

spanhom2.innerText = "% Hombres"
spnMuj2.innerText = "% Mujeres"
spanCas2.innerText = "% Casados"
spanNocas2.innerText = "% Solteros"
pMaryGold.innerText = "La propiedad consta de 19 acres ubicados en la parte Este de Loop 336, que rodea a Conroe. El circuito tiene un tráfico diario promedio de 20 a 30 mil automóviles. La propiedad cuenta con 872 pies de frente en Loop 336, por lo que la visibilidad de la vialidad es excepcional."
conmas.innerText = "Conocer Más"
conmas2.innerText = "Conocer Más"

titleDis.innerText = "Distribución"
or.innerText = "1 cuarto"
tr.innerText = "2 cuartos"
thr.innerText = "3 cuartos"
ttr.innerText = "Unidades totales: 206"

txtResumenPro.innerText = "Resumen de Propiedad"
prRes.innerText = "El complejo consta de 19 hectáreas en las que se construirán 185 unidades distribuídas en inmuebles de 1, 2 y 3 recámaras. Cada unidad será independiente y tendrán un tamaño de entre 750 y 1,200 f2. Contará con diferentes amenidades para gustos de toda la familia."
orec.innerText = " 1 cuarto (duplex)"
orecd.innerText = "74 UNIDADES - 36%"
trec.innerText = " 2 Cuartos"
trecd.innerText = "108 UNIDADES - 52%"
threc.innerText = " 3 Cuartos"
threcd.innerText = "24 Unidades - 12%"

ttLinet.innerText = "linea del tiempo del Proyecto"
txtMensaje.innerText = "Envianos un mensaje"
ttMensaje.innerText = "Hagamos algo juntos!!"
inputname.placeholder = "Tu nombre"
inputNum.placeholder = "Tu telefono"
mensaje.placeholder = "Tu mensaje"
btnSolicita.innerText = "Envíar Mensaje"
ftContact.innerText = "Contacto"

    }
}


document.getElementById("sidbar").addEventListener("click", function(){
    a = document.querySelector("body")
    if(a.classList.contains("side-menu-visible")) {
        a.classList.remove("side-menu-visible")
    }
})