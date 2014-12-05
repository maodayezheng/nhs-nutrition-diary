 $(function() {
    $( ".date" ).datepicker({ dateFormat: 'dd/mm/yy' });
       
	$('.time').datetimepicker({
		  datepicker:false,
		  format:'H:i',
		  step:30
		});
 });