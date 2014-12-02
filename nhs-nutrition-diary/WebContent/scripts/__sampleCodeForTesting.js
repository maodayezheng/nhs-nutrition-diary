function HelloWorld (greeting) {
	this.world = "earth";
	this.greeting = greeting;
}

HelloWorld.prototype.getGreeting = function() {
	return this.greeting;
}