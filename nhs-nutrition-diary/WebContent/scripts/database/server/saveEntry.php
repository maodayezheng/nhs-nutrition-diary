<?php
//TODO Write module description
/**
 * 
 */
include 'DbConfig.php';
include 'ServerDatabase.php';

echo "\nin saveEntry.php\n";

$database = new ServerDatabase();
$data = $database->retrieveData();
echo "\nechoing data\n".$data;

$database -> closeConnection();
?>