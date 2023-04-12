var infoCasa
var imagen
var secInfoCasas = document.getElementById("infoCasas")
var secImagen = document.getElementById("imagenCasa")

document.getElementById("btnNuevaCasa") .addEventListener("click", function(){



infoCasa = '<div class="banner-content">\
                <span class="sub-title" data-animation-in="fadeInDown" data-delay-in=".2" data-duration-in=".6">Bala Cynwyd, PA</span>\
                <h2 class="title" data-animation-in="fadeInDown" data-delay-in=".2" data-duration-in=".6">Bala Cynwyd Shopping Center</h2>\
                <p data-animation-in="fadeInUp" data-delay-in=".4" data-duration-in=".6">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui</p>\
                <ul class="list-wrap" data-animation-in="fadeInUp" data-delay-in=".6" data-duration-in=".6">\
                    <li>\
                        <div class="icon"><i class="flaticon-018-rescale"></i></div>\
                        <div class="content">\
                            <p>Property size <br>175,000 sqft</p>\
                        </div>\
                    </li>\
                    <li>\
                        <div class="icon"><i class="flaticon-009-crane-truck"></i></div>\
                        <div class="content">\
                            <p>Status <br> Completed</p>\
                        </div>\
                    </li>\
                    <li>\
                        <div class="icon"><i class="flaticon-008-money-bag"></i></div>\
                        <div class="content">\
                            <p>Price Range <br>$10K - $50K</p>\
                        </div>\
                    </li>\
                    <li>\
                        <div class="icon"><i class="flaticon-017-apartment"></i></div>\
                        <div class="content">\
                            <p>Type <br> Community</p>\
                        </div>\
                    </li>\
                </ul>\
                <a href="project-details.html" class="btn" data-animation-in="fadeInUp" data-delay-in=".6" data-duration-in=".6">\
                    <div class="btn_m">\
                        <div class="btn_c">\
                        <div class="btn_t1">View details</div>\
                            <div class="btn_t2">View details</div>\
                        </div>\
                    </div>\
                </a>\
                </div>' 
imagen = '<div class="item">\
    <div class="banner-img-item">\
    <img src="assets/img/banner/h8_banner_img02.jpg" alt="">\
    </div>\
</div>'
    
//  let infoCasa2 = document.createElement(infoCasa)
//  let imagen2 = document.createElement(imagen)

//  secInfoCasas.innerHTML = infoCasa.trim()
//  secImagen.innerHTML = imagen.trim()
// secInfoCasas.firstChild;
// secImagen.firstChild;

// secInfoCasas.append(infoCasa)
// secImagen.append(imagen)

secInfoCasas.insertAdjacentHTML( 'beforeend', infoCasa );
secImagen.insertAdjacentHTML( 'beforeend', imagen );

            })

            
