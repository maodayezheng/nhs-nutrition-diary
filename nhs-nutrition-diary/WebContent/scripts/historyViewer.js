function toggleHistoryVisualisation() {
	fillEmptyDates();
	var presentedParameter = $('#foodComponents').val();
	var dateFrom = $('#datepickerFrom').val();
	var dateTo = $('#datepickerTo').val();
	
	if($('#graphSelector').is(':checked')){
		$('#summary').hide();
		$('#graph').show();
		$('#table').hide();
		manageGraph(presentedParameter, dateFrom, dateTo);
	} else if($('#tableSelector').is(':checked')) {
		$('#summary').hide();
		$('#graph').hide();
		$('#table').show();
		var table = new Table();
		table.manageTable(presentedParameter, dateFrom, dateTo);
	} else if($('#summarySelector').is(':checked')) {
		$('#summary').show();
		$('#graph').hide();
		$('#table').hide();
		var summary = new Summary();
		summary.manageSummary(presentedParameter, dateFrom, dateTo);
	}/* else if ($('#flagsSelectorLabel').is(':checked')) {
		//TODO display the flags
	}*/
}

function toggleHistoryVisualisationButton(id) {
	fillEmptyDates();
	var presentedParameter = $('#foodComponents').val();
	var dateFrom = $('#datepickerFrom').val();
	var dateTo = $('#datepickerTo').val();
	
	if(id == 'graphSelectorLabel') {
		//TODO fix graph
		$('#summary').hide();
		$('#graph').show();
		$('#table').hide();
		manageGraph(presentedParameter, dateFrom, dateTo);
	} else if (id == 'tableSelectorLabel') {
		$('#summary').hide();
		$('#graph').hide();
		$('#table').show();
		var table = new Table();
		table.manageTable(presentedParameter, dateFrom, dateTo);
	} else if (id == 'summarySelectorLabel') {
		$('#summary').show();
		$('#graph').hide();
		$('#table').hide();
		var summary = new Summary();
		summary.manageSummary(presentedParameter, dateFrom, dateTo);
	}/* else if (id == 'flagsSelectorLabel') {
		//TODO display the flags
	}*/
}

function fillEmptyDates() {
	if(document.getElementById("datepickerFrom").value == "") {
		document.getElementById("datepickerFrom").value = new Date().dateFormat('d/m/Y');
	}
	
	if(document.getElementById("datepickerTo").value == "") {
		document.getElementById("datepickerTo").value = new Date().dateFormat('d/m/Y');
	}
}