function SubmitController() {}

SubmitController.prototype.submit = function(submitter) {
	
	switch(submitter) {
		case 'btn_submit_symptoms': this.submitSymptoms(); break;
		case 'btn_save_newCustomSymptom': this.submitNewCustomSymptom(); break;
		case 'btn_submit_weight': this.submitWeight(); break;
		case 'btn_submit_settings': this.submitSettings(); break;
	}
}

SubmitController.prototype.getUserId = function() {
	//TODO retrieve user id
	return 1;
}

SubmitController.prototype.formatDateTime = function(date, time) {
	var dateTime = "";
	var validator = new Validator();
	var dateParts = validator.dateSplit(date);
	dateTime = dateTime + dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
	
	if(time != null) {
		dateTime = dateTime + " " + time + ":00"; 
	} else {
		dateTime += " 00:00:00";
	}
	
	return dateTime;
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
	var date = $('#datetime').val();
	var datetime = this.formatDateTime(date, null);
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
	var table = "usersymptommanifest"; 
	
	var userid = this.getUserId();
	var date = $('#symptomDate').val();
	var time = $('#symptomTime').val();
	var datetime = this.formatDateTime(date, time);
	
	var checkedItems = {};
	var counter = 0;
	$("#symptomList li.active").each(function(idx, li) {
    	checkedItems[counter] = $(li).text();
    	counter++;
	});
	$("#symptomListCustom li.active").each(function(idx, li) {
		checkedItems[counter] = $(li).text();
		counter++;
	});
	
	for(var index = 0; index < counter; index++) {
		//TODO find symptom table
		var symptomTable = "testTable";
		//TODO find symptom id
		var symptomId = 5;
		var symptom = checkedItems[index];
		//TODO find rating
		var rating = 3;
		//TODO find comment
		var comment = "test comment";
		
		var dataToServer = {
				"table": table,
				"userid" : userid,
				"datetime": datetime,
				"symptomtable": symptomTable,
				"symptomid": symptomId,
				"symptom": symptom,
				"rating": rating,
				"comment": comment
		};
		
		ServerDBAdapter.prototype.submit(dataToServer, "save");		
	}
}

SubmitController.prototype.submitNewCustomSymptom = function() {
	table = "usersymptomlist";
	userid = this.getUserId();
	var date = $('#symptomDate').val();
	var time = $('#symptomTime').val();
	var datetime = this.formatDateTime(date, time);
	
	var symptom = $("#newSymptom").val();
	//TODO find symptom description
	var symptomDescription = "testDescription";
	
	var dataToServer = {
			"table": table,
			"userid" : userid,
			"datetime": datetime,
			"symptom": symptom,
			"symptomdescription": symptomDescription,
	};
	
	ServerDBAdapter.prototype.submit(dataToServer, "save");	
}

SubmitController.prototype.submitWeight = function() {
	var table = "userweightmanifest"; 
	
	var userid = this.getUserId();
	var date = $('#datetime').val();
	var datetime = this.formatDateTime(date, null);
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