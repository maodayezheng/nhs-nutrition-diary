ValidatorTest = TestCase("DateValidator");

WorldTest.prototype.testValidateDates = function() {
	
	var from = "2014/11/23";
	var to = "2014/11/27"
	
	var validator = new Validator();
	assertEquals(true, validator.validate(form, to));
}