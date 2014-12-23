<?php
 
/**
 * The DbConfig.php file contains a single get function which makes it easier to refer to the global array containing the configuration details of the database. 
 * Rather than using PHP native functionality (which can become slightly confusing with arrays inside arrays) the function allows you to refer to the contents of the array
 * like a directory structure e.g. DbConfig::get('mysql/host') would get the host. 
 * 
 * Created: 16th December 2014
 * @author Vikram Bakshi
 *
 */
class Config 
{
	
	/**
	 * This function is for allowing easy access to the config variables of the database. Rather than having to refer to the variables through array notation, this function will allow
	 * developers to refer to them through the 'get' static function - for example: 'DbConfig::get('mysql/host')' - the forward slash allows referencing like a directory structure. 
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
