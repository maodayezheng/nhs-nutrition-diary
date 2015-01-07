function Table() {}

Table.prototype.manageTable = function(presentedParameter, dateFrom, dateTo) {
	var validator = new Validator();
	if(!validator.datesAreValid(dateFrom, dateTo)) {
		alert("Dates are not valid. Either wrong format or to is older than from.");
		return false;
	}
	
	var userId = SubmitController.prototype.getUserID();
	
	var dateFromFormatted = SubmitController.prototype.formatDateOnly(dateFrom);
	var dateToFormatted = SubmitController.prototype.formatDateOnly(dateTo);
	
	var historyRequestJSON = {
			"action": "get",
			"table": "userfoodmanifest",
			"where": "userid,=," + userId + ",datetime,>=," + dateFromFormatted + " 00:00:00," + "datetime,<=," + dateToFormatted + " 23:59:59"
	};
	var history = ServerDBAdapter.prototype.get(historyRequestJSON);
	console.log(history);
	
	this.drawTable(presentedParameter, dateFrom, dateTo, history);
}

Table.prototype.drawTable = function(presentedParameter, dateFrom, dateTo, history) {
	var caloriesCurrent = 0;
	var proteinCurrent = 0;
	var fluidCurrent = 0;
	
	for(var index = 0; index < history.length; index++) {
		var entry = history[index];
		caloriesCurrent += parseFloat(entry.calories) * parseFloat(entry.quantity);
		proteinCurrent += parseFloat(entry.protein) * parseFloat(entry.quantity);
		fluidCurrent += parseFloat(entry.fluid) * parseFloat(entry.quantity);
	}
	alert("calories: " + caloriesCurrent);
	alert("protein: " + proteinCurrent);
	alert("fluid: " + fluidCurrent);
	
	$('#summary').html("");
	d3.select('#graph').attr("width", 0).attr("height", 0);
	
	//TODO visualise data
	var colTitles;
	var rows;
	
	if(presentedParameter == "Calories (kcal)") {
		colTitles = ['Date', 'Time', 'Food', 'Calories (kcal)'];
		rows = [
            ['02/12/2014', '14:02', 'German sausage', '340'],
            ['03/12/2014', '15:14', 'German beer', '240'],
            ['24/12/2014', '05:24', 'German bread', '589'],
		];
	}
	else if(presentedParameter == "Protein (g)") {
		colTitles = ['Date', 'Time', 'Food', 'Protein (g)'];
		rows = [
	            ['02/12/2014', '14:02', 'German sausage', '17'],
	            ['03/12/2014', '15:14', 'German beer', '24'],
	            ['24/12/2014', '05:24', 'German bread', '38'],
			];
	}
	else if(presentedParameter == "Fluid (ml)") {
		colTitles = ['Date', 'Time', 'Food', 'Fluid (ml)'];
		rows = [
	            ['02/12/2014', '14:02', 'German sausage', '100'],
	            ['03/12/2014', '15:14', 'German beer', '110'],
	            ['24/12/2014', '05:24', 'German bread', '120'],
			];
	}
	else if(presentedParameter == "Weight (kg)") {
		colTitles = ['Date', 'Time', 'Weight'];
		rows = [
	            ['02/12/2014', '14:02', '74'],
	            ['03/12/2014', '15:14', '75'],
	            ['24/12/2014', '05:24', '72'],
			];
	}
	else if(presentedParameter == "Symptoms") {
		colTitles = ['Date', 'Time', 'Food', 'Symptom'];
		rows = [
	            ['02/12/2014', '14:02', 'German sausage', 'Feeling good'],
	            ['03/12/2014', '15:14', 'German beer', 'Feeling good'],
	            ['24/12/2014', '05:24', 'German bread', 'Feeling good'],
			];
	}
	var block = $('#table').TidyTable({
		//enableCheckbox: true,
		//enableMenu:     true
	},
	{
		columnTitles: colTitles,
		columnValues: rows,

		// do something with selected results
		menuOptions : [
//			['Option 1', { callback: doSomething1 }],
//			['Option 2', { callback: doSomething2 }]
		],

		// post-process DOM elements
		postProcess: {
//			table:  doSomething3,
//			column: doSomething4,
//			menu:   doSomething5
		},

		// pre-process column values before sort (optional)
		sortByPattern: function(col_num, val) {
			if (col_num != 1) return val;

			return String(val).replace(/$|%|#/g, '');
		}
	});
}