function toggleVisualisation() {
	fillEmptyDates();
	
	var presentedParameter = $('#foodComponents').val();
	var dateFrom = $('#datepickerFrom').val();
	var dateTo = $('#datepickerTo').val();
	
	if($('#graphSelector').is(':checked')) {
		makeGraph(presentedParameter, dateFrom, dateTo);
	} else if($('#tableSelector').is(':checked')) {
		var table = new Table();
		table.drawTable(presentedParameter, dateFrom, dateTo);
	} else if($('#summarySelector').is(':checked')) {
		var summary = new Summary();
		summary.makeSummary(presentedParameter, dateFrom, dateTo);
	}
}

function toggleVisualisationButton(id) {
	fillEmptyDates();
	
	var presentedParameter = $('#foodComponents').val();
	var dateFrom = $('#datepickerFrom').val();
	var dateTo = $('#datepickerTo').val();
	
	if(id == 'graphSelectorLabel') {
		makeGraph(presentedParameter, dateFrom, dateTo);
	} else if (id == 'tableSelectorLabel') {
		var table = new Table();
		table.drawTable(presentedParameter, dateFrom, dateTo);
	} else if (id == 'summarySelectorLabel') {
		var summary = new Summary();
		summary.makeSummary(presentedParameter, dateFrom, dateTo);
	}
}

function fillEmptyDates() {
	if(document.getElementById("datepickerFrom").value == "") {
		document.getElementById("datepickerFrom").value = new Date().dateFormat('d/m/Y');
	}
	
	if(document.getElementById("datepickerTo").value == "") {
		document.getElementById("datepickerTo").value = new Date().dateFormat('d/m/Y');
	}
}