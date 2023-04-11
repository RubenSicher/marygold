<?php

$com = $_GET['com'];
$comm = $_POST['comm'];
$idReg = $_POST['idReg'];
$change_attended = $_POST['change_attended'];
$change_interested = $_POST['change_interested'];

if ($com=='listarInteresados'){

    try{
        //insert form data in the database
        include_once "conectar.php";
        $datos = $conn->query("SELECT id, nombre, tel, DATE_FORMAT(fecha_sol, '%d-%m-%Y') as fechaSol, estatus, mensaje, interesado FROM admin_solicitudes WHERE estado='0'");
        
        if($datos->num_rows > 0){
            $data = array();
            
            while ($fila = mysqli_fetch_array($datos)){
                
                $atendido = $fila['estatus'];
                if ($atendido==1){
                    $attended = '<span class="badge badge-success btnAttended" id="'.$fila['id'].'" data-a="1" style="cursor:pointer;">Atendido</span>';
                }else if($atendido==0){
                    $attended = '<span class="badge badge-warning btnAttended" id="'.$fila['id'].'" data-a="0" style="cursor:pointer;">No atendido</span>';
                }

                $interesado = $fila['interesado'];
                if ($interesado==0){
                    $interested = '<span class="badge badge-success btnInterested" id="'.$fila['id'].'"  style="cursor:pointer;">Interesado</span>';
                }else if($interesado==1){
                    $interested = '<span class="badge badge-warning btnInterested" id="'.$fila['id'].'"  style="cursor:pointer;">No interesado</span>';
                }else if($interesado==2){
                    $interested = '<span class="badge badge-danger btnInterested" id="'.$fila['id'].'"  style="cursor:pointer;">Equivocado</span>';
                }
                
                $id = $fila['id'];
                $name = $fila['nombre'];
                $phone = $fila['tel'];
                $date = $fila['fechaSol'];
                $message = $fila['mensaje'];
                
                $data[] = array('ok'=>'ok','id'=>$id,'name'=>$name,'phone'=>$phone,'date'=>$date,'message'=>$message,'status'=>$attended, 'interested'=>$interested);
                
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

if($comm=="cambiaAttended"){
    try{
        //insert form data in the database
        include_once "conectar.php";
        $insert = $conn->query("UPDATE admin_solicitudes SET estatus='$change_attended' WHERE id='$idReg' ");
        // echo $insert?'ok':'err'; 
        if ($insert){
            $data[]= array('ok'=>'ok');
        }else{
            $data[]= array('ok'=>'noOk');
        } 
        echo '{"data": '.(json_encode($data)).'}';
    } catch(Exception $e){
        echo $e->getMessage();
    }
}


if($comm=="cambiaInterested"){
    try{
        //insert form data in the database
        include_once "conectar.php";
        $insert = $conn->query("UPDATE admin_solicitudes SET interesado='$change_interested' WHERE id='$idReg' ");
        // echo $insert?'ok':'err'; 
        if ($insert){
            $data[]= array('ok'=>'ok');
        }else{
            $data[]= array('ok'=>'noOk');
        } 
        echo '{"data": '.(json_encode($data)).'}';
    } catch(Exception $e){
        echo $e->getMessage();
    }
}

?>