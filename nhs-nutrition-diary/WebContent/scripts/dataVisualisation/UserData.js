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
UserData.prototype.getRawData = function(dateFrom, dateTo) 
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

UserData.prototype.wrangleFoodManifestData = function()
{
	console.log("in wrapgle");
	if(this.rawuserfoodmanifest)
	{
		
	}
	else
	{
		throw { 
		    name:        "Unset Property Error",  
		    message:     "The rawuserweightmanifest property has not been set for this object. Please call getRawData on this object (to set it) before using this method.", 
		    toString:    function(){return this.name + ": " + this.message;} 
		}; 

	}
}




var historyExample = 
	[
		{
			"Date": new Date(2014, 0, 15, 0, 0, 0, 0), "timestamp":"20140115", "calories":345, "protein":20, "fluid":100, "weight":80
		},
		{ 
			"Date": new Date(2014, 0, 16, 0, 0, 0, 0), "timestamp":"20140116", "calories":500, "protein":30, "fluid":250, "weight":75
		},
		{
			"Date": new Date(2014, 0, 17, 0, 0, 0, 0), "timestamp":"20140117", "calories":127, "protein":13, "fluid":400, "weight":78
		},
		{
			"Date": new Date(2014, 0, 18, 0, 0, 0, 0), "timestamp":"20140118", "calories":470, "protein":66, "fluid":480, "weight":72
		},
		{
			"Date": new Date(2014, 0, 25, 0, 0, 0, 0), "timestamp":"20140125", "calories":500, "protein":35, "fluid":300, "weight":68
		}  
	];








