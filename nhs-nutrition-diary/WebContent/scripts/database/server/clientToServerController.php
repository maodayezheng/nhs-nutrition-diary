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

if(isset($dataDecoded['endStatement']))
{
	$endStatement = $dataDecoded['endStatement'];  
	unset($dataDecoded['endStatement']);
} else { $endStatement = null; }

if(isset($dataDecoded['number']))
{
	$number = $dataDecoded['number'];
	unset($dataDecoded['number']);
}

$results = null;
//var_dump($dataDecoded);
switch($action)
{
	case 'get':						get($db, $table, $where, $endStatement); break;
	case 'getUserProfile':			getUserProfile($db, $table, $where); break; 
	case 'getVisualisationData':	getVisualisationData($db, $dataDecoded); break;
	case 'getLast':					getLast($db, $table, $where); break;
	case 'getTenMostFrequent':		getTenMostFrequent($db, $table, $where, $number); break; 
	case 'save': 					$db->insert($table, $dataDecoded); break; 
	case 'confirmIDPassword':		confirmIDPassword($db, $dataDecoded); break;
	case 'usernameUnique':			usernameUnique($db, $dataDecoded); break;
}

function usernameUnique($db, $dataDecoded)
{
	$check = $db->get('users', array('nhsnumber','=',$dataDecoded['nhsnumber']));
	if($check->count()) { $trueOrFalse = array(); 					echo json_encode($trueOrFalse); } //echo empty array if not unique
	else				{ $trueOrFalse = array("tOrf" => "true"); 	echo json_encode($trueOrFalse); } //echo true if unique
}

function confirmIDPassword($db, $dataDecoded)
{
	//Compare the stored hash against the one generated from the password provided. 
	if(strcmp(Hash::make($dataDecoded['idPassword']), $db->action('SELECT password','groups',array('id','=','2'))->first()->password) == 0)
	{
		$trueOrFalse = array("tOrf" => "true");
		echo json_encode($trueOrFalse); 
	}
	else
	{
		$trueOrFalse = array();
		echo json_encode($trueOrFalse);
	}
}

function get($db, $table, $where, $endStatement = null) {
	$results = $db->get($table, $where, $endStatement)->results();
	$resultsJSON = json_encode($results);
	echo($resultsJSON);
	//$resultsJSON = null;
}

function getVisualisationData($db, $dataDecoded)
{
	$queryResultArray = $db->getUserData($dataDecoded);
	echo json_encode($queryResultArray);
}

function getUserProfile($db, $table, $where)
{
	$comma = json_decode('"\u002C"');	//UTF representation of a comma so that it can be used in function arguments
	$results = $db->action("SELECT gender$comma dateofbirth$comma activitylevel", $table, $where)->results(); 
	$resultsJSON = json_encode($results);
	echo($resultsJSON);
}

function getLast($db, $table, $where) {
	$results = $db->last($table, $where);
	$resultsJSON = json_encode($results);
	echo($resultsJSON);
	$resultsJSON = null;
}

function getTenMostFrequent($db, $table, $where, $number) {
	$db->tenMostFrequent($table, $where, $number);
	$results = $db->results();
	$resultsJSON = json_encode($results);
	echo($resultsJSON);
	$resultsJSON = null;
}