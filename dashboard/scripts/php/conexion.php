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

    // $dbHost     = '127.0.0.1';
    // $dbUsername = 'u824480383_marygold2023';
    // $dbPassword = 'Marygold2023';
    // $dbName     = 'u824480383_marygold';
    // $port = '3306';
    
    // //create connection and select DB
    // $bd = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName, $port);
    // if($bd->connect_error){
    //     die("Unable to connect database: " . $bd->connect_error);
    // }
//    echo "conectado"
?>