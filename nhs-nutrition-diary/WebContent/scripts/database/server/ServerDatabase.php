<?php

class ServerDatabase extends Dbconfig
{
	private $db;
	
	public function __construct()
	{
		echo "\nin constructor of ServerDatabase\n";
		parent::__construct(); 
		$this -> db = new mysqli(parent::getServerName(), parent::getUserName(), parent::getPassCode(), parent::getDbName()); // Create connection
		if ($this->db->connect_error) { die("Connection failed: " . $this->db); } // Check connection
		
	}
	
	public function retrieveData()
	{
		try
		{
			$rest_json = file_get_contents("php://input");
			return $rest_json;
		} catch (Exception $e)
		{
			echo $e->getMessage();
			return;
		}
	}
	
	public function closeConnection()
	{
		echo "\nclosing connection\n";
		$this->db->close(); //close connection
		echo "\nconnection closed\n";
	}
	
	public function getDb() {
		return $this -> db;
	}
	
}	
	
	
	


?>