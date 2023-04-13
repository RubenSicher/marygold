<?php

$comm = $_POST['comm'];

if ($comm=="getModelos"){

    try{
        //insert form data in the database
        include_once "conectar.php";
        $datos = $conn->query("SELECT id, nombre FROM admin_modeloCasas WHERE estado='1'");
        
        if($datos->num_rows > 0){
            $data = array();
            
            while ($fila = mysqli_fetch_array($datos)){
                              
                $id = $fila['id'];
                $nombre = $fila['nombre'];
                                
                $data[] = array('ok'=>'ok','id'=>$id,'nombre'=>$nombre);
                
           }
                        
        }else{
            $data[]= array('ok'=>'noOk');
        }

        echo '{"data": '.(json_encode($data)).'}';

        mysqli_free_result($datos);
        mysqli_close($conn);

    }catch(Exception $e){
        echo $e->getMessage();
    }

}

?>