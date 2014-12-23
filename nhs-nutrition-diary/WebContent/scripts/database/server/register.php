<?php
require_once 'init.php';

echo 'in register.php';

if(Input::exists('post'))
{
	$validate = new Validate();
	$validation = $validate -> check($_POST, array(
			'nhsnumber' => array(
				'required' => true,
				'min' => 5,
				'max' => 15,
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
		print_r($validation->_errors);
		//output errors
	}
	
}


?>