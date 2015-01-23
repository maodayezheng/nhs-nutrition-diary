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
	
	/*
	var historyRequestJSON = {
			"action": "get",
			"table": "userfoodmanifest",
			"where": "userid,=," + userId + ",datetime,>=," + dateFromFormatted + " 00:00:00," + "datetime,<=," + dateToFormatted + " 23:59:59"
	};
	var history = ServerDBAdapter.prototype.get(historyRequestJSON);*/
	
	this.makeSummary(presentedParameter, dateFrom, dateTo, history);
}

Summary.prototype.makeSummary = function(presentedParameter, dateFrom, dateTo, history) {
	/*if(history !== null){
		for(var index = 0; index < history.length; index++) {
			var entry = history[index];
			caloriesCurrent += parseFloat(entry.calories) * parseFloat(entry.quantity);
			proteinCurrent += parseFloat(entry.protein) * parseFloat(entry.quantity);
			fluidCurrent += parseFloat(entry.fluid) * parseFloat(entry.quantity);
		}
	}*/
	
	$('#table').html("");
	d3.select('#graph').attr("width", 0).attr("height", 0);
	
	//TODO make summary
	
	$('#summary').append($('<h4>Weight: </h4>'));
	
	
	var startWeight = 80;
	$('#summary').append($('<p>Patient\'s start weight: </p>').css('text-align','center').append($('<strong>',{
		"text": startWeight + " kg"
	})));
	
	var currentWeight = 90;
	$('#summary').append($('<p>Patient\'s current weight: </p>').css('text-align','center').append($('<strong>',{
		"text": currentWeight + " kg"
	})));
	
	var weightChangeOneMonth = 3.5;
	$('#summary').append($('<p>Weight change in 1 month: </p>').css('text-align','center').append($('<strong>',{
		"text": weightChangeOneMonth + " %"
	})));
	
	var weightChangeThreeMonth = 15.4;
	$('#summary').append($('<p>Weight change in 3 months: </p>').css('text-align','center').append($('<strong>',{
		"text": weightChangeThreeMonth + " %"
	})));
	
	var weightChangeSixMonth = 7.3;
	$('#summary').append($('<p>Weight change in 6 months: </p>').css('text-align','center').append($('<strong>',{
		"text": weightChangeSixMonth + " %"
	})));
	
	var caloriesCurrent = 2320;
	var proteinCurrent = 86;
	var fluidCurrent = 1550;
	$('#summary').append($('<h4>Requirements: </h4>'));
	$('#summary').append($('<p>Current requirements: </p>').css('text-align','center').append($('<strong>',{
		"text": caloriesCurrent + " kcal, " + proteinCurrent + " g protein, " + fluidCurrent + " ml fluid"
	})));
	
	var caloriesAmendments = -150;
	var proteinAmendments = 30;
	var fluidAmendments = 200;
	$('#summary').append($('<p>Amendments: </p>').css('text-align','center').append($('<strong>',{
		"text": caloriesAmendments + " kcal, " + proteinAmendments + " g protein, " + fluidAmendments + " ml fluid"
	})));
	
	var topOneSymptom = "Vomiting";
	var topTwoSymptom = "Loss of appetite";
	var topThreeSymptom = "Taste changes";
	$('#summary').append($('<h4>Symptoms: </h4>'));
	$('#summary').append($('<p>Most Frequent Symptoms: </p>').css('text-align','center').append($('<strong>',{
		"text": "1. " + topOneSymptom + ", 2. " + topTwoSymptom + ", 3. " + topThreeSymptom
	})));	
}