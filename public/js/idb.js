let db;
// establish a connection to IndexedDB database called 'budget' and set it to version 1
const request = indexedDB.open('budget', 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = event => {
    // save a reference to the database 
    const db = event.target.result;
    db.createObjectStore('pending', {
        keyPath: 'id', 
        autoIncrement: true
    });
  };