<?php include 'cabeza.php' ?>
<?php include 'menu_admin.php' ?>


<div class="modal fade" id="modalInteresado" style="padding-right: 17px;" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-md">
        <div class="modal-content">
            <!-- <div class="modal-header">
                <h4 class="modal-title">Small Modal</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div> -->
            <div class="modal-body" style="text-align: center;">
                <button type="button" class="btn btn-success btnInteresado" data-i="0">Interesado</button>
                <button type="button" class="btn btn-warning btnInteresado" data-i="1">No interesedo</button>
                <button type="button" class="btn btn-danger btnInteresado" data-i="2">Equivocado</button>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
        </div>
    </div>
</div>

<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Dashboard</h1>
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
                        <div class="card-header">
                            <h3 class="card-title">Interest list</h3>
                        </div>
                        <div class="card-body">
                            <table id="tblListadoSolicitudes" class="table table-bordered table-hover dataTable dtr-inline" aria-describedby="example2_info">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Date</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                        <th>Interested</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>id</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Date</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                        <th>Interested</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </section>

</div>


<?php include 'pie.php' ?>

<!-- </div> -->


<?php include 'extension_pagina.php' ?>
<script src="./scripts/js/admin_listaInteresados.js"></script>
</body>

</html>