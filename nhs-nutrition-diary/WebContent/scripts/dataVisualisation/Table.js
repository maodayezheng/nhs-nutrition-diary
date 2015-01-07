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
	var history;
	
	if(presentedParameter == "Weight (kg)") {
		var weightHistoryRequestJSON = {
				"action": "get",
				"table": "userweightmanifest",
				"where": "userid,=," + userId
		};
		history = ServerDBAdapter.prototype.get(weightHistoryRequestJSON);
	} else {
		var historyRequestJSON = {
				"action": "get",
				"table": "userfoodmanifest",
				"where": "userid,=," + userId + ",datetime,>=," + dateFromFormatted + " 00:00:00," + "datetime,<=," + dateToFormatted + " 23:59:59"
		};
		history = ServerDBAdapter.prototype.get(historyRequestJSON);
	}
	console.log(history);
	
	this.drawTable(presentedParameter, dateFrom, dateTo, history);
}

Table.prototype.drawTable = function(presentedParameter, dateFrom, dateTo, history) {
	$('#summary').html("");
	d3.select('#graph').attr("width", 0).attr("height", 0);
	
	var colTitles = new Array();
	var rows = new Array();
	
	if(presentedParameter == "Calories (kcal)") {
		colTitles = ['Date', 'Time', 'Food', 'Calories (kcal)'];
		for(var index = 0; index < history.length; index++) {
			var entry = history[index];
			var caloriesCurrent = parseFloat(entry.calories) * parseFloat(entry.quantity);
			var dateTime = "" + entry.datetime;
			var dateTimeParts = dateTime.split(' ');
			rows[index] = new Array('' + dateTimeParts[0], '' + dateTimeParts[1], '' + entry.foodname, '' + caloriesCurrent);
		}
	} else if(presentedParameter == "Protein (g)") {
		colTitles = ['Date', 'Time', 'Food', 'Protein (g)'];
		for(var index = 0; index < history.length; index++) {
			var entry = history[index];
			var proteinCurrent = parseFloat(entry.protein) * parseFloat(entry.quantity);
			var dateTime = "" + entry.datetime;
			var dateTimeParts = dateTime.split(' ');
			rows[index] = new Array('' + dateTimeParts[0], '' + dateTimeParts[1], '' + entry.foodname, '' + proteinCurrent);
		}
	} else if(presentedParameter == "Fluid (ml)") {
		colTitles = ['Date', 'Time', 'Food', 'Fluid (ml)'];
		for(var index = 0; index < history.length; index++) {
			var entry = history[index];
			var fluidCurrent = parseFloat(entry.fluid) * parseFloat(entry.quantity);
			var dateTime = "" + entry.datetime;
			var dateTimeParts = dateTime.split(' ');
			rows[index] = new Array('' + dateTimeParts[0], '' + dateTimeParts[1], '' + entry.foodname, '' + fluidCurrent);
		}
	} else if(presentedParameter == "Weight (kg)") {
		colTitles = ['Date', 'Weight (kg)'];
		for(var index = 0; index < history.length; index++) {
			var entry = history[index];
			var dateTime = "" + entry.datetime;
			var dateTimeParts = dateTime.split(' ');
			rows[index] = new Array('' + dateTimeParts[0], '' + entry.weight);
		}
	}
	/*else if(presentedParameter == "Symptoms") {
		colTitles = ['Date', 'Time', 'Food', 'Symptom'];
		rows = [
	            ['02/12/2014', '14:02', 'German sausage', 'Feeling good'],
	            ['03/12/2014', '15:14', 'German beer', 'Feeling good'],
	            ['24/12/2014', '05:24', 'German bread', 'Feeling good'],
			];
	}*/
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