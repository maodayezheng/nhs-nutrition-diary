function Summary() {}

Summary.prototype.manageSummary = function(presentedParameter, dateFrom, dateTo) {
	var validator = new Validator();
	if(!validator.datesAreValid(dateFrom, dateTo)) {
		alert("Dates are not valid. Either wrong format or to is older than from.");
		return false;
	}
	
	var userId = this.getUserID();
	var historyRequestJSON = {
			"action": "get",
			"table": "userfoodmanifest",
			"where": "userid,=," + userId
	};
	var history = ServerDBAdapter.prototype.get(historyRequestJSON);
	
	this.makeSummary(presentedParameter, dateFrom, dateTo, history);
}

Summary.prototype.makeSummary = function(presentedParameter, dateFrom, dateTo, history) {
	
	$('#table').html("");
	d3.select('#graph').attr("width", 0).attr("height", 0);
	
	//TODO make summary
}