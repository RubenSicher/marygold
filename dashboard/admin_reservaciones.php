<?php include 'cabeza.php' ?>
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
                    <h1 class="m-0">Reservations</h1>
                </div>
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>


    <!-- cuerpo principal -->
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-primary">
                        <div class="card-header" style="background-color: #d5b583;">
                            <h3 class="card-title">Reservation list</h3>
                        </div>

                        
                        <div class="card-body">

                        <div class="card card-primary card-tabs">
                            <div class="card-header p-0 pt-1" style="background-color: #d5b583;">
                                <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Pendientes</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-one-profile-tab" data-toggle="pill" href="#custom-tabs-one-profile" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Autorizadas</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-one-messages-tab" data-toggle="pill" href="#custom-tabs-one-messages" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false">No Autorizadas</a>
                                </li>
                                <!-- <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-one-settings-tab" data-toggle="pill" href="#custom-tabs-one-settings" role="tab" aria-controls="custom-tabs-one-settings" aria-selected="false">Settings</a>
                                </li> -->
                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="custom-tabs-one-tabContent">
                                    <div class="tab-pane fade active show" id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                                        <table id="tblListaPendientes" class="table table-hover text-nowrap" aria-describedby="example2_info">
                                            <thead>
                                                <tr>
                                                    <th >id</th>
                                                    <th >Client</th>
                                                    <th >Arrival date</th>
                                                    <th >Departure date</th>
                                                    <th >Name house</th>
                                                    <th >Address house</th>
                                                    <th >Model</th>
                                                    <th >Image</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                                                    
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th >id</th>
                                                    <th >Client</th>
                                                    <th >Arrival date</th>
                                                    <th >Departure date</th>
                                                    <th >Name house</th>
                                                    <th >Address house</th>
                                                    <th >Model</th>
                                                    <th >Image</th>
                                                </tr>
                                            </tfoot>
                                        </table>

                                        
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-profile" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                        <table id="tblListaAutorizadas" class="table table-hover text-nowrap" aria-describedby="example2_info">
                                            <thead>
                                                <tr>
                                                    <th >id</th>
                                                    <th >Client</th>
                                                    <th >Arrival date</th>
                                                    <th >Departure date</th>
                                                    <th >Name house</th>
                                                    <th >Address house</th>
                                                    <th >Model</th>
                                                    <th >Image</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                                                    
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th >id</th>
                                                    <th >Client</th>
                                                    <th >Arrival date</th>
                                                    <th >Departure date</th>
                                                    <th >Name house</th>
                                                    <th >Address house</th>
                                                    <th >Model</th>
                                                    <th >Image</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-one-messages" role="tabpanel" aria-labelledby="custom-tabs-one-messages-tab">
                                        <table id="tblListaNoAutorizadas" class="table table-hover text-nowrap" aria-describedby="example2_info">
                                            <thead>
                                                <tr>
                                                    <th >id</th>
                                                    <th >Client</th>
                                                    <th >Arrival date</th>
                                                    <th >Departure date</th>
                                                    <th >Name house</th>
                                                    <th >Address house</th>
                                                    <th >Model</th>
                                                    <th >Image</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                                                    
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th >id</th>
                                                    <th >Client</th>
                                                    <th >Arrival date</th>
                                                    <th >Departure date</th>
                                                    <th >Name house</th>
                                                    <th >Address house</th>
                                                    <th >Model</th>
                                                    <th >Image</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <!-- <div class="tab-pane fade" id="custom-tabs-one-settings" role="tabpanel" aria-labelledby="custom-tabs-one-settings-tab">
                                        Pellentesque vestibulum commodo nibh nec blandit. Maecenas neque magna, iaculis tempus turpis ac, ornare sodales tellus. Mauris eget blandit dolor. Quisque tincidunt venenatis vulputate. Morbi euismod molestie tristique. Vestibulum consectetur dolor a vestibulum pharetra. Donec interdum placerat urna nec pharetra. Etiam eget dapibus orci, eget aliquet urna. Nunc at consequat diam. Nunc et felis ut nisl commodo dignissim. In hac habitasse platea dictumst. Praesent imperdiet accumsan ex sit amet facilisis.
                                    </div> -->
                                </div>
                            </div>
                            <!-- /.card -->
                            </div>
                           
                            
                        </div>

                            <!-- <div class="card-footer">
                                <input type="hidden" value="0" id="idReg" name="idReg">
                                <button type="submit" class="btn btn-primary submitBtn">Guardar</button>
                            </div> -->
                    </div>
                </div>
                <!-- <div class="col-md-6">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Autorizadas</h3>
                        </div>
                        <div class="card-body">
                            <table id="tblListadoModelos" class="table table-hover text-nowrap" aria-describedby="example2_info">
                                <thead>
                                    <tr>
                                        <th >id</th>
                                        <th >Name</th>
                                        <th >Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                                                        
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th >id</th>
                                        <th >Name</th>
                                        <th >Image</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    
                    
                </div> -->
            </div>
        </div>
    </section>

</div>


<?php include 'pie.php' ?>

<!-- </div> -->


<?php include 'extension_pagina.php' ?>
<script src="./scripts/js/admin_reservaciones.js"></script>
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