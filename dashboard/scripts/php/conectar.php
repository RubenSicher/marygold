<?php
define('DB_HOST', '127.0.0.1:3306');
define('DB_USER', 'u824480383_marygold2023');
define('DB_PASS', 'Marygold2023');
define('DB_NAME', 'u824480383_marygold');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
// Check connection
if ($conn->connect_error) {
  die('Connection failed: ' . $conn->connect_error);
}

 ?>
