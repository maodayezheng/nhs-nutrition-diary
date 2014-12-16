/**
 * Created by Vikram Bakshi on 03/12/2014.
 * This .js file holds the methods and constructor for the DbEntry object. This object is created when the user adds/deletes/amends an entry to the 
 * database. The object holds all of the relevant information relating to the db entry i.e. whether is is an addition/amendment/delete, whether it concerns food, weight,
 * or symptoms etc. The object is then serialised and sent to the php script through an AJAX request. The php script deserialises it and processes the database 
 * transaction. 
*/

/**
 * This is the constructor for the object with the only required parameter being the table the database entry is concerned with. 
 * Other properties of the object are added on the relevant page. 
 */

function ServerDBAdapter() {}

ServerDBAdapter.prototype.submit = function(dataToServer, action)
{
	console.log("printing the data sent to the submit function");
	console.log(dataToServer);
	
	var actionUrl;
	switch(action) {
		case "save": actionUrl = "saveEntry.php";
		case "edit": actionUrl = "editEntry.php";
		case "delete": actionUrl = "deleteEntry.php";
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