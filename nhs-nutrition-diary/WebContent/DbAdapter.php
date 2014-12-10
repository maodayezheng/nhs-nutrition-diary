<?php
try {
	//TODO receive data and store in local variables
	echo "in try block, json stringify\n";
 	
	$rest_json = file_get_contents("php://input");
	echo $rest_json; 
	echo "\n";
	
	$dataDecoded = json_decode($rest_json, true);
} catch (Exception $e) {
	echo $e->getMessage();
	return;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "appetite";

setMySqlDbEntry($dataDecoded);

function setMySqlDbEntry($entry) {
	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	
	for($index = 0; $index < sizeof($entry); $index++) {
		$date = "'2014-12-09'";
		$time = "'17:50'";
		
		$foodName = "'" . $entry[$index]["label"] . "'";
		$unit = "'" . $entry[$index]["EdibleProportion"] . "'";
	
		$sql = "INSERT INTO foodmanifest (date, time, foodname, units)
			VALUES ($date, $time, $foodName, $unit)";
		if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}
	
	
	$conn->close();
}
?>