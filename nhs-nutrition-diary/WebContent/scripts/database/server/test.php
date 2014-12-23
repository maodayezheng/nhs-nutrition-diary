<?php
require_once 'init.php';

echo 'in test.php for the test m8';

/* if(Session::exists('success'))
{
	echo Session::flash('success');
} */

//$user = DB::getInstance()->query('SELECT * FROM users WHERE nhsnumber = ?', array(
//		'nhsnumber' => 'newNHSNum1'));

$user = DB::getInstance()->insert('users',array('nhsnumber' => '1234567', 'dateofbirth' => '20141222', 'hashedsaltedpw' => 'hashedsaltedpw'));

if($user->error())
{
	echo 'error m8 m8';
}
else {
	echo "did it m8";
}

?>
