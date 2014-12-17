<?php
/**
 * This PHP file contains functions which are required across other scripts. It does not need to be imported into any script which imports init.php as it would already be included.  
 */


/**
 * This is included to increase security of the application and aid against cross site scripting vulnerabilities. 
 */
function escape($string)
{
	return htmlentities($string, ENT_QUOTES, 'UTF-8');
}

?>