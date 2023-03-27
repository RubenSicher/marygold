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
        <div class="row mb-2">
          <div class="m-auto col-md-12 text-center">
            <h3 class="m-0">Usuarios</h3>
          </div>
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>


    <!-- cuerpo principal -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="m-auto col-md-6">
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
      </div>
    </section>

  </div>

  <?php include 'pie.php' ?>
  <?php include 'extension_pagina.php' ?>
  <script src="./scripts/js/agregar_usuario.js"></script>

