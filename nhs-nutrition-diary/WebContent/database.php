<?php
	
	try 
	{
 		echo "in try block, json stringify\n";
 		
		$rest_json = file_get_contents("php://input");
		echo $rest_json; 
		echo "\n";
		
		$array = json_decode($rest_json, true);
		echo $array[0]['timestamp']."\n";
		echo $array[1]['timestamp']."\n";
		echo $array[0]['Date']."\n";
		echo $array[1]['Date']."\n";
		echo $array[3]['protein']."\n";
		echo $array[2]['calories']."\n";
		
		
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
?>