function SubmitController() {}

SubmitController.prototype.submit = function(submitter) {
	switch(submitter) {
		case 'btn_submit_signUpDetails': this.submitSignUpDetails(); break;
		case 'btn_submit_foods': this.submitFoods(); break;
		//TODO set button ids
//		case '': this.submitNewFood(); break;
//		case '': this.submitMeal(); break;
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

SubmitController.prototype.updateRequirements = function() {
	var table = "userrequirementsmanifest";
	
	var userId = this.getUserId();
	//TODO set date of now
	var date = "10/10/2014";
	var dateTime = this.formatDateTime(date, null);
	//TODO get gender, weight, activityLevel, additional calories/protein/fluid/activity from database
	var gender = "female";
	var weight = 62.0;
	var activityLevel = 1.1;
	var additionalActivity = 0.0;
	var requirementsCalculator = new RequirementsCalculator();
	var formulaCalories = requirementsCalculator.calcCalories();
	var formulaProtein = requirementsCalculator.calcProtein();
	var formulaFluid = requirementsCalculator.calcFluid();
	var additionalCalories = 0;
	var additionalProtein = 0;
	var additionalFluid = 0;
	var finalCalories = formulaCalories + additionalCalories;
	var finalProtein = formulaProtein + additionalProtein;
	var finalFluid = formulaFluid + additionalFluid;
	
	var dataToServer = {
		"table": table,
		"userid": userId,
		"datetime": dateTime,
		"gender": gender,
		"weight": weight,
		"activitylevel": activityLevel,
		"formulacalories": formulaCalories,
		"formulaprotein": formulaProtein,
		"formulafluid": formulaFluid,
		"additionalcalories": additionalCalories,
		"additionalprotein": additionalProtein,
		"additionalfluid": additionalFluid,
		"additionalactivitylevel": additionalActivity,
		"finalcalories": finalCalories,
		"finalprotein": finalProtein,
		"finalfluid": finalFluid
	}
	
	ServerDBAdapter.prototype.submit(dataToServer, "save");
}

SubmitController.prototype.signUp = function() {
	//TODO submit data
}

SubmitController.prototype.signIn = function() {
	//TODO submit data
}

SubmitController.prototype.submitSignUpDetails = function() {
	var table = "users";
	
	var userId = this.getUserId();
	//TODO set date of now
	var date = "10/10/2014";
	var dateTime = this.formatDateTime(date, null);
	//TODO get priviledge
	var priviledge = "dietician";
	//TODO pw needs to be salted on the server
	var hashedsaltedpw = 0;
	
	var nhsNumber = $('#nhs-number').val();
	//TODO include hospital number to registration form
	var hospitalNumber = 0;
	var weight = $('#weight').val();
	var dateOfBirth = $('#age').val();;
	var activityLevel = $('#activity-level').val();;
	//TODO check which radio button is selected
	var gender = "female";
	
	var dataToServer = {
		"table": table,
		"priviledge": priviledge,
		"hashedsaltedpw": hashedsaltedpw,
		"nhsnumber": nhsNumber,
		"hospitalnumber": hospitalNumber,
		"dateofbirth": dateOfBirth,
		"gender": gender,
		"activitylevel": activityLevel,
		"registrationtimestamp": dateTime
	}
	
	ServerDBAdapter.prototype.submit(dataToServer, "save");
	
	this.updateRequirements();
}

SubmitController.prototype.submitFoods = function() {
	var foodList =[];
	var children = $('.selection-list').children('li');
	children.each(function(index,item){
		var obj = $(item);
		// TODO need to add 'date' , 'foodid' and 'foodTable' before push data to food list array
		foodList.push(obj.data('data'));
	});
	alert(foodList);
	// TODO add date before return nutriontionBreakDown
	var nutritionalBreakdown =  {"calories":"","protein":"","fluid":""};
	nutritionBreakDown["calories"] = $('#calories').text();
	nutritionBreakDown["protein"] = $('#protein').text();
	nutritionBreakDown["fluid"] = $('#fluid').text();
	
	
	
	
	
	
	//TODO submit data
	var table = "userfoodmanifest"; 
	
	var userid = this.getUserId();
	//TODO find actual date
	var date = "22/10/2014";
	var dateTime = this.formatDateTime(date, null);
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
		"table": table,
		"userid": userid,
		"datetime": dateTime,
		"foodtable": foodTable,
		"foodid": foodId,
		"quantity": quantity,
		"calories": calories,
		"protein": protein,
		"fluid": fluid,
		"carbohydrates": carbohydrates,
		"fat": fat,
		"meal": meal
	};
	
	ServerDBAdapter.prototype.submit(dataToServer, "save");
	
	// TODO check whether current meal should be store as customised meal
	
	var warning = $('<div>',{
		"class":"alert alert-success center",
		"role":"alert",
		"text":"update success"
	});
	$('body').append(warning);
	setTimeout(function(){warning.remove()},3000);
	
	// TODO warning is not on the center of page
	//window.location.href = 'home.html';
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
	var dateTime = this.formatDateTime(date, time);
	
	var checkedSymptoms = {};
	var counter = 0;
	$("#symptomList li.active").each(function(idx, li) {
    	checkedSymptoms[counter] = $(li).text();
    	counter++;
	});
	$("#symptomListCustom li.active").each(function(idx, li) {
		checkedSymptoms[counter] = $(li).text();
		counter++;
	});
	
	for(var index = 0; index < counter; index++) {
		var symptom = checkedSymptoms[index];
		//TODO find symptom table and symptom id --> call GET function for DB (needs to be implemented)
		var symptomTable = "testTable";
		var symptomId = 5;
		//TODO find rating
		var rating = 3;
		//TODO find comment
		var comment = "test comment";
		
		var dataToServer = {
				"table": table,
				"userid" : userid,
				"datetime": dateTime,
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
	
	this.updateRequirements();
}

SubmitController.prototype.submitSettings = function() {
	var table = "userrequirementsmanifest";
	
	var userId = this.getUserId();
	//TODO set date of now
	var date = "10/10/2014";
	var dateTime = this.formatDateTime(date, null);
	//TODO get gender, weight, activityLevel from database
	var gender = "female";
	var weight = 62.0;
	var activityLevel = 1.1;
	var additionalActivity = $('#activity').val();
	var requirementsCalculator = new RequirementsCalculator();
	var formulaCalories = requirementsCalculator.calcCalories();
	var formulaProtein = requirementsCalculator.calcProtein();
	var formulaFluid = requirementsCalculator.calcFluid();
	var additionalCalories = $('#cals').val();
	var additionalProtein = $('#protein').val();
	var additionalFluid = $('#fluid').val();
	var finalCalories = formulaCalories + additionalCalories;
	var finalProtein = formulaProtein + additionalProtein;
	var finalFluid = formulaFluid + additionalFluid;
	
	var dataToServer = {
		"table": table,
		"userid": userId,
		"datetime": dateTime,
		"gender": gender,
		"weight": weight,
		"activitylevel": activityLevel,
		"formulacalories": formulaCalories,
		"formulaprotein": formulaProtein,
		"formulafluid": formulaFluid,
		"additionalcalories": additionalCalories,
		"additionalprotein": additionalProtein,
		"additionalfluid": additionalFluid,
		"additionalactivitylevel": additionalActivity,
		"finalcalories": finalCalories,
		"finalprotein": finalProtein,
		"finalfluid": finalFluid
	}
	
	ServerDBAdapter.prototype.submit(dataToServer, "save");
}