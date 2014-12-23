<?php
/**
 * Register.php is the script called when the user clicks submit in the registration process. It contains the function call
 * to the validation class which checks whether the data passed to the form conforms to certain rules (min/max length, if it is unique etc.). 
 * If it passes the validation it allows the user to register, if not it returns errors relating to why the registration was unsuccessful.  
 * 
 * Created 22nd December 2014
 * @author Vikram Bakshi
 * 
 */
require_once 'init.php';

echo 'in register.php';

var_dump(Token::check(Input::get('token')));


if(Input::exists('post'))
{
	if(Token::check(Input::get('token')))
	{
		echo "I have been run";
		$validate = new Validate();
		$validation = $validate -> check($_POST, array(
				'nhsnumber' => array(
					'required' => true,
					'min' => 5, //min length
					'max' => 15, //max length
					'unique' => 'users'
				),
				'password' => array(
					'required' => true,
					'min' => 6,
				),
				'password_again' => array(
					'required' => true,
					'matches' => 'password'
				),
				'weight' => array(
					'required' => true
				),
				'dob' => array(),
				'activitylevel' => array()
		));
		
		if($validation->passed())
		{
			echo 'passed'; //register user
		} else {
			print_r($validation->getErrors());
			//output errors
		}
	}
	
}


?>