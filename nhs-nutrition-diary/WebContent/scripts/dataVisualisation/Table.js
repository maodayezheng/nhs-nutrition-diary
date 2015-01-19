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
	var symptoms;
	
	if(presentedParameter == "Weight (kg)") {
		var weightHistoryRequestJSON = {
				"action": "get",
				"table": "userweightmanifest",
				"where": "userid,=," + userId + ",datetime,>=," + dateFromFormatted + " 00:00:00," + "datetime,<=," + dateToFormatted + " 23:59:59"
		};
		history = ServerDBAdapter.prototype.get(weightHistoryRequestJSON);
	} else {
		var historyRequestJSON = {
				"action": "get",
				"table": "userfoodmanifest",
				"where": "userid,=," + userId + ",datetime,>=," + dateFromFormatted + " 00:00:00," + "datetime,<=," + dateToFormatted + " 23:59:59"
		};
		history = ServerDBAdapter.prototype.get(historyRequestJSON);
		
		var symptomsRequestJSON = {
				"action": "get",
				"table": "usersymptommanifest",
				"where": "userid,=," + userId + ",datetime,>=," + dateFromFormatted + " 00:00:00," + "datetime,<=," + dateToFormatted + " 23:59:59"
		};
		symptoms = ServerDBAdapter.prototype.get(symptomsRequestJSON);
	}
	console.log(history);
	
	this.drawTable(presentedParameter, dateFrom, dateTo, history, symptoms);
}

Table.prototype.drawTable = function(presentedParameter, dateFrom, dateTo, history, symptoms) {
	$('#summary').html("");
	d3.select('#graph').attr("width", 0).attr("height", 0);
	
	if(symptoms == null) {
		//TODO handle empty symptoms
	}
	
	var colTitles = new Array();
	var rows = new Array();
	
	if(presentedParameter == "Calories (kcal)") {
		colTitles = ['Date', 'Time', 'Food / Symptom', 'Calories (kcal) / Comment'];
		for(var index = 0; index < history.length; index++) {
			var entry = history[index];
			var caloriesCurrent = parseFloat(entry.calories) * parseFloat(entry.quantity);
			var dateTime = "" + entry.datetime;
			var dateTimeParts = dateTime.split(' ');
			rows[index] = new Array('' + dateTimeParts[0], '' + dateTimeParts[1], '' + entry.foodname, '' + caloriesCurrent);
		}
		
		for(var indexSymptoms = history.length; indexSymptoms < history.length + symptoms.length; indexSymptoms++) {
			var entry = symptoms[indexSymptoms - history.length];
			var comment = entry.comment;
			var dateTime = "" + entry.datetime;
			var dateTimeParts = dateTime.split(' ');
			rows[indexSymptoms] = new Array('' + dateTimeParts[0], '' + dateTimeParts[1], '' + entry.symptom, '' + comment);
		}
		
	} else if(presentedParameter == "Protein (g)") {
		colTitles = ['Date', 'Time', 'Food / Symptom', 'Protein (g) / Comment'];
		for(var index = 0; index < history.length; index++) {
			var entry = history[index];
			var proteinCurrent = parseFloat(entry.protein) * parseFloat(entry.quantity);
			var dateTime = "" + entry.datetime;
			var dateTimeParts = dateTime.split(' ');
			rows[index] = new Array('' + dateTimeParts[0], '' + dateTimeParts[1], '' + entry.foodname, '' + proteinCurrent);
		}
		
		for(var indexSymptoms = history.length; indexSymptoms < history.length + symptoms.length; indexSymptoms++) {
			var entry = symptoms[indexSymptoms - history.length];
			var comment = entry.comment;
			var dateTime = "" + entry.datetime;
			var dateTimeParts = dateTime.split(' ');
			rows[indexSymptoms] = new Array('' + dateTimeParts[0], '' + dateTimeParts[1], '' + entry.symptom, '' + comment);
		}
	} else if(presentedParameter == "Fluid (ml)") {
		colTitles = ['Date', 'Time', 'Food / Symptom', 'Fluid (ml) / Comment'];
		for(var index = 0; index < history.length; index++) {
			var entry = history[index];
			var fluidCurrent = parseFloat(entry.fluid) * parseFloat(entry.quantity);
			var dateTime = "" + entry.datetime;
			var dateTimeParts = dateTime.split(' ');
			rows[index] = new Array('' + dateTimeParts[0], '' + dateTimeParts[1], '' + entry.foodname, '' + fluidCurrent);
		}
		
		for(var indexSymptoms = history.length; indexSymptoms < history.length + symptoms.length; indexSymptoms++) {
			var entry = symptoms[indexSymptoms - history.length];
			var comment = entry.comment;
			var dateTime = "" + entry.datetime;
			var dateTimeParts = dateTime.split(' ');
			rows[indexSymptoms] = new Array('' + dateTimeParts[0], '' + dateTimeParts[1], '' + entry.symptom, '' + comment);
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
		//TODO sort by date in descending order
		sortByPattern: function(col_num, val) {
			if (col_num != 1) return val;

			return String(val).replace(/$|%|#/g, '');
		}
	});
}