function Validator() {}

Validator.prototype.validateDates(from, to) {
	if(from > to) {
		return false;
	}
	return true;
}