/**
 * 
 */

$(document).ready(function(){
	
	// load data
	var data =new FoodDataSingleton().foodData;
	var customMeals =["John Sandwich","Virk Super Sandwich","Robert Germany Sandwich","Bowen Dumpling"];
	var frequentFood = [data[3],data[100],data[90],data[102]];
	// TODO replace customMeals and frequentFood with real data
	// search 
	
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
			select:function(event,ui){
				var selection = ui.item;
				displaySelection(selection);
			},
			minLength: 3,
			
		});
			
	// click events		
		$('#myMeals').click(function(){
			$('.modal-title').text("My meals");
			loadCustomMealView(customMeals)
		});
		
	$('#newFood').click(function(){
			$('.modal-title').text("New food");
			loadNewFoodView();
		});
	
	$('#frequentFood').click(function(){
		$('.modal-title').text("Frequent food");
		loadFrequentFoodView(frequentFood);
	});
	
	$('#nav-button').click(function(){
		
		console.log("NAV BUTTON CLICKED");
		
	});
	
	$('#toggle-button').click(function(){
		
		console.log("TOGGLE CLICKED");
		
	})
	
	//TODO submission of New food and customised meal
	//TODO evaluate frequent food
});

function compareWithCurrentSelections(selection){
	
	var present = false;
	var children = $('.selection-list').children('li');
		children.each(function(index,item){
			var obj= $(item);
			var currentSelection = obj.data('data');
			if(currentSelection.label === selection.label){
				present = true;
			}
		});
	return present;
}

function updateNutritionBreakDown(){
	var children = $('.selection-list').children('li');
	var protein =0;
	var calories = 0;
	var fluid = 0;
	children.each(function(index,item){
		var obj = $(item);
		var food = obj.data('data');
		console.log(food);
		var portion = food['portion'];
		
		protein += portion*parseNutritionData(food['Protein.g']);
		fluid += portion*parseNutritionData(food['Water.g']);
		calories +=portion*parseNutritionData(food['Energy.kcal']);
	});
	
	$('#calories').text(calories);
	$('#protein').text(protein);
	$('#fluid').text(fluid);
}

function parseNutritionData(nutrition){
	
	return (nutrition ==="N")? 0:parseInt(nutrition);
	
}

function loadNewFoodView(data){
	
	$('.modal-body').empty();
	var form = $('<form>',{
		"class":"form-newFood",
	}).appendTo('.modal-body');
	
	var nameField = $('<input>',{
		"class":"form-control",
		"type":"text",
		"id":"newFoodName",
		"placeholder":"Food name",
	}).appendTo(form);
	
	var amountField = $('<input>',{
		"class":"form-control",
		"type":"text",
		"id":"newFoodProportion",
		"placeholder":"Edible proportion (e.g. 1 slice)"
	}).appendTo(form);
	
	var carloriesField = $('<input>',{
		"class":"form-control",
		"type":"text",
		"id":"newFoodCalories",
		"placeholder":"Calories (kcal)"
	}).appendTo(form);
	
	var protienField = $('<input>',{
		"class":"form-control",
		"type":"text",
		"id":"newFoodProtein",
		"placeholder":"Protein (g)"
	}).appendTo(form);
	
	var fluidField =$('<input>',{
		"class":"form-control",
		"type":"text",
		"id":"newFoodFluid",
		"placeholder":"Fluid (ml)"
	}).appendTo(form);
}

function loadFrequentFoodView(data){
	
	$('.modal-body').empty();
	var list = $('<ul>',{
		"class":"list-group",
		"role":"menu"
	});
	$.each(data,function(index){
		var li =$('<li>',{
			"class":"list-group-item",
			"text":data[index].label	
		}).data('data',data[index]).bind('click',function(){
			displaySelection(data[index]);
		});
		li.appendTo(list);
	})
	
	$('.modal-body').append(list);
}


function loadCustomMealView(data){
	
	$('.modal-body').empty();
	var list = $('<ul>',{
		"class":"list-group",
		"role":"menu"
	});
	$.each(data,function(index){
		var li =$('<li>',{
			"class":"list-group-item",
			"text":data[index]	
		}).data('data',data[index]).bind('click',function(){
			//displaySelection(data[index]);
			// TODO parse the meal JSON
		});
		li.appendTo(list);
	})
	
	$('.modal-body').append(list);
}

function displaySelection(selection){
	
	selection['portion'] = 1;
	if(!compareWithCurrentSelections(selection)){
			
		var li = new createBasicLi(selection);
		var controlPanel = new createControlPanel();
		var deleteButton = new createDeleteButton('li');
		deleteButton.bind('click',updateNutritionBreakDown);
		var reduceButton = new createReduceButton(selection);
		reduceButton.bind('click',updateNutritionBreakDown);
		var accountButton = new createAccountButton(selection);
		var increaseButton = new createIncreaseButton(selection);
		increaseButton.bind('click',updateNutritionBreakDown);
		controlPanel.addItems([reduceButton,accountButton,increaseButton]);
		li.addItemToLeft(deleteButton);
		var displayContent = selection.label +" (" +parseInt(selection.EdibleProportion)*100 +" g)";
		li.addItemToLeft(displayContent);
		li.addItemToRight(controlPanel);
		$('.selection-list').append(li);
		updateNutritionBreakDown();
		}else{
			alert("Selection already in list");
		}
}

// render the search result here
$(function(){
	
	/*$.ui.autocomplete.prototype._renderMenu =function(ul,items){
		console.log(items);
	}*/
	
	//$.ui.autocomplete.prototype._renderItemData = function(){}
	
	//$.ui.autocomplete.prototype._renderItem = function(table, item) {}
	
})