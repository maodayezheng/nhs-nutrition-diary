<?php

include 'scripts/database/server/DbConfig.php';
include 'scripts/database/server/ServerDatabase.php';

echo "\nin test.php\n";

$database = new ServerDatabase();
$data = $database->retrieveData();
echo "\nechoing data\n".$data;



$database -> closeConnection(); 

?>