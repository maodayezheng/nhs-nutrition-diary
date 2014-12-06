/**
 * 
 */

$(document).ready(function(){
	
	var data =new FoodDataSingleton().foodData;
			$('#search').autocomplete({
			source:function (request, response) {
            var term = $.ui.autocomplete.escapeRegex(request.term)
                , startsWithMatcher = new RegExp("^" + term, "i")
                , startsWith = $.grep(data, function(value) {
                    return startsWithMatcher.test(value.label || value.value || value);
                })
                , containsMatcher = new RegExp(term, "i")
                , contains = $.grep(data, function (value) {
                    return $.inArray(value, startsWith) < 0 && 
                        containsMatcher.test(value.label || value.value || value);
                });
            
            response(startsWith.concat(contains));
        },

			minLength: 2
			
		});
		$('#myMeal').click(function(){
			
			
		});
	$('#newFood').click(function(){
			
		
		});
	
	$('#frequentFood').click(function(){
		
	})
	
	$('#deleteButton').click(function(){
		console.log(this.index);
		
	});
		
});




$(function(){
	/*$.ui.autocomplete.prototype._renderMenu =function(ul,items){
		
		
		console.log(items);
		
	}*/
	
	
	
	
	
})
