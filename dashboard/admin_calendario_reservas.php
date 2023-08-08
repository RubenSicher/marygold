<?php include 'cabeza.php' ?>
    <link href='libCalendar/main.css' rel='stylesheet' />
    <script src='libCalendar/main.js'></script> 
<?php include 'menu_admin.php' ?>

<!-- <style>
    .tamano_imagen{
        width: 200px;
        height: 150px;
    }
</style> -->

<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Calendar</h1>
                </div>
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>


    <!-- cuerpo principal -->
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-primary" >
                        <div class="card-header" style="background-color: #d5b583;">
                            <h3 class="card-title">Reservation Calendar</h3>
                        </div>

                        
                        <div class="card-body">
                            <div class="padding">
                                <div class="mb-3 text-center">
                                    <div id="calendar">
    	
                                    </div>
                                </div>
                            </div>
                       
                        </div>   
                            <!-- <div class="card-footer">
                                <input type="hidden" value="0" id="idReg" name="idReg">
                                <button type="submit" class="btn btn-primary submitBtn">Guardar</button>
                            </div> -->
                    </div>
                </div>
               
            </div>
        </div>
    </section>

</div>


<?php include 'pie.php' ?>

<!-- </div> -->


<?php include 'extension_pagina.php' ?>
<script src="./scripts/js/admin_calendario_reservas.js"></script>
<script>
var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  var Toast2 = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: null,

  });
</script>
</body>

</html>