<?php
/**
 * This class contains the main functionalty needed for the server side database. The class follows the singleton design pattern so that only one instance of 
 * the connection to the database can ever exist. To return a connection to the database the user should use call the static method 'ServerDatabase::getInstance();'. 
 * To close the connection the user should call closeConnection() on the instance object. The database uses PDO (PHP Data Objects) to connect a MySQL database. 
 * Created: 16th December 2014. 
 * @author Vikram Bakshi
 */

class DB
{
	private static $_instance = null; //instance for the singleton. 
	private $_pdo, //instance variables for manipulating the database.
			$_query, 
			$_error=false, 
			$_results, 
			$_count = 0; 
	
	/**
	 * The constructor is only run if an instance does not already exist. 
	 */
	public function __construct()
	{
		try 
		{
			$this->_pdo = new PDO('mysql:host=' . Configurations::get('mysql/host') . ';dbname=' . Configurations::get('mysql/db'), Configurations::get('mysql/userName'), Configurations::get('mysql/passCode'));
			echo "<br /> Successfuly Connected To the DB <br />";
		} catch (PDOExeption $e)
		{
			die($e->getMessage());
		}
	}
	
	/**
	 * This static function creates an instance of the class if it does not exist. Otherwise it returns the pre-existing instance - thus following the singleton pattern.  
	 */
	public static function getInstance()
	{
		//echo "<br /> in get instance";
		if (!isset(self::$_instance)) { self::$_instance = new DB(); }
		return self::$_instance; 
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
	 * This method abstracts away the native PDO functionality in order to create a more general database query. It takes two inputs, $sql, and $params.
	 * The method is intended to receive sql ($sql) containing '?' marks (e.g. SELECT id FROM userweightmanifest WHERE weight = ?). The method then binds
	 * the values from the $params array to the question mark. Multiple question  marks and values can be used in the $sql and $params variables. The result
	 * of the query is stored in the instance variable _results and the number of results is stored in the instance variable _count. If there is an error, 
	 * _error is set to true. 
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
	
	/**
	 * This method utilises the query method to abstract away actions (e.g. get, delete) etc. It is intended to be called by a given action method (such as GET or DELETE)
	 * and is used to aid preventing SQL injections. For example 'DB::getInstance()->get('userweightmanifest', array('weight','=','99')' would call this method with $action 
	 * defined as GET. The operators allowed are defined in the $operators array. 
	 */
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
	
	/**
	 * Utilises the action method to carry out a GET action. 
	 */
	public function get($table, $where)
	{
		return $this->action('SELECT *', $table, $where); //assume that the action is always SELECT * because we want to return all rows. 
	}
	
	//TODO Write function so that it returns data between two date intervals. 
	public function getInterval()
	{
		
	}
	
	/**
	 * Utilises the action method to carry out a DELETE action.
	 */
	public function delete($table, $where)
	{
		return $this->action('DELETE', $table, $where); 
	}
	
	/**
	 * Inserts a record into a given table. Uses the backtick character '`' to increase security by preventing SQL injections. 
	 * Usage example: DB::getInstance()->insert('users',array('nhsnumber' => '123456', 'dateofbirth' => '20141222', 'group' => '1'));
	 * 
	 */
	public function insert($table, $fields = array())
	{
		if(count($fields)) //if data is actually in the fields array
		{
			$keys = array_keys($fields);
			$values = ''; //variable that will keep track of the '?' marks in the query.
			$x = 1; //count. PDO documentation states position starts with 1. 
			
			//building up the $values variable for the query. 
			foreach($fields as $field)
			{
				$values .= '?';
				if($x < count($fields)) //are we at the end of the fields we have defined? If not, we want to add a comma.
				{
					$values .= ', ';
				}	
				$x++;
			}
			
			$sql = "INSERT INTO {$table} (`" . implode('`,`',$keys) . "`) VALUES({$values})"; 
			
			if(!$this->query($sql,$fields)->error())
			{
				echo "<br />no error inserting into database";
				return true;
			}
			else { //delete else bit
				echo "<br />there was an error in the insert method<br />";
			}
		}
	}
	
	/**
	 * This method updates a pre existing record in the database. It needs to be provided with the id of the record in the table in which it is updating.  
	 * Example usage: DB::getInstance()->update('users',1,array('nhsnumber' => 'newNHSNum', 'dateofbirth' => 'newDOB', 'hashedsaltedpw' => 'newhashedsaltedpw')); 
	 */
	public function update($table, $id, $fields)
	{
		$set = ''; //field to update for the given id. 
		$x = 1; //count. As before, PDO documentation states position starts with 1 NOT 0. 
		
		//building up the $set variable for the SQL query. 
		foreach($fields as $name => $value)
		{
			$set .= "{$name} = ?"; //using ? marks to prevent SQL injections. 
			if($x < count($fields))
			{
				$set .= ', ';
			}
			$x++;
		}
		$sql = "UPDATE {$table} SET {$set} WHERE id = {$id}";
		
		if(!$this->query($sql, $fields)->error())
		{
			return true;
		}
		
		return false; 
	}
	
	/**
	 * Returns the results instance variable. 
	 */
	public function results()
	{
		return $this->_results; 
	}
	
	/**
	 * Return the first result only. 
	 */
	public function first()
	{
		return $this->results()[0];
	}
	
	/**
	 * Returns the count of the results i.e. num of rows returned in the query instance variable. 
	 */
	public function count()
	{
		return $this->_count; 
	}
	
	/**
	 * Returns true if there is an error ($this->_error is set in other methods)
	 */
	public function error()
	{
		return $this->_error; 
	}
}
?>