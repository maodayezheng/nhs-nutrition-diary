/**
 * Created by Vikram Bakshi on 02/12/2014.
 * This .js file creates a database which is stored locally by the user. The database defines the following object stores/tables:
 * 1) foodListTable - This contains all of the foods available from the FSA database along with nutritional values. When a user searches for a food they will consult this object store.
 * 2) userFoodListTable - Will contain any custom foods created by the user.
 * 3) symptomListTable - This contains all of the symptoms which are pre-build into the application (provided by the staff at Guys and St Thomas' NHS Trust).
 * 4) userSymptomListTable - Will contain any custom symptoms created by the user.
 * 5) foodManifest - Will contain data entered by the user relating to the foods/fluids they have consumed.
 * 6) symptomManifest - Will contain data entered by the user relating to the symptoms they have suffered.
 * 7) weightManifest - Will contain data entered by the user relating to their weight.
 * 8) requirementsManifest - This will contain the requirements (calories, protein in grams, etc.) of the user. Requirements can change depending on the weight entry and activity level of the user.
 * 9) syncToServer - This table will log the entries made in any of manifests and will send them to the server so it can accurately reflect any changes.
 *                   After the server updates this table's entries will be cleared. An internet connection is required for this.
 *
 * Resources used: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB - Mozilla tutorial for IndexedDB
 *                 JavaScript: The Definitive Guide, 6th Edition, (ISBN #978-0596805524). Copyright 2011 by David Flanagan. Code examples - specifically Example 22-15: pp. 708-712
 *                 http://www.smashingmagazine.com/2014/09/02/building-simple-cross-browser-offline-todo-list-indexeddb-websql/ - Tutorial containing good examples of code use with IndexedDB.
 * Comments in source code below are my own. 
 * 
 */

/**
 * Constructor for the LocalDb which implements the singleton pattern. This is to make sure only one LocalDb instantiation takes place.   
 * Implementation based on code from 'JavaScript Patterns by Stoyan Stefanov ISBN #978-0596806750' p.175.
 */
function LocalDb() 
{
	var instance; //cached instance
	
	LocalDb = function LocalDb() // rewritten constructor 
	{
		return instance;
	};
	
	LocalDb.prototype = this; // carry over the prototype properties
	instance = new LocalDb(); //the instance
	instance.constructor = LocalDb; //reset the constructor pointer
	return instance;
}