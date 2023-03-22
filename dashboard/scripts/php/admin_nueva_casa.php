<?php

if(!empty($_POST['txtDescripcion']) || !empty($_POST['txtUbicacion']) || !empty($_FILES['file']['name'])){
    $uploadedFile = '';
    if(!empty($_FILES["file"]["type"])){
        $fileName = time().'_'.$_FILES['file']['name'];
        $valid_extensions = array("jpeg", "jpg", "png");
        $temporary = explode(".", $_FILES["file"]["name"]);
        $file_extension = end($temporary);
        // echo $file_extension;
        if((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions)){
            $sourcePath = $_FILES['file']['tmp_name'];
            $targetPath = "../../casas/".$fileName;
            echo "source: ".$sourcePath;
            echo "target: ".$targetPath;
            if(move_uploaded_file($sourcePath,$targetPath)){
                $uploadedFile = $fileName;
                echo "subio archivo: ".$uploadedFile;
            }
        }
        // echo $fileName;
    }
    
    $descripcion = $_POST['txtDescripcion'];
    $ubicacion = $_POST['txtUbicacion'];
    
    //include database configuration file
    // include_once 'dbConfig.php';
    
    //insert form data in the database
    // $insert = $db->query("INSERT form_data (descripcion,ubicacion,file_name) VALUES ('".$descripcion."','".$ubicacion."','".$uploadedFile."')");
    
    // echo $insert?'ok':'err';
}