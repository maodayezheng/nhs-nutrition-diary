<?php
/**
 * This script is intended to be run is run to easily control entry and retrieval into the database from an AJAX request. 
 * Register and Login.php currently contain database entry/retrieval when processing a form.  
 * Created 26th December 2014
 * @author Vikram Bakshi
 */

require_once 'init.php'; //contains the class loader 

$db 			= 	DB::getInstance(); 
$data 			= 	Input::retrieveData();
$dataDecoded 	= 	json_decode($data, true); //decode the json data with the true flag so that objects are converted into associative arrays for entry into the MySQL database. 

//Extract values and remove them from the array. This is so that only relevant fields remain.  
var_dump($dataDecoded);

if(!isset($dataDecoded['action']))
{
	throw new Exception("An 'action' property needs to exist as a JSON property in the data sent to this script"); 
} else 
{
	$action = $dataDecoded['action']; //this will have the value, 'save'/'edit'/'delete'/'get' etc.
	unset($dataDecoded['action']);
}

if(isset($dataDecoded['table']))
{
	$table = $dataDecoded['table'];
	unset($dataDecoded['table']);
}

unset($dataDecoded['userid']);
var_dump($dataDecoded);

switch($action)
{
	case 'save': 					$db->insert($table, $dataDecoded); break; 
	case 'getGraphData':			$db->getGraphData($dataDecoded); break; 
}




/* 

$database = ServerDatabase::getInstance();
$data = ServerDatabase::retrieveData();
$dataDecoded = json_decode($data, true);
setEntry($database, $dataDecoded);
$database -> closeConnection();
 */

