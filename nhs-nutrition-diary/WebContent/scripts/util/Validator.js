function Validator() {}

Validator.prototype.isDate(date) {
	alert("isDate");
	return true;
	/*
	if((date != "Invalid Date") && (isNaN(date))) {
		return true;
	} else {
		return false;
	}*/
	
	
	/*var fromSplit = from.split('/'); // [0]: month, [1]: day, [2]: year
	if(fromSplit[0] != null && fromSplit[1] != null && fromSplit[2] != null) {
		var fromCleaned = new Date(Date.UTC(fromSplit[2], fromSplit[0], fromSplit[1]));
		var fromFormatted = new Intl.DateTimeFormat('en-US').format(fromCleaned);
	} else {
		return false;
	}
	
	var toSplit = to.split('/');
	if(toSplit[0] != null && toSplit[1] != null && toSplit[2] != null) {
		var toCleaned = new Date(Date.UTC(toSplit[2], toSplit[0], toSplit[1]));
		var toFormatted = new Intl.DateTimeFormat('en-US').format(toCleaned);
	} else {
		return false;
	}*/
	
	
}

Validator.prototype.validateDates(from, to) {
	alert("validateDates");
	if(!isDate(from) || !isDate(to)) {
		return false;
	}

	//TODO validate dates (to later than from, format, etc.)
	/*if(fromCleaned > toCleaned) {
		return false;
	} else {
		return true;
	}*/
	return true;
}