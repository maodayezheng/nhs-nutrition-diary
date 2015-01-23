/**
 * This file contains all of the relevant functionality for maniupulating data receieved from the database in order
 * to be presented to the end user. 
 */

function UserData() {}

//Calculate the difference of two dates in total days
UserData.prototype.diffBetTwoDates = function(d1, d2) //http://stackoverflow.com/a/17730331
{
  var ndays;
  var tv1 = d1.valueOf();  // msec since 1970
  var tv2 = d2.valueOf();

  ndays = (tv2 - tv1) / 1000 / 86400;
  ndays = Math.round(ndays - 0.5);
  return ndays;
}


UserData.prototype.minTwoDigits = function(n) //http://stackoverflow.com/a/8043056
{
    return n > 9 ? "" + n: "0" + n;
}


/**
 * This method retrieves an array of JSON from the server which contains all of the raw data from four tables for a specified user between
 * a given time period. The raw data is then stored as a property of the object. 
 * @param dateFrom
 * @param dateTo
 */
UserData.prototype.getRawData = function(dateFrom, dateTo) 
{ 
	this.dateFrom			= SubmitController.prototype.formatDateOnly(dateFrom);
	this.dateTo				= SubmitController.prototype.formatDateOnly(dateTo);
	
	//TODO: Deal with getting actual userID. Change to method from Cookies, or something. 
	var req = 
	{
			"action":		"getVisualisationData",
			//"userHash": 	Cookies.prototype.getUserHash(), //Delete userID once testing is finished and have it all done through a hash. 
			"userID":		1, //////////////////////////////////// DELETE THIS, and change to userHash after testing. 
			"dateFrom": 	this.dateFrom,
			"dateTo": 		this.dateTo
	}
	var jsonData = ServerDBAdapter.prototype.get(req);
	
	for(var i=0; i < jsonData.length; i++)
	{
		if(jsonData[i]["userfoodmanifest"]) 			{ this.rawuserfoodmanifest 			= jsonData[i]["userfoodmanifest"]; 			}
		if(jsonData[i]["userweightmanifest"]) 			{ this.rawuserweightmanifest 		= jsonData[i]["userweightmanifest"]; 		}
		if(jsonData[i]["usersymptommanifest"]) 			{ this.rawusersymptommanifest 		= jsonData[i]["usersymptommanifest"]; 		}
		if(jsonData[i]["userrequirementsmanifest"]) 	{ this.rawuserrequirementsmanifest 	= jsonData[i]["userrequirementsmanifest"]; 	}
	}
	
	console.log(jsonData);
	
}

UserData.prototype.wrangleFoodManifestData = function()
{  
	if(this.rawuserfoodmanifest && this.dateFrom && this.dateTo)
	{			
		//Splitting the date string by '-' and creating a date object from the resulting array. The month is indexed by zero so 1 needs to be subtracted from that argument.  
		var sDateSplit 		= this.dateFrom.split('-'); 									//Originally would be in the form '2015-1-18'					 					
		var eDateSplit		= this.dateTo.split('-');
		var startDate 		= new Date(sDateSplit[0], sDateSplit[1] - 1, sDateSplit[2]); 	//Changing the date string to a JS date object so calculations can easily be performed. 
		var endDate 		= new Date(eDateSplit[0], eDateSplit[1] - 1, eDateSplit[2]);
		
		//Finding the number of days between the start and end dates. This will be the length of our outer loop below.
		var noDays 			= UserData.prototype.diffBetTwoDates(startDate, endDate);
		
		//An empty array which will eventually have the summation statistics pushed to it. 
		var summationStats 	= new Array();		 

		for(var i = 0; i < noDays + 1; i++)
		{
			//Clone of startDate. Is needed so that manipulations can be performed whilst keeping a copy of the original intact.
			var startDateClone 	= 	new Date(sDateSplit[0], sDateSplit[1] - 1, sDateSplit[2]);
			startDateClone.setDate(startDateClone.getDate() + i); //Add the current value of i to amend the date of the clone.
			
			//Save the clone's year, month and, day properties. 
			var year			= startDateClone.getUTCFullYear();
			var month			= UserData.prototype.minTwoDigits(startDateClone.getUTCMonth()+1); 	//Months are indexed 0-11. Passed to minTwoDigits to ensure a minimum of two digits. 
			var day				= UserData.prototype.minTwoDigits(startDateClone.getUTCDate()); 	//Passed to minTwoDigits to ensure a minimum of two digits.  
			
			//Create a new object and set its date to the clone's. The calories, fluid, protein properties will be a summation of calories, fluid and protein
			//consumed by that user on that particular date. 
			var object 			= new Object();
			object.date			= ""+year+month+day; 
			object.calories		= 0.0;
			object.fluid		= 0.0;
			object.protein		= 0.0;
			object.weight		= 0.0;
			
			//Start a loop over the raw json data stored in the rawuserfoodmanifest property. When object.date is equal 
			//to the date of the of the object being iterated over we need code to be run. 
			for(var j = 0; j < this.rawuserfoodmanifest.length; j++)
			{ 	
				//Start wrangling the data to a form where we can apply an if condition for the code that needs to be run. 
				var dateTime	= this.rawuserfoodmanifest[j]['datetime'].split(' '); //splitting by ' ' splits the date and time into dateTime[0] and dateTime[1] respectively. 
				var date	 	= dateTime[0].split('-'); //splitting dateTime[0] by '-' creates an array where date[0] is the year, date[1] is the monthand date[2] is the day. 
				var dateString	= ""+date[0]+date[1]+date[2]; //concatenate so that we have a single string to form the if condition with.
				
				//If this condition matches we need to add the values to the current values of the object. 
				if (object.date.valueOf() === dateString.valueOf())
				{
					if(!isNaN(this.rawuserfoodmanifest[j]['energy_kcal'])) 	{ object.calories 	+= parseFloat(this.rawuserfoodmanifest[j]['energy_kcal']); 	}
					if(!isNaN(this.rawuserfoodmanifest[j]['protein_g'])) 	{ object.protein 	+= parseFloat(this.rawuserfoodmanifest[j]['protein_g']);  	}
					if(!isNaN(this.rawuserfoodmanifest[j]['water_g'])) 		{ object.fluid 		+= parseFloat(this.rawuserfoodmanifest[j]['water_g']);	 	}
					
				} else {} //do nothing
			}
			
			for(var k = 0; k < this.rawuserweightmanifest.length; k++)
			{ 	
				//Start wrangling the data to a form where we can apply an if condition for the code that needs to be run. 
				var dateTime	= this.rawuserweightmanifest[k]['datetime'].split(' '); //splitting by ' ' splits the date and time into dateTime[0] and dateTime[1] respectively. 
				var date	 	= dateTime[0].split('-'); //splitting dateTime[0] by '-' creates an array where date[0] is the year, date[1] is the monthand date[2] is the day. 
				var dateString	= ""+date[0]+date[1]+date[2]; //concatenate so that we have a single string to form the if condition with.
				
				//If this condition matches we need to add the values to the current values of the object. 
				if (object.date.valueOf() === dateString.valueOf())
				{
					if(!isNaN(this.rawuserweightmanifest[k]['weight'])) 	{ object.weight = this.rawuserweightmanifest[k]['weight']; }
				} else {} //do nothing
			}
			
			summationStats.push(object); 
		}
		return summationStats;
	}
	else
	{
		throw { 
		    name:      	"Unset Property Error",  
		    message:    "The rawuserweightmanifest/dateFrom/dateTo property has not been set for this object. " +
		    			"Please call getRawData on this object (to set it) before using this method.", 
		    toString:   function(){return this.name + ": " + this.message;} 
		}; 
	}
}


UserData.prototype.generateSummaryData = function()
{

	//Weight Summary
		//Get weight that patient had when registering + date of registration. 
		//Get current date and compare it to registration date. 
		//If the difference if greater than one month, three months, and six months mark certain variables as true and calculate percentage change. 
	//Requirement Summary
		//Get current requirements, and amendments (if any).
		//Add row 'of which added by Dietician': 
	//Symptoms Summary
		//Get most frequent. 
	
	/*
Weight:

	Patient's start weight: 80 kg

	Patient's current weight: 90 kg

	Weight change in 1 month: 3.5 %

	Weight change in 3 months: 15.4 %

	Weight change in 6 months: 7.3 %

	Requirements:

	Current requirements: 2320 kcal, 86 g protein, 1550 ml fluid

	Amendments: -150 kcal, 30 g protein, 200 ml fluid

	Symptoms:

	Most Frequent Symptoms: 1. Vomiting, 2. Loss of appetite, 3. Taste changes
*/
}





























