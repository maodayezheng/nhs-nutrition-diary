/**
 * Created by Vikram Bakshi on 02/12/2014.
 * This .js file creates a database which is stored locally by the user. The database defines the following object stores:
 * 1) foodListStore - This contains all of the foods available from the FSA database along with nutrition values. When a user searches for a food they will consult this object store.
 * 2) userFoodListStore - Will contain any custom foods created by the user.
 * 3) symptomListStore - This contains all of the symptoms which are pre-build into the application (provided by the staff at Guys and St Thomas' NHS Trust).
 * 4) userSymptomListStore - Will contain any custom symptoms created by the user.
 * 5) foodManifest - Will contain data entered by the user relating to the foods/fluids they have consumed.
 * 6) symptomManifest - Will contain data entered by the user relating to the symptoms they have suffered.
 * 7) weightManifest - Will contain data entered by the user relating to their weight.
 * 8) requirementsManifest - This will contain the requirements (calories, protein in grams, etc.) of the user. Requirements can change depending on the weight entry and activity level of the user.
 * 9) syncToServer - This Store will log the entries made in any of manifests and will send them to the server so it can accurately reflect any changes.
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
	instance.version =1; //indexedDB version number
	return instance;
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
	var db = LocalDbSingleton.db;
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
function displayResults(result)
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
 */
LocalDbSingleton.prototype.databaseOpen = function(callback)
{
    this.begin = Date.now(); 
    var dbName = this.dbName, db = this.db, version = this.version; 
    var foodListStore = 'foodListStore', userFoodListStore = 'userFoodListStore', symptomListStore = 'symptomListStore', userSymptomListStore = 'userSymptomListStore', foodManifestStore = 'foodManifestStore';
    var symptomManifestStore = 'symptomManifestStore', weightManifestStore = 'weightManifestStore', requirementsManifestStore = 'requirementsManifestStore', syncToServerStore = 'syncToServerStore';
    
    var request = indexedDB.open(dbName, version);

    request.onupgradeneeded = function(event) //will run the first time the database is created or if the version has been updated.
    {
        db = event.target.result; 
        event.target.transaction.onerror = databaseError;

        /* The following creates the Store/object store 'foodListStore' using the food-code as the primary key. It then creates indexes for
         * the food code and food name as lower case. Apart from the primary key all indexes can be repeated and so are non unique.*/
        if(!db.objectStoreNames.contains(this.foodListStore)) //this check is needed so that if the db version is incremented in the future, those users who already have the Store do not duplicate it.
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
            var userFoodList = db.createObjectStore(userFoodListStore, { keyPath: 'EntryNumber', autoIncrement: true }); //key should be combination of user uniqueID, food-ID, and Store auto-generated key.
            userFoodList.createIndex("Date", "Date", { unique: false });
        }
        if(!db.objectStoreNames.contains(symptomListStore)) //Store 3. Contains the symptoms given by the staff at Guy's
        {
           var symptomList = db.createObjectStore(symptomListStore, { keyPath: 'FoodCode' });
        }
        if(!db.objectStoreNames.contains(userSymptomListStore)) //Store 4. Will contain any custom created symptoms by the user.
        {
           var userSymptomList = db.createObjectStore(userSymptomListStore, { keyPath: 'Date' });
        }
        if(!db.objectStoreNames.contains(foodManifestStore)) //Store 5
        {
            //var foodManifest = db.createObjectStore(foodManifest, { keyPath: 'FoodCode' });
            //foodManifest.createIndex("Date", "Date", { unique: false }); //Adding this index so as to allow fast retrieval/addition to the object store by date.

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
        this.db = event.target.result; console.log(this.db); 
        LocalDbSingleton.db = event.target.result; console.log(LocalDbSingleton.db);
        
        db.onversionchange = function(event)
        {
            event.target.close(); //close the database connection if successful (DELETE COMMENT AFTER TESTING)
        };
        callback();
    };
    request.onerror = databaseError;
}

/**
 * Function prints error to the console if the database encounters one. 
 * @param event
 */

function databaseError(event)
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


//BELOW CODE FOR TESTING. DELETE ONCE COMPLETEd. 
var db1 = new LocalDbSingleton();
db1.databaseOpen(function() 
{
	var begin = db1.begin, end = parseInt(Date.now());
	var time = end-begin;
    console.log('It took '+time+' milliseconds to populate database');
    console.log('Database created and populated successfully.');
	console.log('at callback');
});
