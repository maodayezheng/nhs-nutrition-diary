<?php
include 'Config.php';
require_once 'ServerDatabase.php';

$database = ServerDatabase::getInstance();
$data = ServerDatabase::retrieveData();
$dataDecoded = json_decode($data, true);
setEntry($database, $dataDecoded);
$database -> closeConnection();

function setEntry($database, $entry) {
	$sql = "INSERT INTO " . $entry["table"] . " (";
	
	foreach($entry as $property => $value) {
		if($property == "table") {
			$sql = $sql . "id";
			$sql = $sql . ", ";
			continue;
		}
		$sql = $sql . $property;
		$sql = $sql . ", ";
	}
	$sql = substr($sql, 0, strlen($sql) - 2);
	$sql = $sql . ") VALUES (";
	
	foreach($entry as $property => $value) {
		if($property == "table") {
			$sql = $sql . "1";
			$sql = $sql . ", ";
			continue;
		}
		$sql = $sql . "'" . $value . "'";
		$sql = $sql . ", ";
	}
	$sql = substr($sql, 0, strlen($sql) - 2);
	$sql = $sql . ")";
	
	if ($database -> getDb() -> query($sql) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $database -> getDb() -> error;
	}
}
?>