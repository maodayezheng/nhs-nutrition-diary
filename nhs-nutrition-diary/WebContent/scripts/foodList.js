/**
 * 
 */

$(document).ready(function(){
	
		
		$('#search').autocomplete({
			source:foodData,
			minLength: 2,
		});
		$('#myMeal').click(function(){
			
			$('modalBody')
		});
	$('#newFood').click(function(){
			
		
			
		});
	
	$('#frequentFood').click(function(){
		
		
		
	})
		
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