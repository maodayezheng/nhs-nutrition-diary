/**
 * Created by Vikram Bakshi on 03/12/2014.
 * This .js file holds the methods and constructor for the DbEntry object. This object is created when the user adds/deletes/amends an entry to the 
 * database. The object holds all of the relevant information relating to the db entry i.e. whether is is an addition/amendment/delete, whether it concerns food, weight,
 * or symptoms etc. The object is then serialised and sent to the php script through an AJAX request. The php script deserialises it and processes the database 
 * transaction. 
*/

/**
 * This is the constructor for the object. 
 */

function ServerDBAdapter() {}

ServerDBAdapter.prototype.submit = function(dataToServer, action)
{
	console.log("printing the data sent to the submit function");
	dataToServer.action = action; //this is needed for the PHP side. Do Not Delete!
	console.log(dataToServer);
	
	var actionUrl;
	switch(action) 
	{	
		case "register":  	"in case register"; actionUrl = "scripts/database/server/registerTest.php"; 			break;  
		default: 			actionUrl = "scripts/database/server/clientToServerController.php"; break; 
	}
	
	var results;
	$.ajax({
	    url: 			actionUrl,
	    type: 			"POST",
	    dataType: 		"text", //what you will receive in response. 
	    contentType: 	"application/json", //what you are sending.
	    data: 			JSON.stringify(dataToServer),
	    success: 		function (result){
	        				console.log("success " + result); 

	        				if(result != null) {
					        	results = JSON.parse(result); 
					        } else {
					        	results = null;
					        }
	    				},
	    async: 			false, //we want this call to be synchronous
	    error: 			function (xhr, ajaxOptions, thrownError) {
				        console.log(xhr.statusText);
				        console.log(xhr.responseText);
				        console.log(xhr.status);
				        console.log(thrownError);
	    				}
	});
	return results;
};

ServerDBAdapter.prototype.get = function(dataToServer)
{
	 
	console.log("ServerDBAdapter.prototype.get() entered.");
	console.log("Showing the data being sent to the server"); 
	console.log(dataToServer); 
	
	var results; 
	$.ajax({
	    url: 			"scripts/database/server/clientToServerController.php",
	    type: 			"POST",
	    dataType: 		"text", //what you will receive in response. 
	    contentType: 	"application/json", //what you are sending.
	    data: 			JSON.stringify(dataToServer),
	    timeout: 		5000, //timeout the AJAX after 5000 milliseconds. 
	    success: 		function (result){
		        			console.log("success" + result);
		        			if(result != null) {
					        	results = JSON.parse(result); 
					        } else {
					        	results = null;
					        }
	    				},
	    async: 			false, //we want this call to be synchronous 
	    error: 			function (xhr, ajaxOptions, thrownError) {
					        console.log(xhr.statusText);
					        console.log(xhr.responseText);
					        console.log(xhr.status);
					        console.log(thrownError);
	    				}
	});
	return results;
};