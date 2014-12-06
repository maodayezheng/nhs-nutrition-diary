function RequirementsCalculator() {}

RequirementsCalculator.prototype.calcCalories = function() {
	//TODO check if user is female: currently true
	if(true) {
		return this.calcCaloriesFemale();
	} else {
		return this.calcCaloriesMale();
	}	
}

RequirementsCalculator.prototype.calcCaloriesFemale = function() {
	var age = $("#age").val();
	var weight = $("#weight").val();
	
	if(age < 17) {
		return weight * 13.4 + 692;
	} else if(age > 17 && age < 30) {
		return weight * 14.8 + 487;
	} else if(age > 29 && age < 60) {
		return weight * 8.3 + 846;
	} else if(age > 59 && age < 75) {
		return weight * 9.8 + 687;
	} else if(age > 74) {
		return weight * 8.3 + 624;
	}
}

RequirementsCalculator.prototype.calcCaloriesMale = function() {
	var age = $("#age").val();
	var weight = $("#weight").val();
	
	if(age < 17) {
		return weight * 17.7 + 657;
	} else if(age > 17 && age < 30) {
		return weight * 15.1 + 692;
	} else if(age > 29 && age < 60) {
		return weight * 11.5 + 873;
	} else if(age > 59 && age < 75) {
		return weight * 11.9 + 700;
	} else if(age > 74) {
		return weight * 8.3 + 820;
	}
}

RequirementsCalculator.prototype.calcProtein = function() {
	return $("#weight").val() * 0.17 * 6.25;
}

RequirementsCalculator.prototype.calcFluid = function() {
	var weight = $("#weight").val();
	if(weight <= 60) {
		return weight * 30;
	} else {
		return weight * 35;
	}
}