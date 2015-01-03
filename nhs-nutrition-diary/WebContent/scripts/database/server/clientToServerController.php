<?php
/**
 * This script is intended to respond to AJAX requests made from the client's side - which should be all requests apart from registering (register.php)
 * and logging in (login.php). If anything is sent back to the client it is in the form of JSON. 
 *   
 * Created 26th December 2014
 * @author Vikram Bakshi
 */

require_once 'init.php'; //contains the class loader 
header('Content-Type: application/json'); //states that the response from this script will be JSON data. 

$db 			= 	DB::getInstance(); 
$data 			= 	Input::retrieveData();
$dataDecoded 	= 	json_decode($data, true); //decode the json data with the true flag so that objects are converted into associative arrays for entry into the MySQL database. 


//Extract values and remove them from the array. This is so that only relevant fields remain.  
if(!isset($dataDecoded['action'])) 
{
	throw new Exception("An 'action' property needs to exist as a JSON property in the data sent to this script"); 
} else 
{
	$action = $dataDecoded['action']; //this will have the value, 'save'/'edit'/'delete'/'get' etc.
	unset($dataDecoded['action']);
}

if(isset($dataDecoded['userHash'])) //if the userHash property is set: query the DB to return the user_id and add that as a property to the dataDecoded array. 
{
	$userHash 				= $dataDecoded['userHash'];
	$userID 				= (array) $db->action('SELECT `user_id`','users_session',array('hash','=',$userHash))->first();
	$dataDecoded['userID'] 	= $userID['user_id']; 
	unset($dataDecoded['userHash']);
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
	case 'getUserProfile':			getUserProfile($db, $table, $where); break; 
	case 'getLast':					getLast($db, $table, $where); break;
	case 'getTenMostFrequent':		getTenMostFrequent($db, $table, $where); break;
	case 'save': 					$db->insert($table, $dataDecoded); break; 
	case 'getUserData':				echo json_encode($db->getUserData($dataDecoded)); break; 
}

function getUserProfile($db, $table, $where)
{
	$comma = json_decode('"\u002C"');	//UTF representation of a comma so that it can be used in function arguments
	$results = $db->action("SELECT gender$comma dateofbirth$comma activitylevel", $table, $where)->results(); 
	$resultsJSON = json_encode($results);
	echo($resultsJSON);
}


function get($db, $table, $where) {
	$results = $db->get($table, $where)->results();
	$resultsJSON = json_encode($results);
	echo($resultsJSON);
	//$resultsJSON = null;
}

function getLast($db, $table, $where) {
	$results = $db->last($table, $where);
	$resultsJSON = json_encode($results);
	echo($resultsJSON);
	$resultsJSON = null;
}

function getTenMostFrequent($db, $table, $where) {
	$db->getTenMostFrequent($table, $where);
	$results = $db->results();
	$resultsJSON = json_encode($results);
	//echo($resultsJSON);
	echo("test");
	$resultsJSON = null;
}