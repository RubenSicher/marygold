
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar elevation-4 sidebar-light-warning">
    <!-- Brand Logo -->
    <a href="https://marygoldhomes.com/dashboard/" class="brand-link">
      <img src="/mg/assets/img/iconmg.svg" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Dashboard</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">


      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
  
         
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-users"></i>
              <p>
               Usuarios
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="usuarios.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Nuevo/estatus</p>
                </a>
              </li>

            </ul>
          </li>
          <li class="nav-item">
            <a href="admin_listaInteresados.php" class="nav-link">
              <i class="nav-icon fas fa-house-user"></i>
              <p>
               Solicitudes
                <!-- <i class="right fas fa-angle-left"></i> -->
              </p>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-calendar"></i>
              <p>
               Reservaciones
              <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="admin_reservaciones.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Lista Reservaciones</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="admin_calendario_reservas.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Calendario</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Indicadores</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-house-laptop"></i>
              <p>
               Casas
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="admin_nuevaCasa.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Nueva Casa</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="admin_nuevo_Modelo.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Nuevo Modelo</p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>