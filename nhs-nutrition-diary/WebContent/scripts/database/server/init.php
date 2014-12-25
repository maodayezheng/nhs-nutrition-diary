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
		'cookie_name'	=> 'appetiteCookieHash',
		'cookie_name2'	=> 'appetiteCookieUserID',
		'cookie_expiry'	=> 315532800 //ten years in seconds
	), 
	'session' => array(
		'session_name'	=> 'user',
		'token_name'	=> 'token'
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

if(Cookie::exists(Configurations::get('remember/cookie_name')) && !Session::exists(Configurations::get('session/session_name'))) //if the cookie exists but the session does not - then the user asked to be remembered and so should be logged in.
{
	echo '<br /> User asked to be remembered <br />';
	$hash = Cookie::get(Configurations::get('remember/cookie_name'));
	$hashCheck = DB::getInstance()->get('users_session', array('hash','=',$hash));
	
	if($hashCheck->count())
	{
		//if here then the user wanted to be remembered and so should be logged in 
		echo 'Hash Matches, log the user in.';
		echo '<br />'.$hashCheck->first()->user_id;
		$user = new User($hashCheck->first()->user_id); 
		$user->login(); 
	}
	
}










?>

