<?php
/**
 * Validating input for the registration process.
 */

class Input 
{

	/**
	 * This static function retrieves the JSON data sent via the post method. It is needed because the $_POST[] in built php method only works for forms
	 * and this web app is sending data independent of forms. 
	 */
	public static function retrieveData()
	{
		try
		{
			$rest_json = file_get_contents("php://input");
			return $rest_json;
		} catch (Exception $e)
		{
			echo $e->getMessage();
		}
	}

}