//please import this file if you need 
//-------demo-----------
/* the demo below show how to use the function in this file

  $(document).ready(function(){

	
  	$('#test').append(createDeleteButton());// create a delete Button
 	$('#test').append(createControlButton('addButton'));//create a add Button
  	$('#test').append(createControlButton('reduceButton'));// create a reduce Button
  	$('#test').append(createAccountButton());// create a account Button
 	 
  	var items = [button,button,button,button];//delcare the items in control panel first
 	$('#test').addControlPanel(items);// create a control panel

   $(document).on('click','[type=add]',function(){
 		var controlledElement = $(this).siblings('selector');

 		});

  $(document).on('click','[type=reduce]',function(){
 	var controlledElement = $(this).siblings('selector');
 		});

 $(document).on('click','[type=delete]',function(){
	var deleteItem = $(this).closest('selector');
	 $(document).remove(deleteItem);
 		});


  });*/

jQuery.fn.extend({

addControlPanel:function(items){
	var controlPanel = $('<div>',{
		"class":"btn-group btn-group-xs",
		"role":"group",
		"aria-label":"...",
	});
	$.each(items,function(index){
		controlPanel.append(items[index]);
	});

	$(this).append(controlPanel);
}
});


var deleteButton = $('<button>',{
	"class":"btn btn-danger",
	"id":"deleteButton"
}).append($('<span>',{
	"class":"glyphicon glyphicon-trash"
}));



var increaseButton  = $('<button>',{
"class":"btn btn-default btn",
"name":"increaseButton",
"text":"+"
});

var reduceButton =$('<button>',{
"class":"btn btn-default btn",
"name":"reduceButton",
"text":"-"		
});

var accountButton  = $('<button>',{
	"class":"btn btn-default btn",
	"name":"accountButton",
	"disabled":true
});


function createCheckBox(){
	
	
	var checkBox = $('<input>',{
			"type":"checkbox",
			"checked":"checked"
	});
	
}



























