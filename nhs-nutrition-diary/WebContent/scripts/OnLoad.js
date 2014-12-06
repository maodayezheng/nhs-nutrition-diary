function OnLoad() {}

OnLoad.prototype.load = function(pageName) {
	switch(pageName) {
		case 'index': {
			this.updateTodaysBalance();
		} break;
		
		case 'history': {
			toggleHistoryVisualisation();
		} break;
		
		case 'weight': {
			this.updateWeight();
		} break;
		
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
}