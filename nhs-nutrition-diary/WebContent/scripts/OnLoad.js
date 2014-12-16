function OnLoad() {}

OnLoad.prototype.load = function(pageName) {
	switch(pageName) {
		case 'home': this.updateTodaysBalance(); break;
		case 'history': toggleHistoryVisualisation(); break;
		case 'weight': this.updateWeight(); break;
		case 'settings': this.updateSettings(); break;
		default: console.log('pageName does not exist.');
	}
}

OnLoad.prototype.updateTodaysBalance = function() {
	//TODO replace hard-coded values with db getters
	var caloriesCurrent = 500;
	var caloriesRequirement = 2000;
	var proteinCurrent = 14;
	var proteinRequirement = 45;
	var fluidCurrent = 2740;
	var fluidRequirement = 3150;

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

OnLoad.prototype.updateWeight = function() {
	//TODO replace hard-coded value with db getter
	var weight = 100;
	$('#currentWeight').html('' + weight + ' kg');
	$('#newWeight').val(weight);
}

OnLoad.prototype.updateSettings = function() {
	//TODO replace hard-coded value with db getter
	var caloriesRequirement = 2000;
	var proteinRequirement = 45;
	var fluidRequirement = 3150;
	var activityLevel = 1;
	
	$('#currentCals').html(caloriesRequirement);
	$('#currentProtein').html(proteinRequirement);
	$('#currentFluid').html(fluidRequirement);
	$('#currentActivity').html(activityLevel);
	
	//TODO amendments need to be queried from the DB
}