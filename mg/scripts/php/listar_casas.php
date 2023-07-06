<?php

$comm = $_POST["comm"];
$modelo = $_POST["modelo"];
$idCasa = $_POST["idCasa"];

$email = $_POST["email"];
$nombre = $_POST["nombre"];
$celular = $_POST["celular"];

if ($comm == 'listarCasas'){

    try{

        include_once "../../../dashboard/scripts/php/conectar.php";
        $datos = $conn->query("SELECT id, name_house, address_house, description_house, property_size, price, type_house, flat_size, status_house, estado, image_house FROM admin_casas WHERE estado='1' and modelo='$modelo' ");
        
        if($datos->num_rows >= 0){
            $data = array();
            while ($fila = mysqli_fetch_array($datos)){
                if (!empty($fila['image_house'])){
                    $src_image = "../dashboard/imagenes/casas/".$fila['image_house'];    
                }else{
                    $src_image="";
                }
                
                $data[] = array('ok'=>'ok', 'id' => $fila['id'], 'name_house' => $fila['name_house'], 'address_house' => $fila['address_house'], 'description' => $fila['description_house'],
                'property_size' => $fila['property_size'], 'price' => $fila['price'], 'type_house' => $fila['type_house'], 'flat_size' => $fila['flat_size'],
                'status_house' => $fila['status_house'],'src_image'=>$src_image, 'image_house'=>$fila['image_house']);
            }
           
        }else{
            $data[] = array('ok'=>'noOk');
        }

        echo '{"data": '.(json_encode($data)).'}';
        mysqli_free_result($datos);
        mysqli_close($conn);

    }catch(Exception $e){
        echo $e->getMessage();
    }
}


if ($comm == 'fechasNOdisponibles'){

    try{

        include_once "../../../dashboard/scripts/php/conectar.php";
        $datos = $conn->query("SET time_zone = '-06:00'");
        $datos = $conn->query("SELECT id, id_casa, fecha_llegada, fecha_salida, now() FROM admin_rentaCasas WHERE estado='1' and ( fecha_llegada >= DATE(NOW()) or fecha_salida >= DATE(NOW()) ) and id_casa='$idCasa' ");
        
        if($datos->num_rows >= 0){
            $data = array();
            while ($fila = mysqli_fetch_array($datos)){
                                
                $data[] = array('ok'=>'ok', 'id' => $fila['id'], 'id_casa' => $fila['id_casa'], 'fecha_llegada' => $fila['fecha_llegada'], 'fecha_salida' => $fila['fecha_salida'], 'date_system' => $fila[4]);
            }
           
        }else{
            $data[] = array('ok'=>'noOk');
        }

        echo '{"data": '.(json_encode($data)).'}';
        mysqli_free_result($datos);
        mysqli_close($conn);

    }catch(Exception $e){
        echo $e->getMessage();
    }

}


if ($comm == 'guardarCliente'){
    try{
        //insert form data in the database
        include_once "../../../dashboard/scripts/php/conectar.php";

        // primero revisamos que no exista ese correo 
        $datos = $conn->query("SELECT id, email FROM admin_clientes WHERE email='$email' ");
        
        $data = array();
        if($datos->num_rows >= 0){          
            $data[] = array('ok'=>'noOk');
        }else{

            $insert = $conn->query("INSERT INTO admin_clientes(nombre, email, celular, fecha_alta) VALUES ('".$nombre."', '".$email."', '".$celular."', DATE(NOW())");
            // echo $insert?'ok':'err';
        
            if ($insert){
                $datos = $conn->query("SELECT id, nombre, email, celular FROM admin_clientes WHERE email='$email' ");
                if($datos->num_rows >= 0){  
                    while ($fila = mysqli_fetch_array($datos)){
                              
                        $id = $fila['id'];
                        $name = $fila['nombre'];
                        $mail = $fila['email'];
                        $cel = $fila['celular'];
                                        
                        $data[] = array('ok'=>'ok','id'=>$id,'nombre'=>$name,'email'=>$mail,'cel'=>$cel);
                        
                   }
                }
            }else{
                $data[]= array('ok'=>'err');
            }
           
        }

        echo '{"data": '.(json_encode($data)).'}';

        mysqli_free_result($datos);
        mysqli_close($conn);
        
    } catch(Exception $e){
        echo $e->getMessage();
    }
    
}

?>