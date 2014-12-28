/**
 * This .js file's purpose is to contain all functionality and code relating to retrieving data from the database. 
 */

function GetController() {};



GetController.prototype.getUserID = function() 
{
	return Cookies.prototype.getUserID(); 	
}

/**
 * This function formats dates from DD/MM/YYYY to YYYY-MM-DD with the intention that only the 
 * formatted dates will be sent to the server. 
 */
GetController.prototype.formatDate = function(date)
{
	var dateArray = date.split('/'); 
	return dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0];
	 
}

GetController.prototype.getGraphData = function(dateFromFormatted, dateToFormatted)
{
	console.log('in get Graph data'); 
	
	
	//fields are all MANDATORY to be sent to the server
	dataToServer =
	{
		"action": "getGraphData", 
		"userid": this.getUserID(),
		"dateFrom": dateFromFormatted,
		"dateTo": dateToFormatted
	}
	console.log(dataToServer); 
	
	ServerDBAdapter.prototype.get(dataToServer);
}


