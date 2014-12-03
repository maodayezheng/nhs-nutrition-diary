/**
 * 
 */

$(document).ready(function(){
	
		var data =["apple","banana","chicken","beef","peal"];
		$('#list').generateList(data);
		$('#search').autocomplete({
			source:data,
			minLength: 2,
		});
});



jQuery.fn.extend({
		
	generateList:function(data){
		var list = $(this);
		list.empty();
		$.each(data,function(index){
			var li =createBasicLi();
			var deleteButton = createDeleteButton('li');
			var accountButton = createAccountButton('1');
			var reduceButton = createReduceButton();
			var increaseButton = createIncreaseButton();
			var controlPanel = createControlPanel();
			controlPanel.addItems([reduceButton,accountButton,increaseButton]);
			li.addItemToIconPos(deleteButton);
			li.addItemToContentPos(data[index]);
			li.addItemToControlPanelPos(controlPanel);
			list.append(li);
		})
	}
	
});