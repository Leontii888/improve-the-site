// use IndexedDB

let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;	

//-----------------base created

let peopleData = [
    { name: "J Dw", email: "jon@compny.com", error:false, boxer:false, legs:47, city:"Tokio"},
    { name: "Don Dow", email: "don@company.com" }
];
// console.log(library)
 
let db;



// let myDBrequest = indexedDB.open("myDB", 2);



myDBrequest.onerror = function (e) {
	console.log(e);
    db = e.target.result;
    console.log("Error during opening base:",e.target.errorCode);

};


myDBrequest.onsuccess =   function (e) {
    	db = e.target.result;
	    console.log(`Base is working!`);

// -------------------adding
// addToFolder(["lib"],"readwrite", library[8].linux);
// addToFolder(["lib"],"readwrite", library[2].trading);
		  // addToFolder("names","readwrite", peopleData);
}

myDBrequest.onupgradeneeded = function () { 
	console.log("Base is on upgrading...");
	db = myDBrequest.result; 

if (!db.objectStoreNames.contains('lib')){
	console.log("No such a folder,so... creating it...");
	db.createObjectStore('lib', {autoIncrement: true })
}
//-----------------add folder--------------------
	if (!db.objectStoreNames.contains('names')){
		db.createObjectStore('names', {autoIncrement: true })
		console.log("Folder is missing, so... creating it...");
	}
	console.log("Base contained the folder already!");
}

myDBrequest.onblocked = function() {
	console.log("Opened two bases in a moment!")
  //это событие не должно срабатывать, если мы правильно обрабатываем onversionchange
  //это означает, что есть ещё одно открытое соединение с той же базой данных
//  и он не был закрыт после того, как для него сработал db.onversionchange
};


//-----------------add data--------------------




function addToFolder(folder, method, fileToPut){
// let trans = db.transaction(folder, method);
// let base = trans.objectStore(folder);

		let action = db.transaction(folder, method)
							.objectStore(folder)
								.add(fileToPut);;
   		console.log("Transferring...");

		//-----------if need not a single note

// for (el in fileToPut) {
//       	base.add(fileToPut[el]);
//      		console.log("Transferring...");
// 	}
// let action = base.add(fileToPut); 
// console.dir(action);

		action.onsuccess = function () {
		    console.log(`Data downloaded to the folder(${folder})`);
		}
		action.oncomplete=() => {
				console.log("Transfer completed!");
		}
	    action.onerror = function (e) {
    		console.log(`Error on transfering to ${folder}`, e.target.error);
    	}
}

//-------delete
// let deleteRequest = indexedDB.deleteDatabase("myDB");


// myDBObject.createIndex("name", "name", { unique: false });
// myDBObject.createIndex("email", "email", { unique: true });




