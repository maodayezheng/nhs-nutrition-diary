<?php
//Using http://stackoverflow.com/questions/3228694/php-database-connection-class as guidance. 
class Dbconfig 
{
	const serverName='localhost';
	protected static $userName='';
	protected static $passCode='';
	protected static $dbName='';

	protected function __construct()
	{
		echo "\nin DbConfig constructor\n";
		//$this-> serverName = 'localhost';
		$this-> userName = 'root';
		$this-> passCode = '';
		$this-> dbName = 'appetite';		
		echo "\n variables assigned \n";
	}
}
?>
