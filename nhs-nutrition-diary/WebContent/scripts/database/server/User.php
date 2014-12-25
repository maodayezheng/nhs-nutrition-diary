<?php


class User
{
	private $_db, //connection to the db. 
			$_data, //to store the user data. 
			$_sessionName,
			$_cookieName,
			$_isLoggedIn; 
			
	public function __construct($user = null)
	{
		$this->_db = DB::getInstance(); 
		$this->_sessionName = Configurations::get('session/session_name');
		$this->_cookieName = Configurations::get('remember/cookie_name');
		
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
					//process logout
				}
			}
		} else
		{
			echo "<br />in else block of user constructor <br />";
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
	
	//NEED TO CREATE A FIND FOR USERID
	public function find($user = null)
	{
		if($user)
		{
			$field = 'nhsnumber'; //logging in using nhsnumber. 
			$data = $this ->_db->get('users', array($field, '=', $user)); 
			
			if($data -> count())
			{
				$this->_data = $data->first(); 
				return true; 
			}
		}
		return false; 
	}
	
	
	/**
	 * Method logs the user in. You pass the $username, $password, and whether or not the user asked to be remembered ($remember) and then
	 * the method checks if the entered password hash matches the database. If it does the user is logged in. If the user clicked remember me then 
	 * a cookie is stored with a hash which can be checkes against the users_session table in the database to keep the user logged in. 
	 * If no arguments are provided then it is assumed you a cookie is stored with a valid hash and so a session is created.  
	 */
	public function login($username = null, $password = null, $remember=false)
	{
		//print_r($this->_data);
		
		if(!$username && !$password && $this->exists()) //if no username and password provided and the user exists. 
		{
			Session::put($this->_sessionName, $this->data()->nhsnumber);   
		} else
		{
			echo "<br />in login else <br />";
			$user = $this -> find($username);
			echo "user found as: {$user} <br />";
			if ($user)
			{
				if($this->data()->password === Hash::make($password, $this->data()->salt))
				{
					Session::put($this->_sessionName, $this->data()->nhsnumber); //WHAT TO STORE IN THE SESSION
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
						Cookie::put($this->_cookieName, $hash, Configurations::get('remember/cookie_expiry'));
					}
					return true;
				}
			}
		}
		return false; 
	}
	
	public function exists()
	{
		return (!empty($this->_data))? true: false;
	}
	
	public function logout()
	{
		Session::delete($this->_sessionName);
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