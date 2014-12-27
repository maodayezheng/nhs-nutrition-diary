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
$dataDecoded 	= 	json_decode($data, true); //decode the json data with the true flag so that objects are converted into associative arrays. 
$action 		=   $dataDecoded['action']; //extract the table and action and unset them from the associative array. This is so that only fields in the database remain in the array. 
$table			=	$dataDecoded['table'];
 
unset($dataDecoded['action']); 
unset($dataDecoded['table']);

switch($action)
{
	case 'save': $db->insert($table, $dataDecoded); break; 
}




/* 

$database = ServerDatabase::getInstance();
$data = ServerDatabase::retrieveData();
$dataDecoded = json_decode($data, true);
setEntry($database, $dataDecoded);
$database -> closeConnection();
 */

