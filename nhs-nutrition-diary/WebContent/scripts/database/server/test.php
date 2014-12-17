<?php
require_once 'init.php';

echo DbConfig::get('mysql/serverName'); //127.0.0.1
echo DbConfig::get('mysql/userName'); //127.0.0.1
echo DbConfig::get('mysql/passCode'); //127.0.0.1
echo DbConfig::get('mysql/dbName'); //127.0.0.1

?>
