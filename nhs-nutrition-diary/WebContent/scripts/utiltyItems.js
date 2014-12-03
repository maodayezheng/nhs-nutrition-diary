

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
function createIncreaseButton(){
	var increaseButton  = $('<button>',{
		"class":"btn btn-default btn",
		"name":"increaseButton",
		"text":"+"
	}).bind('click',function(){

		var accountButton = $(this).siblings('[name=accountButton]');
		var portion  = parseInt(accountButton.text())+1;
		accountButton.text(portion);

	});
	return increaseButton;
	}

// constructor of reduce button
function createReduceButton(){	
	var reduceButton =$('<button>',{

		"class":"btn btn-default btn",
		"name":"reduceButton",
		"text":"-"		

	}).bind('click',function(){
		var accountButton = $(this).siblings('[name=accountButton]');
		var portion  = parseInt(accountButton.text())-1;
		if (portion <0){
			
			portion = 0;
		}
		accountButton.text(portion);

	});
	
	return reduceButton;
	}


// constructor of account button 
function createAccountButton(account){
	var accountButton  = $('<button>',{
	"class":"btn btn-default btn",
	"name":"accountButton",
	"disabled":true,
	"text":account
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
		"class":"col-md-1 iconPosition"
	})).append($('<div>',{
		"class":"col-md-9 contentPostion"
	})).append($('<div>',{
		"class":"col-md-2 controlPanelPosition"
	})));
	
	li.addItemToIconPos = function(item){
		
		var position = $(this).find('.iconPosition');
		position.append(item);	
	};
	
	li.addItemToContentPos = function(item){
		
		var position = $(this).find('.contentPostion');
		position.text(item);
	};
	
	li.addItemToControlPanelPos = function(item){
		var position = $(this).find('.controlPanelPosition');
		position.append(item);
	}

	return li;
	}






























