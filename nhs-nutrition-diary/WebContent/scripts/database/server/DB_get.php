<?php

include 'DB.php';
require_once 'ServerDatabase.php';

$database = ServerDatabase::getInstance();
$data = ServerDatabase::retrieveData();
$dataDecoded = json_decode($data, true);

$table = $dataDecoded["table"];
$where = $dataDecoded["where"];

switch($table) {
	case "usersymptommanifest": get_usersymptommanifest($table, $where); break;
}
$database -> closeConnection();

function get_usersymptommanifest($table, $where) {
	echo("...");
	echo($table);
	echo("...");
	echo($where);
	echo("...");
	
	$db = new DB();
	echo($db->get($table, $where));
}
?>