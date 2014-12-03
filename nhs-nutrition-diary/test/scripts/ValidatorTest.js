ValidatorTest = TestCase("DateValidator");

ValidatorTest.prototype.testValidateDates = function() {
	var from = "20141123";
	var to = "20141127"
	
	var validator = new Validator();
	assertEquals(true, validator.validateDates(form, to));
}