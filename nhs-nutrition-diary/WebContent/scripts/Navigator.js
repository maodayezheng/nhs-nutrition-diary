function Navigator() {}

Navigator.prototype.navigate = function(origin) {
	var nextPage = null;
	
	if(origin == "btn_home_to_food")
		nextPage = 'food.html';
	else if(origin == "btn_home_to_symptoms")
		nextPage = 'symptoms.html';
	else if(origin == "btn_home_to_history")
		nextPage = 'history.html';
	else if(origin == "btn_home_to_weight")
		nextPage = 'weight.html';
	else if (origin == "listEl_home_to_settings")
		nextPage = 'settings.html';
		
	else if(origin == "btn_symptoms_to_symptomNotInList")
		nextPage = 'symptomNotInList.html';
	
	window.location.href = nextPage;
}