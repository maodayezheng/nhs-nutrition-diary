<?php
/**
 * This class extends the DbConfig class allowing it to have access to its parents configuration variables.
 * This class implements the singleton pattern to enforce only one connection to the database at a single time. To return 
 * a connection to the database the user should use call the static method 'ServerDatabase::getInstance();'
 * Created: 16th December 2014. 
 * @author Vikram Bakshi, Robert Juergens 
 */
class ServerDatabase extends DbConfig
{
	private static $_instance = null; //instance for the singleton. 
	private $db, $_query, $_error=false, $_results, $_count = 0; 
	
	private function __construct()
	{
		echo "\nin constructor of ServerDatabase\n";
		parent::__construct(); 
		$this -> db = new mysqli(parent::getServerName(), parent::getUserName(), parent::getPassCode(), parent::getDbName()); // Create connection
		if ($this->db->connect_error) { die("Connection failed: " . $this->db); } // Check connection was successful. 
	}
	
	public static function getInstance()
	{
		if (!isset(self::$_instance))
		{
			self::$_instance = new ServerDatabase();
		}
		else 
		{
			return self::$_instance; 
		}
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
		}
	}
	
	public function closeConnection()
	{
		echo "\nclosing connection\n";
		$this->db->close(); //close connection
		echo "\nconnection closed\n";
	}
	
	public function getDb() 
	{
		return $this -> db;
	}
	
}	
	
	
	


?>