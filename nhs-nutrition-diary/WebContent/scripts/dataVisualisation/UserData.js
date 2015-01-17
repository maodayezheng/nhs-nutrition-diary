/**
 * This file contains all of the relevant functionality for maniupulating data receieved from the database in order
 * to be presented to the end user. 
 */

function UserData() {}

/**
 * This method retrieves an array of JSON from the server which contains all of the raw data from four tables for a specified user between
 * a given time period. The raw data is then stored as a property of the object. 
 * @param dateFrom
 * @param dateTo
 */
UserData.prototype.getVisualisationDataJSON = function(dateFrom, dateTo) 
{ 
	var dateFromFormatted = SubmitController.prototype.formatDateOnly(dateFrom);
	var dateToFormatted = SubmitController.prototype.formatDateOnly(dateTo);
	var req = 
	{
			"action":		"getVisualisationData",
			//"userHash": 	Cookies.prototype.getUserHash(), //Delete userID once testing is finished and have it all done through a hash. 
			"userID":		7,
			"dateFrom": 	dateFromFormatted,
			"dateTo": 		dateToFormatted
	}
	var jsonData = ServerDBAdapter.prototype.get(req);
	
	for(var i=0; i < jsonData.length; i++)
	{
		if(jsonData[i]["userfoodmanifest"]) 			{ this.rawuserfoodmanifest = jsonData[i]["userfoodmanifest"]; 					}
		if(jsonData[i]["userweightmanifest"]) 			{ this.rawuserweightmanifest = jsonData[i]["userweightmanifest"]; 				}
		if(jsonData[i]["usersymptommanifest"]) 			{ this.rawusersymptommanifest = jsonData[i]["usersymptommanifest"]; 			}
		if(jsonData[i]["userrequirementsmanifest"]) 	{ this.rawuserrequirementsmanifest = jsonData[i]["userrequirementsmanifest"]; 	}
	}
	console.log(this); /////////////////////////////////////// DELETE AFTER TESTING 
}

//UserData.prototype.getVisualisationDataJSON













