<?php include 'cabeza.php' ?>

<?php include 'menu_admin.php' ?>

<style>
    .tamano_monto{
        font-size: 10px;
        height: 50px;
        min-width: 57px;
        margin: 0 0 10px 4px;
        color: #000;
    }
</style>

<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Reserve indicators</h1>
                </div>
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>

    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                   
                     <!-- BAR CHART -->
                    <div class="card card-success">
                    <div class="card-header" style="background-color: #d5b583;">
                        <h3 class="card-title">Semi-annual report</h3>
                        
                        <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                        <!-- <button type="button" class="btn btn-tool" data-card-widget="remove">
                            <i class="fas fa-times"></i>
                        </button> -->
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="chart">
                        <canvas id="barChart" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                        <canvas id="barChartIngresos" style="display:none; min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                        </div>
                    </div>

                    <!-- /.card-body -->
                    </div>
                    <!-- /.card -->

                </div>
            </div>
        </div>
    </section>

    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                   
                    <!-- DONUT CHART -->
                    <div class="card card-danger">
                    <div class="card-header" style="background-color: #d5b583;">
                        <h3 class="card-title">Most rented houses | TOP 10</h3>

                        <div class="card-tools" style="display: flex;">
                        <select class="form-control" id="cboAnio" name="cboAnio">
                            <option value="0">ALL</option>    
                            <?php 
                                $year = date("Y");
                                for ($i= 2020; $i <= $year ; $i++) { //quitarle el +1 Aver ?

                                echo'<option VALUE="'.$i.'">'.$i.'</option>';

                                    }

                            ?>
                        </select>
                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                        <!-- <button type="button" class="btn btn-tool" data-card-widget="remove">
                            <i class="fas fa-times"></i>
                        </button> -->
                        </div>
                    </div>
                    <div class="card-body" >
                        <canvas id="donutChartTopTen" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                    </div>
                    <!-- /.card-body -->
                    </div>
                    <!-- /.card -->

                </div>

                <div class="col-md-6">
                   
                     <!-- BAR CHART -->
                    <div class="card card-success">
                    <div class="card-header" style="background-color: #d5b583;">
                        <h3 class="card-title">Annual report by type</h3>
                        
                        <div class="card-tools" style="display: flex;">
                        <select class="form-control" id="cboAnioTipoEstado" name="cboAnioTipoEstado">
                            <!-- <option value="0">CURRENT</option>     -->
                            <?php 
                                $year = date("Y");
                                for ($i= 2020; $i <= $year ; $i++) { //quitarle el +1 Aver ?

                                echo'<option VALUE="'.$i.'">'.$i.'</option>';

                                    }

                            ?>
                        </select>
                        <select class="form-control" id="cboEstado" name="cboEstado">
                            <option value="0">PENDIENTE</option>
                            <option value="1">AUTORIZADO</option>    
                            <option value="2">NO AUTORIZADO</option>
                        </select>
                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                        <!-- <button type="button" class="btn btn-tool" data-card-widget="remove">
                            <i class="fas fa-times"></i>
                        </button> -->
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="chart" id="chartPendientes">
                        <canvas id="barChartAnualPendientes" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                        </div>

                        <div class="chart" id="chartAutorizados" style="display: none;">
                        <canvas id="barChartAnualAutorizados" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                        </div>

                        <div class="chart" id="chartNoAutorizados" style="display: none;">
                        <canvas id="barChartAnualNoAutorizados" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                        </div>
                    </div>
                    <!-- /.card-body -->
                    </div>
                    <!-- /.card -->

                </div>
            </div>
        </div>
    </section>

</div>

<?php include 'pie.php' ?>

<!-- </div> -->


<?php include 'extension_pagina.php' ?>

<script src="./scripts/js/admin_indicadores_reserva.js"></script>
<script>



</script>