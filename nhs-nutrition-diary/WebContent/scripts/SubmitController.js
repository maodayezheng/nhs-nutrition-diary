function SubmitController() {}

SubmitController.prototype.submit = function(submitter) {
	if(submitter == "btn_submit_symptoms") {
		console.log('Submit button clicked. Transaction is prepared.');

		var database = new LocalDbSingleton();
		//TODO retrieve data that needs to be sent to server
		var arrayToAdd = [{name: "one"},{name: "two"},{name: "three"},{name: "four"}];
		//TODO submit data
		database.databaseOpen(LocalDbSingleton.prototype.localDbAdd, 'symptomManifestStore', arrayToAdd); //example code to add an array of objects to the specified object store (arg2) 
	}
}
