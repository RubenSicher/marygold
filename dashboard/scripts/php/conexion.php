<?php
    $pass="Marygold2023";
    $user="u824480383_marygold2023";
    $database="u824480383_marygold";

    try{
        $bd= new PDO('mysql:host=127.0.0.1:3306; dbname='.$database,$user,$pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        // echo 'conectado!';
    } catch (Exception $e){
        echo "Problema con la conexión: ".$e->getMessage();
    }
   
?>