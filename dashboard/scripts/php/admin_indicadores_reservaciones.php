<?php
$com = $_GET['com'];
$comm = $_POST['comm'];
$idReg = $_POST['idReg'];
$estado = $_POST['estado'];

if ($comm=='listarReservaciones'){

    try{
        //insert form data in the database
        include_once "conectar.php";
        $datos = $conn->query("SELECT COUNT(estado) as num_reservas, estado, month(fecha_llegada) as mes, YEAR(fecha_llegada) as anio 
                                FROM `admin_rentaCasas` 
                                WHERE fecha_llegada >= date_add(now(), INTERVAL -6 MONTH) 
                                GROUP BY MONTH(fecha_llegada), estado 
                                ORDER BY YEAR(fecha_llegada) DESC, MONTH(fecha_llegada) DESC");
        
        $cuantasFilas = $datos->num_rows;
        if($datos->num_rows > 0){
             
            $data = array();
            
            while ($fila = mysqli_fetch_array($datos)){
                              
                $data[] = array('ok'=>'ok','num_reservas'=>$fila['num_reservas'],'estado'=>$fila['estado'],'mes'=>$fila['mes'],'anio'=>$fila['anio']);
                
           }     

        }else{
            $data[] = array('ok'=>'ok','num_reservas'=>$fila['num_reservas'],'estado'=>$fila['estado'],'mes'=>$fila['mes'],'anio'=>$fila['anio']);
        }

        echo '{"data": '.(json_encode($data)).'}';

        mysqli_free_result($datos);
        mysqli_close($conn);

    }catch(Exception $e){
        echo $e->getMessage();
    }

}


$anio = $_POST['anio'];

if ($comm=='masrentadas'){
    if ($anio == 0 or $anio == "" ){
        $ss = " SELECT COUNT(ren.id_casa) as num_reservas, cas.name_house FROM admin_rentaCasas ren   INNER JOIN admin_casas cas on ren.id_casa=cas.id where ren.estado=1 GROUP BY ren.id_casa ORDER BY COUNT(ren.id_casa) DESC LIMIT 10 ";
    }else{
        $ss = " SELECT COUNT(ren.id_casa) as num_reservas, cas.name_house FROM admin_rentaCasas ren   INNER JOIN admin_casas cas on ren.id_casa=cas.id where ren.estado=1 and YEAR(ren.fecha_llegada) ='.$anio.' GROUP BY ren.id_casa ORDER BY COUNT(ren.id_casa) DESC LIMIT 10 ";    
    }
    try{
        //insert form data in the database
        include_once "conectar.php";
        $datos = $conn->query($ss);
        
        $data = array();
        
        $cuantasFilas = $datos->num_rows;
        if($datos->num_rows > 0){
             
            
            
            while ($fila = mysqli_fetch_array($datos)){
                              
                $data[] = array('ok'=>'ok','num_reservas'=>$fila['num_reservas'],'nombre_casa'=>$fila['name_house']);
                
           }     

        }else{
            $data[] = array('ok'=>'ok','num_reservas'=>'0','nombre_casa'=>'sin reservas');
        }

        echo '{"data": '.(json_encode($data)).'}';

        mysqli_free_result($datos);
        mysqli_close($conn);

    }catch(Exception $e){
        echo $e->getMessage();
    }

}


?>