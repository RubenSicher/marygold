<?php include 'cabeza.php' ?>
<?php include 'menu_admin.php' ?>


<style>
    .tamano_imagen{
        width: 100%;
    }

    /* @media screen and (max-width:600px) {
        .tamano_imagen{
            width: 100%;
        } 
    }*/
</style>

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
                <div class="col-md-4">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Quick Example</h3>
                        </div>

                        <p class="statusMsg"></p>
                        <form class="form-horizontal" enctype="multipart/form-data" id="formCasas">
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Name house</label>
                                    <input type=" text" class="form-control" id="txtNombreCasa" name="txtNombreCasa" placeholder="Name house" wfd-id="id2">
                                </div>
                                <div class="form-group">
                                    <label>Address</label>
                                    <input type="text" class="form-control" id="txtDireccion" name="txtDireccion" placeholder="Address">
                                </div>
                                <div class="form-group">
                                    <label>Description</label>
                                    <input type="text" class="form-control" id="txtDescripcion" name="txtDescripcion" placeholder="Description">
                                </div>
                                <div class="form-group">
                                    <label>Property Size</label>
                                    <input type="text" class="form-control" id="txtTamanoPropiedad" name="txtTamanoPropiedad" placeholder="Property Size">
                                </div>
                                <div class="form-group">
                                    <label>Price</label>
                                    <input type="text" class="form-control" id="txtPrecio" name="txtPrecio" placeholder="Price">
                                </div>
                                <div class="form-group">
                                    <label>Type</label>
                                    <select class="form-control" id="cboTipoCasa" name="cboTipoCasa">
                                        <option value="0">Select option</option>    
                                        <option value="1">APARTMENT</option>
                                        <option value="2">HOUSE 1</option>
                                        <option value="3">HOUSE 2</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Flat Size</label>
                                    <input type="text" class="form-control" id="txtTamanoPlano" name="txtTamanoPlano" placeholder="Flat Size">
                                </div>
                                <div class="form-group">
                                    <label>Status</label>
                                    <select class="form-control" id="cboEstadoCasa" name="cboEstadoCasa">
                                        <option value="0">Select option</option>    
                                        <option value="1">UNDER CONSTRUCTION</option>
                                        <option value="2">option 2</option>
                                        <option value="3">option 3</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputFile">File input</label>
                                    <div class="input-group" id="uploadImage">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="file" name="file" wfd-id="id4">
                                            <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                                        </div>
                                    </div>
                                    <div class="input-group" id="imageHouse" style="display:none;">
                                        <img src="" id="imgUpload" style="width: 100%;">
                                        <input type="hidden" id="txtImage_house" name="txtImage_house" value="">
                                        <button type="button" class="btn btn-block btn-danger btn-sm" alt="Delete image" id="btnDeleteImage"><i class="fas fa-trash"></i>Delete image</button>
                                    </div>
                                </div>

                            </div>

                            <div class="card-footer">
                                <input type="hidden" value="0" id="idReg" name="idReg">
                                <button type="submit" class="btn btn-primary submitBtn">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">House list</h3>
                        </div>
                        <div class="card-body">
                            <table id="tblListadoCasas" class="table table-bordered table-hover dataTable dtr-inline" aria-describedby="example2_info">
                                <thead>
                                    <tr>
                                        <th >id</th>
                                        <th style="width: 50%;" >Data</th>
                                        <th >Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                                                        
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th >id</th>
                                        <th >Data</th>
                                        <th >Image</th>
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
<script src="./scripts/js/admin_nuevaCasa.js"></script>
</body>

</html>