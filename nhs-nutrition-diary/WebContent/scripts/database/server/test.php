<?php
require_once 'init.php';

echo 'in test.php for the test m8';
if(Input::exists('post'))
{
	$validate = new Validate();
	$validation = $validate -> check($_POST, array(
			'nhsnumber' => array(
				'required' => true
			),
			'weight' => array(),
			'dob' => array(),
			'activitylevel' => array()
	));
}


?>
