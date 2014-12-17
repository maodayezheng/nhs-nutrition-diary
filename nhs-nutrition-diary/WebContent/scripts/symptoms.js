$(document).ready(function () {
	
/* This function creates the bootstrap style check boxes
 * call "setUpCheckbox" on $('.list-group.checked-list-box .list-group-item') */
	
    var setUpCheckbox = function() {
		
		 $('.list-group.checked-list-box .list-group-item').each(function () {
		        // Settings
		        var $widget = $(this),
		            $checkbox = $('<input type="checkbox" class="hidden"/>'),
		            color = ($widget.data('color') ? $widget.data('color') : "primary"),
		            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
		            settings = {
		                on: {
		                    icon: 'glyphicon glyphicon-check'
		                },
		                off: {
		                    icon: 'glyphicon glyphicon-unchecked'
		                }
		            };
		            
		        $widget.css('cursor', 'pointer')
		        $widget.append($checkbox);

		        // Event Handlers
		        $widget.on('click', function () {
		            $checkbox.prop('checked', !$checkbox.is(':checked'));
		            $checkbox.triggerHandler('change');
		            updateDisplay();
		        });
		        $checkbox.on('change', function () {
		            updateDisplay();
		        });
		          
		        // Actions
		        function updateDisplay() {
		            var isChecked = $checkbox.is(':checked');

		            // Set the button's state
		            $widget.data('state', (isChecked) ? "on" : "off");

		            // Set the button's icon
		            $widget.find('.state-icon')
		                .removeClass()
		                .addClass('state-icon ' + settings[$widget.data('state')].icon);

		            // Update the button's color
		            if (isChecked) {
		                $widget.addClass(style + color + ' active');
		            } else {
		                $widget.removeClass(style + color + ' active');
		            }
		        }
		        

		        function init() {
		            
		            if ($widget.data('checked') == true) {
		                $checkbox.prop('checked', !$checkbox.is(':checked'));
		            }
		            
		            updateDisplay();

		            // Inject the icon if applicable
		            if ($widget.find('.state-icon').length == 0) {
		                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
		            }
		        }
		        init();
		    });
	     };
	     
	/* "#saveNewSymptom" is used on the "symptomNotOnList page"
	 * it is used when the user enters a custom symptom 
	 * which is then appended to the $("#newSymptomList")
	 * */
	
	$("#saveNewSymptom").click(function(){	
		var symptom = $('#newSymptom').val();
		var newSymptomInList = '<li class="list-group-item" style="cursor: pointer;"><span class="state-icon glyphicon glyphicon-unchecked"></span>'+symptom+'</li>';
		$("#newSymptomList").append(newSymptomInList);	     
	     setUpCheckbox();		
	});
	
	$("#saveNewCustomSymptom").click(function(){	
		var symptom = $('#newSymptom').val();
		var newSymptomInList = '<li class="list-group-item" style="cursor: pointer;"><span class="state-icon glyphicon glyphicon-unchecked"></span>'+symptom+'</li>';
		$("#symptomListCustom").append(newSymptomInList);	     
	     setUpCheckbox();		
	});


	var symptoms = new SymptomListSingleton().symptomList;
	ko.applyBindings(new symptomsListView(symptoms));

	setUpCheckbox();
    
   // $('#get-checked-data').on('click', function(event) {
       // event.preventDefault(); 
	
	$('#revealHiddenCustomSymptoms').click(function() {
		$(".hiddenSymptomContainer").show("slow");

	});
	
	 ////////////////////////////////SUBMIT SYMPTOMS TO JSON///////////////////////////////////////////////

   $(".submitSymptoms").click(function(){
       var checkedItems = {}, counter = 0;
       $("#symptomList li.active").each(function(idx, li) {
           checkedItems[counter] = $(li).text();
           console.log($(li).text());
           counter++;
       });
       console.log(checkedItems);
       alert(JSON.stringify(checkedItems));
   });
   
   ////////////////////////////////SUBMIT NEW SYMPTOMS TO JSON///////////////////////////////////////////////
   
   $(".submitNewSymptoms").click(function(){
       var checkedItems = {}, counter = 0;
       $("#newSymptomList li.active").each(function(idx, li) {
           checkedItems[counter] = $(li).text();
           console.log($(li).text());
           counter++;
       });
       console.log(checkedItems);
       alert(JSON.stringify(checkedItems));
   });
       // $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
  //  });




	$("#saveWeight").click(function(){
		$('p').html("#currentWeight");
		//$("#currentweight").val("#number");
	});
	
	

	
	$('li').click(function(){
		var target = $(this).next(".drop-scoring");	
	$(target).slideToggle('slow');
	});

	
	
});

//---- method to combine data with DOMs----

ko.bindingHandlers.ratingScore ={
		init:function(element,valueAccessor){
			if(valueAccessor()){
			$(element).addClass("drop-scoring");
			for(var i=1;i<6;i++){
				$('<button>',{
					"text":i
				}).appendTo(element);
			}
			}
		},
		update:function(element,valueAccessor){
			
		}
};



function symptomsListView(symptoms){
		var self = this;
		this.symptoms =symptoms;
		self.ratingSection = ko.computed(function(){
		},this);
		
}




////////////////////////////////NOT USED IN SYMPTOMS//////////////////////////////
////////////////////////////////USED IN WEIGHT//////////////////////////////

$(document).on('click', '.panel-heading span.clickable', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '.panel div.clickable', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).ready(function () {
    $('.panel-heading span.clickable').click();
    $('.panel div.clickable').click();
});


$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
        placement : 'top'
    });
});

$(function() {
    var action;
    $(".number-spinner button").mousedown(function () {
        btn = $(this);
        input = btn.closest('.number-spinner').find('input');
        btn.closest('.number-spinner').find('button').prop("disabled", false);

    	if (btn.attr('data-dir') == 'up') {
            action = setInterval(function(){
                if ( input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max')) ) {
                    input.val(parseInt(input.val())+1);
                }else{
                    btn.prop("disabled", true);
                    clearInterval(action);
                }
            }, 50);
    	} else {
            action = setInterval(function(){
                if ( input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min')) ) {
                    input.val(parseInt(input.val())-1);
                }else{
                    btn.prop("disabled", true);
                    clearInterval(action);
                }
            }, 50);
    	}
    }).mouseup(function(){
        clearInterval(action);
    });
});



