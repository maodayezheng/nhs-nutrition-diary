<?php
/**
 * This class' purpose is to abstract away redirection so that instead of using the 
 * PHP header function we can use a more readable and friendly one. 
 * Created: 23rd December 2014
 * @author Vikram Bakshi 
 */
class Redirect
{
	public static function to($location = null)
	{
		if($location)
		{
			if(is_numeric($location))
			{
				switch($location)
				{
					case 404:
						header('HTTP/1.0 404 Not Found');
						include '404.php';
						exit(); 
						break;
				}
				
			}
			header('Location: '.$location);
			exit();  
		}
	}
}

?>