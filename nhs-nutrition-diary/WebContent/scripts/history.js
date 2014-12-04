/* currently not needed
function makeGraph(presentedParameter) {
	var graph = new Graph(presentedParameter);
	graph.create();
}
*/

function getDates() {
	var from = document.getElementById("datepickerFrom").value;
	var to = document.getElementById("datepickerTo").value;
	
	alert("beforeValidator");
	//TODO problem is that Validator cannot be found
	var validator = new Validator();
	alert("beforeValidation");
	if(!validator.validateDates(from, to)) {
		alert('Dates not valid!');
		return false;
	}
alert("afterValidation");
alert('Dates are valid!');
	
	return new Array(from, to);
}

function makeGraph(presentedParameter) {
	d3.select("svg").text("");

	var dates = getDates();

	if(dates == false) {
		return false;
	}
	
	var database = new LocalDbSingleton();
	var jsonInput = database.get(dates[0], dates[1]);
	
	var parseDate = d3.time.format("%Y%m%d").parse;
	
	var vis = d3.select("#visualisation"),
    	WIDTH = 800,
    	HEIGHT = 300,
    	MARGINS = {
			top: 20,
			right: 20,
			bottom: 20,
			left: 50
    	},
    	
        xRange = d3.time.scale().range([MARGINS.left, WIDTH - MARGINS.right]).domain([
            d3.min(jsonInput, function(d) {
            	return parseDate(d.timestamp);
            }),
    	    d3.max(jsonInput, function(d) {
    	    	return parseDate(d.timestamp);
    	    })
    	]),
    	
    	yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([
            d3.min(jsonInput, function(d) {
            	if(presentedParameter == "Calories (kcal)")
            		return d.calories;
            	else if(presentedParameter == "Protein (g)")
            		return d.protein;
            	else if(presentedParameter == "Fluid (ml)")
            		return d.fluid;
            	else if(presentedParameter == "Weight (kg)")
            		return d.weight;
            }),
            d3.max(jsonInput, function(d) {
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
	  .attr('d', lineFunc(jsonInput))
	  .attr('stroke', 'blue')
	  .attr('stroke-width', 2)
	  .attr('fill', 'none');
	
	d3.select('svg').attr("width", "100%").attr("height", 500);
}