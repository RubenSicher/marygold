<?php include 'cabeza.php' ?>
<?php include 'menu_admin.php' ?>
<style>
  .Correcto{
    animation-name: inputCorrecto;
  animation-duration: 4s;
  }
  @keyframes inputCorrecto {
    from  {border-color: green;
    background-color: lightcyan}
    to {}
  }
</style>
<!-- cuerpo -->

  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 text-center">
            <h3 class="d-sm-inline-block">Control de usuarios</h3>
           <button class="d-sm-inline-block btn btn-info ml-2" data-toggle="collapse" href="#formCollapse" aria-expanded="false" id="btnOCultaFormulario" >Nuevo</button disabled>
     
            
          </div>
       
            
         
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>


    <!-- cuerpo principal -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="m-auto col-md-6 collapse" id="formCollapse">
          <div class="card card-primary">
            <div class="card-header">
            <h3 class="card-title">Agregar Nuevo Usuario</h3>
            </div>   
            <form id="formNuevoUsuario">
                <div class="card-body">
                <div class="form-group">
                <label for="txtNombre">Nombre</label>
                <input type="text" class="form-control" id="txtNombre" autocomplete="off">
                </div>
                <div class="form-group">
                <label for="txtCorreo">Correo</label>
                <input type="email" class="form-control" id="txtCorreo" autocomplete="off">
                <span id="CorreoMalo" class="error invalid-feedback" style="display:none">Porfavor agrege un correo valido</span>
                </div>
                <div class="form-group">
                <label for="txtPassword">Clave Provicional</label>
                <input type="text" class="form-control" id="txtPassword" disabled>
                </div>
        
                </div>

                <div class="card-footer">
                <button type="button" class="btn btn-primary" id="btnGuardaUsuario">Guardar</button>
                </div>
                </form>
                </div>
          </div>
        </div>

        <!-- empieza tabla -->

        <div class="row">
                        <div class="col-12">
                        <div class="card">
                        <div class="card-header bg-info">
                        <h3 class="card-title">Lista de usuarios</h3>
                        <div class="card-tools">
                        </div>
                        </div>
                        <div class="card-body table-responsive p-0">
                        <table class="table table-hover text-nowrap" id="tblUsuarios">
                        <thead>
                        <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>correo</th>
                        <th>Estado</th>
                        <th>Activo</th>
                        <th>Acción</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        </table>
                                </div>
                          </div>
                        </div>
                     </div>
      </div>
    </section>

  </div>

  <?php include 'pie.php' ?>
  <?php include 'extension_pagina.php' ?>
  <script src="./scripts/js/agregar_usuario.js"></script>

