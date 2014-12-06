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
	
	//Gathering the date and time. 
	var userDate = document.getElementById('datepicker').value.split('/'), userTime = document.getElementById('datetimepicker1').value.split(':');
	if (userDate==''||userTime=='') {alert('Please select a valid date and time'); return;}
	var date = new Date(userDate[2], userDate[1]-1, userDate[0], userTime[0], userTime[1], 0, 0); //format for date object: new Date(year, month (indexed from 0), day, hours, minutes, seconds, milliseconds) 

	//dummy data to play with	
	var symptomSubmitTestData = [{"Symptom": "Mouth Sores"}, {"Symptom":"Headache", "Rating": 5}    
	                             ];
	
	//add the date object to each symptom object (needed for the getters)
	for (var i in symptomSubmitTestData)
	{
		symptomSubmitTestData[i]['Date'] =date;
		console.log(symptomSubmitTestData[i]);
	}
	console.log(symptomSubmitTestData);
	
	//var arrayToAdd = [{name: "one"},{name: "two"},{name: "three"},{name: "four"}];
	
	//TODO submit data
	var database = new LocalDbSingleton();
	database.databaseOpen(LocalDbSingleton.prototype.localDbAdd, 'symptomManifestStore', symptomSubmitTestData); //example code to add an array of objects to the specified object store (arg2)
}

SubmitController.prototype.submitWeight = function() {
	//TODO implement once html elements are defined in weight.html
	var newWeight = $('#newWeight').val();
}