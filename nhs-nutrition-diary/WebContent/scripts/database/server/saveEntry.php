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
$dataDecoded = json_decode($data, true);
echo "\nechoing data\n".$data;

if($dataDecoded["table"] == "weightmanifest") {
	setEntryWeightManifest($database, $dataDecoded);
}

$database -> closeConnection();

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

?>