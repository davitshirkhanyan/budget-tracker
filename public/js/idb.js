let db;
// establish a connection to IndexedDB database called 'budget' and set it to version 1
const request = indexedDB.open('budget', 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = event => {
    // save a reference to the database 
    const db = event.target.result;
    db.createObjectStore('new_budget', {
        keyPath: 'id', 
        autoIncrement: true
    });
  };

  request.onsuccess = function(event) {
    // when db is successfully created with its object store (from onupgradedneeded event above), save reference to db in global variable
    db = event.target.result;
  
    // check if app is online, if yes run checkDatabase() function to send all local db data to api
    if (navigator.onLine) {
      
    }
  };

  request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
  };

  function saveRecord(record) {
    const transaction = db.transaction('new_budget', 'readwrite');
  
    const budgetObjectStore = transaction.objectStore('new_budget');
  
    // add record to the store with add method.
    budgetObjectStore.add(record);
  }