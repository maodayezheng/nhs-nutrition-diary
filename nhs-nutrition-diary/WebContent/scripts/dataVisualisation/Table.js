function Table() {}

Table.prototype.drawTable = function(presentedParameter, dateFrom, dateTo) {
	
	var validator = new Validator();
	if(!validator.datesAreValid(dateFrom, dateTo)) {
		alert("Dates are not valid. Either wrong format or to is older than from.");
		return false;
	}
	
	$('#summary').html("");
	d3.select("svg").html("");
	
	var database = new LocalDbSingleton();
	var jsonInput = database.get(dateFrom, dateTo);
	
	var block = $('#table').TidyTable({
		//enableCheckbox: true,
		//enableMenu:     true
	},
	{
		columnTitles: ['Number', 'Column A', 'Column B', 'Column C', 'Column D', 'Column E'],
		columnValues: [
			['1', '1A', '1B', '1C', '1D', '1E'],
			['2', '2A', '2B', '2C', '2D', '2E'],
			['3', '3A', '3B', '3C', '3D', '3E'],
			['4', '4A', '4B', '4C', '4D', '4E'],
			['5', '5A', '5B', '5C', '5D', '5E']
		],

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