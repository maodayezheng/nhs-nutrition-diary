<?php
/**
 * This script is intended to easily control entry and retrieval into the database from an AJAX request. 
 * Register and Login.php currently contain database entry/retrieval when processing a form.  
 * Created 26th December 2014
 * @author Vikram Bakshi
 */

require_once 'init.php'; //contains the class loader 

$db 			= 	DB::getInstance(); 
$data 			= 	Input::retrieveData();
$dataDecoded 	= 	json_decode($data, true); //decode the json data with the true flag so that objects are converted into associative arrays for entry into the MySQL database. 

// var_dump($dataDecoded); //FOR DEBUGGING

//Extract values and remove them from the array. This is so that only relevant fields remain.  
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

if(isset($dataDecoded['where'])) 
{
	$whereDecoded = $dataDecoded['where'];
	$where = explode(",", $whereDecoded);
	
	unset($dataDecoded['where']);
}

$results = null;

switch($action)
{
	case 'get':						get($db, $table, $where); break;
	case 'getLast':					getLast($db, $table, $where); break;
	case 'save': 					$db->insert($table, $dataDecoded); break; 
	case 'getUserData':				echo json_encode($db->getUserData($dataDecoded)); break; 
}

function get($db, $table, $where) {
	$results = $db->get($table, $where)->results();
	$resultsJSON = json_encode($results);
	echo($resultsJSON);
}

function getLast($db, $table, $where) {
	$results = $db->last($table, $where);
	$resultsJSON = json_encode($results);
	echo($resultsJSON);
}