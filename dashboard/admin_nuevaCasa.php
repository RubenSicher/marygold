<?php include 'cabeza.php' ?>
<?php include 'menu_admin.php' ?>


<style>
    .tamano_imagen{
        width: 400px;
        height: 300px;
    }

    .imgGallery{
        height: 100px;
        border-radius: 10px;
        background-color: #fff0d9;
        /* margin: auto; */
        text-align: center;
        align-content: center;
        display: flex;
        flex-wrap: wrap;
        color: gray;
        position: relative;
        justify-content: center;
    } 

    .delete_image{
        position: absolute;
        bottom:0.3em;
        right:0.2em;
        background-color:#fff;
        border-radius:1em;
        padding:0.3em 0.6em 0.3em 0.6em;
        /* opacity: 0.6; */
    }
    .tamano_letra{
        font-size: 10px;
        cursor: pointer;
    }
</style>

<div class="modal fade" id="modalGallery">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Gallery</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-5" style="margin: auto;">
                        <div id="div_upload1" class="imgGallery">
                            <p class="btn_imagen tamano_letra" id="btnImage1" data-id="1">upload image
                                <form action="" id="formImage1" style="display: none;">
                                    <input type="file" id="fileTypeImage1" name="fileTypeImage1" data-id="1" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" onchange="validar()">
                                </form>
                            </p>
                        </div>
                        <div id="div_imagen_galeria1" class="imgGallery" style="display: none;">
                            <img id="imagen_galeria1" width="100%" height="100px" src="" >
                            <a class="delete_image" data-id="1" title="Delete picture"><i class="fas fa-trash"></i></a>
                            <input type="hidden" id="name_image1">
                        </div>
                    </div>
                    <div class="col-md-5 " style="margin: auto;">
                        <div id="div_upload2" class="imgGallery">
                            <p class="btn_imagen tamano_letra" id="btnImage2" data-id="2">upload image
                                <form action="" id="formImage2" style="display: none;">
                                    <input type="file" id="fileTypeImage2" name="fileTypeImage2" data-id="2" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" onchange="validar()">
                                </form>
                            </p>
                        </div>
                        <div id="div_imagen_galeria2" class="imgGallery" style="display: none;">
                            <img id="imagen_galeria2" width="100%" height="100px" src="" >
                            <a class="delete_image" data-id="2" title="Delete picture"><i class="fas fa-trash"></i></a>
                            <input type="hidden" id="name_image2">
                        </div>
                    </div>
                </div>
                <div class="row" style="margin-top: 10px;">
                <div class="col-md-5 " style="margin: auto;">
                        <div id="div_upload3" class="imgGallery">
                            <p class="btn_imagen tamano_letra" id="btnImage3" data-id="3">upload image
                                <form action="" id="formImage3" style="display: none;">
                                    <input type="file" id="fileTypeImage3" name="fileTypeImage3" data-id="3" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" onchange="validar()">
                                </form>
                            </p>
                        </div>
                        <div id="div_imagen_galeria3" class="imgGallery" style="display: none;">
                            <img id="imagen_galeria3" width="100%" height="100px" src="" >
                            <a class="delete_image" data-id="3" title="Delete picture"><i class="fas fa-trash"></i></a>
                            <input type="hidden" id="name_image3">
                        </div>
                    </div>
                    <div class="col-md-5 " style="margin: auto;">
                        <div id="div_upload4" class="imgGallery">
                            <p class="btn_imagen tamano_letra" id="btnImage4" data-id="4">upload image
                                <form action="" id="formImage4" style="display: none;">
                                    <input type="file" id="fileTypeImage4" name="fileTypeImage4" data-id="4" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" onchange="validar()">
                                </form>
                            </p>
                        </div>
                        <div id="div_imagen_galeria4" class="imgGallery" style="display: none;">
                            <img id="imagen_galeria4" width="100%" height="100px" src="" >
                            <a class="delete_image" data-id="4" title="Delete picture"><i class="fas fa-trash"></i></a>
                            <input type="hidden" id="name_image4">
                        </div>
                    </div>
                
                </div>
                <div class="row" style="margin-top: 10px;">
                    <div class="col-md-5 " style="margin: auto;">
                        <div id="div_upload5" class="imgGallery">
                            <p class="btn_imagen tamano_letra" id="btnImage5" data-id="5">upload image
                                <form action="" id="formImage5" style="display: none;">
                                    <input type="file" id="fileTypeImage5" name="fileTypeImage5" data-id="5" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" onchange="validar()">
                                </form>
                            </p>
                        </div>
                        <div id="div_imagen_galeria5" class="imgGallery" style="display: none;">
                            <img id="imagen_galeria5" width="100%" height="100px" src="" >
                            <a class="delete_image" data-id="5" title="Delete picture"><i class="fas fa-trash"></i></a>
                            <input type="hidden" id="name_image5">
                        </div>
                    </div>
                    <div class="col-md-5 " style="margin: auto;">
                        <div id="div_upload6" class="imgGallery">
                            <p class="btn_imagen tamano_letra" id="btnImage6" data-id="6">upload image
                                <form action="" id="formImage6" style="display: none;">
                                    <input type="file" id="fileTypeImage6" name="fileTypeImage6" data-id="6" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" onchange="validar()">
                                </form>
                            </p>
                        </div>
                        <div id="div_imagen_galeria6" class="imgGallery" style="display: none;">
                            <img id="imagen_galeria6" width="100%" height="100px" src="" >
                            <a class="delete_image" data-id="6" title="Delete picture"><i class="fas fa-trash"></i></a>
                            <input type="hidden" id="name_image6">
                        </div>
                    </div>
                </div> 
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <!-- <button type="button" class="btn btn-primary">Save</button> -->
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->



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
                        <form class="form-horizontal" enctype="multipart/form-data" id="formCasas">
                            <div class="card-body">
                                <div class="form-group">
                                    <label>Model</label>
                                    <select class="form-control" id="cboModeloCasa" name="cboModeloCasa">
                                        <option value="0">Select option</option>    
                                        <!-- <option value="1">APARTMENT</option>
                                        <option value="2">HOUSE 1</option>
                                        <option value="3">HOUSE 2</option> -->
                                    </select>
                                </div>
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
                                    <label for="exampleInputFile">Main image</label>
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
<!-- <script src="./scripts/js/admin_nuevoModelo.js"></script> -->
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