 $(function() {
    $( "#datepicker" ).datepicker();
       
	$('#datetimepicker1').datetimepicker({
		  datepicker:false,
		  format:'H:i',
		  step:15
		});
 });