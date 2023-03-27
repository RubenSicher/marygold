$(document).ready(function(e){
    $("#formCasas").on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'scripts/php/admin_nueva_casa.php?com=nueva_casa',
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.submitBtn').attr("disabled","disabled");
                $('#formCasas').css("opacity",".5");
            },
            success: function(msg){
                $('.statusMsg').html('');
                if(msg == 'ok'){
                    $('#formCasas')[0].reset();
                    $('.statusMsg').html('<span style="font-size:18px;color:#34A853">Form data submitted successfully.</span>');
                }else{
                    $('.statusMsg').html('<span style="font-size:18px;color:#EA4335">Some problem occurred, please try again.</span>');
                }
                $('#formCasas').css("opacity","");
                $(".submitBtn").removeAttr("disabled");
            }
        });
    });
    
    //file type validation
    $("#file").change(function() {
        var file = this.files[0];
        var imagefile = file.type;
        var match= ["image/jpeg","image/png","image/jpg"];
        if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]))){
            alert('Please select a valid image file (JPEG/JPG/PNG).');
            $("#file").val('');
            return false;
        }
    });
});


function listarCasas(){
    $('#tblListadoCasas').dataTable({
        destroy: true,
        retrieve: true,
        responsive: true,
        ajax: 'scripts/php/admin_nueva_casa.php?com=listarCasas',
        processing: true,
        type: 'POST',
      
          "oLanguage": {
      "sUrl": "./libs/datatables/tableLanguaje.txt"
      },
        columns: [
          { data: "id"},
          { data: "data_house"},
          { data: "image_house"}
        ],
         order:[[0,"asc"]],
      });
}

listarCasas()