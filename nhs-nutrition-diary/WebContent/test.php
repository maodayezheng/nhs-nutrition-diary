<?php

include 'scripts/database/server/DbConfig.php';
include 'scripts/database/server/ServerDatabase.php';

echo "\nin test.php\n";


try 
{
	$rest_json = file_get_contents("php://input");
	echo $rest_json;
	echo "\n";

	//$dataDecoded = json_decode($rest_json, true);
} catch (Exception $e) 
{
	echo $e->getMessage();
	return;
}

$database = new ServerDatabase();
echo "new db\n";
$database -> closeConnection(); 

?>