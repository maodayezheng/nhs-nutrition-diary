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
	//TODO implement once html elements are defined in weight.html
	var newWeight = $('#newWeight').val();
}