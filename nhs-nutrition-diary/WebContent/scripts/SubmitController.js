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

SubmitController.prototype.getAge = function(dateOfBirth) {
	var today = new Date();
	alert(today);
	var dateOfBirthParts = dateOfBirth.split(' ');
	var dateOfBirthYMD = dateOfBirthParts[0].split('-');
	var month = "" + dateOfBirthYMD[1];
	var monthCleared = month.replace("0", "");
	var birthDate = new Date(dateOfBirthYMD[0], parseInt(dateOfBirthYMD[1]) - 1, dateOfBirthYMD[2]);
	alert(birthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    alert(age);
    return age;
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
	
	var userInfoRequestJSON = {
			"action": "getUserProfile",
			"table": "users",
			"where": "id,=," + userId
	};
	var userInfoResponseJSON = ServerDBAdapter.prototype.get(userInfoRequestJSON)[0];
	
	var gender = userInfoResponseJSON.gender;
	var dateOfBirth = userInfoResponseJSON.dateofbirth;
	var activityLevel = userInfoResponseJSON.activitylevel;
	var age = this.getAge(dateOfBirth);
	
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
	
	var warning = $('<div>',{
		"class":"alert alert-success center",
		"role":"alert",
		"text":"Foods submitted."
	});
	$('body').append(warning);
	setTimeout(function(){warning.remove()},3000);
	
	window.location.href = 'home.html';
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
		var symptomTable = "";
		var symptomId = "";
		
		var symptomDetailsRequestJSON = {
				"action": "get",
				"table": "symptomlist",
				"where": "symptom,=," + symptom
		};
		var symptomDetails = ServerDBAdapter.prototype.get(symptomDetailsRequestJSON)[0];
		
		if(symptomDetails != null) {
			symptomTable = "symptomlist";
			symptomId = symptomDetails.id;
		} else {
			var userSymptomDetailsRequestJSON = {
					"action": "get",
					"table": "usersymptomlist",
					"where": "userid,=," + userid + ",symptom,=," + symptom
			};
			var userSymptomDetails = ServerDBAdapter.prototype.get(userSymptomDetailsRequestJSON)[0];
			symptomTable = "usersymptomlist";
			symptomId = userSymptomDetails.id;
		}
		
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
	
	var warning = $('<div>',{
		"class":"alert alert-success center",
		"role":"alert",
		"text":"Symptoms submitted."
	});
	$('body').append(warning);
	setTimeout(function(){warning.remove()},3000);
	
	window.location.href = 'home.html';
}

SubmitController.prototype.submitNewCustomSymptom = function() {
	table = "usersymptomlist";
	userid = this.getUserID();
	var date = $('#symptomDate').val();
	var time = $('#symptomTime').val();
	var datetime = this.formatDateTime(date, time);
	
	var symptom = $("#newSymptom").val();
	//TODO find symptom description
	var symptomDescription = "empty";
	
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
	
	var warning = $('<div>',{
		"class":"alert alert-success center",
		"role":"alert",
		"text":"Weight submitted."
	});
	$('body').append(warning);
	setTimeout(function(){warning.remove()},3000);
	
	window.location.href = 'home.html';
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
	
	var userInfoRequestJSON = {
			"action": "getUserProfile",
			"table": "users",
			"where": "id,=," + userId
	};
	var userInfoResponseJSON = ServerDBAdapter.prototype.get(userInfoRequestJSON)[0];
	
	var gender = userInfoResponseJSON.gender;
	var dateOfBirth = userInfoResponseJSON.dateofbirth;
	var activityLevel = userInfoResponseJSON.activitylevel;
	var age = this.getAge(dateOfBirth);
	
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
	
	var warning = $('<div>',{
		"class":"alert alert-success center",
		"role":"alert",
		"text":"Amendments submitted."
	});
	$('body').append(warning);
	setTimeout(function(){warning.remove()},3000);
	
	window.location.href = 'home.html';
}