<?php
$com = $_GET['com'];
$comm = $_POST['comm'];
$idReg = $_POST['idReg'];
$estado = $_POST['estado'];

if ($comm=='listarReservaciones'){

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
        
        $cuantasFilas = $datos->num_rows;
        if($datos->num_rows > 0){
             
            $data = array();
            
            while ($fila = mysqli_fetch_array($datos)){
                
                $id = $fila['id'];
                $background = "#d5b583";
                               
                $data[] = array('ok'=>'ok','id'=>$id,'casa'=>$fila['name_house'],'fecha_llegada'=>$fila['fecha_llegada'],'fecha_salida'=>$fila['fecha_salida'],'background'=>$background);
                
           }     

        }else{
            $data[] = array('ok'=>'nook','id'=>$id,'casa'=>$fila['name_house'],'fecha_llegada'=>$fila['fecha_llegada'],'fecha_salida'=>$fila['fecha_salida'],'background'=>$background);
        }

        echo '{"data": '.(json_encode($data)).'}';

        mysqli_free_result($datos);
        mysqli_close($conn);

    }catch(Exception $e){
        echo $e->getMessage();
    }

}


?>