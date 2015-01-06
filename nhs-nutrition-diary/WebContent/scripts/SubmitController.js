function SubmitController() {}

SubmitController.prototype.submit = function(submitter) {
	switch(submitter) {
		case 'btn_submit_signUpDetails': this.submitSignUpDetails(); break;
		case 'btn_submit_foods': this.submitFoods(); break;
		case 'btn_submit_newFood': this.submitNewFood(); break;
		//TODO set button id
//		case '': this.submitMeal(); break;
		case 'btn_submit_symptoms': this.submitSymptoms(); break;
		case 'btn_save_newCustomSymptom': this.submitNewCustomSymptom(); break;
		case 'btn_submit_weight': this.submitWeight(); break;
		case 'btn_submit_settings': this.submitSettings(); break;
	}
}

SubmitController.prototype.getUserID = function() {
	//return Cookies.prototype.getUserID(); 	
	//TODO retrieve user id
	return 1;
}

SubmitController.prototype.formatDateOnly = function(date) {
	var dateFormatted = "";
	var validator = new Validator();
	var dateParts = validator.dateSplit(date);
	dateFormatted = dateFormatted + dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
	
	return dateFormatted;
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
	
	var userId = this.getUserID();
	var date = new Date();
	var dateTime = this.formatDateTime(date.dateFormat('d/m/Y'), date.dateFormat('H:i'));
	
	var weightRequestJSON = {
			"action": "getLast",
			"table": "userweightmanifest",
			"where": "userid,=," + userId
	};
	var weight = ServerDBAdapter.prototype.get(weightRequestJSON).weight;
	
	
/////////////////START OF TESTING BLOCK
	//TODO get age, gender and activityLevel from database --> ONLY TABLE 'USERS' HAS PROBLEMS RETURNING ENTRIES
	///needs to be commented out once data can be retrieved from table 'users'
	console.log("in update requirements"); 
	var userInfoRequestJSON = {
			"action": "getUserProfile",
			"table": "users",
			"where": "id,=," + userId
	};
	var userInfoResponseJSON = ServerDBAdapter.prototype.get(userInfoRequestJSON);
	console.log("Showing the userInfoResponseJSON"); 
	console.log(userInfoResponseJSON); 
	
	var gender = userInfoResponseJSON.gender;
	var dateOfBirth = userInfoResponseJSON.dateofbirth;
	var activityLevel = userInfoResponseJSON.activitylevel;
	
	
/////////END OF BLOCK WHICH IS BEING TESTED
	
		
	var gender = "female";
	var age = 45;
	var activityLevel = 1.1;
	
	var previousRequirementsRequestJSON = {
			"action": "getLast",
			"table": "userrequirementsmanifest",
			"where": "userid,=," + userId
	};
	var previousRequirements = ServerDBAdapter.prototype.get(previousRequirementsRequestJSON);
	var additionalActivity = 0;
	var additionalCalories = 0;
	var additionalProtein = 0;
	var additionalFluid = 0;
	if(previousRequirements != null) {
		additionalActivity = parseFloat(previousRequirements.additionalactivitylevel);
		additionalCalories = parseFloat(previousRequirements.additionalcalories);
		additionalProtein = parseFloat(previousRequirements.additionalprotein);
		additionalFluid = parseFloat(previousRequirements.additionalfluid);
	}
	var finalActivityLevel = parseFloat(activityLevel) + parseFloat(additionalActivity);
	var requirementsCalculator = new RequirementsCalculator();
	var formulaCalories = requirementsCalculator.calcCalories(gender, weight, age, finalActivityLevel);
	var formulaProtein = requirementsCalculator.calcProtein(weight, age, finalActivityLevel);
	var formulaFluid = requirementsCalculator.calcFluid(weight, age, finalActivityLevel);
	var finalCalories = parseFloat(formulaCalories) + parseFloat(additionalCalories);
	var finalProtein = parseFloat(formulaProtein) + parseFloat(additionalProtein);
	var finalFluid = parseFloat(formulaFluid) + parseFloat(additionalFluid);
	
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
	};
	
	ServerDBAdapter.prototype.submit(dataToServer, "save");
}

SubmitController.prototype.signIn = function() {
	//TODO authorise user (verify user name and passcode)
}

SubmitController.prototype.submitSignUpDetails = function() {
	var table = "users";
	
	var userId = this.getUserID();
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
	
	var userid = this.getUserID();
	var date = $('#Date').val();
	var time = $('#Time').val();
	var dateTime = this.formatDateTime(date, time);
	var meal = "";	
	var foodList =[];
	var counter = 0;
	$('.selection-list li').each(function(idx, li) {
		var food  = $(li).data('data');
		var foodLabel = food['label'];
		var quantity = food['portion'];
		counter++;
		
		var foodTable = "";
		var foodId = 0;
		var calories = 0;
		var protein = 0;
		var fluid = 0;
		var carbohydrates = 0;
		var fat = 0;
		
		var foodDetailsRequestJSON = {
				"action": "get",
				"table": "foodlist",
				"where": "label,=," + foodLabel
		};
		var foodDetails = ServerDBAdapter.prototype.get(foodDetailsRequestJSON)[0];
		
		if(foodDetails != null) {
			foodTable = "foodlist";
			
			foodId = foodDetails.foodcode;
			calories = foodDetails.energy_kcal;
			protein = foodDetails.protein_g;
			fluid = foodDetails.water_g;
			carbohydrates = foodDetails.carbohydrate_g;
			fat = foodDetails.fat_g;
		} else {
			var userFoodDetailsRequestJSON = {
					"action": "get",
					"table": "userfoodlist",
					"where": "label,=," + foodLabel
			};
			var userFoodDetails = ServerDBAdapter.prototype.get(userFoodDetailsRequestJSON)[0];
			foodTable = "userfoodlist";
			foodId = userFoodDetails.id;
			calories = userFoodDetails.calories;
			protein = userFoodDetails.protein;
			fluid = userFoodDetails.fluid;
			fat = userFoodDetails.fat;
		}
		
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
	var userid = this.getUserID();
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
			"fat": 0
	};
	console.log(dataToServer);
	ServerDBAdapter.prototype.submit(dataToServer, "save");
}

SubmitController.prototype.submitMeal = function(data) {
	var userid = this.getUserID();
	var date = new Date();
	var dateTime = this.formatDateTime(date.dateFormat('d/m/Y'), date.dateFormat('H:i'));
	
	console.log(data.mealname);
	console.log(data.mealtotalcalories);
	console.log(data.mealtotalprotein);
	console.log(data.mealtotalfluid);
	
	
}

SubmitController.prototype.submitSymptoms = function() {
	var table = "usersymptommanifest";
	
	var userid = this.getUserID();
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
	userid = this.getUserID();
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
	
	var userid = this.getUserID();
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
	
	var userId = this.getUserID();
	var date = new Date();
	var dateTime = this.formatDateTime(date.dateFormat('d/m/Y'), null);
	
	var weightRequestJSON = {
			"action": "getLast",
			"table": "userweightmanifest",
			"where": "userid,=," + userId
	};
	var weight = ServerDBAdapter.prototype.get(weightRequestJSON).weight;
	
	//TODO get age, gender and activityLevel from database --> ONLY TABLE 'USERS' HAS PROBLEMS RETURNING ENTRIES
	/* needs to be commented out once data can be retrieved from table 'users'
	var userInfoRequestJSON = {
			"action": "get",
			"table": "users",
			"where": "id,=," + userId
	};
	var userInfoResponseJSON = ServerDBAdapter.prototype.get(userInfoRequestJSON);
	var gender = userInfoResponseJSON.gender;
	var dateOfBirth = userInfoResponseJSON.dateofbirth;
	var activityLevel = userInfoResponseJSON.activitylevel;
	*/
	var gender = "female";
	var age = 45;
	var activityLevel = 1.1;
	
	var additionalActivity = $('#activity').val();
	var finalActivityLevel = parseFloat(activityLevel) + parseFloat(additionalActivity);
	var requirementsCalculator = new RequirementsCalculator();
	var formulaCalories = requirementsCalculator.calcCalories(gender, weight, age, finalActivityLevel);
	var formulaProtein = requirementsCalculator.calcProtein(weight, age, finalActivityLevel);
	var formulaFluid = requirementsCalculator.calcFluid(weight, age, finalActivityLevel);
	var additionalCalories = $('#cals').val();
	var additionalProtein = $('#protein').val();
	var additionalFluid = $('#fluid').val();
	var finalCalories = parseFloat(formulaCalories) + parseFloat(additionalCalories);
	var finalProtein = parseFloat(formulaProtein) + parseFloat(additionalProtein);
	var finalFluid = parseFloat(formulaFluid) + parseFloat(additionalFluid);
	
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