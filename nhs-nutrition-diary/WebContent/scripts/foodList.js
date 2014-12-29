/**
 * 
 */

$(document).ready(function(){
	
	// load data
	var data =new FoodDataSingleton().foodData;
	var aMeal =[{"id":"meal","label":"John Sandwich","portion":1,"mealtotalcalories":400.0,"mealtotalprotien":30.3,"mealtotalfat":12.2,"mealtotalfluid":100}];
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
			loadCustomMealView(aMeal)
		});
		
	$('#newFood').click(function(){
		console.log('clicked new food');
			loadNewFoodView();
		});
	
	$('#newMeal').click(function(){
		console.log('click test');
		loadSaveMealView();
	});
	
	$('#frequentFood').click(function(){
		loadFrequentFoodView(frequentFood);
	});
	
	$('#searchButton').click(function() {
		$('#search').focus();
	    $('#search').autocomplete('search');
	});
	
	$('#checkbox_saveAsMeal').change(function(){
		var saveMeal = $(this).prop("checked");
		if(saveMeal){
			$("#modal-saveMeal").modal("show");
		}
	});
	
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
		var data = obj.data('data');
		var portion = data['portion'];
		if(data['id']==='food'){
		protein += portion*parseNutritionData(data['Protein.g']);
		fluid += portion*parseNutritionData(data['Water.g']);
		calories +=portion*parseNutritionData(data['Energy.kcal']);
		}else{
			protein += portion*parseNutritionData(data['mealtotalprotien']);
			fluid += portion*parseNutritionData(data['mealtotalfluid']);
			calories +=portion*parseNutritionData(data['mealtotalcalories']);
			
			
		}
	});
	
	$('#calories').text(calories);
	$('#protein').text(protein);
	$('#fluid').text(fluid);
}

function parseNutritionData(nutrition){
	
	return (nutrition ==="N")? 0:parseInt(nutrition);
	
}

function loadNewFoodView(data){
	// change the title
	
	$('#modal-info-title').text("New food");
	
	// construct new body
	$('#modal-info-body').empty();
	var form = $('<form>',{
		"class":"modal-form",
	}).appendTo('#modal-info-body');
	
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
	
	var amountField = $('<input>',{
		"class":"form-control",
		"type":"text",
		"id":"newFoodWeight",
		"placeholder":"Weight of edible proportion in g (e.g. 100)"
	}).appendTo(form);
	
	var caloriesField = $('<input>',{
		"class":"form-control",
		"type":"text",
		"id":"newFoodCalories",
		"placeholder":"Calories (kcal)"
	}).appendTo(form);
	
	var proteinField = $('<input>',{
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
	
	// construct new footer
	$('#modal-info-footer').empty();
	var doneButton = $('<button>',{
		"type":"button",
		"class":"btn btn-success",
		"data-dismiss":"modal",
		"text":"Done",
		"id":"btn_submit_newFood",
		"onclick":"SubmitController.prototype.submit(this.id)"
	}).appendTo('#modal-info-footer');
}

function loadFrequentFoodView(data){
	
	// change the title of the modal
	$('#modal-info-title').text("Frequent food");
	
	// construct new body of the moal
	$('#modal-info-body').empty();
	var list = $('<ul>',{
		"class":"list-group",
		"role":"menu"
	}).appendTo('#modal-info-body');
	$.each(data,function(index){
		var li =$('<li>',{
			"class":"list-group-item",
			"text":data[index].label	
		}).data('data',data[index]).bind('click',function(){
			displaySelection(data[index]);
		});
		li.appendTo(list);
	})
	
	
	// construct new footer of the 
	$('#modal-info-footer').empty();
	var doneButton = $('<button>',{
		"type":"button",
		"class":"btn btn-success",
		"data-dismiss":"modal",
		"text":"Done",
		"id":""
	}).appendTo('#modal-info-footer')
}


function loadCustomMealView(data){
	

	$('#modal-info-title').text("My meals");
	// construct body
	$('#modal-info-body').empty();
	var list = $('<ul>',{
		"class":"list-group",
		"role":"menu"
	}).appendTo('#modal-info-body');
	$.each(data,function(index,item){
		console.log(item);
		var li =$('<li>',{
			"class":"list-group-item",
			"text":	item["label"]
		}).data('data',item).bind('click',function(){
			displaySelection(item);
			// TODO parse the meal JSON
		});
		li.appendTo(list);
	})	
	//construct new footer 
	$('#modal-info-footer').empty();
	var doneButton = $('<button>',{
		"type":"button",
		"class":"btn btn-success",
		"data-dismiss":"modal",
		"text":"Done",
		"id":"button-customMeals"
	}).appendTo('#modal-info-footer');
}

function loadSaveMealView(){
	$('#modal-info-title').text("New meal");
	// construct body
	$('#modal-info-body').empty();
	var form = $('<form>',{
		"class":"modal-form",
	}).appendTo('#modal-info-body');
	
	var nameField = $('<input>',{
		"class":"form-control",
		"type":"text",
		"id":"mealName",
		"placeholder":"meal name",
	}).appendTo(form);
	// construct new footer
	$('#modal-info-footer').empty();
	var doneButton = $('<button>',{
		"type":"button",
		"class":"btn btn-success",
		"data-dismiss":"modal",
		"text":"save",
		"id":"button-saveMeals"
	}).bind('click',function(){
		console.log('save meal');
		
	}).appendTo('#modal-info-footer');
}


function displaySelection(selection){
	
	selection['portion'] = 1;
	if(selection['id']!== 'meal'){
		selection['id'] ='food';
	}
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
		var amount = '';
		if(selection['id']==='food'){
			amount = " (" +parseInt(selection.EdibleProportion)*100 +" g)";
		}
		var displayContent = selection.label +amount;
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
