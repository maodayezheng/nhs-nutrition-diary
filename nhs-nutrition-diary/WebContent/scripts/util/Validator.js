function Validator() {}

Validator.prototype.dateSplit = function(date) {
	var dateSplit = date.split('/');
	
	var month = parseInt(dateSplit[0]);
	var day = parseInt(dateSplit[1]);
	var year = parseInt(dateSplit[2]);
	
	return new Array(month, day, year);
}

Validator.prototype.dateFromOlderThanTo = function(from, to) {
	
	var fromSplit = this.dateSplit(from);
	var toSplit = this.dateSplit(to);
	
	if(toSplit[2] < fromSplit[2]) {
		return false;
	} else if (toSplit[2] == fromSplit[2] && toSplit[0] < fromSplit[0]) {
		return false;
	} else if (toSplit[2] == fromSplit[2] && toSplit[0] == fromSplit[0] && toSplit[1] < fromSplit[1]) {
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
			|| dateSplit[0] < 1
			|| dateSplit[0] > 12
			|| dateSplit[1] < 1
			|| dateSplit[1] > 31) {
		return false
	}
	
	if(dateSplit[0] == 2 && (dateSplit[1] > 29)) {
		return false;
	}
	
	if(dateSplit[1] == 31 && ((dateSplit[0] != 1) || (dateSplit[0] != 3) || (dateSplit[0] != 5) || (dateSplit[0] != 7)
			|| (dateSplit[0] != 8) || (dateSplit[0] != 10) || (dateSplit[0] != 12))) {
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