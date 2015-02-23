function Navigator() {}

Navigator.prototype.navigate = function(origin) {
	var nextPage = null;
	console.log("signUp");
	switch(origin)
	{		 
		case "btn_signin_to_home": nextPage = 'nhs-nutrition-diary/WebContent/home.html'; break;
		case "btn_signup_to_details": nextPage = 'nhs-nutrition-diary/WebContent/signUpDetails.html'; break;
		case "btn_signUpDetails_to_home": nextPage = 'nhs-nutrition-diary/WebContent/home.html'; break;
		case "btn_home_to_food": nextPage = 'nhs-nutrition-diary/WebContent/food.html'; break;
		case "btn_home_to_symptoms": nextPage = 'nhs-nutrition-diary/WebContent/symptoms.html'; break;
		case "btn_home_to_history": nextPage = 'nhs-nutrition-diary/WebContent/history.html'; break
		case "btn_home_to_weight": nextPage = 'nhs-nutrition-diary/WebContent/weight.html'; break;
		case "listEl_home_to_settings": nextPage = 'nhs-nutrition-diary/WebContent/settings.html'; break;
		case "btn_symptoms_to_symptomNotInList": nextPage = 'nhs-nutrition-diary/WebContent/symptomNotInList.html'; break;
		default: console.log('Hyperlink unknown.');
	}
	
	window.location.href = nextPage;
}
Navigator.prototype.setting = function(){
	
	window.location.href = "nhs-nutrition-diary/WebContent/settingsPassword.html";
	
}

Navigator.prototype.back = function(){
	console.log("clicked back button");
	window.history.back();
	
}