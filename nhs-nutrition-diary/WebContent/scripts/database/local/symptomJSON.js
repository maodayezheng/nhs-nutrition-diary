/**
 * Created by Vikram Bakshi on 04/12/2014.
 * Purpose: This .js file's purpose is to contain the symptom list in raw JSON form which will be stored in the symptomListStore in the user's local indexedDB database.
 * The data is stored as the property of a singleton object 'SymptomListSingleton'. 
 *
 */



function SymptomListSingleton() 
{
	var instance; //cached instance
	
	SymptomListSingleton = function SymptomListSingleton() // rewritten constructor 
	{
		return instance;
	};
	SymptomListSingleton.prototype = this; // carry over the prototype properties
	instance = new SymptomListSingleton(); //the instance
	instance.constructor = SymptomListSingleton; //reset the constructor pointer
	//below are all of the object's properties. The object contains an array of JSON formatted data in the SymptomListSingleton property. 
	instance.symptomList = [{"Symptom":"Mouth sores","rate":true},
	                        {"Symptom":"Taste changes","rate":false},
	                        {"Symptom":"Difficulty swallowing","rate":true},
	                        {"Symptom":"Loss of appetite","rate":false},
	                        {"Symptom":"Acid reflux","rate":false},
	                        {"Symptom":"Nausea","rate":false},
	                        {"Symptom":"Vomiting","rate":false},
	                        {"Symptom":"Dumping syndrome","rate":false},
	                        {"Symptom":"Abdominal pain with eating","rate":true},
	                        {"Symptom":"Abdominal pain after eating","rate":true},
	                        {"Symptom":"Blaoting","rate":false},
	                        {"Symptom":"Loose stools","rate":false},
	                        {"Symptom":"Pale/oily/difficult to flush stools","rate":false},
	                        {"Symptom":"Bowels opened over 4 times a day","rate":false},
	                        {"Symptom":"Constipation","rate":false}];	
	return instance;
}


