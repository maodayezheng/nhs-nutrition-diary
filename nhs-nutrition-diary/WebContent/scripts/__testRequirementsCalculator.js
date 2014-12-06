$(document).ready(function(){
  $("button").click(function(){

  		  var age = $("#age").val();
        var weight= $("#weight").val();
        var proteinRequirements = weight*0.17*6.25;

        if (age>60){
        var fluidRequirements = weight*35
        }else{
          var fluidRequirements = weight*30
        }


       if( "input[value='female']" ){
       		       
        if (age<17) {var kcalRequirements = 692 + weight*13.4}
        	else if (age>17 && age <30) {var kcalRequirements = 487 + weight*14.8}
        	else if (age>29 && age <60) {var kcalRequirements = 846 + weight*8.3}
        	else if (age>59 && age <75) {var kcalRequirements = 687 + weight*9.8}
        	else if(age>74) {var kcalRequirements = 624 + weight*8.3};
    }

     if ("input[value='male']"){

    	       if (age<17) {var kcalRequirements = 657 + weight*17.7}
        	else if (age>17 && age <30) {var kcalRequirements = 692 + weight*15.1}
        	else if (age>29 && age <60) {var kcalRequirements = 873 + weight*11.5}
        	else if (age>59 && age <75) {var kcalRequirements = 700 + weight*11.9}
        	else if(age>74) {var kcalRequirements = 820 + weight*8.3};
    }
        
        
    $("p").html(kcalRequirements + " calories."
      + proteinRequirements + " g protein. " 
    	+ fluidRequirements + " mls fluid. " 
     );

    var requiremntsObject = [kcalRequirements, proteinRequirements, fluidRequirements];

  });
});

