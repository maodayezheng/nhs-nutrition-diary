function Summary() {}

Summary.prototype.manageSummary = function(presentedParameter, dateFrom, dateTo) {
	var validator = new Validator();
	if(!validator.datesAreValid(dateFrom, dateTo)) {
		alert("Dates are not valid. Either wrong format or to is older than from.");
		return false;
	}
	
	var database = new LocalDbSingleton();
	var data = database.databaseOpen(LocalDbSingleton.prototype.localDbGet, 'foodManifestStore', dateFrom, dateTo, presentedParameter, this.makeSummary);
}

Summary.prototype.makeSummary = function(presentedParameter, dateFrom, dateTo, jsonInput) {
	
	$('#table').html("");
	d3.select('#graph').attr("width", 0).attr("height", 0);
	
	//TODO make summary
}