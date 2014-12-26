<?php
/**
 * This PHP file contains functions which may be required across other scripts.
 * 
 * Created 17th December 2014
 * @author Vikram Bakshi
 */

/**
 * This is included to theoretically make cross site scripting vulnerabilities harder. 
 * Intended usage is to santitise data before displaying in a html page (this could be data received from the database or something else).   
 */
function escape($string)
{
	return htmlentities($string, ENT_QUOTES, 'UTF-8');
}

?>