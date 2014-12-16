<?php
//Using http://stackoverflow.com/questions/3228694/php-database-connection-class as guidance. 
class Dbconfig 
{
	protected $serverName;
	protected $userName;
	protected $passCode;
	protected $dbName;

	protected function __construct()
	{
		echo "in DbConfig constructor";
		$this -> serverName = 'localhost';
		$this -> userName = 'root';
		$this -> passCode = '';
		$this -> dbName = 'appetite';		
	}
}
?>
