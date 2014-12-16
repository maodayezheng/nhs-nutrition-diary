function SubmitController() {}

SubmitController.prototype.submit = function(submitter) {
	
	switch(submitter) {
		case 'btn_submit_symptoms': this.submitSymptoms(); break;
		case 'btn_submit_weight': this.submitWeight(); break;
	}
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
	var table = "weightmanifest"; 
	
	//TODO retrieve user id
	var userid = 1;
	var datetime = $('#datetime').val();
	var weight = $('#weight').val();
	
	var data = JSON.stringify(Array(userid, datetime, weight));
	var dataToServer = Array(data, table);
	ServerDBAdapter.prototype.submit(dataToServer, "save");
}

SubmitController.prototype.submitSettings = function() {
	//TODO submit data
}