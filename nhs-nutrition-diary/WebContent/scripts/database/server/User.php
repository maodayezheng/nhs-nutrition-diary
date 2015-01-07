<?php
//TODO CONTINUE DOCUMENTATION FROM HERE
/**
 * 
 * Created 22nd December 2014
 * @author Vikram Bakshi
 *
 */

class User
{
	private $_db, //connection to the db. 
			$_data, //to store the user data. 
			$_sessionName,
			$_cookieName,
			$_cookieName2,
			$_isLoggedIn; 
	
	/**
	 * When an object of this class in instantiated the instance variables are set so that:
	 * - There is a connection to the singleton DB ($_db). 
	 * - The session name is retrieved from the global config array stored in init.php ($_sessionName).
	 * - The two cookie names are also retreived and stored in $_cookieName and $_cookieName2 - one cookie stores 
	 * 	 the user's ID (which is just a number i.e. purposefully non-identifiable) and the other cookie stores a hash which allows the user to stay logged in
	 *   (if they clicked the remember me button when logging in). 
	 */
	public function __construct($user = null)
	{
		$this->_db = DB::getInstance(); 
		$this->_sessionName = Configurations::get('session/session_name');
		$this->_cookieName = Configurations::get('remember/cookie_name'); //name for cookie storing the hash.
		$this->_cookieName2 = Configurations::get('remember/cookie_name2'); //name for cookie storing user ID. 
		
		//echo "<br /> In the constructor of User var user is: {$user}";
		
		if(!$user)
		{
			if(Session::exists($this->_sessionName))
			{
				$user = Session::get($this->_sessionName);
				if($this->find($user))
				{
					$this->_isLoggedIn = true; 
				} else
				{
					//TODO process logout
					//process logout
				}
			}
		} else
		{
			$this->find($user);
		}
	}
	
	public function create($fields = array())
	{
		if(!$this->_db->insert('users', $fields))
		{
			echo var_dump($fields); //For DEBUGGING
			throw new Exception('There was a problem creating an account.');
		}
	}
	
	public function find($user = null)
	{
		if($user)
		{
			$field = 'nhsnumber'; //logging in using nhsnumber. 
			$data = $this ->_db->get('users', array($field, '=', $user)); 
			
			if($data -> count()) //if searching on nhsnumber returned results then take that result and return true
			{
				$this->_data = $data->first();
				return true;
			} else //if it did not return results, search by id
			{
				$fieldId = 'id'; 
				$data2 = $this ->_db->get('users', array($fieldId, '=', $user));
				if($data2 -> count()) //if searching on id returned results then take that result and return true
				{
					$this->_data = $data->first();
					return true;
				}
			}
		}
		return false; 
	}
	
	
	/**
	 * 
	 * //TODO REWRITE METHOD DESCRIPTION
	 * 
	 * This method logs the user in or returns a session if they are already logged in. If no arguments are passed it is assumed the user is logged in already (i.e. their cookie stores a valid hash).
	 * Otherwise you pass the $username, $password, and whether or not the user asked to be remembered ($remember). If the $username and hashed $password match that which is stored in the database
	 * the user is logged in. If the user has clicked 'remember me' then a cookie is also stored with a hash in order to keep the user logged in.   
	 */
	public function login($username = null, $password = null, $remember=false)
	{
		if(!$username && !$password && $this->exists()) //if no username and password provided and the user exists. 
		{
			Session::put($this->_sessionName, $this->data()->id);   
		} else
		{
			$user = $this -> find($username);	
			if ($user)
			{
				if($this->data()->password === Hash::make($password, $this->data()->salt))
				{
					Session::put($this->_sessionName, $this->data()->id); 
					if($remember)
					{
						$hash = Hash::unique();
						$hashCheck = $this->_db->get('users_session', array('user_id', '=',$this->data()->id)); //check if hash is already stored in the database.
			
						if(!$hashCheck->count()) //if the count returns 0
						{
							$this->_db->insert('users_session',array(
									'user_id' 	=> $this->data()->id,
									'hash' 		=> $hash
							));
						} else
						{
							$hash = $hashCheck -> first()->hash;
						}
						Cookie::put($this->_cookieName, $hash, Configurations::get('remember/cookie_expiry')); //store the hash in a cookie
						Cookie::put($this->_cookieName2,$this->data()->id , Configurations::get('remember/cookie_expiry')); //store the userID in a cookie 
					}
					return true;
				}
			}
		}
		return false; 
	}
	
	public function hasPermission($key)
	{
		$group  = $this->_db->get('groups', array('id','=',$this->data()->group));
		//print_r($group);
		
		if($group->count())
		{
			$permissions = json_decode($group->first()->permissions, true); 
			
			if($permissions[$key]==true)
			{
				return true;
			}
			return false;
			print_r($permissions); 
		}
	}
	
	
	public function exists()
	{
		return (!empty($this->_data))? true: false;
	}
	
	/**
	 * This method logs the user out. It first deletes the user from the users_session table in the database and then
	 * deletes the session. Finally it deletes the cookie. 
	 */
	public function logout()
	{
		$this->_db->delete('users_session',array('user_id','=',$this->data()->id)); 
		Session::delete($this->_sessionName);
		Cookie::delete($this->_cookieName);
		Cookie::delete($this->_cookieName2);
	}
	
	
	public function data()
	{
		return $this->_data;
	}
	
	public function isLoggedIn()
	{
		return $this->_isLoggedIn;
	}
	
}


?>