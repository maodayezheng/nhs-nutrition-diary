<?php

class Hash
{
	
	/**
	 * Function makes a hash.
	 */
	public static function make($string, $salt='')
	{
		return hash('sha256', $string . $salt);
	}
	
	/**
	 * Function makes a salt of a given length. 
	 */
	public static function salt($length)
	{
		return mcrypt_create_iv($length);
	}
	

	/**
	 * Function makes a unique hash. 
	 */
	public static function unique()
	{
		return self::make(uniqid());
	}
	
}

?>