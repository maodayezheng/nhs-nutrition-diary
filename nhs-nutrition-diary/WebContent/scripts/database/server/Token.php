<?php
/**
 * This class' purpose is to prevent cross site request forgery (CSRF). The class allows us
 * to generate a token, check if it is valid/exists, and then delete that token. 
 */

require_once 'init.php';

class Token
{
	public static function generate()
	{
		return Session::put(Config::get('session/token_name'), md5(uniqid()));
	}
	
	
	
	
}





?>