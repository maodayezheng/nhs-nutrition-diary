<?php
/**
 * REGISTER TEST. IF USERNAME ALREADY TAKEN NEEDS TO BE VALIDATED. 
 * 
 * Created 22nd December 2014
 * @author Vikram Bakshi
 * */


require_once 'init.php';

if($data = Input::retrieveData()) 
{
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
	
	if($validation->passed()) //An empty array was passed as the conditions for validation so this will always be true (unless code commented above is amended). 
	{
		switch($dataDecoded['group'])
		{
			case 1: registerPatient($dataDecoded); 		break;
			case 2: registerDietician($dataDecoded); 	break; 
		}
	} else
	{
		print_r($validation->getErrors()); //output errors
	}
}

function registerPatient($dataDecoded)
{
	$user = new User();
	$salt = Hash::salt(32);

	try
	{
		
		//Create the user in the database
		$user->create(array(
				'nhsnumber' 			=> $dataDecoded['nhsnumber'],
				'password' 				=> Hash::make($dataDecoded['password'],$salt),
				'salt' 					=> $salt,
				'dateofbirth' 			=> $dataDecoded['dob'],
				'gender' 				=> $dataDecoded['gender'],
				'activitylevel' 		=> $dataDecoded['activitylevel'],
				'registrationtimestamp' => date('Y-m-d H:i:s'),
				'group' 				=> $dataDecoded['group']
		));
		
		//If the creation of the user is successful (i.e. an exception is not thrown), retrieve the auto incremented userID.
		$userID = DB::getInstance()->get('users', array('nhsnumber','=',$dataDecoded['nhsnumber']))->first()->id;

		//Insert the weight the user entered when registering into the weight manifest table.
		DB::getInstance()->insert('userweightmanifest',array(
		'userid'				=> $userID,
		'datetime' 				=> date('Y-m-d H:i:s'),
		'weight'				=> $dataDecoded['weight']
		));

		//Now that a user has been created, log them in.
		$login = $user -> login($dataDecoded['nhsnumber'], $dataDecoded['password'], true);
	} catch(Exception $e)
	{
		echo ($e->getMessage());
	}

	echo "You have registered successfully! You will be redirected in 5 seconds. <br/>
				If you are not redirected please ".'<a href="../../../home.html">'. 'click here'.'</a>';
	header( "refresh:5;url=../../../home.html");


}

function registerDietician($dataDecoded)
{
	$user = new User();
	$salt = Hash::salt(32);
	
	try
	{
		//Create the user in the database
		$user->create(array(
				'nhsnumber' 			=> $dataDecoded['nhsnumber'],
				'password' 				=> Hash::make($dataDecoded['password'],$salt),
				'salt' 					=> $salt,
				'registrationtimestamp' => date('Y-m-d H:i:s'),
				'group' 				=> $dataDecoded['group']
		));
	
		//Now that a user has been created, log them in.
		$login = $user -> login($dataDecoded['nhsnumber'], $dataDecoded['password'], true);
	} catch(Exception $e)
	{
		echo ($e->getMessage());
	}
	
	echo "You have registered successfully! You will be redirected in 5 seconds. <br/>
				If you are not redirected please ".'<a href="../../../home.html">'. 'click here'.'</a>';
	header( "refresh:5;url=../../../home.html");
}

?>