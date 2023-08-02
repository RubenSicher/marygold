<?php

$com = $_GET['com'];
$comm = $_POST['comm'];
$idReg = $_POST['idReg'];

if ($com=="nueva_casa"){

    if(!empty($_POST['txtNombreCasa']) || !empty($_POST['txtDireccion']) ){
        $uploadedFile = '';
        if(!empty($_FILES["file"]["type"]) || !empty($_FILES['file']['name']) ){
            $fileName = time().'_'.$_FILES['file']['name'];
            $valid_extensions = array("jpeg", "jpg", "png");
            $temporary = explode(".", $_FILES["file"]["name"]);
            $file_extension = end($temporary);
            
            if((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions)){
                $sourcePath = $_FILES['file']['tmp_name'];
                $targetPath = "../../imagenes/casas/".$fileName;
               
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
        
        $name_house = $_POST['txtNombreCasa'];
        $address_house = $_POST['txtDireccion'];
        $description = $_POST['txtDescripcion'];
        $property_size = $_POST['txtTamanoPropiedad'];
        $price = $_POST['txtPrecio'];
        $type_house = $_POST['cboTipoCasa'];
        $flat_size = $_POST['txtTamanoPlano'];
        $status_house = $_POST['cboEstadoCasa'];
        $model_house = $_POST['cboModeloCasa'];
        
       
        try{
            //insert form data in the database
            include_once "conectar.php";
            $insert = $conn->query("INSERT INTO admin_casas(name_house, address_house, description_house, property_size, price, type_house, flat_size, status_house, estado, image_house, modelo) VALUES ('".$name_house."','".$address_house."','".$description."','".$property_size."','".$price."','".$type_house."','".$flat_size."','".$status_house."','1','".$uploadedFile."','".$model_house."')");
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


if ($com=="edita_casa"){
    // echo "type: " .$_FILES["file"]["type"];
    // echo " name: " .$_FILES['file']['name'];
    if(!empty($_POST['txtNombreCasa']) || !empty($_POST['txtDireccion']) ){
        $uploadedFile = '';
        if(!empty($_FILES["file"]["type"]) || !empty($_FILES['file']['name']) ){
            $fileName = time().'_'.$_FILES['file']['name'];
            $valid_extensions = array("jpeg", "jpg", "png");
            $temporary = explode(".", $_FILES["file"]["name"]);
            $file_extension = end($temporary);
            
            if((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions)){
                $sourcePath = $_FILES['file']['tmp_name'];
                $targetPath = "../../imagenes/casas/".$fileName;
               
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
        
        $name_house = $_POST['txtNombreCasa'];
        $address_house = $_POST['txtDireccion'];
        $description = $_POST['txtDescripcion'];
        $property_size = $_POST['txtTamanoPropiedad'];
        $price = $_POST['txtPrecio'];
        $type_house = $_POST['cboTipoCasa'];
        $flat_size = $_POST['txtTamanoPlano'];
        $status_house = $_POST['cboEstadoCasa'];
        $model_house = $_POST['cboModeloCasa'];
        
       
        try{
            //insert form data in the database
            include_once "conectar.php";
            $insert = $conn->query("UPDATE admin_casas SET name_house='$name_house', address_house='$address_house', description_house='$description', property_size='$property_size', price='$price', type_house='$type_house', flat_size='$flat_size',status_house='$status_house', image_house='$uploadedFile', modelo='$model_house' WHERE id='$idReg' ");
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
    $insert = $conn->query("UPDATE admin_casas SET image_house='' WHERE id='".$id."' ");
    if ($insert){
        $ok='ok';
    }else{
        $ok='noOk';
    } 
    return $ok;
}

if ($comm == 'DeleteImage'){
    $name_image = $_POST['name_image'];
    if (is_writable("../../imagenes/casas/".$name_image)){
        $output =  unlink("../../imagenes/casas/".$name_image);
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



if ($com=='listarCasas'){

    try{
        //insert form data in the database
        include_once "conectar.php";
        $datos = $conn->query("SELECT cas.id, cas.name_house, cas.address_house, cas.description_house, cas.property_size, cas.price, cas.type_house, cas.flat_size, cas.status_house, cas.estado, cas.image_house, mode.nombre FROM admin_casas cas INNER JOIN admin_modeloCasas mode on cas.modelo=mode.id WHERE cas.estado='1' ");
        
        if($datos->num_rows > 0){
            $data = array();
            
            while ($fila = mysqli_fetch_array($datos)){
                
                $typehouse = $fila['type_house'];
                if ($typehouse==1){
                    $type_house = 'APARTMENT';
                }else if($typehouse==2){
                    $type_house = 'HOUSE 1';
                }else if($typehouse==3){
                    $type_house = 'HOUSE 2';
                }

                $statushouse = $fila['status_house'];
                if ($statushouse==1){
                    $status_house = 'UNDER CONSTRUCTION';
                }else if($statushouse==2){
                    $status_house = 'OPTION 2';
                }else if($statushouse==3){
                    $status_house = 'OPTION 3';
                }

                $id = $fila['id'];
                $name_house = $fila['name_house'];
                $address_house = $fila['address_house'];
                $description_house = $fila['description_house'];
                $property_size = $fila['property_size'];
                $size = $fila['size'];
                $price = $fila['price'];
                $flat_size = $fila['flat_size'];
                $model_house = $fila['nombre'];

                if ($fila['image_house'] != ""){
                    $image_house = '<div style="display: grid; grid-template-rows: 340px; align-items: center; padding-top: 30px; justify-content: center;"><img class="tamano_imagen" id="img'.$id.'" src="imagenes/casas/'.$fila['image_house'].'"></div>';
                }else{
                    $image_house = '<div style="display: grid; grid-template-rows: 300px; align-items: center;"><img class="tamano_imagen" id="img'.$id.'" src=""></div>';
                }
                
                $btnEditar = '<a class="btn btn-app" id="btnEditHouse" data-id="'.$id.'" style="margin-left:0px"><i class="fas fa-edit"></i> Edit</a>';
                $btnEliminar = '<a class="btn btn-app" id="btnDeleteHouse" data-id="'.$id.'"><i class="fas fa-trash"></i> Delete</a>';
                $btnGaleria = '<a class="btn btn-app" id="btnGalleryHouse" data-id="'.$id.'"><i class="fas fa-folder"></i> Gallery</a>';

                $data_house =
                '<div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                        <i class="fas fa-warehouse"></i>
                        Data house
                        </h3>
                    </div>
                    <div class="card-body">
                        <dl>
                        <p style="margin-bottom:0px"><b>Name: </b>' . $name_house . '</p>
                        <p style="margin-bottom:0px"><b>Address: </b>' . $address_house . '</p>               
                        <p style="margin-bottom:0px"><b>Description: </b>' . $description_house . '</p>
                        <p style="margin-bottom:0px"><b>Property size: </b>' . $property_size . '</p>
                        <p style="margin-bottom:0px"><b>Price: </b>' . $price . '</p>
                        <p style="margin-bottom:0px"><b>Type: </b>' . $type_house . '</p>
                        <p style="margin-bottom:0px"><b>Flat size: </b>' . $flat_size . '</p>
                        <p style="margin-bottom:0px"><b>Status: </b>' . $status_house . '</p>
                        <p style="margin-bottom:0px"><b>Model: </b>' . $model_house . '</p>
                        <p>'.$btnEditar.$btnEliminar.$btnGaleria.'</p>
                        </dl>
                    </div>
                </div>';

                $data[] = array('ok'=>'ok','id'=>$id,'data_house'=>$data_house,'image_house'=>$image_house);
                
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




if ($comm == 'buscaDataHouse'){

    include_once "conectar.php";
        $datos = $conn->query("SELECT id, name_house, address_house, description_house, property_size, price, type_house, flat_size, status_house, estado, image_house, modelo FROM admin_casas WHERE id='".$idReg."' ");
        
        if($datos->num_rows >= 0){
            $data = array();
            while ($fila = mysqli_fetch_array($datos)){
                if (!empty($fila['image_house'])){
                    $src_image = "imagenes/casas/".$fila['image_house'];    
                }else{
                    $src_image="";
                }
                
                $data[] = array('ok'=>'ok', 'id' => $fila['id'], 'name_house' => $fila['name_house'], 'address_house' => $fila['address_house'], 'description' => $fila['description_house'],
                'property_size' => $fila['property_size'], 'price' => $fila['price'], 'type_house' => $fila['type_house'], 'flat_size' => $fila['flat_size'],
                'status_house' => $fila['status_house'],'src_image'=>$src_image, 'image_house'=>$fila['image_house'], 'modelo'=>$fila['modelo']);
            }
           
        }else{
            $data[] = array('ok'=>'noOk');
        }

        echo '{"data": '.(json_encode($data)).'}';
        mysqli_free_result($datos);
        mysqli_close($conn);

}


function actualizar_estado_casa($id){
    include_once "conectar.php";
    $insert = $conn->query("UPDATE admin_casas SET estado='0' WHERE id='".$id."' ");
    if ($insert){
        $ok='ok';
    }else{
        $ok='noOk';
    } 
    return $ok;
}

if ($comm == 'eliminaDataHouse'){
    $src_imagen = $_POST['src_imagen'];
    if (!empty($src_imagen)){

        if (is_writable("../../imagenes/casas/".$src_imagen)){
            $output =  unlink("../../imagenes/casas/".$src_imagen);
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

    $ook = actualizar_estado_casa($idReg);
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

$cual_imagen = $_POST["cual_imagen"];

if ($com=="guardaGaleria"){

    if(!empty($idReg) ){
        if($cual_imagen == 1){
            $type_imagen = $_FILES["fileTypeImage1"]["type"];
            $name_imagen = $_FILES['fileTypeImage1']['name'];
            $temp_imagen = $_FILES['fileTypeImage1']['tmp_name'];
        }
        else if($cual_imagen == 2){
            $type_imagen = $_FILES["fileTypeImage2"]["type"];
            $name_imagen = $_FILES['fileTypeImage2']['name'];
            $temp_imagen = $_FILES['fileTypeImage2']['tmp_name'];
        }else if($cual_imagen == 3){
            $type_imagen = $_FILES["fileTypeImage3"]["type"];
            $name_imagen = $_FILES['fileTypeImage3']['name'];
            $temp_imagen = $_FILES['fileTypeImage3']['tmp_name'];
        }else if($cual_imagen == 4){
            $type_imagen = $_FILES["fileTypeImage4"]["type"];
            $name_imagen = $_FILES['fileTypeImage4']['name'];
            $temp_imagen = $_FILES['fileTypeImage4']['tmp_name'];
        }else if($cual_imagen == 5){
            $type_imagen = $_FILES["fileTypeImage5"]["type"];
            $name_imagen = $_FILES['fileTypeImage5']['name'];
            $temp_imagen = $_FILES['fileTypeImage5']['tmp_name'];
        }else if($cual_imagen == 6){
            $type_imagen = $_FILES["fileTypeImage6"]["type"];
            $name_imagen = $_FILES['fileTypeImage6']['name'];
            $temp_imagen = $_FILES['fileTypeImage6']['tmp_name'];
        } 

        $uploadedFile = '';
        if(!empty($type_imagen) || !empty($name_imagen) ){
            $fileName = time().'_'.$name_imagen;
            $valid_extensions = array("jpeg", "jpg", "png", "PNG", "JPEG", "JPG");
            $temporary = explode(".", $name_imagen);
            $file_extension = end($temporary);
            
            if((($type_imagen == "image/png") || ($type_imagen == "image/PNG") || ($type_imagen == "image/jpg") || ($type_imagen == "image/JPG") || ($type_imagen == "image/jpeg") || ($type_imagen == "image/JPEG") ) && in_array($file_extension, $valid_extensions)){
                $sourcePath = $temp_imagen;
                $targetPath = "../../imagenes/galeria/".$fileName;
               
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
        
            
        try{
            
            include_once "conectar.php";

            if($cual_imagen == 1){
                $insert = $conn->query("UPDATE admin_casas SET image1='".$uploadedFile."' WHERE id='".$idReg."' ");
            }else if($cual_imagen == 2){
                $insert = $conn->query("UPDATE admin_casas SET image2='".$uploadedFile."' WHERE id='".$idReg."' ");
            }else if($cual_imagen == 3){
                $insert = $conn->query("UPDATE admin_casas SET image3='".$uploadedFile."' WHERE id='".$idReg."' ");
            }else if($cual_imagen == 4){
                $insert = $conn->query("UPDATE admin_casas SET image4='".$uploadedFile."' WHERE id='".$idReg."' ");
            }else if($cual_imagen == 5){
                $insert = $conn->query("UPDATE admin_casas SET image5='".$uploadedFile."' WHERE id='".$idReg."' ");
            }else if($cual_imagen == 6){
                $insert = $conn->query("UPDATE admin_casas SET image6='".$uploadedFile."' WHERE id='".$idReg."' ");
            }

            
           
            
            if ($insert){
                $data[]= array('ok'=>'ok', 'status_imagen' => $status_imagen, 'file_imagen' => $fileName, 'type_imagen' =>$type_imagen, 'si_subio' =>$uploadedFile);
            }else{
                $data[]= array('ok'=>'err', 'status_imagen' => $status_imagen, 'file_imagen' => $fileName, 'type_imagen' =>$type_imagen, 'si_subio' =>$uploadedFile);
            }
            
        } catch(Exception $e){
            echo $e->getMessage();
        }
        
        
    }else{
        $data[]= array('ok'=>'noData');
    }
    echo '{"data": '.(json_encode($data)).'}';
    // mysqli_free_result($datos);
    // mysqli_close($conn);
}


if ($comm == 'getGallery'){

    include_once "conectar.php";
        $datos = $conn->query("SELECT id, image1, image2, image3, image4, image5, image6 FROM admin_casas WHERE id='".$idReg."' ");
        
        if($datos->num_rows >= 0){
            $data = array();
            while ($fila = mysqli_fetch_array($datos)){
                // if (!empty($fila['image1'])){
                //     $src_image1 = "imagenes/galeria/".$fila['image1'];    
                // }else{
                //     $src_image1="";
                // }

                $src_image1 = $fila['image1'] <> "" ? "imagenes/galeria/".$fila['image1'] :  "" ;
                $src_image2 = $fila['image2'] <> "" ? "imagenes/galeria/".$fila['image2'] :  "" ;
                $src_image3 = $fila['image3'] <> "" ? "imagenes/galeria/".$fila['image3'] :  "" ;
                $src_image4 = $fila['image4'] <> "" ? "imagenes/galeria/".$fila['image4'] :  "" ;
                $src_image5 = $fila['image5'] <> "" ? "imagenes/galeria/".$fila['image5'] :  "" ;
                $src_image6 = $fila['image6'] <> "" ? "imagenes/galeria/".$fila['image6'] :  "" ;

                $data[] = array('ok'=>'ok', 'id' => $fila['id'], 'image1' => $src_image1, 'image2' => $src_image2, 'image3' => $src_image3,
                'image4' => $src_image4, 'image5' => $src_image5, 'image6' => $src_image6, 'name_image1'=>$fila['image1'], 'name_image2'=>$fila['image2'],
                 'name_image3'=>$fila['image3'], 'name_image4'=>$fila['image4'], 'name_image5'=>$fila['image5'], 'name_image6'=>$fila['image6'] );
            }
           
        }else{
            $data[] = array('ok'=>'noOk');
        }

        echo '{"data": '.(json_encode($data)).'}';
        mysqli_free_result($datos);
        mysqli_close($conn);

}


function actualizar_nombre_imagen_gallery($idReg, $idImagen){
    include_once "conectar.php";
    
    if($idImagen==1){
        $insert = $conn->query("UPDATE admin_casas SET image1='' WHERE id=$idReg");
    }else if($idImagen==2){
        $insert = $conn->query("UPDATE admin_casas SET image2='' WHERE id=$idReg");
    }else if($idImagen==3){
        $insert = $conn->query("UPDATE admin_casas SET image3='' WHERE id=$idReg"); 
    }else if($idImagen==4){
        $insert = $conn->query("UPDATE admin_casas SET image4='' WHERE id=$idReg"); 
    }else if($idImagen==5){
        $insert = $conn->query("UPDATE admin_casas SET image5='' WHERE id=$idReg"); 
    }else if($idImagen==6){
        $insert = $conn->query("UPDATE admin_casas SET image6='' WHERE id=$idReg"); 
    }
       
    if ($insert){
        $ok='ok';
    }else{
        $ok='noOk';
    } 
    return $ok;
}

$id_imagen = $_POST['id_imagen'];

if ($comm == 'DeleteImageGallery'){
    $name_image_gallery = $_POST['name_image_gallery'];
    if (is_writable("../../imagenes/galeria/".$name_image_gallery)){
        $output =  unlink("../../imagenes/galeria/".$name_image_gallery);
        if ($output){
            $msg = "Si eliminó imagen del server";
            $ook = actualizar_nombre_imagen_gallery($idReg, $id_imagen);
           
            if ($ook == "ok"){
                $status_imagen = "Si actualizo imagen en bd";
            }else if ($ook == "noOk"){
                $status_imagen = "No actualizo imagen en bd";
            }

            $data[]= array('ok'=>'ok', 'msg'=>$msg, 'status_imagen'=>$status_imagen, 'idReg'=>$idReg, 'ook'=>$ook, 'id_imagen'=>$id_imagen);

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