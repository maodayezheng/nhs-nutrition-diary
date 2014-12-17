<?php
 
class DbConfig 
{
	private $serverName;
	private $userName;
	private $passCode;
	private $dbName;

	protected function __construct()
	{
		echo "\n in constructor for DbConfig\n";
		$this-> serverName = 'localhost';
		$this-> userName = 'root';
		$this-> passCode = '';
		$this-> dbName = 'appetite';		
	}
	
	public function getServerName() {
		return $this->serverName;
	}
	
	public function getUserName() {
		return $this->userName;
	}
	
	public function getPassCode() {
		return $this->passCode;
	}
	
	public function getDbName() {
		return $this->dbName;
	}
	
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
