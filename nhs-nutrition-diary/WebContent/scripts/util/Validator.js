function Validator() {}

Validator.prototype.validateDates(from, to) {
	if(from > to)
		return false;
	else
		return true;
}