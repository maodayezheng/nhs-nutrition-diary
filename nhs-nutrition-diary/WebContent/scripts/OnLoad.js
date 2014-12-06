function OnLoad() {}

OnLoad.prototype.load = function(pageName) {
	switch(pageName) {
		case 'index': {
			var caloriesCurrent = 500;
			var caloriesRequirement = 2000;
			var proteinCurrent = 14;
			var proteinRequirement = 45;
			var fluidCurrent = 2740;
			var fluidRequirement = 3150;

			//TODO update calories current
			//TODO update protein current
			//TODO update fluid current
			//TODO update calories requirement
			//TODO update protein requirement
			//TODO update fluid requirement
			
			
			//TODO update progress bar calories
			var caloriesProgress = (caloriesCurrent/caloriesRequirement) * 100;
			$('#progressBar_calories').css('width', '' + caloriesProgress + '%');
			$('#progressBar_calories').html('' + caloriesCurrent + '/' + caloriesRequirement + ' kcal');
			//TODO update progress bar protein
			var proteinProgress = (proteinCurrent/proteinRequirement) * 100;
			$('#progressBar_protein').css('width', '' + proteinProgress + '%');
			$('#progressBar_protein').html('' + proteinCurrent + '/' + proteinRequirement + ' g');
			//TODO update progress bar fluid
			var fluidProgress = (fluidCurrent/fluidRequirement) * 100;
			$('#progressBar_fluid').css('width', '' + fluidProgress + '%');
			$('#progressBar_fluid').html('' + fluidCurrent + '/' + fluidRequirement + ' ml');
		} break;
		
		case 'history': {
			toggleHistoryVisualisation();
		} break;
		
		case 'weight': {
			//TODO update current weight
		} break;
		
		default: console.log('pageName does not exist.');
	}
}