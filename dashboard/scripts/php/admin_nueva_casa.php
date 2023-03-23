<?php

if(!empty($_POST['txtNombreCasa']) || !empty($_POST['txtDireccion']) || !empty($_FILES['file']['name'])){
    $uploadedFile = '';
    if(!empty($_FILES["file"]["type"])){
        $fileName = time().'_'.$_FILES['file']['name'];
        $valid_extensions = array("jpeg", "jpg", "png");
        $temporary = explode(".", $_FILES["file"]["name"]);
        $file_extension = end($temporary);
        
        if((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions)){
            $sourcePath = $_FILES['file']['tmp_name'];
            $targetPath = "../../imagenes/casas/".$fileName;
            // echo "source: ".$sourcePath;
            // echo "target: ".$targetPath;
            if(move_uploaded_file($sourcePath,$targetPath)){
                $uploadedFile = $fileName;
                // echo "subio archivo: ".$uploadedFile;
            }
        }
        // echo $fileName;
    }
    
    $name_house = $_POST['txtNombreCasa'];
    $address_house = $_POST['txtDireccion'];
    $description = $_POST['txtDescripcion'];
    $property_size = $_POST['txtTamanoPropiedad'];
    $price = $_POST['txtPrecio'];
    $type_house = $_POST['cboTipoCasa'];
    $flat_size = $_POST['txtTamanoPlano'];
    $status_house = $_POST['cboEstadoCasa'];
    
    //include database configuration file
    // include_once 'dbConfig.php';
    try{
        //insert form data in the database
        include_once "conectar.php";

        $insert = $conn->query("INSERT INTO admin_casas(name_house, address_house, description_house, property_size, price, type_house, flat_size, status_house, estado, image_house) VALUES ('".$name_house."','".$address_house."','".$description."','".$property_size."','".$price."','".$type_house."','".$flat_size."','".$status_house."','1','".$uploadedFile."')");
        //$resultado = $conn->query("INSERT INTO `admin_casas`(`name_house`, `address_house`, `description_house`, `property_size`, `price`, `type_house`, `flat_size`, `status_house`, `estado`, `image_house`) VALUES ('[$name_house]','[$address_house]','[$description]','[$property_size]','[$price]','[$type_house]','[$flat_size]','[$status_house]','1','[$uploadedFile]')");
        echo $insert?'ok':'err';   
        // include_once "conexion.php";
        // $insert = $bd -> prepare("INSERT INTO admin_casas(name_house, address_house, description_house, property_size, price, type_house, flat_size, status_house, estado, image_house) VALUES (?,?,?,?,?,?,?,?,?,?);");
        // $resultado = $insert->execute([$name_house,$address_house,$description,$property_size,$price,$type_house,$flat_size,$status_house,'1',$uploadedFile]);
        // echo $resultado?'ok':'err';    
        
    } catch(Exception $e){
        echo $e->getMessage();
    }
    
    
}

?>