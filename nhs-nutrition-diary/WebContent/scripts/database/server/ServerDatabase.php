<?php
/**
 * 
 * 
 * 
 * 
 * 
 * OLD SCRIPT WHICH NEEDS TO BE DELETED ONCE THE NEW DB.php FILE IS CONFIRMED TO HAVE ALL OF THE FUNCTIONALITY IN HERE. 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * This class contains the main functionalty needed for the server side database. It imports init.php to have access to the global variables associated
 * with the configurations of the database. The class follows the singleton design pattern so that only one instance of the connection to the database can ever exist. 
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
		$this -> db = new mysqli(Configurations::get('mysql/host'), Configurations::get('mysql/userName'), Configurations::get('mysql/passCode'), Configurations::get('mysql/db')); // Create connection
		if ($this->db->connect_error) { die("Connection failed: " . $this->db); } // Check connection was successful. 
		echo "\n successful connection!! \n";
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
	
	public function query($sql, $params = array())
	{
		$this->_error = false; //needs to be reset to false so that we know we are not returning an error for a previous query.  
		if($this->_query = $this->db->prepare($sql))
		{
		
		}
	}
	
	
	
	
	
	
	
	
	
	
}
?>