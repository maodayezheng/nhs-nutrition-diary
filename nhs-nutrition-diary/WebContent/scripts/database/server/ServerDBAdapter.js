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
	switch(action) {
		/*case "save": actionUrl = "scripts/database/server/saveEntry.php"; break;
		case "edit": actionUrl = "scripts/database/server/editEntry.php"; break;
		case "delete": actionUrl = "scripts/database/server/deleteEntry.php"; break;
		case "test": actionUrl = "test.php"; break; */
		default: actionUrl = "scripts/database/server/clientToServerController.php" //one script to handle all cases. 
	}
	
	$.ajax({
	    url: actionUrl,
	    type: "POST",
	    dataType: "text", //what you will receive in response. 
	    contentType: "application/json", //what you are sending.
	    data: JSON.stringify(dataToServer),
	    success: function (msg){
	        console.log("success " + msg); 
	    },
	    error: function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.statusText);
	        console.log(xhr.responseText);
	        console.log(xhr.status);
	        console.log(thrownError);
	    }
	});
};

ServerDBAdapter.prototype.get = function(dataToServer)
{
	//the dataToServer object should contain the properties table, dateFrom and dateTo. 
	console.log("ServerDBAdapter.prototype.get() entered.");
	
	var requestResult;
	
	$.ajax({
	    url: "scripts/database/server/clientToServerController.php",
	    type: "POST",
	    dataType: "text", //what you will receive in response. 
	    contentType: "application/json", //what you are sending.
	    data: JSON.stringify(dataToServer),
	    success: function (result){
	        console.log("success");
	        requestResult = result.substring(2,result.length);
	        console.log(requestResult);
	    },
	    error: function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.statusText);
	        console.log(xhr.responseText);
	        console.log(xhr.status);
	        console.log(thrownError);
	    }
	});
	
	return requestResult;
};