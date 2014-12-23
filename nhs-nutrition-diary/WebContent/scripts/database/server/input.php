<?php
require_once 'init.php';
/**
 * This class contains all of the functionality for receiving data from the client via the GET or POST method. 
 * Created: 22nd December 2014
 * @author Vikram Bakshi
 */

class Input 
{
	/**
	 * This static function checks whether there exists any post/get data. It uses the $_POST and $_GET superglobals and as such it can only be used for when data is being 
	 * sent through a form. The retrieveData() static function is used when data is sent via POST or GET but not through a form.   
	 */
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

	/**
	 * Function simplifies working with data received from the client. Instead of having to write (e.g.) $_POST['name'] the function allows you to
	 * write 'Input::get('name')' which looks cleaner.
	 */
	public static function get($item)
	{
		if(isset($_POST[$item])) 		{ return $_POST[$item]; }
		else if(isset($_GET[$item])) 	{ return $_GET[$item];  }
		else 							{ return ''; 			}//return empty string if the data does not exist. 
	}
	
	
	/**
	 * This static function is intended to retrieve POST data which has been not been sent through a form. 
	 * For example food data the user has input on the client side. 
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