function OnLoad() {}

OnLoad.prototype.load = function(pageName) {
	switch(pageName) {
		case 'home':			this.updateTodaysBalance(); break;
		case 'food':			this.updateFood(); break;
		case 'foodList':		this.updateFoodList(); break;
		case 'userFoodList':	this.updateUserFoodList(); break;
		case 'symptoms':		this.updateSymptoms(); break;
		case 'history':			toggleHistoryVisualisation(); break;
		case 'weight':			this.updateWeight(); break;
		case 'settings':		this.updateSettings(); break;
		default: console.log('pageName does not exist.');
	}
}

OnLoad.prototype.updateTodaysBalance = function() {
	var userId = SubmitController.prototype.getUserID();
	
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
	
	for(var index = 0; index < todaysFoods.length; index++) {
        var entry = todaysFoods[index];
        caloriesCurrent += parseFloat(entry.calories) * parseFloat(entry.quantity);
        proteinCurrent += parseFloat(entry.protein) * parseFloat(entry.quantity);
        fluidCurrent += parseFloat(entry.fluid) * parseFloat(entry.quantity);
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
	var activityLevel = parseFloat(previousRequirements.activitylevel) + parseFloat(previousRequirements.additionalactivitylevel);

	var caloriesProgress = (caloriesCurrent/caloriesRequirement) * 100;
	$('#progressBar_calories').css('width', '' + caloriesProgress + '%');
	$('#progressBar_calories').html('' + caloriesCurrent + '/' + caloriesRequirement + ' kcal');
	
	var proteinProgress = (proteinCurrent/proteinRequirement) * 100;
	$('#progressBar_protein').css('width', '' + proteinProgress + '%');
	$('#progressBar_protein').html('' + proteinCurrent + '/' + proteinRequirement + ' g');
	
	var fluidProgress = (fluidCurrent/fluidRequirement) * 100;
	$('#progressBar_fluid').css('width', '' + fluidProgress + '%');
	$('#progressBar_fluid').html('' + fluidCurrent + '/' + fluidRequirement + ' ml');
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
	var foodList = ServerDBAdapter.prototype.get(foodListRequestJSON);
	
	return foodList;
}

OnLoad.prototype.updateUserFoodList = function() {
	var userId = SubmitController.prototype.getUserID();
	var userFoodListRequestJSON = {
			"action": "get",
			"table": "userfoodlist",
			"where": "userid,=," + userId
	};
	var userFoodList = ServerDBAdapter.prototype.get(userFoodListRequestJSON);
	
	return userFoodList;
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