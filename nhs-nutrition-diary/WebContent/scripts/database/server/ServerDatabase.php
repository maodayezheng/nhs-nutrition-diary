<?php

class ServerDatabase extends Dbconfig
{
	private $db;
	
	private function __construct()
	{
		echo "in constructor of ServerDatabase";
		parent::__construct(); 
		$this -> db = new mysqli($servername, $username, $password); // Create connection
		if ($this->db->connect_error) { die("Connection failed: " . $conn->connect_error); } // Check connection
		
		
	}
	
	
	
	
	
	/* // Create database
	$sql = "CREATE DATABASE myDB";
	if ($conn->query($sql) === TRUE) {
		echo "Database created successfully";
	} else {
		echo "Error creating database: " . $conn->error;
	} */
	
	$conn->close();
	
	
}

?>