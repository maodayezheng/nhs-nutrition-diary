

jQuery.fn.extend({

	//add more items to a target DOM
	addItems:function(items){
		var target = $(this);
		$.each(items,function(index){
			target.append(items[index]);
		});
			}
});




// constructor of deleteButton target is the delete target
function createDeleteButton(target){
	var deleteButton = $('<button>',{
	"class":"btn btn-danger btn-xs",
	"id":"deleteButton"
	}).bind('click',function(){
		var item = $(this).closest($(target));
		item.remove();
	}).append($('<span>',{
	"class":"glyphicon glyphicon-trash"
	}));
	return deleteButton;
	}

// constructor of control panel
function createControlPanel(){
	var controlPanel = $('<div>',{
		"class":"btn-group btn-group-xs controlPanel",
		"role":"group",
		"aria-label":"...",
	});
		return controlPanel;
	}


// constructor of increaseButton
function createIncreaseButton(food){
	var increaseButton  = $('<button>',{
		"class":"btn btn-default btn",
		"name":"increaseButton",
		"text":"+"
	}).data('food',food).bind('click',function(){

		var accountButton = $(this).siblings('[name=accountButton]');
		var food = $(this).data('food');
		food.portion = food.portion +1;
		accountButton.text(food.portion);

	});
	return increaseButton;
	}

// constructor of reduce button
function createReduceButton(food){	
	var reduceButton =$('<button>',{

		"class":"btn btn-default btn",
		"name":"reduceButton",
		"text":"-"		

	}).data('food',food).bind('click',function(){
		var accountButton = $(this).siblings('[name=accountButton]');
		var food = $(this).data('food');
		food.portion = food.portion -1;
		 
		if (food.portion <1){
			food.portion = 1;
		}
		console.log(food);
		accountButton.text(food.portion);
	});
	
	return reduceButton;
	}


// constructor of account button 
function createAccountButton(food){
	
	var accountButton  = $('<button>',{
	"class":"btn btn-default btn",
	"name":"accountButton",
	"disabled":true,
	"text":food.portion
	});
	return accountButton;
}


// constructor of basic <li> DOM in our project
function createBasicLi(){
	var li = $('<li>',{
		"class":"list-group-item",
	}).append($('<div>',{
		"class":"row",
	}).append($('<div>',{
		"class":"col-md-6 left"
	})).append($('<div>',{
		"class":"col-md-6 right"
	})));
	
	li.addItemToLeft = function(item){
		var position = $(this).find('.left');
		position.append(item);	
	};
	
	li.addItemToRight = function(item){
		var position = $(this).find('.right');
		position.append(item);
	}
	return li;
	}




























