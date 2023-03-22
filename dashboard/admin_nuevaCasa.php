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
                                    <label ">Email address</label>
                                    <input type="text" class="form-control" id="txtDescripcion" name="txtDescripcion" placeholder="Descripción" wfd-id="id2">
                                </div>
                                <div class="form-group">
                                    <label >Password</label>
                                    <input type="text" class="form-control" id="txtUbicacion" name="txtUbicacion" placeholder="Ubicación" wfd-id="id3">
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