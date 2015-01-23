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
	var Tablename;
	var name;
	
	
	
	switch(presentedParameter){
		case "Weight (kg)":
			tableName = "userweightmanifest";
			type = "weight";
			break;
		case "symptom":
			tableName = "usersymptommanifest";
			type = "symptom";
			break;
	default:
		tableName = "userfoodmanifest";
		type="foodname";
		break;
	
	}
	this.drawHeader(type,presentedParameter);
	
	var requestJSON ={
			"action": "get",
			"table": tableName,
			"where": "userid,=," + userId + ",datetime,>=," + dateFromFormatted + " 00:00:00," + "datetime,<=," + dateToFormatted + " 23:59:59"
	};
	
	history = ServerDBAdapter.prototype.get(requestJSON);
	
	/*
	
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
		alert(history);
		var symptomsRequestJSON = {
				"action": "get",
				"table": "usersymptommanifest",
				"where": "userid,=," + userId + ",datetime,>=," + dateFromFormatted + " 00:00:00," + "datetime,<=," + dateToFormatted + " 23:59:59"
		};
		symptoms = ServerDBAdapter.prototype.get(symptomsRequestJSON);
	}*/
	
	/*this.drawTable(presentedParameter, dateFrom, dateTo, history, symptoms);*/
	
	this.drawTable(presentedParameter, dateFrom, dateTo, history,type);
}



Table.prototype.drawTable = function(presentedParameter, dateFrom, dateTo, history,type){
	
	//d3.select('#graph').attr("width", 0).attr("height", 0);
	/*
	 * date time food/symptom 
	 */
	var items = history;
	var itemName = type;
	$('#date-col').empty();
	$('#main-body').empty();
	$.each(history,function(index,data){
		var dateTime = data['datetime'].split(' ');
		var date = dateTime[0];
		var time = dateTime[1];
		var name = data[type];
		var value = data[presentedParameter];
		Table.prototype.drawTableBody(date,time,name,value);
	});
}


Table.prototype.drawHeader = function(name,presentedParameter){
	
	$('#table-header').empty();
	$('#table-header').append('<th>Date</th>');
	$('#table-header').append('<th>'+"Time"+'</th>');
	$('#table-header').append('<th>'+name+'</th>');
	$('#table-header').append('<th>'+presentedParameter+'</th>');
	
}

Table.prototype.drawTableBody = function(date,time,name,presentedParameter){
	$('#main-body').append('<tr><td>'+date+'</td><td>'+time+'</td><td>'+name+'</td><td>'+presentedParameter+'</td></tr>');
	
}
/*Table.prototype.drawTable = function(presentedParameter, dateFrom, dateTo, history, symptoms) {
	$('#summary').html("");
	d3.select('#graph').attr("width", 0).attr("height", 0);
	
	if(symptoms == null) {
		//TODO handle empty symptoms
	}
	
	var colTitles = new Array();
	var rows = new Array();
	
	if(presentedParameter == "Calories (kcal)") {
		colTitles = ['Date', 'Time', 'Food / Symptom', 'Calories (kcal) / Comment'];
		for(var index = 0; index < history.length; index++){
			var entry = history[index];
			var caloriesCurrent = parseFloat(entry.energy_kcal) * parseFloat(entry.quantity);
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
			var proteinCurrent = parseFloat(entry.protein_g) * parseFloat(entry.quantity);
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
			var fluidCurrent = parseFloat(entry.water_g) * parseFloat(entry.quantity);
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
	});*/
