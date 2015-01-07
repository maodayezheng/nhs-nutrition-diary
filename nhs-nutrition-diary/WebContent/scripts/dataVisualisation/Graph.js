function manageGraph(presentedParameter, dateFrom, dateTo) {
	
	var validator = new Validator();
	if(!validator.datesAreValid(dateFrom, dateTo)) {
		alert("Dates are not valid. Either wrong format or to is older than from.");
		return false;
	}
	
	var userId = SubmitController.prototype.getUserID();
	
	var dateFromFormatted = SubmitController.prototype.formatDateOnly(dateFrom);
	var dateToFormatted = SubmitController.prototype.formatDateOnly(dateTo);
	
	/*var historyRequestJSON = {
			"action": "get",
			"table": "userfoodmanifest",
			"where": "userid,=," + userId + ",datetime,>=," + dateFromFormatted + " 00:00:00," + "datetime,<=," + dateToFormatted + " 23:59:59"
	};
	var history = ServerDBAdapter.prototype.get(historyRequestJSON);
	console.log(history);*/
	
	var history = 
		[
			{
				"Date": new Date(2014, 0, 15, 0, 0, 0, 0), "timestamp":"20140115", "calories":345, "protein":20, "fluid":100, "weight":80
			},
			{ 
				"Date": new Date(2014, 0, 16, 0, 0, 0, 0), "timestamp":"20140116", "calories":500, "protein":30, "fluid":250, "weight":75
			},
			{
				"Date": new Date(2014, 0, 17, 0, 0, 0, 0), "timestamp":"20140117", "calories":127, "protein":13, "fluid":400, "weight":78
			},
			{
				"Date": new Date(2014, 0, 18, 0, 0, 0, 0), "timestamp":"20140118", "calories":470, "protein":66, "fluid":480, "weight":72
			},
			{
				"Date": new Date(2014, 0, 25, 0, 0, 0, 0), "timestamp":"20140125", "calories":500, "protein":35, "fluid":300, "weight":68
			}  
		];
	
	makeGraph(presentedParameter, dateFrom, dateTo, history);
}

//TODO draw requirements as well

function makeGraph(presentedParameter, dateFrom, dateTo, history) {
	/*var caloriesCurrent = 0;
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
	*/
	
	$('#table').html("");
	$('#summary').html("");
	d3.select("svg").text("");
	
	var parseDate = d3.time.format("%Y%m%d").parse;
	
	var vis = d3.select("#graph"),
    	WIDTH = 800,
    	HEIGHT = 300,
    	MARGINS = {
			top: 20,
			right: 20,
			bottom: 20,
			left: 50
    	},
    	
        xRange = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right]).domain([
            d3.min(history, function(d) {
            	return parseDate(d.timestamp);
            }),
    	    d3.max(history, function(d) {
    	    	return parseDate(d.timestamp);
    	    })
    	]),
    	
    	yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([
            d3.min(history, function(d) {
            	if(presentedParameter == "Calories (kcal)")
            		return d.calories;
            	else if(presentedParameter == "Protein (g)")
            		return d.protein;
            	else if(presentedParameter == "Fluid (ml)")
            		return d.fluid;
            	else if(presentedParameter == "Weight (kg)")
            		return d.weight;
            }),
            d3.max(history, function(d) {
            	if(presentedParameter == "Calories (kcal)")
            		return d.calories;
            	else if(presentedParameter == "Protein (g)")
            		return d.protein;
            	else if(presentedParameter == "Fluid (ml)")
            		return d.fluid;
            	else if(presentedParameter == "Weight (kg)")
            		return d.weight;
			})
        ]),
        
        xAxis = d3.svg.axis()
        	.scale(xRange)
        	.tickSize(5)
        	.tickSubdivide(true)
        	.tickFormat(d3.time.format('%b %d')),
        
        yAxis = d3.svg.axis()
        	.scale(yRange)
        	.tickSize(5)
        	.orient('left')
        	.tickSubdivide(true);
	 
	vis.append('svg:g')
	  .attr('class', 'x axis')
	  .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
	  .call(xAxis);
	 
	vis.append('svg:g')
	  .attr('class', 'y axis')
	  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
	  .call(yAxis)
	.append("text")
    	.attr("transform", "rotate(-90)")
    	.attr("y", -50)
    	.attr("dy", ".71em")
    	.attr("x", -20)
    	.style("text-anchor", "end")
    	.text(presentedParameter);
	
	var lineFunc = d3.svg.line()
	  .x(function(d) {
	    return xRange(parseDate(d.timestamp));
	  })
	  .y(function(d) {
		  if(presentedParameter == "Calories (kcal)")
			  return yRange(d.calories);
      	else if(presentedParameter == "Protein (g)")
			  return yRange(d.protein);
      	else if(presentedParameter == "Fluid (ml)")
			  return yRange(d.fluid);
      	else if(presentedParameter == "Weight (kg)")
			  return yRange(d.weight);
	  })
	  .interpolate('linear');
	
	vis.append('svg:path')
	  .attr('d', lineFunc(history))
	  .attr('stroke', 'blue')
	  .attr('stroke-width', 2)
	  .attr('fill', 'none');
	
	d3.select('svg').attr("width", "100%").attr("height", 500);
}






/* code below is not working properly -- trying to make the makeGraph OO */
/* currently not needed */
/*
function Graph(presentedParameter) {
	this.presentedParameter = presentedParameter;
}

Graph.prototype.create = function() {
	//TODO code for creating a graph goes here
	d3.select("svg").text("");
	
	var history = retrieveData();
	
	var parseDate = d3.time.format("%Y%m%d").parse;
	
	var vis = d3.select("#graph"),
    	WIDTH = 800,
    	HEIGHT = 300,
    	MARGINS = {
			top: 20,
			right: 20,
			bottom: 20,
			left: 50
    	},
    	
        xRange = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right]).domain([
            d3.min(history, function(d) {
            	return parseDate(d.timestamp);
            }),
    	    d3.max(history, function(d) {
    	    	return parseDate(d.timestamp);
    	    })
    	]),
    	
    	yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([
            d3.min(history, function(d) {
            	if(this.presentedParameter == "Calories (kcal)")
            		return d.calories;
            	else if(this.presentedParameter == "Protein (g)")
            		return d.protein;
            	else if(this.presentedParameter == "Fluid (ml)")
            		return d.fluid;
            	else if(this.presentedParameter == "Weight (kg)")
            		return d.weight;
            }),
            d3.max(history, function(d) {
            	if(this.presentedParameter == "Calories (kcal)")
            		return d.calories;
            	else if(this.presentedParameter == "Protein (g)")
            		return d.protein;
            	else if(this.presentedParameter == "Fluid (ml)")
            		return d.fluid;
            	else if(this.presentedParameter == "Weight (kg)")
            		return d.weight;
			})
        ]),
        
        xAxis = d3.svg.axis()
        	.scale(xRange)
        	.tickSize(5)
        	.tickSubdivide(true)
        	.tickFormat(d3.time.format('%b %d')),
        
        yAxis = d3.svg.axis()
        	.scale(yRange)
        	.tickSize(5)
        	.orient('left')
        	.tickSubdivide(true);
	 
	vis.append('svg:g')
	  .attr('class', 'x axis')
	  .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
	  .call(xAxis);
	 
	vis.append('svg:g')
	  .attr('class', 'y axis')
	  .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
	  .call(yAxis)
	.append("text")
    	.attr("transform", "rotate(-90)")
    	.attr("y", -50)
    	.attr("dy", ".71em")
    	.attr("x", -20)
    	.style("text-anchor", "end")
    	.text(this.presentedParameter);
	
	var lineFunc = d3.svg.line()
	  .x(function(d) {
	    return xRange(parseDate(d.timestamp));
	  })
	  .y(function(d) {
		  if(this.presentedParameter == "Calories (kcal)")
			  return yRange(d.calories);
      	else if(this.presentedParameter == "Protein (g)")
			  return yRange(d.protein);
      	else if(this.presentedParameter == "Fluid (ml)")
			  return yRange(d.fluid);
      	else if(this.presentedParameter == "Weight (kg)")
			  return yRange(d.weight);
	  })
	  .interpolate('linear');
	
	vis.append('svg:path')
	  .attr('d', lineFunc(history))
	  .attr('stroke', 'blue')
	  .attr('stroke-width', 2)
	  .attr('fill', 'none');
	
}

Graph.prototype.updateView = function(visualisation) {
	//TODO this updates the html element in history.html
}

function retrieveData() {
	var data = [
	    {
		 	  "timestamp":"20140115",
			  "calories":345,
			  "protein":20,
			  "fluid":100,
			  "weight":80
		},
		{
		 	  "timestamp":"20140116",
			  "calories":500,
			  "protein":30,
			  "fluid":250,
			  "weight":75
		},
		{
		 	  "timestamp":"20140117",
			  "calories":127,
			  "protein":13,
			  "fluid":400,
			  "weight":78
		},
		{
		 	  "timestamp":"20140118",
			  "calories":470,
			  "protein":66,
			  "fluid":480,
			  "weight":72
		},
		{
		 	  "timestamp":"20140125",
			  "calories":220,
			  "protein":35,
			  "fluid":300,
			  "weight":68
		}
	]
	
	return data;
}*/