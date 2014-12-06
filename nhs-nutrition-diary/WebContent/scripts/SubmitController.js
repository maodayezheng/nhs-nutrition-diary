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
	
	//alert($('#symptomList li.selected label').text());//.attr('text'));
	
	//alert($('#symptomList').toArray().value);
	//alert($('#symptomList li').eq($(this).val()-1).text());
	//alert($('#symptomList').each(symptoms));//.attr('value'));
	//var arrayToAdd = [{name: "one"},{name: "two"},{name: "three"},{name: "four"}];
	
	//TODO submit data
//	var database = new LocalDbSingleton();
//	database.databaseOpen(LocalDbSingleton.prototype.localDbAdd, 'symptomManifestStore', arrayToAdd); //example code to add an array of objects to the specified object store (arg2)
}

SubmitController.prototype.submitWeight = function() {
	//TODO implement once html elements are defined in weight.html
	var newWeight = $('#newWeight').val();
}