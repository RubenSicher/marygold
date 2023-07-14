<?php
$com = $_GET['com'];
$comm = $_POST['comm'];
$idReg = $_POST['idReg'];
$estado = $_POST['estado'];

if ($com=='listarReservacionesPendientes'){

    try{
        //insert form data in the database
        include_once "conectar.php";
        $datos = $conn->query("SELECT ren.id, ren.id_casa, ren.fecha_llegada, ren.fecha_salida, ren.id_cliente, cli.nombre as cliente, cas.image_house, modd.nombre as modelo,
                                cas.name_house, cas.address_house, cli.email, cli.celular
                                FROM admin_rentaCasas ren 
                                INNER JOIN admin_casas cas ON ren.id_casa=cas.id 
                                left JOIN admin_clientes cli on ren.id_cliente=cli.id 
                                INNER JOIN admin_modeloCasas modd on cas.modelo=modd.id
                                WHERE ren.estado='0' ");
        
        $cuantasFilas = $datos->num_rows;
        if($datos->num_rows > 0){
             
            $data = array();
            
            while ($fila = mysqli_fetch_array($datos)){
                
                $id = $fila['id'];
                $cliente = $fila['cliente'];
                
                if ($fila['image_house'] != ""){
                    $image_house = '<img style="width:150px; height: 100px;" id="img'.$id.'" src="imagenes/casas/'.$fila['image_house'].'">';
                }else{
                    $image_house = '';
                }
                
                // $btnAutorizar = '<a class="btn btn-app" id="btnAutorizar" data-id="'.$id.'" style="margin-left:0px"><i class="fas fa-edit"></i> Authorize</a>';
                $btnAutorizar = '<a id="btnAutorizar" data-id="'.$id.'" type="button" class="btn btn-block btn-outline-success btn-xs">Authorize</a>';
                // $btnNoAutorizar = '<a class="btn btn-app" id="btnNoAutorizar" data-id="'.$id.'"><i class="fas fa-trash"></i> No Authorize</a>';
                $btnNoAutorizar = '<a id="btnNoAutorizar" data-id="'.$id.'" type="button" class="btn btn-block btn-outline-danger btn-xs">No Authorize</a>';
                $wapp = '<a href="https://api.whatsapp.com/send?phone='.$fila['celular'].'&text=Hello!, we are happy to greet you" target="_blank" type="button" class="btn btn-block bg-gradient-success btn-xs">Whatsapp</a>';

                $datos_cliente = '<div>
                            <p style="margin-bottom:0px">'.$cliente.'</p>
                            <p style="margin-bottom:0px">'.$fila['email'].'</p>
                            <p>'.$fila['celular'].$wapp.'</p>
                            <p style="margin-bottom:0px">'.$btnAutorizar.$btnNoAutorizar.'</p>
                        </div>';
                
                $data[] = array('ok'=>'ok','id'=>$id,'cliente'=>$datos_cliente,'fecha_llegada'=>$fila['fecha_llegada'],'fecha_salida'=>$fila['fecha_salida'], 'nombre_casa'=>$fila['name_house'],'direccion_casa'=>$fila['address_house'],'modelo'=>$fila['modelo'],'image_house'=>$image_house);
                
           }

                            
           
        

        }else{
            $data[] = array('ok'=>'nook','id'=>$id,'cliente'=>$datos_cliente,'fecha_llegada'=>$fila['fecha_llegada'],'fecha_salida'=>$fila['fecha_salida'], 'nombre_casa'=>$fila['name_house'],'direccion_casa'=>$fila['address_house'],'modelo'=>$fila['modelo'],'image_house'=>$image_house,'filas'=>$cuantasFilas);
        }

        echo '{"data": '.(json_encode($data)).'}';

        mysqli_free_result($datos);
        mysqli_close($conn);

    }catch(Exception $e){
        echo $e->getMessage();
    }

}

if ($comm == 'autorizacion'){
    try{
        //insert form data in the database
        include_once "conectar.php";
        $insert = $conn->query("UPDATE admin_rentaCasas SET estado='$estado' WHERE id='$idReg' ");
        // echo $insert?'ok':'err'; 
        if ($insert){
            $data[]= array('ok'=>'ok');
        }else{
            $data[]= array('ok'=>'err');
        } 

        echo '{"data": '.(json_encode($data)).'}';   

    } catch(Exception $e){
        echo $e->getMessage();
    }
}

if ($com=='listarReservacionesAutorizadas'){

    try{
        //insert form data in the database
        include_once "conectar.php";
        $datos = $conn->query("SELECT ren.id, ren.id_casa, ren.fecha_llegada, ren.fecha_salida, ren.id_cliente, cli.nombre as cliente, cas.image_house, modd.nombre as modelo,
                                cas.name_house, cas.address_house, cli.email, cli.celular
                                FROM admin_rentaCasas ren 
                                INNER JOIN admin_casas cas ON ren.id_casa=cas.id 
                                left JOIN admin_clientes cli on ren.id_cliente=cli.id 
                                INNER JOIN admin_modeloCasas modd on cas.modelo=modd.id
                                WHERE ren.estado='1' ");
        
        if($datos->num_rows > 0){
            $data = array();
            
            while ($fila = mysqli_fetch_array($datos)){
                
                $id = $fila['id'];
                $cliente = $fila['cliente'];
                
                if ($fila['image_house'] != ""){
                    $image_house = '<img style="width:150px; height: 100px;" id="img'.$id.'" src="imagenes/casas/'.$fila['image_house'].'">';
                }else{
                    $image_house = '';
                }
                
                // $btnAutorizar = '<a class="btn btn-app" id="btnAutorizar" data-id="'.$id.'" style="margin-left:0px"><i class="fas fa-edit"></i> Authorize</a>';
                $btnPendiente = '<a id="btnPendiente" data-id="'.$id.'" type="button" class="btn btn-block btn-outline-warning btn-xs">back to pending</a>';
                // $btnNoAutorizar = '<a class="btn btn-app" id="btnNoAutorizar" data-id="'.$id.'"><i class="fas fa-trash"></i> No Authorize</a>';
                $btnNoAutorizar = ""; //'<a id="btnNoAutorizar" data-id="'.$id.'" type="button" class="btn btn-block btn-outline-danger btn-xs">No Authorize</a>';
                $wapp = '<a href="https://api.whatsapp.com/send?phone='.$fila['celular'].'&text=Hello!, we are happy to greet you" target="_blank" type="button" class="btn btn-block bg-gradient-success btn-xs">Whatsapp</a>';

                $datos_cliente = '<div>
                            <p style="margin-bottom:0px">'.$cliente.'</p>
                            <p style="margin-bottom:0px">'.$fila['email'].'</p>
                            <p >'.$fila['celular'].$wapp.'</p>
                            <p style="margin-bottom:0px">'.$btnPendiente.'</p>
                        </div>';
                
                $data[] = array('ok'=>'ok','id'=>$id,'cliente'=>$datos_cliente,'fecha_llegada'=>$fila['fecha_llegada'],'fecha_salida'=>$fila['fecha_salida'], 'nombre_casa'=>$fila['name_house'],'direccion_casa'=>$fila['address_house'],'modelo'=>$fila['modelo'],'image_house'=>$image_house);
                
           }
                          
        }else{
            $data[] = array('ok'=>'nook','id'=>$id,'cliente'=>$datos_cliente,'fecha_llegada'=>$fila['fecha_llegada'],'fecha_salida'=>$fila['fecha_salida'], 'nombre_casa'=>$fila['name_house'],'direccion_casa'=>$fila['address_house'],'modelo'=>$fila['modelo'],'image_house'=>$image_house);
        }

        
        echo '{"data": '.(json_encode($data)).'}'; 
        mysqli_free_result($datos);
        mysqli_close($conn);

    }catch(Exception $e){
        echo $e->getMessage();
    }

}


if ($com=='listarReservacionesNoAutorizadas'){

    try{
        //insert form data in the database
        include_once "conectar.php";
        $datos = $conn->query("SELECT ren.id, ren.id_casa, ren.fecha_llegada, ren.fecha_salida, ren.id_cliente, cli.nombre as cliente, cas.image_house, modd.nombre as modelo,
                                cas.name_house, cas.address_house, cli.email, cli.celular
                                FROM admin_rentaCasas ren 
                                INNER JOIN admin_casas cas ON ren.id_casa=cas.id 
                                left JOIN admin_clientes cli on ren.id_cliente=cli.id 
                                INNER JOIN admin_modeloCasas modd on cas.modelo=modd.id
                                WHERE ren.estado='2' ");
        
        if($datos->num_rows > 0){
            $data = array();
            
            while ($fila = mysqli_fetch_array($datos)){
                
                $id = $fila['id'];
                $cliente = $fila['cliente'];
                
                if ($fila['image_house'] != ""){
                    $image_house = '<img style="width:150px; height: 100px;" id="img'.$id.'" src="imagenes/casas/'.$fila['image_house'].'">';
                }else{
                    $image_house = '';
                }
                
                // $btnAutorizar = '<a class="btn btn-app" id="btnAutorizar" data-id="'.$id.'" style="margin-left:0px"><i class="fas fa-edit"></i> Authorize</a>';
                $btnPendiente = '<a id="btnPendiente" data-id="'.$id.'" type="button" class="btn btn-block btn-outline-warning btn-xs">back to pending</a>';
                // $btnNoAutorizar = '<a class="btn btn-app" id="btnNoAutorizar" data-id="'.$id.'"><i class="fas fa-trash"></i> No Authorize</a>';
                $btnNoAutorizar = ""; //'<a id="btnNoAutorizar" data-id="'.$id.'" type="button" class="btn btn-block btn-outline-danger btn-xs">No Authorize</a>';
                $wapp = '<a href="https://api.whatsapp.com/send?phone='.$fila['celular'].'&text=Hello!, we are happy to greet you" target="_blank" type="button" class="btn btn-block bg-gradient-success btn-xs">Whatsapp</a>';

                $datos_cliente = '<div>
                            <p style="margin-bottom:0px">'.$cliente.'</p>
                            <p style="margin-bottom:0px">'.$fila['email'].'</p>
                            <p>'.$fila['celular'].$wapp.'</p>
                            <p style="margin-bottom:0px">'.$btnPendiente.'</p>
                        </div>';
                
                $data[] = array('ok'=>'ok','id'=>$id,'cliente'=>$datos_cliente,'fecha_llegada'=>$fila['fecha_llegada'],'fecha_salida'=>$fila['fecha_salida'], 'nombre_casa'=>$fila['name_house'],'direccion_casa'=>$fila['address_house'],'modelo'=>$fila['modelo'],'image_house'=>$image_house);
                
           }

            
            
        }else{
            $data[] = array('ok'=>'nook','id'=>$id,'cliente'=>$datos_cliente,'fecha_llegada'=>$fila['fecha_llegada'],'fecha_salida'=>$fila['fecha_salida'], 'nombre_casa'=>$fila['name_house'],'direccion_casa'=>$fila['address_house'],'modelo'=>$fila['modelo'],'image_house'=>$image_house);
                
        }

        echo '{"data": '.(json_encode($data)).'}';
        mysqli_free_result($datos);
        mysqli_close($conn);

    }catch(Exception $e){
        echo $e->getMessage();
    }

}

?>