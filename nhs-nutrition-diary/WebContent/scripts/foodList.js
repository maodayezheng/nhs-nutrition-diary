/**
 * 
 */

$(document).ready(function(){
	
	// load data
	var data =new FoodDataSingleton().foodData;
	console.log(OnLoad.prototype.load('foodList'));
	console.log(OnLoad.prototype.load('userFoodList'));
	
	// search 
			$('#search').autocomplete({
			source:function (request, response) {
            var term = $.ui.autocomplete.escapeRegex(request.term);
            // remove unnecessary search result 
                startsWithMatcher = new RegExp("^" + term, "i");
                console.log(term);
                 startsWith = $.grep(data, function(value) {
                    return startsWithMatcher.test(value.label);
                });
            response(startsWith);
        },
			select:function(event,ui){
				var selection = ui.item;
				displaySelection(selection);
			},
			minLength: 3,
			
		});
			
	// click events		
		$('#myMeals').click(function(){
			loadCustomMealView()
		});
		
	$('#newFood').click(function(){
			loadNewFoodView();
		});
	
	$('#newMeal').click(function(){
		loadSaveMealView();
	});
	
	$('#frequentFood').click(function(){
		loadFrequentFoodView();
	});
	
	
	$('#searchButton').click(function() {
		$('#search').focus();
	    $('#search').autocomplete('search');
	});
	
	
	
	//TODO evaluate frequent food
});

function compareWithCurrentSelections(selection){
	console.log(selection);
	var present = false;
	var children = $('.selection-list').children('li');
		children.each(function(index,item){
			var obj= $(item);
			var currentSelection = obj.data('data');
			if(currentSelection.label === selection.label){
				currentSelection.portion = currentSelection.portion+selection.portion;
				var accountButton = obj.find('[name=accountButton]');
				accountButton.text(currentSelection.portion);
				updateNutritionBreakDown();
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
		protein += portion*parseNutritionData(data['Protein.g']);
		fluid += portion*parseNutritionData(data['Water.g']);
		calories +=portion*parseNutritionData(data['Energy.kcal']);
	});
	
	$('#calories').text(calories);
	$('#protein').text(protein);
	$('#fluid').text(fluid);
}

function parseNutritionData(nutrition){
	
	return (isNaN(parseInt(nutrition)))? 0:parseInt(nutrition);
	
}

function loadNewFoodView(){
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
	var doneButton = $('.modal-button');
		doneButton.unbind('click');
		doneButton.attr('id','btn_submit_newFood');
		doneButton.bind('click',function(){SubmitController.prototype.submit(this.id)});
}

function loadFrequentFoodView(){
	
	// amend this function along with DB.php's function to return the 10 most frequent foods
	var data = OnLoad.prototype.frequentFoods();
	
	// change the title of the modal
	$('#modal-info-title').text("Frequent food");
	
	// construct new body of the modal
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
	
	// construct new footer of 
	var doneButton = $('.modal-button');
		doneButton.attr('id','btn_frequentFood');
		doneButton.unbind('click');
		
}


function loadCustomMealView(){
	
	var userId = SubmitController.prototype.getUserID();
	var mealsRequestJSON = {
			"action": "get",
			"table": "usermeallist",
			"where": "userid,=," + userId//,
			//"group": "GROUP BY mealname"
	};
	
	var data = ServerDBAdapter.prototype.get(mealsRequestJSON);

	$('#modal-info-title').text("My meals");
	// construct body
	$('#modal-info-body').empty();
	var list = $('<ul>',{
		"class":"list-group",
		"role":"menu"
	}).appendTo('#modal-info-body');
	$.each(data,function(index){
		var li =$('<li>',{
			"class":"list-group-item",
			"text":	data[index].mealname
		}).data('data',data).bind('click',function(){
			var mealComponents = OnLoad.prototype.mealComponents(data[index].mealname);
			console.log(mealComponents);
			$.each(mealComponents,function(index){
				var component = mealComponents[index];
				var food ={};
				food["id"] = component["id"]
				food["EdibleProportion"]= component["edibleproportion"];
				food["Energy.kcal"] = component["calories"];
				food["Fat.g"] = component["fat"];
				food["FoodCode"] = component["foodid"];
				food["Protein.g"]= component["protein"];
				food["Water.g"]= component["fluid"];
				food["label"]= component["foodname"];
				food["portion"]= parseInt(component["quantity"]);
				displaySelection(food);
			});
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
		"placeholder":"Meal name",
	}).appendTo(form);
	// construct new footer
	$('#modal-info-footer').empty();
	var doneButton = $('<button>',{
		"type":"button",
		"class":"btn btn-success",
		"data-dismiss":"modal",
		"text":"Save",
		"id":"btn_save_meals"
	}).bind('click',function(){
		SubmitController.prototype.submitMeal(this.id);
	}).appendTo('#modal-info-footer');
}

function displaySelection(selection){
	
	if(!selection.hasOwnProperty('portion')){
		selection["portion"] = 1;
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
		var amount = " (" +parseInt(selection.EdibleProportion)*100 +" g)";
		var displayContent = "  "+selection.label +amount;
		li.addItemToLeft(displayContent);
		li.addItemToRight(controlPanel);
		$('.selection-list').append(li);
		updateNutritionBreakDown();
		
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
