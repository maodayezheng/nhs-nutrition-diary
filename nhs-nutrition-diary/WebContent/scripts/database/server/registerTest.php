<?php
/**
 * REGISTER TEST
 * 
 * Created 22nd December 2014
 * @author Vikram Bakshi
 * */
 
require_once 'init.php';

echo "in registerTest script";

if($data = Input::retrieveData()) 
{
	echo "data is here";
	$dataDecoded = json_decode($data, true); //decode the json data with the true flag so that the object is converted into an associative array.   
	
	/*
	 * A team decision was made to enforce all validation of user entry for registration at the client's side. 
	 * This was after I had written the functionality for validation on the server side. As such, below
	 * I have commented out the code that would have enforced validation at this stage on the server. I am including it 
	 * for demonstration purposes and hope that if it is needed in the future, the example code becomes useful. 
	 */
	$validate 	= new Validate();
	$validation = $validate -> check($dataDecoded, array()); //passing an empty array so that there are no conditions which need to be passed. 
	 
	 /*
	  * Code is commented out as it was decided validation would be done client side. 
	  * It is included for functionality demonstration purposes.  
		  
		  $validation = $validate -> check($dataDecoded, array(  //The array as the second parameter should contain the relevant conditions for each key in $dataDecoded
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
				'confirmpassword' => array(
						'required' => true,
						'matches' => 'password'
				),
				'weight' => array(
						'required' => true
				),
				'dob' => array(),
				'activitylevel' => array()
		));
	*/
	
	
	if($validation->passed()) //An empty array was passed as the conditions for validation so this will always be true (unless code is amended). 
	{
		echo 'passed'; //register user
		/* $user = new User();
		$salt = Hash::salt(32);
	
		try
		{
			$user->create(array(
					'nhsnumber' 			=> Input::get('nhsnumber'),
					'password' 				=> Hash::make(Input::get('password'),$salt),
					'salt' 					=> $salt,
					'dateofbirth' 			=> Input::get('dob'),
					//TODO fetch gender from registration form
					'gender' 				=> "male",//Input::get('gender'),
	
					'activitylevel' 		=> Input::get('activity_level'),
					'registrationtimestamp' => date('Y-m-d H:i:s'),
					'group' 				=> 1
			));
				
			$userID = DB::getInstance()->get('users', array('nhsnumber','=',Input::get('nhsnumber')))->first()->id;
				
			DB::getInstance()->insert('userweightmanifest',array(
			'userid'				=> $userID,
			'datetime' 				=> date('Y-m-d H:i:s'),
			'weight'				=> Input::get('weight')
			));
				
			$login = $user -> login(Input::get('nhsnumber'), Input::get('password'), true);
		} catch(Exception $e)
		{
			echo ($e->getMessage());
		}
	
		echo "You have registered successfully! You will be redirected in 5 seconds. <br/>
				If you are not redirected please ".'<a href="../../../home.html">'. 'click here'.'</a>';
		header( "refresh:5;url=../../../home.html");
		//Redirect::to('../../../home.html'); */
	} else
	{
		print_r($validation->getErrors()); //output errors
	}
}
?>