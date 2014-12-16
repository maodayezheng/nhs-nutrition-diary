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

if($data[0]["table"] == "weightmanifest") {
	setEntryWeightManifest($dataDecoded);
}

$database -> closeConnection();

function setEntryWeightManifest($entry) {
	$id = "'111'";
	$userid = "'" . $data["userid"] . "'";
	$datetime = "'" . $data["datatime"] . "'";
	$weight = "'" . $data["weight"] . "'";
	
	$sql = "INSERT INTO weightmanifest (id, userid, datetime, weight)
		VALUES ($id, $userid, $datetime, $weight";
	if ($database -> getDb -> query($sql) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $database -> getDb -> error;
	}	
}

?>