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

//Extract the values for the action and table and then remove/unset them from the array. This is so that only relevant fields remain in the array. 
$action 		=   $dataDecoded['action'];  //this will have the value, 'save'/'edit'/'delete'/'get' etc. 
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

