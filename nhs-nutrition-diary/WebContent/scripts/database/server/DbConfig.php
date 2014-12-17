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
}
?>
