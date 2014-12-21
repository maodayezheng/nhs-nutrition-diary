<?php
/**
 * This class contains the main functionalty needed for the server side database. It imports init.php to have access to the global variables associated
 * with the config of the database. The class follows the singleton design pattern so that only one instance of the connection to the database can ever exist. 
 * To return a connection to the database the user should use call the static method 'ServerDatabase::getInstance();'. To close the connection the user should 
 * call closeConnection() on the instance object. 
 * Created: 16th December 2014. 
 * @author Vikram Bakshi
 */

require_once 'init.php';

class ServerDatabase
{
	private static $_instance = null; //instance for the singleton. 
	private $db, $_query, $_error=false, $_results, $_count = 0; //instance variables for manipulating the database.
	
	public function __construct()
	{
		echo "\nin constructor of ServerDatabase\n"; 
		$this -> db = new mysqli(DbConfig::get('mysql/serverName'), DbConfig::get('mysql/userName'), DbConfig::get('mysql/passCode'), DbConfig::get('mysql/dbName')); // Create connection
		if ($this->db->connect_error) { die("Connection failed: " . $this->db); } // Check connection was successful. 
		echo "\n successful connection \n";
	}
	
	/**
	 * This function returns the instance if it exists otherwise it creates one. This acts as the singleton object. 
	 */
	public static function getInstance()
	{
		if (!isset(self::$_instance)) { self::$_instance = new ServerDatabase(); }
		return self::$_instance; 
	}
	
	/**
	 * This function retrieves the JSON data sent via the post method. 
	 */
	public static function retrieveData()
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
	
	/**
	 * For closing the connection to the database. 
	 */
	public function closeConnection()
	{
		echo "\nclosing connection\n";
		$this->db->close(); 
		echo "\nconnection closed\n";
	}
	
	/**
	 * Function returns a pointer/reference to the database for binding purposes. 
	 */
	public function getDb() 
	{
		return $this->db;
	}
}
?>