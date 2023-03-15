<?php 
    // include_once "conexion.php";
    // $sentencia = $bd -> query("select * from admin_usuarios");
    // $usuarios = $sentencia->fetchAll(PDO::FETCH_OBJ);
    // print_r(json_encode($usuarios));
    // print_r($_POST);
    date_default_timezone_set('America/Mexico_City');

    if(empty($_POST["nombre"]) || empty($_POST["email"]) || empty($_POST["clave"]) ){
        // header('Location: pruebas.html?mensaje=falta')
        echo "{'data':[{'ok':'noOk'}]}";
        // echo "error";
    
    }else{
        include_once "conexion.php";
        $nombre = $_POST["nombre"];
        $email = $_POST["email"];
        $clave = $_POST["clave"];
       
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