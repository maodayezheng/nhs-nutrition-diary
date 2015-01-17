function Validator() {}

Validator.prototype.dateSplit = function(date) {
//	alert(date);
	var dateSplit = date.split('/');
	
	var day = parseInt(dateSplit[0]);
	var month = parseInt(dateSplit[1]);
	var year = parseInt(dateSplit[2]);
	
	return new Array(day, month, year);
}

Validator.prototype.dateFromOlderThanTo = function(from, to) {
	
	var fromSplit = this.dateSplit(from);
	var toSplit = this.dateSplit(to);
	
	if(toSplit[2] < fromSplit[2]) {
		return false;
	} else if (toSplit[2] == fromSplit[2] && toSplit[1] < fromSplit[1]) {
		return false;
	} else if (toSplit[2] == fromSplit[2] && toSplit[1] == fromSplit[1] && toSplit[0] < fromSplit[0]) {
		return false;
	} else {
		return true;
	}
}

Validator.prototype.isValidDate = function(date) {
	if(typeof(date) != 'string' || date.length != 10) {
		return false;
	}

	var dateSplit = this.dateSplit(date);
	
	if(isNaN(dateSplit[0])|| isNaN(dateSplit[1]) || isNaN(dateSplit[2])) {
		return false;
	}
	
	if(dateSplit[2] <= 0
			|| dateSplit[1] < 1
			|| dateSplit[1] > 12
			|| dateSplit[0] < 1
			|| dateSplit[0] > 31) {
		return false
	}
	
	if(dateSplit[1] == 2 && (dateSplit[0] > 29)) {
		return false;
	}
	
	if(dateSplit[0] == 31 && ((dateSplit[1] != 1) || (dateSplit[1] != 3) || (dateSplit[1] != 5) || (dateSplit[1] != 7)
			|| (dateSplit[1] != 8) || (dateSplit[1] != 10) || (dateSplit[1] != 12))) {
		return false;
	}
	
	return true;
}

Validator.prototype.datesAreValid = function(from, to) {
	if(!this.isValidDate(from) || !this.isValidDate(to)) {
		return false;
	}
	
	if(!this.dateFromOlderThanTo(from, to)) {
		return false;
	}
	
	return true;
}

Validator.prototype.isValidNhsNumber = function(nhsNumber) {
	if(isNaN(nhsNumber)) {
		return false;
	} else if(nhsNumber.length != 10) {
		return false;
	}
	
	return true;
}

Validator.prototype.isValidPassword = function(password) {
	if(password.length == 0) {
		return false
	} else {
		return true;
	}
}

Validator.prototype.isSamePassword = function(password, passwordConfirm) {
	if(password == passwordConfirm) {
		return true;
	} else {
		return false;
	}
}

Validator.prototype.isValidWeight = function(weight) {
	if(isNaN(weight)) {
		return false;
	} else if(weight <= 0) {
		return false;
	} else {
		return true;
	}
}

Validator.prototype.isInPastDateOfBirth = function(dateOfBirth) {
	var now = new Date().dateFormat('d/m/Y');
	
	return this.dateFromOlderThanTo(dateOfBirth, now);
}

Validator.prototype.isValidActivityLevel = function(activityLevel) {
	if(isNaN(activityLevel)) {
		return false;
	} else if(activityLevel <= 0) {
		return false;
	} else {
		return true;
	}
}

Validator.prototype.isValidGender = function(gender) {
	if(gender == "Male" || gender == "Female") {
		return true;
	} else {
		return false;
	}
}