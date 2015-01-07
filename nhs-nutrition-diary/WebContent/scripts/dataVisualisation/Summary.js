function Summary() {}

Summary.prototype.manageSummary = function(presentedParameter, dateFrom, dateTo) {
	var validator = new Validator();
	if(!validator.datesAreValid(dateFrom, dateTo)) {
		alert("Dates are not valid. Either wrong format or to is older than from.");
		return false;
	}
	
	var userId = SubmitController.prototype.getUserID();
	
	var dateFromFormatted = SubmitController.prototype.formatDateOnly(dateFrom);
	var dateToFormatted = SubmitController.prototype.formatDateOnly(dateTo);
	
	var historyRequestJSON = {
			"action": "get",
			"table": "userfoodmanifest",
			"where": "userid,=," + userId + ",datetime,>=," + dateFromFormatted + " 00:00:00," + "datetime,<=," + dateToFormatted + " 23:59:59"
	};
	var history = ServerDBAdapter.prototype.get(historyRequestJSON);
	
	this.makeSummary(presentedParameter, dateFrom, dateTo, history);
}

Summary.prototype.makeSummary = function(presentedParameter, dateFrom, dateTo, history) {
	var caloriesCurrent = 0;
	var proteinCurrent = 0;
	var fluidCurrent = 0;
	if(history !== null){
	for(var index = 0; index < history.length; index++) {
		var entry = history[index];
		caloriesCurrent += parseFloat(entry.calories) * parseFloat(entry.quantity);
		proteinCurrent += parseFloat(entry.protein) * parseFloat(entry.quantity);
		fluidCurrent += parseFloat(entry.fluid) * parseFloat(entry.quantity);
	}}
	alert("calories: " + caloriesCurrent);
	alert("protein: " + proteinCurrent);
	alert("fluid: " + fluidCurrent);
	
	$('#table').html("");
	d3.select('#graph').attr("width", 0).attr("height", 0);
	
	//TODO make summary
	var startWeight =80;
	$('#summary').append($('<p>Patient start weight: </p>').css('text-align','center').append($('<strong>',{
		"text": startWeight+"kg"
	})));
	
	var currentWeight = 90;
	$('#summary').append($('<p>Patient current weight: </p>').css('text-align','center').append($('<strong>',{
		"text": currentWeight+"kg"
	})));
	
	
	$('#summary').append($('<p>requirements base on  weight:</p>').css('text-align','center').append($('<strong>',{
		"text": caloriesCurrent+" kcal " +proteinCurrent +" g " + fluidCurrent+" ml"
	})));
	
	
	$('#summary').append($('<p>after addtion:</p>').css('text-align','center').append($('<strong>',{
		"text": caloriesCurrent+" kcal " +proteinCurrent +" g " + fluidCurrent+" ml"
	})));
	
	var sympOne = "Nause";
	
	$('#summary').append($('<p>top Symptoms:</p>').css('text-align','center').append($('<strong>',{
		"text": sympOne+", " +sympOne +", " + sympOne
	})));
	
}




