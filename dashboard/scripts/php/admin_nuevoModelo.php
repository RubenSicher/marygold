<?php
$com = $_GET['com'];
$comm = $_POST['comm'];
$idReg = $_POST['idReg'];

if ($comm=="getModelos"){

    try{
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


if ($com=="nuevo_modelo"){

    if(!empty($_POST['txtNombreModelo']) ){
        $uploadedFile = '';
        if(!empty($_FILES["file"]["type"]) || !empty($_FILES['file']['name']) ){
            $fileName = time().'_'.$_FILES['file']['name'];
            $valid_extensions = array("jpeg", "jpg", "png");
            $temporary = explode(".", $_FILES["file"]["name"]);
            $file_extension = end($temporary);
            
            if((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions)){
                $sourcePath = $_FILES['file']['tmp_name'];
                $targetPath = "../../imagenes/modelos/".$fileName;
               
                if(move_uploaded_file($sourcePath,$targetPath)){
                    $uploadedFile = $fileName;
                    $status_imagen = "si hay imagen";
                }
            }
          
        }else{
            // En caso de que no suba ninguna imagen
            $status_imagen = "no hay imagen";
            $uploadedFile = "";
        }
        
        $model_house = $_POST['txtNombreModelo'];
        
        try{
            //insert form data in the database
            include_once "conectar.php";
            $insert = $conn->query("INSERT INTO admin_modeloCasas(nombre, estado, image_house) VALUES ('".$model_house."','1', '".$uploadedFile."')");
            // echo $insert?'ok':'err';
            
            if ($insert){
                $data[]= array('ok'=>'ok', 'status_imagen' => $status_imagen);
            }else{
                $data[]= array('ok'=>'err');
            }
            
        } catch(Exception $e){
            echo $e->getMessage();
        }
        
        
    }else{
        $data[]= array('ok'=>'noData');
    }
    echo '{"data": '.(json_encode($data)).'}';
}

if ($com=="edita_modelo"){
    // echo "type: " .$_FILES["file"]["type"];
    // echo " name: " .$_FILES['file']['name'];
    if(!empty($_POST['txtNombreModelo']) ){
        $uploadedFile = '';
        if(!empty($_FILES["file"]["type"]) || !empty($_FILES['file']['name']) ){
            $fileName = time().'_'.$_FILES['file']['name'];
            $valid_extensions = array("jpeg", "jpg", "png");
            $temporary = explode(".", $_FILES["file"]["name"]);
            $file_extension = end($temporary);
            
            if((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions)){
                $sourcePath = $_FILES['file']['tmp_name'];
                $targetPath = "../../imagenes/modelos/".$fileName;
               
                if(move_uploaded_file($sourcePath,$targetPath)){
                    $uploadedFile = $fileName;
                    $status_imagen = "si hay imagen";
                }
            }
          
        }else{
            // En caso de que no suba ninguna imagen
            $status_imagen = "no hay imagen";
            $uploadedFile = "";
            if (!empty($_POST["txtImage_house"])){
                $status_imagen = "se quedo la misma imagen";
                $uploadedFile = $_POST["txtImage_house"];
            }
            
        }
        
        $model_house = $_POST['txtNombreModelo'];
              
       
        try{
            //insert form data in the database
            include_once "conectar.php";
            $insert = $conn->query("UPDATE admin_modeloCasas SET nombre='$model_house', image_house='$uploadedFile' WHERE id='$idReg' ");
            // echo $insert?'ok':'err'; 
            if ($insert){
                $data[]= array('ok'=>'ok', 'status_imagen' => $status_imagen);
            }else{
                $data[]= array('ok'=>'err');
            } 
            
        } catch(Exception $e){
            echo $e->getMessage();
        }
        
        
    }else{
        $data[]= array('ok'=>'noData');
    }
    echo '{"data": '.(json_encode($data)).'}';
}

function actualizar_nombre_imagen($id){
    include_once "conectar.php";
    $insert = $conn->query("UPDATE admin_modeloCasas SET image_house='' WHERE id='".$id."' ");
    if ($insert){
        $ok='ok';
    }else{
        $ok='noOk';
    } 
    return $ok;
}

if ($comm == 'DeleteImage'){
    $name_image = $_POST['name_image'];
    if (is_writable("../../imagenes/modelos/".$name_image)){
        $output =  unlink("../../imagenes/modelos/".$name_image);
        if ($output){
            $msg = "Si eliminó imagen del server";
            $ook = actualizar_nombre_imagen($idReg);
            if ($ook == "ok"){
                $status_imagen = "Si actualizo imagen en bd";
            }else if ($ook == "noOk"){
                $status_imagen = "No actualizo imagen en bd";
            }

            $data[]= array('ok'=>'ok', 'msg'=>$msg, 'status_imagen'=>$status_imagen);

        }else{
            $msg = "No eliminó imagen del server";
            $status_imagen = "No actualizo imagen en _bd_";
            $data[]= array('ok'=>'noOk', 'msg'=>$msg, 'status_imagen'=>$status_imagen);
        }
        
    }else{
        $msg = "No existe la imagen o no tiene permisos";
        $data[]= array('ok'=>'noOk', 'msg'=>$msg);
    }
    
    echo '{"data": '.(json_encode($data)).'}';
}



if ($com=='listarModelos'){

    try{
        //insert form data in the database
        include_once "conectar.php";
        $datos = $conn->query("SELECT id, nombre, image_house FROM admin_modeloCasas WHERE estado='1' ");
        
        if($datos->num_rows > 0){
            $data = array();
            
            while ($fila = mysqli_fetch_array($datos)){
                
                $id = $fila['id'];
                $model_house = $fila['nombre'];
                

                if ($fila['image_house'] != ""){
                    $image_house = '<div style="display: grid; grid-template-rows: 340px; align-items: center; padding-top: 30px; justify-content: center;"><img class="tamano_imagen" id="img'.$id.'" src="imagenes/modelos/'.$fila['image_house'].'"></div>';
                }else{
                    $image_house = '<div style="display: grid; grid-template-rows: 300px; align-items: center;"></div>';
                }
                
                $btnEditar = '<a class="btn btn-app" id="btnEditModel" data-id="'.$id.'" style="margin-left:0px"><i class="fas fa-edit"></i> Edit</a>';
                $btnEliminar = '<a class="btn btn-app" id="btnDeleteModel" data-id="'.$id.'"><i class="fas fa-trash"></i> Delete</a>';

                $data_model =
                '<div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                        <i class="fas fa-warehouse"></i>
                        Data model
                        </h3>
                    </div>
                    <div class="card-body">
                        <dl>
                        <p style="margin-bottom:0px"><b>Name: </b>' . $model_house . '</p>
                        <p>'.$btnEditar.$btnEliminar.'</p>
                        </dl>
                    </div>
                </div>';

                $data[] = array('ok'=>'ok','id'=>$id,'data_model'=>$data_model,'image_house'=>$image_house);
                
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


if ($comm == 'buscaDataModel'){

    include_once "conectar.php";
    $datos = $conn->query("SELECT id, nombre, image_house FROM admin_modeloCasas WHERE id='".$idReg."' ");
    
    if($datos->num_rows >= 0){
        $data = array();
        while ($fila = mysqli_fetch_array($datos)){
            if (!empty($fila['image_house'])){
                $src_image = "imagenes/modelos/".$fila['image_house'];    
            }else{
                $src_image="";
            }
            
            $data[] = array('ok'=>'ok', 'id' => $fila['id'], 'nombre' => $fila['nombre'], 'src_image'=>$src_image, 'image_house'=>$fila['image_house'] );
        }
        
    }else{
        $data[] = array('ok'=>'noOk');
    }

    echo '{"data": '.(json_encode($data)).'}';
    mysqli_free_result($datos);
    mysqli_close($conn);

}

function actualizar_estado_modelo($id){
    include_once "conectar.php";
    $insert = $conn->query("UPDATE admin_modeloCasas SET estado='0' WHERE id='".$id."' ");
    if ($insert){
        $ok='ok';
    }else{
        $ok='noOk';
    } 
    return $ok;
}

if ($comm == 'eliminaDataModel'){
    $src_imagen = $_POST['src_imagen'];
    if (!empty($src_imagen)){

        if (is_writable("../../imagenes/modelos/".$src_imagen)){
            $output =  unlink("../../imagenes/modelos/".$src_imagen);
            if ($output){
                $msg = "Si eliminó imagen del server";
                $ok_img = "ok";
            }else{
                $msg = "No eliminó imagen del server";
                $ok_img = "noOk";
            }
        }else{
            $msg = "No existe la imagen o no tiene permisos";
            $ok_img = "noOk";
        }
        
    }else{
        $msg = "no habia imagen en la bd";
        $ok_img = "noOk";
    }

    $ook = actualizar_estado_modelo($idReg);
    if ($ook == "ok"){
        $status_imagen = "Si actualizo imagen en bd";
        $ok_bd = "ok";
    }else if ($ook == "noOk"){
        $status_imagen = "No actualizo imagen en bd";
        $ok_bd = "noOk";
    }

    $data[]= array('ok'=>$ok_bd, 'ok_img'=>$ok_img, 'msg_server'=>$msg, 'msg_bd'=>$status_imagen);    
    
    echo '{"data": '.(json_encode($data)).'}';
}
?>