<?php

$comm = $_POST["comm"];
$modelo = $_POST["modelo"];
$idCasa = $_POST["idCasa"];

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
        $datos = $conn->query("SELECT id, id_casa, fecha_llegada, fecha_salida, now() FROM admin_rentaCasas WHERE estado='1' and fecha_llegada >= DATE(NOW()) and id_casa='$idCasa' ");
        
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


?>