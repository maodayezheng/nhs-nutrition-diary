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
// 			echo "<br /> Successfuly Connected To the DB <br />";
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
// 		echo "\nclosing connection\n";
		$this->_pdo = null; 
// 		echo "\nconnection closed\n";
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
	 * This method utilises the query method (also in this class) to abstract away actions (e.g. get, delete) etc. It is intended to be called by a given action method (such as GET or DELETE or UPDATE). It tries to prevent
	 * potential SQL injections by specifying a list of allowed operators.  
	 */
	public function action($action, $table, $where = array()) //$action e.g. SELECT *
	{
		if(sizeof($where)%3==0) // The correct number of entries in the $where array should be divisible by 3 otherwise an exception will be thrown. 
		{
			$operators  = array('=','>','<','>=','<='); //allowed operators in the SQL query which will be sent to the database. 
			$value 		= array(); 
			
			for($i = 0; $i<sizeof($where)/3; $i++) 
			{
				
				
				$field 			= $where[$i*3];
				$operator 		= $where[($i*3)+1];
				
				//The following code changes an example string of 'Chicken and mushroom pieCOMMA single crustCOMMA homemade' to 'Chicken and mushroom pie, single crust, homemade'. 
				//Data is transferred like this so that unneccessary commas being passed into the method's arguments are avoided.  
				$amendedWhere 	= str_replace("COMMA",",",$where[($i*3)+2]); 
				array_push($value, $amendedWhere);
				
				if (in_array($operator, $operators)) //only add to the SQL sent to the database if the operator is in the allowed list.
				{
					if($i==0)
					{
						$sql = "{$action} FROM {$table} WHERE {$field} {$operator} ?";
					} else 
					{
						$sql .= " AND {$field} {$operator} ?";
					}
				}
			}
			
			if(!$this->query($sql, $value)->error()) 
			{
				return $this;
			} 
		} else
		{
			throw new Exception('Your associative array length (argument $where) must have a length divisible by 3.');
		}
	}
	
	/**
	 * This method is passed an associative array which must have three properties - userID, dateFrom, and dateTo. If these properties are not set 
	 * an exception is thrown. It queries the database tables defined in the $tables array in the method - adding the results for each query to the $queryResults array.
	 * Once all tables have been queried and the data stored in the array it returns that array.  
	 * @param $dataDecoded This is an associative array decoded from JSON received from the client. See clientToServerController.php
	 */
	public function getUserData($dataDecoded) 
	{
		$queryResults = array(); //array the data will be pushed to. 
		
		if((isset($dataDecoded['userID']) && isset($dataDecoded['dateFrom']) && isset($dataDecoded['dateTo']) ) )
		{
			$dateFrom 	= $dataDecoded['dateFrom']; 
			$userID		= $dataDecoded['userID'];
			
			/* Users are expecting to see data which is inclusive of their defined interval. For example, consider that the user defined dateTo was '2015-1-18' and 
			 * the user had eaten a food at '2015-01-18 21:17:00'. This would not be returned in a query using <= dateTo because of the time element. For this reason, 
			 * we add 1 day on to the dateTo property passed in to this method so it effectively becomes '2015-01-19 00:00:00' and use this date in the query.  */ 
			$dateTo 	= $dataDecoded['dateTo'];	
			$dateToMod 	= (new DateTime($dateTo))->modify('+1 day')->format('Y-m-d'); 
			
			//these are the tables we are retrieving the user's data from.
			$tables   	= array('userfoodmanifest', 'userweightmanifest','usersymptommanifest','userrequirementsmanifest');  
			
			for($i=0; $i<sizeof($tables); $i++)
			{
				array_push($queryResults, array($tables[$i] => $this->get($tables[$i],array('userid','=',$userID,'datetime','>=',$dateFrom,'datetime','<=',$dateToMod))->results()));
			}
			
			return $queryResults; 
		} else 
		{
			throw new Exception('Class DB method getUserData has not been passed a valid associative array. Please check that the array has the keys "userID", "dateFrom", and "dateTo"');
		}
	}
	
	/**
	 * Utilises the action method to carry out a GET action. 
	 */
	public function get($table, $where)
	{ 
		return $this->action('SELECT *', $table, $where); //assume that the action is always SELECT * because we want to return all rows. 
	}
	
	
	/**
	 * Utilises the action method to carry out a DELETE action.
	 */
	public function delete($table, $where)
	{
		return $this->action('DELETE', $table, $where); 
	}
	
	/**
	 * Inserts a record into a given table. Uses the backtick character '`' to increase security by preventing SQL injections. The backtick character 
	 * is valid for MySQL only. Other DBMS do not allow it.  
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
 				//echo "<br />Inserting into the database was a success!";
				return true;
			} else 
			{ 
// 				echo "<br />there was an error in the insert method<br />";
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
	 * Return the first result of a query only. Intended to be chained on to 
	 * a query e.g. DB::getInstance()->get('users_session', array('hash','=',$hash))->first(). 
	 */
	public function first()
	{
		return $this->results()[0];
	}
	
	/**
	 * Return the last result of a query only. 
	 */
	public function last($table, $where)
	{
		$this->get($table, $where);
		$size = sizeof($this->results());
		if($size != 0) 
		{
			return $this->results()[$size - 1];			
		} else 
		{
			return null;
		}
	}
	
	/**
	 * Return the ten most frequent entries of a table.
	 */
	//TODO implement function to return the ten most frequent foods a given table
	public function tenMostFrequent($table, $where = array(), $number) {
		if(sizeof($where)%3==0) { // The correct number of entries in the $where array should be divisible by 3 otherwise an exception will be thrown.
			$operators  = array('=','>','<','>=','<='); //allowed operators in the SQL query which will be sent to the database.
			$value 		= array();
		
			for($i = 0; $i<sizeof($where)/3; $i++) {
				$field 		= $where[$i*3];
				$operator 	= $where[($i*3)+1];
				array_push($value, $where[($i*3)+2]);
						
				if (in_array($operator, $operators)) { //only add to the SQL sent to the database if the operator is in the allowed list.
					if($i==0) {
						$sql = "SELECT label, COUNT(label) AS counter " + "FROM {$table} WHERE {$field} {$operator} ?";
					} else {
						$sql .= " AND {$field} {$operator} ?";
					}
				}
			}
			
			$sql .= " GROUP BY label ORDER BY counter DESC";
			
			if(!$this->query($sql, $value)->error()) {
				return $this;
			}
		} else {
			throw new Exception('Your associative array length (argument $where) must have a length divisible by 3.');
		}
		
		return $this->results();
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