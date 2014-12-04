 $(function() {
    $( ".date" ).datepicker();
       
	$('.time').datetimepicker({
		  datepicker:false,
		  format:'H:i',
		  step:30
		});
 });