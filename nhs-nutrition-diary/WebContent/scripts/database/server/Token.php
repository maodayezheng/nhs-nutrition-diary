<?php
/**
 * This class' purpose is to prevent cross site request forgery (CSRF). The class allows us
 * to generate a token, check if it is valid/exists, and then delete that token. 
 * 
 * Created 23rd December 2014
 * @author Vikram Bakshi
 */


class Token
{
	public static function generate()
	{
		return Session::put(Configurations::get('session/token_name'), md5(uniqid()));
	}
	
	/**
	 * Function checks if the token exists in the session. If the $token equals the session that is currently running
	 * we want to return true.  
	 */
	public static function check($token)
	{
		$tokenName = Configurations::get('session/token_name');
		
		if(Session::exists($tokenName) && $token === Session::get($tokenName))
		{
			Session::delete($tokenName);
			return true;
		}
		return false;
	}
	
	
}





?>