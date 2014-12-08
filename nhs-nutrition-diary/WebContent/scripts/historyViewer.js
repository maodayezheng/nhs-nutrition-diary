function toggleHistoryVisualisation() {
	fillEmptyDates();
	
	var presentedParameter = $('#foodComponents').val();
	var dateFrom = $('#datepickerFrom').val();
	var dateTo = $('#datepickerTo').val();
	
	if($('#graphSelector').is(':checked')) {
		manageGraph(presentedParameter, dateFrom, dateTo);
	} else if($('#tableSelector').is(':checked')) {
		var table = new Table();
		table.manageTable(presentedParameter, dateFrom, dateTo);
	} else if($('#summarySelector').is(':checked')) {
		var summary = new Summary();
		summary.manageSummary(presentedParameter, dateFrom, dateTo);
	}
}

function toggleHistoryVisualisationButton(id) {
	fillEmptyDates();
	
	var presentedParameter = $('#foodComponents').val();
	var dateFrom = $('#datepickerFrom').val();
	var dateTo = $('#datepickerTo').val();
	
	if(id == 'graphSelectorLabel') {
		manageGraph(presentedParameter, dateFrom, dateTo);
	} else if (id == 'tableSelectorLabel') {
		var table = new Table();
		table.manageTable(presentedParameter, dateFrom, dateTo);
	} else if (id == 'summarySelectorLabel') {
		var summary = new Summary();
		summary.manageSummary(presentedParameter, dateFrom, dateTo);
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