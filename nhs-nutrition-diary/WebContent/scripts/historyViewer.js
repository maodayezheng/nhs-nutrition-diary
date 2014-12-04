function toggleVisualisation() {
	fillEmptyDates();
	
	var presentedParameter = $('#foodComponents').val();
	var dateFrom = $('#datepickerFrom').val();
	var dateTo = $('#datepickerTo').val();
	
	if($('#graphSelector').is(':checked')) {
		makeGraph(presentedParameter, dateFrom, dateTo);
	} else if($('#tableSelector').is(':checked')) {
		//TODO call make table
	} else if($('#summarySelector').is(':checked')) {
		//TODO call make summary
	}
}

function fillEmptyDates() {
	if(document.getElementById("datepickerFrom").value == "") {
		document.getElementById("datepickerFrom").value = new Date().dateFormat('m/d/Y');
	}
	
	if(document.getElementById("datepickerTo").value == "") {
		document.getElementById("datepickerTo").value = new Date().dateFormat('m/d/Y');
	}
}