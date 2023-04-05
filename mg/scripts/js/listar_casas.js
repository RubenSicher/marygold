//  setTimeout(function(){
//    window.addEventListener("load", (event)=>{listarCasas()}) 
//    },1500)   


var lista_casas
var contenido_casas

function listarCasas(){
    lista_casas = ""
    contenido_casas = ""
    $.ajax({
        url:"scripts/php/listar_casas.php",
        cache: false,
        data: {comm:"listarCasas"},
        dataType: "json",
        method: "POST"
    }).done(function(rest){
        $.each(rest.data, function (i, item) {
           
            lista_casas += '<div class="item">\
                                <div class="banner-img-item">\
                                    <img src="'+item.src_image+'" alt="">\
                                </div>\
                            </div>'
            contenido_casas += '<div class="banner-content">\
                            <span class="sub-title" data-animation-in="fadeInDown" data-delay-in=".2" data-duration-in=".6">'+item.name_house+'</span>\
                            <h2 class="title" data-animation-in="fadeInDown" data-delay-in=".2" data-duration-in=".6">Bala Cynwyd Shopping Center</h2>\
                            <p data-animation-in="fadeInUp" data-delay-in=".4" data-duration-in=".6">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui</p>\
                            <ul class="list-wrap" data-animation-in="fadeInUp" data-delay-in=".6" data-duration-in=".6">\
                                <li>\
                                    <div class="icon"><i class="flaticon-018-rescale"></i></div>\
                                    <div class="content">\
                                        <p>Property size <br>174,000 sqft</p>\
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
            
            
            // $("#idReg").val(item.id)
            // $("#txtNombreCasa").val(item.name_house)
            // $("#txtDireccion").val(item.address_house)
            // $("#txtDescripcion").val(item.description)
            // $("#txtTamanoPropiedad").val(item.property_size)
            // $("#txtPrecio").val(item.price)
            // $("#cboTipoCasa").val(item.type_house)
            // $("#txtTamanoPlano").val(item.flat_size)
            // $("#cboEstadoCasa").val(item.status_house)
            
            // if(item.src_image != ""){
            //     $("#imgUpload").attr("src", item.src_image)
            //     $("#txtImage_house").val(item.image_house)
            //     $("#uploadImage").hide()
            //     $("#imageHouse").show()
            // }else{
            //     $("#imgUpload").attr("src", "")
            //     $("#txtImage_house").val("")
            //     $("#uploadImage").show()
            //     $("#imageHouse").hide()
            // }
        })

        $("#banner_lista_casas").html(lista_casas)
        $("#banner_content_casas").html(contenido_casas)    
     

        // var script = document.createElement("script");
        // var script1 = document.createElement("script");
        // var script2 = document.createElement("script");
        // var script3 = document.createElement("script");
        // var script4 = document.createElement("script");
        // var script5 = document.createElement("script");
        // var script6 = document.createElement("script");
        // var script7 = document.createElement("script");
        // var script8 = document.createElement("script");
        // var script9 = document.createElement("script");
        // var script10 = document.createElement("script");
        // var script11 = document.createElement("script");
        // var script12 = document.createElement("script");
        // var script13 = document.createElement("script");
        // var script14 = document.createElement("script");

        // script.parentNode.removeChild(script)
        // script1.parentNode.removeChild(script1)
        // script2.parentNode.removeChild(script2)
        // script3.remove()
        // script4.remove()
        // script5.remove()
        // script6.remove()
        // script7.remove()
        // script8.remove()
        // script9.remove()
        // script10.remove()
        // script11.remove()
        // script12.remove()
        // script13.remove()
        // script14.remove()
    //     var s = document.getElementById("script")
    //     if(isNaN(s) || s==null || s=='null'){
    //         console.log(s)
    //     }else{
    //         console.log(s)
    //     }

    
    // script = document.createElement("script");
	// script.async = false;
	// script.src = 'assets/js/bootstrap.min.js';
    // script.id = "script"
	// document.body.appendChild(script);
    
    // s = document.getElementById("script")
    // if(isNaN(s) || s==null || s=='null'){
    //     console.log(s)
    // }else{
    //     console.log(s)
    // }
   
    // script1 = document.createElement("script");
	// script1.async = false;
	// script1.src = 'assets/js/jquery.magnific-popup.min.js';
	// document.body.appendChild(script1);

    // script2 = document.createElement("script");
	// script2.async = false;
	// script2.src = 'assets/js/jquery.odometer.min.js';
	// document.body.appendChild(script2);

    // script3 = document.createElement("script");
	// script3.async = false;
	// script3.src = 'assets/js/jquery.parallaxScroll.min.js';
	// document.body.appendChild(script3);
    
    // script4 = document.createElement("script");
	// script4.async = false;
	// script4.src = 'assets/js/simpleParallax.min.js';
	// document.body.appendChild(script4);
    
    // script5 = document.createElement("script");
	// script5.async = false;
	// script5.src = 'assets/js/slick-animation.min.js';
	// document.body.appendChild(script5);
    
    // script6 = document.createElement("script");
	// script6.async = false;
	// script6.src = 'assets/js/swiper-bundle.min.js';
	// document.body.appendChild(script6);
    
    // script7 = document.createElement("script");
	// script7.async = false;
	// script7.src = 'assets/js/jarallax.min.js';
	// document.body.appendChild(script7);
    
    // script8 = document.createElement("script");
	// script8.async = false;
	// script8.src = 'assets/js/jarallax-video.min.js';
	// document.body.appendChild(script8);
    
    // script9 = document.createElement("script");
	// script9.async = false;
	// script9.src = 'assets/js/jquery.appear.js';
	// document.body.appendChild(script9);
    
    // script10 = document.createElement("script");
	// script10.async = false;
	// script10.src = 'assets/js/jquery.easing.js';
	// document.body.appendChild(script10);
    
    // script11 = document.createElement("script");
	// script11.async = false;
	// script11.src = 'assets/js/slick.min.js';
	// document.body.appendChild(script11);
    
    // script12 = document.createElement("script");
	// script12.async = false;
	// script12.src = 'assets/js/ajax-form.js';
	// document.body.appendChild(script12);
    
    // script13 = document.createElement("script");
	// script13.async = false;
	// script13.src = 'assets/js/wow.min.js';
	// document.body.appendChild(script13);
    
    // script14 = document.createElement("script");
	// script14.async = false;
	// script14.src = 'assets/js/main.js';
	// document.body.appendChild(script14);
        
        $("#script0").attr("src","assets/js/bootstrap.min.js")
        $("#script1").attr("src", "assets/js/jquery.magnific-popup.min.js")
        $("#script2").attr("src", "assets/js/jquery.odometer.min.js")
        $("#script3").attr("src", "assets/js/jquery.parallaxScroll.min.js")
        $("#script4").attr("src", "assets/js/simpleParallax.min.js")
        $("#script5").attr("src", "assets/js/slick-animation.min.js")
        $("#script6").attr("src", "assets/js/swiper-bundle.min.js")
        $("#script7").attr("src", "assets/js/jarallax.min.js")
        $("#script8").attr("src", "assets/js/jarallax-video.min.js")
        $("#script9").attr("src", "assets/js/jquery.appear.js")
        $("#script10").attr("src", "assets/js/jquery.easing.js")
        $("#script11").attr("src", "assets/js/slick.min.js")
        $("#script12").attr("src", "assets/js/ajax-form.js")
        $("#script13").attr("src", "assets/js/wow.min.js")
        $("#script14").attr("src", "assets/js/main.js")
        
    })
}

listarCasas()
