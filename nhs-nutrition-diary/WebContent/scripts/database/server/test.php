<?php
require_once 'init.php';

echo '<br />in test.php for the test m8<br />';

/* if(Session::exists('success'))
{
	echo Session::flash('success');
} */

//$user = DB::getInstance()->query('SELECT * FROM users WHERE nhsnumber = ?', array(
//		'nhsnumber' => 'newNHSNum1'));
/* 
$user = DB::getInstance()->insert('users',array('nhsnumber' => '1234567', 'dateofbirth' => '20141222', 'hashedsaltedpw' => 'hashedsaltedpw'));

if($user->error())
{
	echo 'error m8 m8';
}
else {
	echo "did it m8";
} */

$user = new User();

if($user->isLoggedIn())
{
	echo "<br />The user ". $user->data()->nhsnumber." is logged in <br />"; 
} else 
{
	echo "<br />No user is logged in<br />";
}

if($user->hasPermission('admin'))
{
	echo '<p> You are an admin </p>';
}
 if($user->hasPermission('user'))
{
	echo '<p> You are a standard user. </p>';
} 
if($user->hasPermission('moderator'))
{
	echo '<p> You are a moderator. </p>';
}


?>

