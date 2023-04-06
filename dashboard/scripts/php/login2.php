<?php include_once 'conectar.php';

$consulta = $_GET['consulta'];
$id = $_GET['id'];
$pass = $_GET['pass'];
$nombre = $_GET['usuario'];
$nuevaclave= $_GET['nuevaClave'];
$idClave= $_GET['idClave'];

// buscamos usuario 
if($consulta =='buscarUsuario'){
$sql = "SELECT * FROM admin_usuarios WHERE email = '$id'";
$result = mysqli_query($conn, $sql);
$datos = array();
while ($row = mysqli_fetch_assoc($result))
{   $datos[] = $row;
}
echo json_encode($datos);
}
// termina

// buscamos contraseña
elseif($consulta =='buscarpass')
{
$sql2 = "SELECT * FROM `admin_usuarios` WHERE email ='$id' and clave ='$pass'";
$result2 = mysqli_query($conn, $sql2);
$datos2 = array();
while($row2 = mysqli_fetch_assoc($result2)){
    $datos2[]=$row2;
}
echo json_encode($datos2);
}
// >
// ver si el usuario existe
elseif($consulta=="verUsuario"){
$sql = "SELECT * FROM admin_usuarios where nombre ='$nombre'";
$result2 = mysqli_query($conn, $sql);
$datos2 = array();
while($row2 = mysqli_fetch_assoc($result2)){
    $datos2[]=$row2;
}
echo json_encode($datos2);

    
} else if($consulta=='CambiarClave') {
$sql2 = "UPDATE admin_usuarios SET clave='$nuevaclave' , activo=1 WHERE id=$idClave";
if($conn->query($sql2)===true){
echo 'ok';
} else {
    echo 'error';
    print $conn->error;
}
} else if($consulta=='mantieneClave') {
    $sql2 = "UPDATE admin_usuarios SET activo=1 WHERE id=$idClave";
    if($conn->query($sql2)===true){
    echo 'ok';
    } else {
        echo 'error';
        print $conn->error;
    }
    }
?>