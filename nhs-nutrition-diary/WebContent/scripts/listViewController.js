// when build the pages include list please import this file in your html 
// the $(document).ready() is the demo how to use listViewController


// the functionalities fo listViewController
// some list need to load data to initialise list
//-------- the code below is the demo of how to use functions inside list view controller
// $(document).ready(function(){
// 	var data = ["Bowen","Virk","John","Robert"];
// 	var classes ="test";
// 	$('#list').initList(data,classes);
// 	$(document).on('click','#update',function(){
// 		$('#list').addItem('DEAN',data,classes);
// 	})
// })

function loadData() {
	var request = new Request(headers,data,method,url);
	
	return getResponse(request);
}

jQuery.fn.extend({
	addItem:function(newItem,data,classes) {
		data.push(newItem);
		$(this).updateList(data,classes);
	},

	initList:function(data,classes) {
		$(this).updateList(data,classes);
	},

	deleteItem:function(item,data,classes) {
		var selectItem = item;
		data.splice(selectItem.index(),1);
		$(this).updateList(data,classes);
	},

	updateList:function(data,classes) {
		var list = $(this)
		list.empty();
		$.each(data, function(index,name) {
			var li = $('<li>', {
				"class":classes,
				"text":name,
				"id":index
			});
			list.append(li);
			list.addElements;
		});
	},
	addElements:function(elements){
		var target = $(this);
		
		$.each(elements,function(element){
			
			target.append(elements);
			
			
		});
		// extend this method to add more element in the li
	}
	
});

function submit(data) {
	var request = new Request(headers,data,method,url);
	updateData(request);
}
