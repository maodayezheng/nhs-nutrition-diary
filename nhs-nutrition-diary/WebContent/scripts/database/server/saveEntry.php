<?php
//TODO Write module description
/**
 * 
 */
include 'DbConfig.php';
//include 'ServerDatabase.php';
require_once 'ServerDatabase.php';

$database = ServerDatabase::getInstance();
$data = ServerDatabase::retrieveData();
$dataDecoded = json_decode($data, true);
setEntry($database, $dataDecoded);
$database -> closeConnection();

/*
if($dataDecoded["table"] == "weightmanifest") {
	setEntryWeightManifest($database, $dataDecoded);
}
*/

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

/*
function setEntryWeightManifest($database, $entry) {
	$id = "'111'";
	$userid = "'" . $entry["userid"] . "'";
	$datetime = "'" . $entry["datetime"] . "'";
	$weight = "'" . $entry["weight"] . "'";
	
	$sql = "INSERT INTO weightmanifest (id, userid, datetime, weight)
		VALUES ($id, $userid, $datetime, $weight)";
	if ($database -> getDb() -> query($sql) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $database -> getDb() -> error;
	}	
}
*/
?>