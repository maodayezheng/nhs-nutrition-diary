function Navigator() {}

Navigator.prototype.navigate = function(origin) {
	var nextPage = null;
	
	switch(origin)
	{
		case "btn_home_to_food": nextPage = 'food.html'; break;
		case "btn_home_to_symptoms": nextPage = 'symptoms.html'; break;
		case "btn_home_to_history": nextPage = 'history.html'; break
		case "btn_home_to_weight": nextPage = 'weight.html'; break;
		case "listEl_home_to_settings": nextPage = 'settings.html'; break;
		case "btn_symptoms_to_symptomNotInList": nextPage = 'symptomNotInList.html'; break;
		default: console.log('hyperlink not in switch statement');
	}
	
	window.location.href = nextPage;
}