<?php
require_once 'init.php';
/**
 * Validating input for the registration process.
 */

class Input 
{
	public static function exists($type)
	{
		switch($type)
		{
			case 'post':
				return (!empty($_POST))? true: false;
				break;
			case 'get':
				return (!empty($_GET))? true: false;
				break;
			default: return false; //if not true from get or post, return false. 
		}
	}


	public static function get($item)
	{
		if(isset($_POST[$item])) 		{ return $_POST[$item]; }
		else if(isset($_GET[$item])) 	{ return $_GET[$item];  }
		else 							{ return ''; 			}//return empty string if the data does not exist. 
	}
	
	
	/**
	 * This static function retrieves the JSON data sent via the post method. It is needed when retrieving data which is not sent through a form. e.g. food data the user has input.
	 */
	public static function retrieveData()
	{
		try
		{
			$rest_json = file_get_contents("php://input");
			return $rest_json;
		} catch (Exception $e)
		{
			echo $e->getMessage();
		}
	}
	
	
}