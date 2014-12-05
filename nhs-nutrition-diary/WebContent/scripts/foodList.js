/**
 * 
 */

$(document).ready(function(){
	
	var data =new FoodDataSingleton().foodData;
	console.log(data[1].label);
	
		$('#search').autocomplete({
			minLength: 2,
			source:data
		});
		$('#myMeal').click(function(){
			
			$('modalBody')
		});
	$('#newFood').click(function(){
			
		
		});
	
	$('#frequentFood').click(function(){
		
	})
	
	$('#deleteButton').click(function(){
		console.log(this.index);
		
	});
		
});

jQuery.fn.extend({
		
	generateList:function(data){
		var list = $(this);
		list.empty();
		$.each(data,function(index){
			
			var li =createBasicLi();
			
			var deleteButton = createDeleteButton('li');
			var accountButton = createAccountButton(data[index]);
			var reduceButton = createReduceButton(data[index]);
			var increaseButton = createIncreaseButton(data[index]);
			var controlPanel = createControlPanel();
			controlPanel.addItems([reduceButton,accountButton,increaseButton]);
			li.addItemToIconPos(deleteButton);
			li.addItemToControlPanelPos(controlPanel);
			list.append(li);
		
		})
	}
	
});