function Summary() {}

Table.prototype.makeSummary = function(presentedParameter, dateFrom, dateTo) {
	
	var validator = new Validator();
	if(!validator.datesAreValid(dateFrom, dateTo)) {
		alert("Dates are not valid. Either wrong format or to is older than from.");
		return false;
	}
	
	$('#table').html("");
	d3.select("svg").html("");
	
	var database = new LocalDbSingleton();
	var jsonInput = database.get(dateFrom, dateTo);
	
	//TODO make summary
}