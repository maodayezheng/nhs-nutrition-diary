<?php


require_once 'init.php';

echo 'in login.php <br />';


if(Input::exists('post'))
{
	echo "input exists login.php";
	
	$validate = new Validate();
	$validation = $validate->check($_POST,array(
		'nhsnumber' => array(
					'required' => true,
					'min' => 5, //min length
					'max' => 15 //max length
				),
		'password'  => array('required' => true)
	));
	
	if($validation->passed())
	{
		$user = new User(); 
		$login = $user -> login(Input::get('nhsnumber'), Input::get('password'));
		
		if ($login)
		{
			echo 'Successfully logged in';
		}
		else 
		{
			'Log In Failed';
		}
		//log user in
	} else 
	{
		foreach($validation -> getErrors() as $error)
		{
			echo $error,'<br />'; 
		}
	}
	
	
}


?>