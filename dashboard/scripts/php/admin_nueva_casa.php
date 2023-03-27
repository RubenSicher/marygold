<?php

$com = $_GET['com'];


if ($com=="nueva_casa"){

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
               
                if(move_uploaded_file($sourcePath,$targetPath)){
                    $uploadedFile = $fileName;
                 
                }
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
        
       
        try{
            //insert form data in the database
            include_once "conectar.php";
            $insert = $conn->query("INSERT INTO admin_casas(name_house, address_house, description_house, property_size, price, type_house, flat_size, status_house, estado, image_house) VALUES ('".$name_house."','".$address_house."','".$description."','".$property_size."','".$price."','".$type_house."','".$flat_size."','".$status_house."','1','".$uploadedFile."')");
            echo $insert?'ok':'err';  
            
        } catch(Exception $e){
            echo $e->getMessage();
        }
        
        
    }

}


if ($com=='listarCasas'){

    try{
        //insert form data in the database
        include_once "conectar.php";
        $datos = $conn->query("SELECT id, name_house, address_house, description_house, property_size, price, type_house, flat_size, status_house, estado, image_house FROM admin_casas WHERE estado='1'");
        
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
                    $status_house = 'OPTION 1';
                }else if($statushouse==3){
                    $status_house = 'OPTION 2';
                }

                $id = $fila['id'];
                $name_house = $fila['name_house'];
                $address_house = $fila['address_house'];

                $data_house =
                '<div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                        <i class="fas fa-text-width"></i>
                        Data house
                        </h3>
                    </div>
                    <div class="card-body">
                        <dl>
                        <p style="margin-bottom:0px"><b>Name: </b>' . $name_house . '</p>
                        <p style="margin-bottom:0px"><b>Address: </b>' . $address_house . '</p>               
                        <p style="margin-bottom:0px"><b>Status: </b>' . $status_house . '</p>
                        </dl>
                    </div>
                </div>';

                $data[] = array('ok'=>'ok','id'=>$id,'data_house'=>$data_house,'image_house'=>$address_house);
                
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


// error_reporting(E_ALL);

// try{
//     //insert form data in the database
//     include_once "conectar.php";
//     $datos = $conn->query("SELECT id, name_house, address_house, description_house, property_size, price, type_house, flat_size, status_house, estado, image_house FROM admin_casas WHERE estado='1'");
    
//     if($datos->num_rows > 0){
//         $data = array();
//         while ($fila = mysqli_fetch_array($datos)){
//              $info = $info."{'Nombre': '".$fila['name_house']."'},";
//         }
//             $info2 = substr($info, 0, -1);
//             $info3 = "{'data':[".$info2."]}";
//     }else{
//         $data['data'][] = '';
//     }

//     echo json_encode($info3);


//     mysqli_free_result($datos);
//     mysqli_close($conn);

// }catch(Exception $e){
//     echo $e->getMessage();
// }
