function SubmitController() {}

SubmitController.prototype.submit = function(submitter) {
	
	switch(submitter) {
		case 'btn_submit_symptoms': this.submitSymptoms(); break;
		case 'btn_submit_weight': this.submitWeight(); break;
	}
}

SubmitController.prototype.submitSymptoms = function() {
	//TODO submit data
}

SubmitController.prototype.submitWeight = function() {
	var table = "weightmanifest"; 
	
	//TODO retrieve user id
	var userid = 1;
	var datetime = $('#datetime').val();
	var weight = $('#weight').val();
	
	var data = JSON.stringify(Array(userid, datetime, weight));
	var dataToServer = Array(data, table);
	alert("before stringify");
	ServerDBAdapter.prototype.submit(dataToServer, "save");
	alert("after stringify");
}