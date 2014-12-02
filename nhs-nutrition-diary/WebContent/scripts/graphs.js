$(document).ready(function() {
	$("#datepicker").datepicker();
});

function showDate() {
	document.getElementById("datepicker").datepicker();
}

function makeGraph(presented) {
	var database = new Database();
	database.get(null, null, null);
	
//	alert('bla');
//	Database.get(null, null, null);
	
	
	d3.select("svg").text("");
	
	var jsonInput = retrieveData();
	
	var parseDate = d3.time.format("%Y%m%d").parse;
	
	var vis = d3.select("#visualisation"),
    	//WIDTH = 800,
    	//HEIGHT = 300,
    	//MARGINS = {
//			top: 20,
//			right: 20,
//			bottom: 20,
//			left: 50
//    	},
    	
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
            	if(presented == "Calories (kcal)")
            		return d.calories;
            	else if(presented == "Protein (g)")
            		return d.protein;
            	else if(presented == "Fluid (ml)")
            		return d.fluid;
            	else if(presented == "Weight (kg)")
            		return d.weight;
            }),
            d3.max(jsonInput, function(d) {
            	if(presented == "Calories (kcal)")
            		return d.calories;
            	else if(presented == "Protein (g)")
            		return d.protein;
            	else if(presented == "Fluid (ml)")
            		return d.fluid;
            	else if(presented == "Weight (kg)")
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
    	.text(presented);
	
	var lineFunc = d3.svg.line()
	  .x(function(d) {
	    return xRange(parseDate(d.timestamp));
	  })
	  .y(function(d) {
		  if(presented == "Calories (kcal)")
			  return yRange(d.calories);
      	else if(presented == "Protein (g)")
			  return yRange(d.protein);
      	else if(presented == "Fluid (ml)")
			  return yRange(d.fluid);
      	else if(presented == "Weight (kg)")
			  return yRange(d.weight);
	  })
	  .interpolate('linear');
	
	vis.append('svg:path')
	  .attr('d', lineFunc(jsonInput))
	  .attr('stroke', 'blue')
	  .attr('stroke-width', 2)
	  .attr('fill', 'none');
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
}