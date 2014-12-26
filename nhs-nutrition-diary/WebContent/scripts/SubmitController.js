function SubmitController() {}

SubmitController.prototype.submit = function(submitter) {
	switch(submitter) 
	{
		case 'btn_submit_signUpDetails': 	this.submitSignUpDetails(); break;
		case 'btn_submit_foods': 			this.submitFoods(); break;
		case 'btn_submit_newFood': 			this.submitNewFood(); break;
		//TODO set button id
//		case '': 							this.submitMeal(); break;
		case 'btn_submit_symptoms': 		this.submitSymptoms(); break;
		case 'btn_save_newCustomSymptom': 	this.submitNewCustomSymptom(); break;
		case 'btn_submit_weight': 			this.submitWeight(); break;
		case 'btn_submit_settings': 		this.submitSettings(); break;
	}
}

SubmitController.prototype.getUserId = function() {
	//TODO retrieve user id. Vik: This is stored in a cookie. Will coordinate to get this done with you later. Should be "1" line of code -_- 
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
	var date = new Date();
	var dateTime = this.formatDateTime(date.dateFormat('d/m/Y'), date.dateFormat('H:i'));
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

SubmitController.prototype.signIn = function() {
	//TODO authorise user (verify user name and passcode)
}

SubmitController.prototype.submitSignUpDetails = function() {
	var table = "users";
	
	var userId = this.getUserId();
	var date = new Date();
	var dateTime = this.formatDateTime(date.dateFormat('d/m/Y'), null);
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
	var gender = "";
	if($('#user_basic_sex_male').is(':checked')) {
		gender = "male";
		alert("male");
	} else if($('#user_basic_sex_female').is(':checked')){
		gender = "female";
		alert("female");
	} else {
		alert("error: no gender selected");
	}
	
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
	var table = "userfoodmanifest"; 
	
	var userid = this.getUserId();
	//TODO find actual date from food.html
	var date = "22/10/2014";
	var dateTime = this.formatDateTime(date, null);
	var meal = "";
	
	if($('#checkbox_saveAsMeal').is(':selected')) {
		//TODO meal should be the name of the meal entered by the user
		meal = "";
	}
	
	var foodList =[];
	var counter = 0;
	$('.selection-list li').each(function(idx, li) {
		var food  = $(li).data('data');
		var foodLabel = food['label'];
		var quantity = food['portion'];
		counter++;
		
		//TODO get foodid, cals, prot, fluid, carbs, fat, and check if food is from foodlist or from userfoodlist
		var foodTable = "foodlist";
		var foodId = 0;
		var calories = 0;
		var protein = 0;
		var fluid = 0;
		var carbohydrates = 0;
		var fat = 0;
		
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
	});
	
	if($('#checkbox_saveAsMeal').is(':selected')) {
		//TODO store data in meal table --> call submitMeal
	}
	
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
	var table = "userfoodlist";
	var userid = this.getUserId();
	var date = new Date();
	var dateTime = this.formatDateTime(date.dateFormat('d/m/Y'), date.dateFormat('H:i'));
	
	var foodName = $('#newFoodName').val();
	var comment = $('#newFoodProportion').val();
	var quantityWeight = $('#newFoodWeight').val();
	var calories = $('#newFoodCalories').val();
	var protein = $('#newFoodProtein').val();
	var fluid = $('#newFoodFluid').val();

	var dataToServer = {
			"table": table,
			"userid": userid,
			"datetime": dateTime,
			"foodname": foodName,
			"quantity_g": quantityWeight,
			"quantitycomment": comment,
			"calories": calories,
			"protein": protein,
			"fluid": fluid,
			//TODO fat is currently not implemented on the page
			"fat": 0
	};
	console.log(dataToServer);
	ServerDBAdapter.prototype.submit(dataToServer, "save");
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
	var date = new Date();
	var dateTime = this.formatDateTime(date.dateFormat('d/m/Y'), null);
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