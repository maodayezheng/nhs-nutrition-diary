/**
 * Created by Vikram Bakshi on 02/12/2014.
 * This .js file creates a database which is stored locally by the user. The database defines the following object stores:
 * 1) userStore - Contains user details - NHS number/hospital number etc. 
 * 2) foodListStore - This contains all of the foods available from the FSA database along with nutrition values. When a user searches for a food they will consult this object store.
 * 3) userFoodListStore - Will contain any custom foods created by the user.
 * 4) symptomListStore - This contains all of the symptoms which are pre-build into the application (provided by the staff at Guys and St Thomas' NHS Trust).
 * 5) userSymptomListStore - Will contain any custom symptoms created by the user.
 * 6) foodManifest - Will contain data entered by the user relating to the foods/fluids they have consumed.
 * 7) symptomManifest - Will contain data entered by the user relating to the symptoms they have suffered.
 * 8) weightManifest - Will contain data entered by the user relating to their weight.
 * 9) requirementsManifest - This will contain the requirements (calories, protein in grams, etc.) of the user. Requirements can change depending on the weight entry and activity level of the user.
 * 10) syncToServer - This Store will log the entries made in any of manifests and will send them to the server so it can accurately reflect any changes.
 *                   After the server updates this Store's entries will be cleared. An internet connection is required for this.
 *
 * Resources used: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB - Mozilla tutorial for IndexedDB
 *                 JavaScript: The Definitive Guide, 6th Edition, (ISBN #978-0596805524). Copyright 2011 by David Flanagan. Code examples - specifically Example 22-15: pp. 708-712
 *                 http://www.smashingmagazine.com/2014/09/02/building-simple-cross-browser-offline-todo-list-indexeddb-websql/ - Tutorial containing good examples of code use with IndexedDB.
 * Comments in source code below are my own. 
 * 
 */

/**
 * Constructor for the LocalDbSingleton which implements the singleton pattern. This is to make sure only one LocalDbSingleton instantiation takes place and any further
 * use of the 'new' keywords results in a reference to the singleton. Implementation based on code from 'JavaScript Patterns' by Stoyan Stefanov 
 * ISBN #978-0596806750 p.145.
 */
function LocalDbSingleton() 
{
	var instance; //cached instance
	
	LocalDbSingleton = function LocalDbSingleton() // rewritten constructor 
	{
		return instance;
	};
	LocalDbSingleton.prototype = this; // carry over the prototype properties
	instance = new LocalDbSingleton(); //the instance
	instance.constructor = LocalDbSingleton; //reset the constructor pointer
	//below are all of the object's properties. The names of object stores are stored in variables to make re-factoring easier later. 
	instance.dbName = 'appetiteLocalStore'; instance.db ='';
	instance.version = 1; //indexedDB version number
	instance.foodListStore = 'foodListStore'; instance.userFoodListStore = 'userFoodListStore'; instance.symptomListStore = 'symptomListStore'; instance.userSymptomListStore = 'userSymptomListStore'; 
	instance.foodManifestStore = 'foodManifestStore'; instance.symptomManifestStore = 'symptomManifestStore'; instance.weightManifestStore = 'weightManifestStore'; 
	instance.requirementsManifestStore = 'requirementsManifestStore'; instance.syncToServerStore = 'syncToServerStore'; 
	instance.syncToServerArray = []; //for the databaseAdd method.
	return instance;
}


//////////////////////////////////////This function contains dummy data for testing at the moment. To be implemented in the future. 
/**
 * Returns all objects in a object store which are contained within a given date interval.
 * @param oStore   The object store the caller wishes to return results from.
 * @param dateFrom The date from which the caller wishes to receive data from.
 * @param dateTo   The date to which the caller wishes to receive data from.
 */

LocalDbSingleton.prototype.get = function(oStore, dateFrom, dateTo)
{
	return [
	    	    {
	    		 	  "timestamp":"20140115",
	    			  "calories":345,
	    			  "protein":20,
	    			  "fluid":100,
	    			  "weight":80
	    		},
	    		{
	    		 	  "timestamp":"20140116",
	    			  "calories":500,
	    			  "protein":30,
	    			  "fluid":250,
	    			  "weight":75
	    		},
	    		{
	    		 	  "timestamp":"20140117",
	    			  "calories":127,
	    			  "protein":13,
	    			  "fluid":400,
	    			  "weight":78
	    		},
	    		{
	    		 	  "timestamp":"20140118",
	    			  "calories":470,
	    			  "protein":66,
	    			  "fluid":480,
	    			  "weight":72
	    		},
	    		{
	    		 	  "timestamp":"20140125",
	    			  "calories":220,
	    			  "protein":35,
	    			  "fluid":300,
	    			  "weight":68
	    		}
	    	];
	    	
}
////////////////////////////////////////////End of testing code block




//TODO Decide on how to create a uniqueID for each entry in the manifests and user tables. //Think it is done. 
//TODO Change the raw JSON food data so it is not a global but enclosed within a function. Do the same with the symptom List.
//TODO Finalise the add function (can only be done once unique ID is sorted).
//TODO Create and finalise a delete element function. 
//TODO Add add property (see comment in localDBAdd function for loop).  
//TODO Finish this TODO list. 


/**This function places the objects contained in the array argument in the specified object store. It then recursively calls itself to place the same objects in the
 * syncToServer object store. In the case of the recursive call each object is added with the additional property of what store they were initially added to.   
 * @param oStore			This is the object store in the local indexedDB database you would like to add your JS objects to.
 * @param arrayOfObjects	This is an array containing the objects you would like to add to the local database. 
 */
LocalDbSingleton.prototype.localDbAdd = function(oStore, arrayOfObjects) 
{
	var _this=this; //storing object reference for binding purposes.  
	var syncToServerArray = []; var db = this.db;
	var objectStore = db.transaction([oStore], "readwrite").objectStore(oStore);
	var dbAdditionRequest;

	if (!(oStore===_this.syncToServerStore))
	{
		for (var i in arrayOfObjects) 
	    {
			dbAdditionRequest = objectStore.add(arrayOfObjects[i]);
			syncToServerArray[i]= arrayOfObjects[i];
			syncToServerArray[i].details = 'getTheUniqueId'+'-'+'ADD'+'-'+oStore; //uniqueID-ADD-Ostore delimitted by'-' stored as a property for each object. 
	    }
		dbAdditionRequest.onerror = function(e) 
		{
		    console.log("Error",e.target.error.name);
		}
		dbAdditionRequest.onsuccess = function(e) 
		{
		    console.log("Added first objects");
		    _this.localDbAdd(_this.syncToServerStore,syncToServerArray); //recursive call. 
		}
	}
	else 
	{
		console.log('made to recursive call');
		for (var i in arrayOfObjects) 
	    {
			dbAdditionRequest = objectStore.add(arrayOfObjects[i]); 	
	    }
		console.log('added the items');
		
		dbAdditionRequest.onerror = function(e) 
		{
		    console.log("Error",e.target.error.name);
		}
		dbAdditionRequest.onsuccess = function(e) 
		{
		    console.log("Added the recursive objects");
		}
	}
}


/**
 * This function is used to search any object store in the database. You provide the key you are searching for, the object store you want to search in and the index
 * you are searching through - all as strings.  
 * and the index you are searching through - all as strings. 
 * @param key		The key you are searching for.
 * @param oStore	The object store you are searching in. 
 * @param index		The index in the object store which you are searching in. 
 * @param callback	The callback function you will run once the asynchronous call is finished e.g. displayResults(results).
 */
LocalDbSingleton.prototype.databaseSearch = function(key, oStore, index, callback)
{
	var db = this.db;
	var results = []; 
    var keywords= key.toLowerCase(); //The search terms should be lower case as search is case sensitive. 
	console.log("Searching For "+keywords);
    
    var objectStore = db.transaction(oStore, "readonly").objectStore(oStore); //open a transaction on the specified objectStore e.g. foodListStore
    var index = objectStore.index(index); //create the index you are searching for. For example if searching the foodListTable, your index could be FoodNamelc.
    var boundKeyRange = IDBKeyRange.bound(key, key+'\uffff', true, true); //Credit: http://stackoverflow.com/a/8961462/52160
    index.openCursor(boundKeyRange).onsuccess = function (event)
    {
        var cursor = event.target.result;
        if (cursor)
        {
            results.push(cursor.value);
            cursor['continue']();   
        } else {
            console.log("Got all results");
            callback(results);
        }
    };
}

/**
 * This function is intended to be a callback to the asynchronous databaseSearch function. It displays the results of the search in a table by 
 * appending HTML to a predefined div. 
 * @param result This is an array containing the results from the databaseSearch method. 
 */
LocalDbSingleton.prototype.displayResults = function(result)
{
    var results = result;
    document.getElementById("tableOfResults").innerHTML = '';
    console.log("in display result");
    var resultsTable='<table class="resultsTable" align="center"> <tr> <th>Food Name</th> <th>Quantity (g/ml)</th>  <th>Calories (kcal)</th> ' +
                    '<th>Protein (g)</th> <th>Water Fluid (ml)</th></tr>'; //column labels for the table
    for (var i=0; i<results.length; i++)
    {
        resultsTable += '<tr> <td>'+results[i].FoodName+'</td> <td>'+results[i].EdibleProportion+'</td> <td>'+results[i]["Energy.kcal"]+'</td> ' +
                        '<td>'+results[i]["Protein.g"]+'</td> <td>'+results[i]["Water.g"]+'</td> </tr>'; //add a table row for each result
        document.getElementById("tableOfResults").innerHTML = resultsTable;

    }
    resultsTable =+'</table>';
}


/**
 * The first time this function is called (or if the version number is incremented) the 'onupgradeneeded' event handler will run and the 
 * object stores will be created. Indexes are then made to make it easier to search the database.
 * @param callback	Function you wish to call once this asynchronous method completes. e.g. dispayResults. 
 */
LocalDbSingleton.prototype.databaseOpen = function(callback)
{
    var _this = this; //storing reference for use in by embedded functions as closure. 
	this.begin = Date.now();
	var dbName = this.dbName, db = this.db, version = this.version; 
    var foodListStore = this.foodListStore, userFoodListStore = this.userFoodListStore, symptomListStore = this.symptomListStore, userSymptomListStore = this.userSymptomListStore, foodManifestStore = this.foodManifestStore;
    var symptomManifestStore = this.symptomManifestStore, weightManifestStore = this.weightManifestStore, requirementsManifestStore = this.requirementsManifestStore, syncToServerStore = this.syncToServerStore;
    
    var request = indexedDB.open(dbName, version);

    request.onupgradeneeded = function(event) //will run the first time the database is created or if the version has been updated.
    {
        db = event.target.result; 
        event.target.transaction.onerror = _this.databaseError;
        
        if(!db.objectStoreNames.contains(foodListStore)) //this check is needed so that if the db version is incremented in the future, those users who already have the Store do not duplicate it.
        {
            var foodList = db.createObjectStore(foodListStore, { keyPath: 'FoodCode' });
            foodList.createIndex("FoodCode", "FoodCode", { unique: true });
            foodList.createIndex("FoodNamelc", "FoodNamelc", { unique: false });
            foodList.transaction.oncomplete = function(event)
            {
                var foodDataStore = db.transaction(foodListStore, "readwrite").objectStore(foodListStore); //begin transaction.
                console.log("Starting to populate the foodListStore.");
                for (var i in foodData) 
                {
                   foodData[i].FoodNamelc = foodData[i]["FoodName"].toLowerCase();
                   foodDataStore.add(foodData[i]);
                }
                console.log(foodListStore+" Initialisation Complete!");
            }
        }
        if(!db.objectStoreNames.contains(userFoodListStore)) //Store 2. Will contain any custom food created by the user.
        {
            var userFoodList = db.createObjectStore(userFoodListStore, {keyPath: 'EntryNumber', autoIncrement: true }); 
            userFoodList.createIndex('Date', 'Date', { unique: false });
            userFoodList.createIndex('userFoodListId', 'userFoodListId', { unique: true });
        }
        if(!db.objectStoreNames.contains(symptomListStore)) //Store 3. Contains the symptoms given by the staff at Guy's
        {
           var symptomList = db.createObjectStore(symptomListStore, {keyPath: 'id', autoIncrement: true });
           symptomList.createIndex('Symptom', 'Symptom', {unique: true});
           symptomList.transaction.oncomplete = function(event)
           {
               var symptomDataStore = db.transaction(symptomListStore, "readwrite").objectStore(symptomListStore); 
               console.log("Starting to populate the symptomListStore."); 
               var symptomListObject = new SymptomListSingleton(); //instantiate the symptomListSingleton to put the symptoms in the store.
               for (var i in symptomListObject.symptomList)
               {
            	   console.log(symptomListObject.symptomList[i]);
            	   //symptomListObject.symptomList[i]['EntryNumber']= '';
            	   symptomDataStore.add(symptomListObject.symptomList[i]);
               }
               console.log(symptomListStore+" Initialisation Complete!");
           }  
        }
        if(!db.objectStoreNames.contains(userSymptomListStore)) //Store 4. Will contain any custom created symptoms by the user.
        {
           var userSymptomList = db.createObjectStore(userSymptomListStore, { keyPath: 'Date' });
        }
        if(!db.objectStoreNames.contains(foodManifestStore)) //Store 5
        {
            //TODO update
        	var foodManifest = db.createObjectStore(foodManifestStore, { keyPath: 'FoodCode' });
            foodManifest.createIndex("Date", "Date", { unique: false }); //Adding this index so as to allow fast retrieval/addition to the object store by date.

        }
        if(!db.objectStoreNames.contains(symptomManifestStore)) //Store 6
        {
          //  var symptomManifest = db.createObjectStore(foodManifestStore, { keyPath: 'FoodCode' });
            //symptomManifestStore.createIndex("Date", "Date", { unique: false }); //Adding this index so as to allow fast retrieval/addition to the object store by date.
        }
        if(!db.objectStoreNames.contains(weightManifestStore)) //Store 7
        {
          //  var weightManifest = db.createObjectStore(weightManifestStore, { keyPath: 'FoodCode' });
            //weightManifestStore.createIndex("Date", "Date", { unique: false }); //Adding this index so as to allow fast retrieval/addition to the object store by date.
        }
        if(!db.objectStoreNames.contains(requirementsManifestStore)) //Store 8
        {
          //  var requirementsManifest = db.createObjectStore(requirementsManifestStore, { keyPath: 'FoodCode' });
          //requirementsManifestStore.createIndex("Date", "Date", { unique: false }); //Adding this index so as to allow fast retrieval/addition to the object store by date.
        }
        if(!db.objectStoreNames.contains(syncToServerStore)) //Store 9
        {
          var syncToServer = db.createObjectStore(syncToServerStore, { keyPath: 'EntryNumber', autoIncrement: true });
        } 
    };
    request.onsuccess = function(event)
    { 
        _this.db = event.target.result; 
        console.log('request on success');
        _this.db.onversionchange = function(event)
        {
            console.log('atoneversioncahnge');
        	event.target.close(); //close the database connection if successful (DELETE COMMENT AFTER TESTING)
        };
        callback();
    };
    request.onerror = this.databaseError;
}




function CreateObjectStore(dbName, storeName) {
    var request = indexedDB.open(dbName);
    request.onsuccess = function (e){
        var database = e.target.result;
        var version =  parseInt(database.version);
        database.close();
        var secondRequest = indexedDB.open(dbName, version+1);
        secondRequest.onupgradeneeded = function (e) {
            var database = e.target.result;
            var objectStore = database.createObjectStore(storeName, {
                keyPath: 'id'
            });
        };
        secondRequest.onsuccess = function (e) {
            e.target.result.close();
        }
    }
}
/*
first -> create object stores
second-> populate food store
third -> populate symptom list 


*/






/**
 * Function adds given input to selected object store
 */



/**
 * Function prints error to the console if the database encounters one. 
 * @param event
 */
LocalDbSingleton.prototype.databaseError = function(event)
{
    console.error('An IndexedDB error has occurred', event);
    console.log('Error name: '+e.target.error.name);
}

/**
 * Function is used to delete the indexedDB database from the local user's browser/hard drive. It's use is mainly for testing purposes.  
 */
LocalDbSingleton.prototype.databaseDelete = function()
{
    var req = indexedDB.deleteDatabase(this.dbName);
    var dbName = this.dbName;
    req.onsuccess = function ()
    {
        console.log("The "+dbName+ "database was deleted successfully");
    };
    req.onerror = function ()
    {
        console.log("The "+dbName+ "database was NOT deleted");
    };
    req.onblocked = function ()
    {
        console.log("Couldn't delete database due to the operation being blocked"); //occurs usually if a connection to the DB is still open.
    };
}


////////////////////////////////////////////////////////BELOW CODE FOR TESTING. DELETE ONCE COMPLETEd. 
var arrayToAdd = [{name: "one"},{name: "two"},{name: "three"},{name: "four"}]; //for testing. Delete after test. 
var db1 = new LocalDbSingleton();
db1.databaseOpen(function() 
{
	var begin = db1.begin, end = Date.now();
	var time = end-begin;
    console.log('It took '+time+' milliseconds to populate database');
    console.log('Database created and populated successfully.');
    db1.localDbAdd('userFoodListStore', arrayToAdd);
});
/////////////////////////////////////////////////// End of testing block