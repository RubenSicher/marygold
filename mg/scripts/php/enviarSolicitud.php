<?php  include_once "../../../dashboard/scripts/php/conectar.php";
 
 $con = $_GET['con'];
 $nomb = $_GET['nombre'];
 $tel = $_GET['tel'];
 $mens = $_GET['mens'];
$date = 0;


 if ($con =='guardarSolicitud') {
    $date = date("Y-m-d");
     $sql = "INSERT INTO admin_solicitudes (nombre, tel, fecha_sol, mensaje) VALUES ('$nomb', '$tel', '$date','$mens')";
    
    if ($conn->query($sql) === TRUE) {
        echo 'ok';
      } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
      
      }

 }

?>