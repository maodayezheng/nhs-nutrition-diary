function Table() {}

Table.prototype.drawTable = function() {
	d3.select("svg").text("");
	
	$(document).ready(function() {
		$('#table')
			.TidyTable({
				columnTitles: ['Column A', 'Column B', 'Column C', 'Column D', 'Column E'],
				columnValues: [
					['1', '1A', '1B', '1C', '1D', '1E'],
					['2', '2A', '2B', '2C', '2D', '2E'],
					['3', '3A', '3B', '3C', '3D', '3E'],
					['4', '4A', '4B', '4C', '4D', '4E'],
					['5', '5A', '5B', '5C', '5D', '5E']
				]
			});
	});
	
//	$('#table').TidyTable(options, data [columnTitles, columnValues, menuOptions, postProcess]);
	
//	var block = $('#table').TidyTable({
	/*
	$('#table').TidyTable({
		enableCheckbox: true,
		enableMenu:     true
	},
	{
		columnTitles: ['Column A', 'Column B', 'Column C', 'Column D', 'Column E'],
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
*/
	// copy the table options menu
//	var menu = $('select.tidy_table', block).clone(true);
//	block.append(menu);
//	
//	// optional animation
//	block.slideDown('fast');
}