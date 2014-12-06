function SubmitController() {}

SubmitController.prototype.submit = function(submitter) {
	
	switch(submitter) {
		case 'btn_submit_symptoms': this.submitSymptoms(); break;
		case 'btn_submit_weight': this.submitWeight(); break;
	}
}

SubmitController.prototype.submitSymptoms = function() {
	console.log('Submit button clicked. Transaction is prepared.');
	//TODO retrieve data that needs to be sent to server
	
	var userDate = document.getElementById('datepicker').value.split('/'); var userTime = document.getElementById('datetimepicker1').value.split(':');
	if (userDate==''||userTime=='') {alert('Please select a valid date and time'); return;}
	
	var d = new Date(userDate[2], userDate[1]-1, userDate[0], userTime[0], userTime[1], 0, 0); //format for date object: new Date(year, month (indexed from 0), day, hours, minutes, seconds, milliseconds) 

	console.log(userDate); 
	console.log(userTime); 
	console.log(d);
	//var arrayToAdd = [{name: "one"},{name: "two"},{name: "three"},{name: "four"}];
	
	//TODO submit data
//	var database = new LocalDbSingleton();
//	database.databaseOpen(LocalDbSingleton.prototype.localDbAdd, 'symptomManifestStore', arrayToAdd); //example code to add an array of objects to the specified object store (arg2)
}

SubmitController.prototype.submitWeight = function() {
	//TODO implement once html elements are defined in weight.html
	var newWeight = $('#newWeight').val();
}