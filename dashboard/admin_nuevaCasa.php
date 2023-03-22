<?php include 'cabeza.php' ?>
<?php include 'menu_admin.php' ?>

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
                            <h3 class="card-title">Quick Example</h3>
                        </div>

                        <p class="statusMsg"></p>
                        <form enctype="multipart/form-data" id="formCasas">
                            <div class="card-body">
                                <div class="form-group">
                                    <label ">Name house</label>
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
                                        <option value="1">UNDER CONSTRUCTION</option>
                                        <option value="2">option 2</option>
                                        <option value="3">option 3</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputFile">File input</label>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="file" name="file" wfd-id="id4">
                                            <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                                        </div>
                                        <!-- <div class="input-group-append">
                                            <span class="input-group-text">Upload</span>
                                        </div> -->
                                    </div>
                                </div>

                            </div>

                            <div class="card-footer">
                                <button type="submit" class="btn btn-primary submitBtn">Guardar</button>
                            </div>
                        </form>
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