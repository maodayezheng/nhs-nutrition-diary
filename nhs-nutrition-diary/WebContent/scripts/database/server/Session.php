<?php
/**
 * The Session class 
 * @author User
 *
 */
class Session
{
	public static function put($name, $value)
	{
		return $_SESSION[$name] = $value;
	}
	
	
}
?>
