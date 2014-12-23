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

echo 'in register.php <br />';

//var_dump(Token::check(Input::get('token')));


if(Input::exists('post'))
{
	echo "input exists as post <br />";
	if(Token::check(Input::get('token')))
	{
		echo "I have been run <br />";
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
			$user = new User(); 
			$salt = Hash::salt(32);

			try 
			{
				$user->create(array(
						'nhsnumber' 			=> Input::get('nhsnumber'),
						'hashedsaltedpw' 		=> Hash::make(Input::get('password'),$salt),
						'salt' 					=> $salt,
						'dateofbirth' 			=> Input::get('dob'),
						//'gender' 				=> Input::get('gender'),
						//'weight' 				=> Input::get('weight'),
						//'activitylevel' 		=> Input::get('activitylevel'),
						'registrationtimestamp' => date('Y-m-d H:i:s'),
						'priviledge' 			=> 1
				));
			} catch(Exception $e)
			{
				echo ($e->getMessage());
			}
			
			/* Session::flash('success', 'You registered successfully!'); */
			Redirect::to('404.php');
		} else {
			print_r($validation->getErrors()); //output errors
			
		}
	}
	
}
?>


<!DOCTYPE html>
<html lang="en">
	<head>
    	<meta charset="utf-8">
    	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    	<meta name="viewport" content="width=device-width, initial-scale=1">
    	
    	<link href="../../../lib/bootstrap/bootstrap.min.css" rel="stylesheet">
		<link href="../../../css/standardPage.css" rel="stylesheet">
		
		<script src="../../../lib/jquery/jquery-2.1.1.min.js"></script>
		<script src="../../../lib/bootstrap/bootstrap.min.js"></script>
		
		<script src="../../../scripts/util/Validator.js"></script>
		<script src="../../../scripts/SubmitController.js"></script>
		<script src="../../../scripts/database/server/ServerDBAdapter.js"></script>
		<script src="../../../scripts/RequirementsCalculator.js"></script>
    	
    	<title>Sign Up</title>
	</head>
	<body>
 		<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
  			<div class="container-fluid">
    			<div class="collapse navbar-collapse">
					<h2 class="nav-title">Sign Up</h2>
          		</div>
  			</div>
		</nav>
    	<div class="container">
      		<form class="form-signup" role="form" method="post" action="">
      			<div class="input-group">
      				<div class="input-group-btn"></div>
    			</div>
      			
				<table border="0" width="100%" style="text-align: center;">
				  <tr>
				    <th></th>
				    <th></th>
				  </tr>
				  <tr>
				    <td><label for="nhsnumber">Enter Your NHS Number:</label></td>
				    <td><input class="form-control" name="nhsnumber" id="nhs-number" type="text" placeholder="Enter Your NHS Number" required></td>
				  </tr>
				  <tr>
				    <td><label for="password">Enter Your Password:</label></td>
				    <td><input class="form-control" name="password" id="password" type="text" placeholder="Enter Your Password" required></td>
				  </tr>
				  <tr>
				    <td><label for="password_again">Confirm Your Password:</label></td>
				    <td><input class="form-control" name="password_again" id="password-confirm" type="password" placeholder="Confirm Your Password" required></td>
				  </tr>
				  <tr>
				    <td><label for="weight">Enter Your Weight:</label></td>
				    <td><input class="form-control" name="weight" id="weight" type="number" placeholder="Enter Your Weight" required></td>
				  </tr>
				  <tr>
				    <td><label for="dob">Enter Your Date of Birth:</label></td>
				    <td><input class="form-control" name="dob" id="dob" type="number" placeholder="Enter Your DOB DD MM YYYY" required></td>
				  </tr>
				  <tr>
				    <td><label for="activity_level">Enter Your Activity Level:</label></td>
				    <td><input class="form-control" name="activity_level" id="activity-level" type="text" placeholder="Enter Your Activity Level" required></td>
				  </tr>
				  <tr>
				    <td><label for="gender">Enter Your Gender:</label></td>
				    <td>
		      			<input class="radio_buttons optional" id="user_basic_sex_male" name="gender" type="radio" value="Male"> Male
		      			<input class="radio_buttons optional" id="user_basic_sex_female" name="gender" type="radio" value="Female"> Female</td>
				  </tr>
				</table>
				<input type="hidden" name="token" value="<?php echo Token::generate(); ?>">
        		<button id="btn_submit_signUpDetails" class="btn btn-lg btn-primary btn-block"
        			onclick="SubmitController.prototype.submit(this.id)">Submit</button>
      		</form>
    	</div>
  	</body>
</html>