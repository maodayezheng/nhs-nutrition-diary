function Summary() {}

Summary.prototype.manageSummary = function(presentedParameter, dateFrom, dateTo) {
	var validator = new Validator();
	if(!validator.datesAreValid(dateFrom, dateTo)) {
		alert("Dates are not valid. Either wrong format or to is older than from.");
		return false;
	}
	
	var userId = this.getUserID();
	
	var dateFromFormatted = SubmitController.prototype.formatDateOnly(dateFrom.dateFormat('d/m/Y'));
	var dateToFormatted = SubmitController.prototype.formatDateOnly(dateTo.dateFormat('d/m/Y'));
	
	var historyRequestJSON = {
			"action": "get",
			"table": "userfoodmanifest",
			"where": "userid,=," + userId + ",datetime,>=," + dateFromFormatted + " 00:00:00," + "datetime,<=," + dateToFormatted + " 23:59:59"
	};
	var history = ServerDBAdapter.prototype.get(historyRequestJSON);
	
	this.makeSummary(presentedParameter, dateFrom, dateTo, history);
}

Summary.prototype.makeSummary = function(presentedParameter, dateFrom, dateTo, history) {
	
	$('#table').html("");
	d3.select('#graph').attr("width", 0).attr("height", 0);
	
	//TODO make summary
}