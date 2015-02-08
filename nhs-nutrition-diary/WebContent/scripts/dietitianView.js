/**
 * 
 */


$(document).ready(function()
{
	$( "#progressbar" ).progressbar({
	      value: false
	 });
		
	//Dynamically loading the users in the directory div after the page is loaded. 
	
	var userRequest = {
			"action": "getUsers",
			"table": "users" 
	};
	
	var userResult = ServerDBAdapter.prototype.get(userRequest);
	var numOfUsers = userResult.length;
	//Add to the top of the division - there are 'X' registered users. 
	
	for(var i = 0, j = userResult.length; i < j; i++)
	{
		
	}
	
	//When clicking search button on dietitian view:
	$('#directory_search_button').on('click',(function (e)
	{
		alert("Clcicke search");	
		//Code for searching and displaying results in division. 
	}));	
});
