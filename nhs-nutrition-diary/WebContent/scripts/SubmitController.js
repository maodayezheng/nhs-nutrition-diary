function SubmitController() {}

SubmitController.prototype.submit = function(submitter) {
	
	switch(submitter) {
		case 'btn_submit_symptoms': this.submitSymptoms(); break;
		case 'btn_submit_weight': this.submitWeight(); break;
		case 'btn_submit_settings': this.submitSettings(); break;
	}
}

SubmitController.prototype.getUserId = function() {
	//TODO retrieve user id
	return 1;
}

SubmitController.prototype.signUp = function() {
	//TODO submit data
}

SubmitController.prototype.submitSignUpDetails = function() {
	//TODO submit data
}

SubmitController.prototype.signIn = function() {
	//TODO submit data
}

SubmitController.prototype.submitFoods = function() {
	//TODO submit data
	var table = "userfoodmanifest"; 
	
	var userid = this.getUserId();
	var datetime = $('#datetime').val();
	var foodTable;
	var foodId;
	var quantity;
	var calories;
	var protein;
	var fluid;
	var carbohydrates;
	var fat;
	var meal;
	
	var dataToServer = {
		"table": table
		//TODO create JSON for submitting to PHP file
	};
	
	ServerDBAdapter.prototype.submit(dataToServer, "save");
}

SubmitController.prototype.submitNewFood = function() {
	//TODO submit data
}

SubmitController.prototype.submitMeal = function() {
	//TODO submit data
}

SubmitController.prototype.submitSymptoms = function() {
	//TODO submit data
}

SubmitController.prototype.submitNewCustomSymptom = function() {
	//TODO submit data
}

SubmitController.prototype.submitWeight = function() {
	var table = "userweightmanifest"; 
	
	var userid = this.getUserId();
	var datetime = $('#datetime').val();
	var weight = $('#newWeight').val();
	
	var dataToServer = {
		"table": table,
		"userid" : userid,
		"datetime": datetime,
		"weight": weight
	};
	
	ServerDBAdapter.prototype.submit(dataToServer, "save");
}

SubmitController.prototype.submitSettings = function() {
	var table = "userrequirementsmanifest";
	
	var amendedCalories = $('#cals').val();
	var amendedProtein = $('#protein').val();
	var amendedFluid = $('#fluid').val();
	var amendedActivity = $('#activity').val();
	
	var dataToServer = {
		"table": table
		//TODO create JSON for submitting to PHP file
	}
	
	ServerDBAdapter.prototype.submit(dataToServer, "save");
}