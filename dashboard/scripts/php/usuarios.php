<?php include_once 'conectar.php';

$consulta = $_GET['consulta'];
$id = $_GET['id'];
$estado = $_GET['estado'];
$activos = $_GET['activo'];
$idCalve = $_GET['idCalve'];
$claveTemp = $_GET['claveTemp'];
// $nombre = $_GET['usuario'];

// buscamos usuario 
if($consulta =='verUsuarios'){
$sql = "SELECT * FROM admin_usuarios";
$result = mysqli_query($conn, $sql);

$datos = array();
while ($row = mysqli_fetch_array($result))
{ 
    $id = $row['id'];
    $nombre = $row['nombre'];
    $correo = $row['email'];
    $estado = $row['estado'];
    $activo = $row['activo'];
    if ($estado==0) {
        $disable = 'disabled';
    }
    else $disable = '';
    $accion = ' <div class="btn-group ml-2">
                                <button type="button" '.$disable.' class="btn btn-danger btn-sm" onclick="javascript:BorrarUsuario('.$id.')"> 
                                <i class="far fa-trash-alt"></i>
                                </button>
                                <button type="button" class="btn btn-info btn-sm ml-2" onclick="javascript:olvidoClave('.$id.')">
                                <i class="fas fa-sync-alt"></i>
                                </button>
                                </div>';
    if ($estado ==1){
        $estador = '<small class="badge badge-success">En linea</small>';
    }
    else if ($estado==0){
        $estador = '<small class="badge badge-danger">Baja</small>';
        $activor='<button class="btn btn-warning btn-sm" onclick="javascript:ActivarCuenta('.$id.')">Activar</button>';
    }

    if ($estado==1 && $activo ==0) {
        $activor='<small class="badge badge-warning">Inactiva</small>';
        }
    else if ($estado==0 && $activo ==0) {
        $activor='<button class="btn btn-warning btn-sm" onclick="javascript:ActivarCuenta('.$id.')">Activar</button>';
    }
    
    else if ($estado==1 && $activo ==1) {
        $activor = '<small class="badge badge-success">Activo</small>';;
    }


    $datos[] = array('id'=>$id,'nombre'=>$nombre,'email'=>$correo,'estado'=>$estador,'activo'=>$activor,'accion'=>$accion);
}
echo (json_encode($datos));
}

//damos de baja a usuario
else if($consulta=="bajaUsuario"){
$sql2 = "UPDATE admin_usuarios SET estado=$estado, activo=$activos WHERE id=$id";

if ($conn->query($sql2) === TRUE) {
    echo "ok";
  } else {
    echo "error";
    print $conn->error;
  }
}
else if($consulta=="EnviarCorreo") {
    $sql2 = "UPDATE admin_usuarios SET clave='$claveTemp', activo=0  WHERE id=$id";
    if ($conn->query($sql2) === TRUE) {
    $sql = "SELECT * FROM admin_usuarios where id=$id";
    $result = mysqli_query($conn, $sql);
    
    $datos = array();
    while ($row = mysqli_fetch_array($result))
    {
        $correo = $row['email'];
        $clave = $row['clave'];
    }
    // $to = '"'.$correo.'"';
    $to = "$correo";
    $subject = "Contraseña nueva, administración MaryGold";
    
    $message = "<h4>Esta es tu nueva clave, copiala!:</h4>";
    $message .= "<h4>Nueva Clave: <b>$clave</b> </h4>";
    $message .= "<h4>cuanto tengas tu clave ingresa a la siguiente liga y cambiala!</h4>";
    $message .= "<a href='https://marygoldhomes.com/dashboard/login.html'><h4> Ingresar A módulo!</h4></a>";
    
    $header = "From:admin@marygoldhomes.com\r\n";
    // $header .= "Cc:afgh@somedomain.com \r\n";
    $header .= "MIME-Version: 1.0\r\n";
    $header .= "Content-type: text/html\r\n";
    
    $retval = mail ($to,$subject,$message,$header);
    
    if( $retval == true ) {
       echo "ok";
    }else {
       echo "error.";
    }
    } else {
        echo "error";
        print $conn->error;
      }
}
    

?>