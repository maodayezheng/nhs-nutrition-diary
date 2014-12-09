<?php
	
	try 
	{
 		echo "in try block, json stringify\n";
 		
		$rest_json = file_get_contents("php://input");
		echo $rest_json; 
		echo "\n";
		
		$array = json_decode($rest_json, true);
// 		echo $array[0]['timestamp']."\n";
// 		echo $array[1]['timestamp']."\n";
// 		echo $array[0]['Date']."\n";
// 		echo $array[1]['Date']."\n";
// 		echo $array[3]['protein']."\n";
// 		echo $array[2]['calories']."\n";
		
		
		if (isset($_POST['data1']))
		{
			
			echo "in isset";	
			echo $_POST['Date'];
			$decodedTest = json_decode($test,true);
			echo ($decodedTest);
		}
		
	}
	catch (Exception $e)
	{
		echo "failed";
	}
	
	setEntry($array);
	
	function setEntry($entry) {
	
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "appetite";
		
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