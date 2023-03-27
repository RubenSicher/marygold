<?php 
  
    date_default_timezone_set('America/Mexico_City');

    if(empty($_GET["nombre"]) || empty($_GET["email"]) || empty($_GET["clave"]) ){
        $data = array();
        $data['error'] = 'error';
        echo json_encode($data);
   
    }else{
        include_once "conexion.php";
        $nombre = $_GET["nombre"];
        $email = $_GET["email"];
        $clave = $_GET["clave"];
       
        $sentencia = $bd -> prepare("INSERT INTO admin_usuarios(nombre, email, clave, estado, fecha_alta) VALUES (?,?,?,?,?);");
        $resultado = $sentencia->execute([$nombre, $email, $clave,"1", date("Y-m-d")]);
        
        if($resultado === TRUE){
            $data = array();
            $data['ok'] = 'ok';
            echo json_encode($data);
        }else{
            $data = array();
            $data['ok'] = 'noOk';
            echo json_encode($data);
        }

       
    }
    
?>