<?php include_once 'conectar.php';

$consulta = $_GET['consulta'];
$id = $_GET['id'];
$pass = $_GET['pass'];

if($consulta = 'consulta'){



$a= $_GET['x'];

$sql = "SELECT * FROM admin_usuarios WHERE id = $a";
$result = mysqli_query($conn, $sql);


$datos = array();
while ($row = mysqli_fetch_assoc($result))
{

    $datos[] = $row;
}
echo json_encode($datos);
}
?>