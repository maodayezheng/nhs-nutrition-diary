function OnLoad() {}

OnLoad.prototype.load = function(pageName) {
	switch(pageName) {
		case 'home': this.updateTodaysBalance(); break;
		case 'symptoms': this.updateSymptoms(); break;
		case 'history': toggleHistoryVisualisation(); break;
		case 'weight': this.updateWeight(); break;
		case 'settings': this.updateSettings(); break;
		default: console.log('pageName does not exist.');
	}
}

OnLoad.prototype.updateTodaysBalance = function() {
	var userId = SubmitController.prototype.getUserID();
	var previousRequirementsRequestJSON = {
			"action": "getLast",
			"table": "userrequirementsmanifest",
			"where": "userid,=," + userId
	};
	var previousRequirements = ServerDBAdapter.prototype.get(previousRequirementsRequestJSON);
	var caloriesRequirement = previousRequirements.finalcalories;
	var proteinRequirement = previousRequirements.finalprotein;
	var fluidRequirement = previousRequirements.finalfluid;
	var activityLevel = previousRequirements.activitylevel + previousRequirements.additionalactivitylevel;
	
	//TODO replace hard-coded values with db getters --> summarise for current day
	var caloriesCurrent = 500;
	var proteinCurrent = 14;
	var fluidCurrent = 2740;

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