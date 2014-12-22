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

$user = DB::getInstance()->get('userweightmanifest', array('weight','=','99'));
if (!$user->count())
{
	echo "<br />no user";
}
else
{
	echo "<br />ok!";
}

?>
