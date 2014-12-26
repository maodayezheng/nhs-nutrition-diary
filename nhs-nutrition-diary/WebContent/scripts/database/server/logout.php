<?php

/**
 * This simple script is intended to log the user out. The user's details will be grabbed from session/cookie when creating the new User() object.
 */

require_once 'init.php';

$user = new User();
$user->logout(); 

Redirect::to('index.html');

?>