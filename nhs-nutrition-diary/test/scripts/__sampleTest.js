WorldTest = TestCase("GreetingTest");

WorldTest.prototype.testGreetingText = function() {
	var myWorld = new HelloWorld("hi_there");
	assertEquals("hi_there", myWorld.getGreeting());
}

WorldTest.prototype.testGreetingType = function() {
	var myWorld = new HelloWorld("hi_there");
	assertEquals("hi_there", myWorld.getGreeting());
}