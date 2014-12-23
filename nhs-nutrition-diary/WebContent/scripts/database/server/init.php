<?php
/**
 * This PHP script will be included in all others. It contains the superglobal array 'config' which details inforamation about the database, cookie, and session.
 * This script also imports sanitise.php which contains functionality which is needed for every script which imports this one. 
 * 
 * Created 16th December 2014
 * @author Vikram Bakshi
 */

session_start();
//echo "<br /> in init.php <br />";
/*
 * Creating a gloabl array so all classes which import init.php will have access to these variables. 
 */
$GLOBALS['config'] = array(
	'mysql' => array(
		'host' 			=> '127.0.0.1',
		'userName'	 	=> 'root',
		'passCode'	 	=> '',
		'db'	 		=> 'appetite'
	),
	'remember' => array(
		'cookie_name'	=> 'appetiteCookie',
		'cookie_expiry'	=> 604800 //one week in seconds
	), 
	'session' => array(
		'session_name'	=> 'user',
		'token' 		=> 'token'
	)	
);

/**
 * Using the standard php library (spl) to autoload a class only when it is required. This saves having to write require_once '...' for each class in every script. 
 */
spl_autoload_register(function($class) 
{
	require_once $class.'.php';
});

// This imports the functions which are required across all scripts. It is done here for cleaner code.    
require_once 'sanitise.php';

?>

