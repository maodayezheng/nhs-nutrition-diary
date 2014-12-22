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

class DB
{
	private static $_instance = null; //instance for the singleton. 
	private $_pdo, //instance variables for manipulating the database.
			$_query, 
			$_error=false, 
			$_results, 
			$_count = 0; 
	
	public function __construct()
	{
		echo "\nin constructor of DB\n"; 
		try 
		{
			$this->_pdo = new PDO('mysql:host=' . DbConfig::get('mysql/host') . ';dbname=' . DbConfig::get('mysql/db'), DbConfig::get('mysql/userName'), DbConfig::get('mysql/passCode'));
			echo "<br /> Successfuly Connected \n";
		} catch (PDOExeption $e)
		{
			die($e->getMessage());
		}
	}
	
	/**
	 * This function returns the instance if it exists otherwise it creates one. This acts as the singleton object. 
	 */
	public static function getInstance()
	{
		echo "<br /> in get instance";
		if (!isset(self::$_instance)) { self::$_instance = new DB(); }
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
		$this->_pdo = null; 
		echo "\nconnection closed\n";
	}
	/**
	 * Function returns a pointer/reference to the database for binding purposes. 
	 */
	public function getDB() 
	{
		return $this->_pdo;
	}
	
	
	/**
	 * This function abstracts away the native PDO functionality in order to create a more general database query. You can call this function as such:
	 * (for example) 'DB::getInstance()->query("SELECT id FROM userweightmanifest WHERE weight = ?", array('99'))'. This function allows the developer to chain the value 99 to the '?'. Multiple
	 * values can be included in the array making it extremely flexible.  
	 */
	public function query($sql, $params = array())
	{
		$this->_error = false; //error is reset to false so that we know we are not returning an error for a previous query.  
		if($this->_query = $this->_pdo->prepare($sql))
		{
			$x=1; //variable used for the position in the array. From PDO documentation 'parameters are 1 based'.  
			if(count($params))
			{
				foreach($params as $param)
				{
					$this->_query->bindValue($x, $param); //effectively saying we wish to bind the value @ 1 to the $param defined. i.e. assigning the first value to the first ? in the SQL statement. 
					$x++;
				}
			}
			if($this->_query->execute()) //if the query has executed successfully we want to store the result set.
			{
				$this->_results = $this->_query->fetchAll(PDO::FETCH_OBJ);
				$this->_count = $this->_query->rowCount();
			} else 
			{
				$this->_error=true; 
			}
		}
		return $this; 
	}
	
	public function action($action, $table, $where = array()) //action e.g. SELECT *
	{
		if(count($where)===3) //we need a field, operator and value. 
		{
			$operators = array('=','>','<','>=','<=');
			$field 		= $where[0];
			$operator 	= $where[1];
			$value 		= $where[2];
			
			if (in_array($operator, $operators))
			{
				$sql = "{$action} FROM {$table} WHERE {$field} {$operator} ?";
				if(!$this->query($sql, array($value))->error()) //$value is what you want the ? in the sql to be replaced by. 
				{
					return $this; 
				}
			}
		}
	}
	
	public function get($table, $where)
	{
		return $this->action('SELECT *', $table, $where); //assume that the action is always SELECT * because we want to return all rows. 
	}
	
	public function delete($table, $where)
	{
		return $this->action('DELETE', $table, $where); 
	}
	
	public function count()
	{
		return $this->_count; 
	}
	
	/**
	 * 
	 */
	public function error()
	{
		return $this->_error; 
	}
	
	
	
	
	
	
	
	
}
?>