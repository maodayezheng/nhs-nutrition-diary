function OnLoad() {}

OnLoad.prototype.load = function(pageName) {
	switch(pageName) {
		case 'home':			this.updateTodaysBalance(); break;
		case 'food':			this.updateFood(); break;
		case 'foodList':		return this.updateFoodList(); break;
		case 'userFoodList':	return this.updateUserFoodList(); break;
		case 'symptoms':		this.updateSymptoms(); break;
		case 'history':			toggleHistoryVisualisation(); break;
		case 'weight':			this.updateWeight(); break;
		case 'settings':		this.updateSettings(); break;
		default: console.log('pageName does not exist.');
	}
}

OnLoad.prototype.updateTodaysBalance = function() {
	var userId = SubmitController.prototype.getUserID();
	console.log("in update");
	var date = new Date();
	var dateFormatted = SubmitController.prototype.formatDateOnly(date.dateFormat('d/m/Y'));
	
	var todaysFoodsRequestJSON = {
			"action": "get",
			"table": "userfoodmanifest",
			"where": "userid,=," + userId + ",datetime,>=," + dateFormatted + " 00:00:00," + "datetime,<=," + dateFormatted + " 23:59:59"
	};
	var todaysFoods = ServerDBAdapter.prototype.get(todaysFoodsRequestJSON);
	
	var caloriesCurrent = 0;
	var proteinCurrent = 0;
	var fluidCurrent = 0;
	
	if(todaysFoods != null) {
		for(var index = 0; index < todaysFoods.length; index++) {
	        var entry = todaysFoods[index];
	        caloriesCurrent += parseFloat(entry.calories) * parseFloat(entry.quantity);
	        proteinCurrent += parseFloat(entry.protein) * parseFloat(entry.quantity);
	        fluidCurrent += parseFloat(entry.fluid) * parseFloat(entry.quantity);
	    }
		
		caloriesCurrent = Math.round(caloriesCurrent);
		proteinCurrent = Math.round(proteinCurrent);
		fluidCurrent = Math.round(fluidCurrent);
	}
	
	var previousRequirementsRequestJSON = {
			"action": "getLast",
			"table": "userrequirementsmanifest",
			"where": "userid,=," + userId
	};
	var previousRequirements = ServerDBAdapter.prototype.get(previousRequirementsRequestJSON);
	var caloriesRequirement = parseFloat(previousRequirements.finalcalories);
	var proteinRequirement = parseFloat(previousRequirements.finalprotein);
	var fluidRequirement = parseFloat(previousRequirements.finalfluid);
	
	var caloriesPercentage = caloriesCurrent/caloriesRequirement;
	var proteinPercentage = proteinCurrent/proteinRequirement;
	var fluidPercentage = fluidCurrent/fluidRequirement;
	
	var caloriesProgress = (caloriesPercentage) * 100;
	$('#progressBar_calories').css('width', '' + caloriesProgress + '%');
	$('#progressBar_calories').html('' + caloriesCurrent + ' / ' + caloriesRequirement + ' kcal');
	
	var proteinProgress = (proteinPercentage) * 100;
	$('#progressBar_protein').css('width', '' + proteinProgress + '%');
	$('#progressBar_protein').html('' + proteinCurrent + ' / ' + proteinRequirement + ' g');
	
	var fluidProgress = (fluidPercentage) * 100;
	$('#progressBar_fluid').css('width', '' + fluidProgress + '%');
	$('#progressBar_fluid').html('' + fluidCurrent + ' / ' + fluidRequirement + ' ml');
}

OnLoad.prototype.updateFood = function() {
	var date = new Date();
	$('#Date').val(date.dateFormat('d/m/Y'));
	$('#Time').val(date.dateFormat('H:i'));
}

OnLoad.prototype.updateFoodList = function() {
	var foodListRequestJSON = {
			"action": "get",
			"table": "foodlist",
			"where": "id,=," + 0
	};
	
	return ServerDBAdapter.prototype.get(foodListRequestJSON);
}

OnLoad.prototype.updateUserFoodList = function() {
	var userId = SubmitController.prototype.getUserID();
	var userFoodListRequestJSON = {
			"action": "get",
			"table": "userfoodlist",
			"where": "userid,=," + userId
	};
	
	return ServerDBAdapter.prototype.get(userFoodListRequestJSON);
}

OnLoad.prototype.frequentFoods = function() {
	var userId = SubmitController.prototype.getUserID();
	
	//TODO might have to be amended along with the functions for returning the 10 most frequent foods
	var frequentFoodsRequestJSON = {
			"action": "getTenMostFrequent",
			"table": "userfoodmanifest",
			"where": "userid,=," + userId,
			"number": 10
	};
	var frequentFoods = ServerDBAdapter.prototype.get(frequentFoodsRequestJSON);
	
	return frequentFoods;
}
OnLoad.prototype.customMeal = function(){
	var userId = SubmitController.prototype.getUserID();
	var mealsRequestJSON = {
			"action": "get",
			"table": "usermeallist",
			"where": "userid,=," + userId,
			
	};
	
	var dataFromServer = ServerDBAdapter.prototype.get(mealsRequestJSON);

	//Data received from the server is in the form of an array of JSON objects. Each item in the meal is contained as a separate object. 
	//However, items in the same meal all have the same 'mealname' property. This code segment iterates over the data received from the server
	//and pushes unique meals to an array. This unique array is what is displayed to the user. insert code to push only unique elements to array to display.
	var data = new Array(); 
	if(dataFromServer != null) {
		for(var i = 0; i < dataFromServer.length; i++)
		{
			console.log(data.length);
			//If the length of the array received from the server is not 0, and the length of the array we are pushing unique meals to is zero then push the element. 
			if( (data.length === 0) && (dataFromServer.length != 0)) 				{ data.push(dataFromServer[i]) } 
			//Otherwise loop over the unique array, checking that the current element in the array received from the server does not already exist in it. 
			else
			{
				var isIn = false; 
				for(var j = 0; j <data.length; j++)
				{
					if(dataFromServer[i]['mealname'] === data[j]['mealname']) { isIn = true; }
				}
				
				if(!isIn) { data.push(dataFromServer[i]) }
			}
			
		}
	}
	return data;
}
OnLoad.prototype.mealComponents = function(mealName){
	var userId = SubmitController.prototype.getUserID();
	
	var mealComponentsRequestJSON = {
			"action": "get",
			"table": "usermeallist",
			"where": "userid,=," + userId + ",mealname,=," + mealName
	};
	
	return ServerDBAdapter.prototype.get(mealComponentsRequestJSON);	
}

OnLoad.prototype.updateSymptoms = function() {
	var date = new Date();
	$('#symptomDate').val(date.dateFormat('d/m/Y'));
	$('#symptomTime').val(date.dateFormat('H:i'));
}

OnLoad.prototype.updateWeight = function() {
	var userId = SubmitController.prototype.getUserID();
	var weightRequestJSON = {
			"action": "getLast",
			"table": "userweightmanifest",
			"where": "userid,=," + userId
	};
	var weight = ServerDBAdapter.prototype.get(weightRequestJSON).weight;

	var date = new Date();
	$('#datetime').val(date.dateFormat('d/m/Y'));
	$('#currentWeight').html('' + weight + ' kg');
	$('#newWeight').val(weight);
}

OnLoad.prototype.updateSettings = function() {
	var userId = SubmitController.prototype.getUserID();
	var previousRequirementsRequestJSON = {
			"action": "getLast",
			"table": "userrequirementsmanifest",
			"where": "userid,=," + userId
	};
	var previousRequirements = ServerDBAdapter.prototype.get(previousRequirementsRequestJSON);
	var caloriesRequirement = previousRequirements.formulacalories;
	var proteinRequirement = previousRequirements.formulaprotein;
	var fluidRequirement = previousRequirements.formulafluid;
	var activityLevel = previousRequirements.activitylevel;
	
	$('#currentCals').html(caloriesRequirement);
	$('#currentProtein').html(proteinRequirement);
	$('#currentFluid').html(fluidRequirement);
	$('#currentActivity').html(activityLevel);
	
	$('#cals').val(previousRequirements.additionalcalories);
	$('#protein').val(previousRequirements.additionalprotein);
	$('#fluid').val(previousRequirements.additionalfluid);
	$('#activity').val(previousRequirements.additionalactivitylevel);
}