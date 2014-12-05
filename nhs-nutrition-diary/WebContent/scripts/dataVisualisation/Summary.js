function Summary() {}

Summary.prototype.makeSummary = function(presentedParameter, dateFrom, dateTo) {
	
	$('#table').html("");
	d3.select('#graph').attr("width", 0).attr("height", 0);
	
	var validator = new Validator();
	if(!validator.datesAreValid(dateFrom, dateTo)) {
		alert("Dates are not valid. Either wrong format or to is older than from.");
		return false;
	}
	
	var database = new LocalDbSingleton();
	var jsonInput = database.get(dateFrom, dateTo);
	
	//TODO make summary
}