/**
 * Created by Vikram Bakshi on 26/11/2014.
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
 

	const dbName = "appetiteLocalStore"; 
    var db; // defined globally so that event.target.result can be assigned to db in any function.
    
    //The following declarations and initialisations refer to tables as variable names to make re-factoring easier in the future.
    var foodListTable = 'foodListTable', userFoodListTable = 'userFoodListTable', symptomListTable = 'symptomListTable', userSymptomListTable = 'userSymptomListTable', foodManifestTable = 'foodManifestTable';
    var symptomManifestTable = 'symptomManifestTable', weightManifestTable = 'weightManifestTable', requirementsManifestTable = 'requirementsManifestTable', syncToServerTable = 'syncToServerTable';
    var begin, end; //Variables used to see how long it takes to populate the database.

    databaseOpen(dbInitialise);
    
    /*
     * dbInitialise is the callback function defined for specific use with databaseOpen. It outputs the time in milliseconds that was taken to 
     * open/populate the database. 
     */
    function dbInitialise() //will create DB if it does not exit.
    {
        end=Date.now();
        var time = end-begin;
        console.log('It took '+time+' milliseconds to populate database');
        console.log('Database created and populated successfully.');
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
     * This function is used to search any object store in the database. You provide the key you are searching for, the object store you want to search in and the index
     * you are searching through - all as strings.  
     * and the index you are searching through - all as strings. 
     * @param key		The key you are searching for.
     * @param oStore	The object store you are searching in. 
     * @param index		The index in the object store which you are searching in. 
     * @param callback	The callback function you will run once the asynchronous call is finished e.g. displayResults(results).
     */
    function databaseSearch(key, oStore, index, callback)
    {
    	var results = []; 
        var keywords= key.toLowerCase(); //The search terms should be lower case as search is case sensitive. 
    	console.log("Searching For "+keywords);
        
        var objectStore = db.transaction(oStore, "readonly").objectStore(oStore); //open a transaction on the specified objectStore e.g. foodListTable
        var index = objectStore.index(index); //create the index you are searching for. For example if searching the foodListTable, your index could be FoodNamelc.
        var boundKeyRange = IDBKeyRange.bound(key, key+'\uffff', true, true); //Credit: http://stackoverflow.com/a/8961462/52160
        index.openCursor(boundKeyRange).onsuccess = function (event)
        {
            var cursor = event.target.result;
            if (cursor)
            {
                results.push(cursor.value);
                cursor.continue(); //Eclipse and other IDEs may report this as an error. It is NOT. continue() is explicitly used on examples from W3 and Mozilla.  
            } else {
                console.log("Got all results");
                callback(results);
            }
        };
	}
    
    /**
    * This function is used to return all the data in a given object store between (and including) a certain date interval. 
    * @param oStore		The object store results will be taken from.  
    * @param dateFrom	Argument can be left blank. This is required when searching between an interval.
    * @param dateTo 	Argument can be left blank. This is required when searching between an interval.
    */
    function databaseGet(oStore, dateFrom, dateTo)
    {
    	
    }
    
    
    function databaseAdd(oStore) 
    {
    	var objectStore = db.transaction(oStore, "readwrite").objectStore(oStore);
    	
    	//Define a person
    	var person = {
    	    name:name,
    	    email:email,
    	    created:new Date()
    	}
    	 
    	//Perform the add
    	var additionRequest = store.add(person,100);
    	
    	additionRequest.onerror = function(e) {
    	    console.log("Error",e.target.error.name);
    	    //some type of error handler
    	}
    	 
    	additionRequest.onsuccess = function(e) {
    	    console.log("Woot! Did it");
    	}
    	
    	
    }



    
    /**
     * When this function is called for the first time/when the version number is incremented the 'onupgradeneeded' event handler will run and the 
     * object stores will be created. Indexes are then made to make it easier to search the database.
     */
    function databaseOpen(callback)
    {
        begin = Date.now(); //Used (along with 'end') to measure time taken to initialise the database.
        var version = 1;
        var request = indexedDB.open(dbName, version);

        request.onupgradeneeded = function(event) //will run the first time the database is created or if the version has been updated.
        {
            db = event.target.result;
            event.target.transaction.onerror = databaseError;

            /* The following creates the table/object store 'foodListTable' using the food-code as the primary key. It then creates indexes for
             * the food code and food name as lower case. Apart from the primary key all indexes can be repeated and so are non unique.*/
            if(!db.objectStoreNames.contains(foodListTable)) //this check is needed so that if the db version is incremented in the future, those users who already have the table do not duplicate it.
            {
                var foodList = db.createObjectStore(foodListTable, { keyPath: 'FoodCode' });
                foodList.createIndex("FoodCode", "FoodCode", { unique: true });
                //foodList.createIndex("FoodName", "FoodName", { unique: false }); //not needed as searches will conducted under FoodNamelc (lower case). Left here for easy addition if needed when testing.
                foodList.createIndex("FoodNamelc", "FoodNamelc", { unique: false });
                foodList.transaction.oncomplete = function(event)
                {
                    var foodDataStore = db.transaction(foodListTable, "readwrite").objectStore(foodListTable); //begin transaction.
                    console.log("Starting to populate the foodListTable.");
                    for (var i in foodData) 
                    {
                        foodData[i].FoodNamelc = foodData[i]["FoodName"].toLowerCase();
                        foodDataStore.add(foodData[i]);
                    }
                    console.log(foodListTable+" Initialisation Complete!");
                }
            }

            if(!db.objectStoreNames.contains(userFoodListTable)) //table 2. Will contain any custom food created by the user.
            {
                var userFoodList = db.createObjectStore(userFoodListTable, { keyPath: 'FoodCode' }); //key should be combination of user uniqueID, food-ID, and table auto-generated key.
                userFoodList.createIndex("Date", "Date", { unique: false });
            }

            if(!db.objectStoreNames.contains(symptomListTable)) //table 3. Contains the symptoms given by the staff at Guy's
            {
               var symptomList = db.createObjectStore(symptomListTable, { keyPath: 'FoodCode' });
            }
            if(!db.objectStoreNames.contains(userSymptomListTable)) //table 4. Will contain any custom created symptoms by the user.
            {
               var userSymptomList = db.createObjectStore(userSymptomListTable, { keyPath: 'FoodCode' });
            }
            if(!db.objectStoreNames.contains(foodManifestTable)) //table 5
            {
                //var foodManifest = db.createObjectStore(foodManifest, { keyPath: 'FoodCode' });
                //foodManifest.createIndex("Date", "Date", { unique: false }); //Adding this index so as to allow fast retrieval/addition to the object store by date.

            }
            if(!db.objectStoreNames.contains(symptomManifestTable)) //table 6
            {
              //  var symptomManifest = db.createObjectStore(foodManifestTable, { keyPath: 'FoodCode' });
                //symptomManifestTable.createIndex("Date", "Date", { unique: false }); //Adding this index so as to allow fast retrieval/addition to the object store by date.
            }
            if(!db.objectStoreNames.contains(weightManifestTable)) //table 7
            {
              //  var weightManifest = db.createObjectStore(weightManifestTable, { keyPath: 'FoodCode' });
                //weightManifestTable.createIndex("Date", "Date", { unique: false }); //Adding this index so as to allow fast retrieval/addition to the object store by date.
            }
            if(!db.objectStoreNames.contains(requirementsManifestTable)) //table 8
            {
              //  var requirementsManifest = db.createObjectStore(requirementsManifestTable, { keyPath: 'FoodCode' });
              //requirementsManifestTable.createIndex("Date", "Date", { unique: false }); //Adding this index so as to allow fast retrieval/addition to the object store by date.
            }
            if(!db.objectStoreNames.contains(syncToServerTable)) //table 9
            {
              //var syncToServer = db.createObjectStore(syncToServerTable, { keyPath: 'FoodCode' });
            }

        };

        request.onsuccess = function(event)
        {
            db = event.target.result;

            db.onversionchange = function(event)
            {
                event.target.close(); //close the database connection if successful (DELETE AFTER TESTING)
            };
            callback();
        };
        request.onerror = databaseError;
    }

    function databaseError(event)
    {
        console.error('An IndexedDB error has occurred', event);
        console.log('Error name: '+e.target.error.name);
    }
    
    /**
     * Function is used to delete the indexedDB database from the local user's browser/hard drive. It's use is mainly for testing purposes.  
     */
    function databaseDelete()
    {
        var req = indexedDB.deleteDatabase(dbName);
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

    $(document).ready(function(){
    	$("#searchTerms").on("keyup", function(e)
            {
              var value = $(this).val();
              console.log("in$searchTerms");
              if (value.length>2)
              {
                databaseSearch(value, foodListTable, 'FoodNamelc',displayResults);
              }
            });});