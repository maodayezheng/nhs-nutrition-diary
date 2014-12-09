<?php
	
	try 
	{
// 		echo "in try block, json stringify";
		echo $_POST[0];
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