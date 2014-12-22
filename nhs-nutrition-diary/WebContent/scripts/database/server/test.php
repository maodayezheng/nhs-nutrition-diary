<?php
require_once 'init.php';

//echo "<br />".DbConfig::get('mysql/host')."<br />"; //127.0.0.1
//echo "<br />".DbConfig::get('mysql/userName')."<br />"; //127.0.0.1
//echo "<br />".DbConfig::get('mysql/passCode')."<br />"; //127.0.0.1
//echo "<br />".DbConfig::get('mysql/db')."<br />"; //127.0.0.1

/* $user = DB::getInstance()->query("SELECT id FROM userweightmanifest WHERE weight = ?", array('99'));
if ($user ->error())
{
	echo "<br />no user";
}
else
{
	echo "<br />ok!";
} */
/* 
$user = DB::getInstance()->get('userweightmanifest', array('weight','=','99'));
if (!$user->count())
{
	echo "<br />no user";
}
else
{
	//echo $user->first()->weight; //example of retrieving just the first result. 
	/* foreach($user->results() as $user)
	{
		echo '<br />'.$user->datetime.'  '.$user->weight, '<br />';
	}
	
	echo "<br />ok!"; 
} */


/*  $user = DB::getInstance()->insert('users',array(
		'id' => '1',
 		'nhsnumber' => '123456',
		'dateofbirth' => '20141222',
		'hashedsaltedpw' => 'hashedsaltedpw'
));  */

$user = DB::getInstance()->update('users',1,array(
		'nhsnumber' => 'newNHSNum123456',
		'dateofbirth' => '20141222',
		'hashedsaltedpw' => 'hashedsaltedpw'
)); 


if($user)
{
	echo "<br /> success";
}

?>
