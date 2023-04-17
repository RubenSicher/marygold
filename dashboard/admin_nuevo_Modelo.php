<?php include 'cabeza.php' ?>
<?php include 'menu_admin.php' ?>

<style>
    .tamano_imagen{
        width: 400px;
        height: 300px;
    }
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
                            <h3 class="card-title">House details</h3>
                        </div>

                        <p class="statusMsg"></p>
                        <form class="form-horizontal" enctype="multipart/form-data" id="formModelos">
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input type=" text" class="form-control" id="txtNombreModelo" name="txtNombreModelo" placeholder="Model name " wfd-id="id2">
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
                            <h3 class="card-title">Model list</h3>
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
                    
                    
                </div>
            </div>
        </div>
    </section>

</div>


<?php include 'pie.php' ?>

<!-- </div> -->


<?php include 'extension_pagina.php' ?>
<script src="./scripts/js/admin_nuevoModelo.js"></script>
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