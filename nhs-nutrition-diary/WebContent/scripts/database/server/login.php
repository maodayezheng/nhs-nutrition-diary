<?php


require_once 'init.php';

echo 'in login.php <br />';

//echo 'the session name '.Session::get(Configurations::get('session/session_name'));
if(Input::exists('post'))
{
	echo "<br />input exists login.php <br />";
	
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
	
		$remember = (Input::get('remember') === 'remember') ? true:false; 
		echo '<br />remember: '.$remember.'<br />';
		echo "<br />Get nhs number: ".Input::get('nhsnumber');
		$login = $user -> login(Input::get('nhsnumber'), Input::get('password'), $remember);
		
		if ($login)
		{
			echo "<br />You have logged in successfully! You will be redirected in 5 seconds. <br/>
					If you are not redirected please ".'<a href="../../../home.html">'. 'click here'.'</a>';
			header( "refresh:5;url=../../../home.html");
		}
		else 
		{
			'Log In Failed. Please check your username/nhsnumber and password.';
		}
	} else 
	{
		foreach($validation -> getErrors() as $error)
		{
			echo $error,'<br />'; 
		}
	}
	
	
}


?>