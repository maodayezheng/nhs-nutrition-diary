<?php
 
class DbConfig 
{
	
	/**
	 * This function is for allowing easy access to the config variables of the database. Rather than having to refer to the variables through array notation, this function will allow
	 * developers to refer to them through the 'get' static function - for example: 'DbConfig::get('mysql/serverName')' - the forward slash allows referencing like a directory structure. 
	 * The global array is stored in init.php
	 */
	public static function get($path = null)
	{
		if($path)
		{
			$config = $GLOBALS['config'];
			$path = explode('/', $path);
			
			foreach($path as $bit)
			{
				if(isset($config[$bit])) 
				{
					$config = $config[$bit];
				}
			}
			return $config;
		}
		return false;
	}	
}
?>
