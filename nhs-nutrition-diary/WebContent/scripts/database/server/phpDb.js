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

function DbEntry(table)
{
	this.table = table; //the table the dbEntry refers to. 
	var user; //should be equal to the unique ID of the user stored in the localStorage.
}

DbEntry.prototype.submit = function(dataToServer)
{

	console.log("printing the data sent to the submit function");
	console.log(dataToServer);
	
	$.ajax({
	    url: "DbAdapter.php",
	    type: "POST",
	    dataType: "text", //what you will receive in response. 
	    contentType: "application/json", //what you are sending.
	    data: JSON.stringify(dataToServer),
	    success: function (msg){
	        console.log("success " + msg); 
	        //alert('changed');
	    },
	    error: function (xhr, ajaxOptions, thrownError) {
	        console.log(xhr.statusText);
	        console.log(xhr.responseText);
	        console.log(xhr.status);
	        console.log(thrownError);
	    }
	});
};
	
	
//	function()  	
//{
//	console.log('in submit'); 	
//	console.log(this);
//	console.log(JSON.stringify(this));
//	ajaxReq = new XMLHttpRequest();
//
//	ajaxReq.open("POST","database.php",false);
//	ajaxReq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//
//
//	
//	ajaxReq.send(JSON.stringify(this));
//	
//	console.log('after request');
//	
//};
/*
$.ajax(
{
	    url: "localhost",
	    type: "post",
	    //dataType: 'jsonp', //use jsonp data type in order to perform cross-domain ajax 
	    //crossDomain: true, 
	    data: JSON.stringify(this), 
	    success: alert('success'),
	    error: alert('failures')
});*/
	
	
/*
jQuery(document).ready(function( $ ) {
	  
	});
	

});*/


console.log('in phpdb');