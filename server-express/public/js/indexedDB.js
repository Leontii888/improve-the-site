// проверяем существования префикса.

// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

// let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

// let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

// use IndexedDB---------
if (!window.indexedDB) {
    window.alert("Ваш браузер не поддерживает стабильную версию IndexedDB. Такие-то функции будут недоступны");
}
console.log(`to work with IndexeDB turn on IIFE (init(){})()`)
// uid-------------
// function uid() {
//   let timing = Date.now().toString(36).toLocaleUpperCase();
//   let randomising = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
//   randomising = randomising.toString(36).slice(0, 12).padStart(12, '0').toLocaleUpperCase();
//   return ''.concat(timing, '-', randomising);
// };


// //--------------delete base at all
 // let deleteRequest = indexedDB.deleteDatabase("WhiskeyDB");


//-------------init a base
const IDB = (function init() {
  let db = null;
  let objectStore = null;
  let DBOpenReq = indexedDB.open('WhiskeyDB', 1);

  DBOpenReq.addEventListener('error', (err) => {
    //Error occurred while trying to open DB
    console.warn(err.target.error);
  });
  DBOpenReq.addEventListener('success', (e) => {
    //DB has been opened... after upgradeneeded
    db = e.target.result;
    console.log('Success. DB has been opened...', db);
    buildList();
  });
  DBOpenReq.addEventListener('upgradeneeded', (e) => {
    //first time opening this DB
    //OR a new version was passed into open()
    db = e.target.result;
    let oldVersion = e.oldVersion;
    let newVersion = e.newVersion || db.version;
    console.log('DB updated from version', oldVersion, 'to', newVersion);

    console.log('upgrade', db);
    console.log('Event', e);
    if (!db.objectStoreNames.contains('whiskeyStore')) {
      objectStore = db.createObjectStore('whiskeyStore', {
        keyPath: 'id',
      });
    }
 });

document.querySelector("#whiskey__btn-add").addEventListener('click', (e) => {
    e.preventDefault();

    let name = document.getElementById('whiskey__name').value.trim();
    let country = document.getElementById('whiskey__country').value.trim();
    let age = parseInt(document.getElementById('whiskey__age').value);
    let owned = document.getElementById('whiskey__isOwned').checked;

    let whiskey = {
      id: uid(),
      name,
      country,
      age,
      owned,
    };
    let tx = makeTX('whiskeyStore', 'readwrite');
    tx.oncomplete = (e) => {
      buildList();
      clearForm();
    };

    let store = tx.objectStore('whiskeyStore');
    let request = store.add(whiskey);

    request.onsuccess = (e) => {
      console.log('successfully added an object');
    };
    request.onerror = (err) => {
      console.warn(err.target.error);
    };
 });

function buildList(){
 	let list = document.querySelector('.whiskey__wish-list');
 	list.innerHTML =`<li>Loading...</li>`;
 	let tx = makeTX('whiskeyStore','readonly');
 	tx.oncomplete=(e)=> {
 		//do someth on comlete
 		// list.innerHTML =`<li>Loading now... for a while ...inside the store... </li>`;
 	}
 	let store = tx.objectStore('whiskeyStore');
 	let getReq = store.getAll();
 	// array, so need pass akey
 	getReq.onsuccess=(e)=>{
 			//getall succsess
	//getReq===e.target
	list.innerHTML = e.target.result.map(whiskey => {
						return `<li data-key ="${whiskey.id}">
						<span>${whiskey.name} </span>
						<span>${whiskey.country} </span>
						<span>${whiskey.age}</span>
						</li>`})
									.join('\n');
	}
 	
 	getReq.onerror=(err)=>{
	console.warn(err.target.error)
 	}
}
//update--
document.querySelector("#whiskey__btn-update").addEventListener('click', (e) => {
    e.preventDefault();

    let name = document.getElementById('whiskey__name').value.trim();
    let country = document.getElementById('whiskey__country').value.trim();
    let age = parseInt(document.getElementById('whiskey__age').value);
    let owned = document.getElementById('whiskey__isOwned').checked;
    let key = document.whiskeyForm.getAttribute("data-key");
    if(key){
	    let whiskey = {
	      id:key,
	      name,
	      country,
	      age,
	      owned,
	    };
	    let tx = makeTX('whiskeyStore', 'readwrite');
	    tx.oncomplete = (e) => {
	      buildList();
	      clearForm();
	    };

	    let store = tx.objectStore('whiskeyStore');
	    let request = store.put(whiskey);

	    request.onsuccess = (e) => {
	      console.log('successfully put an object');
	    };
	    request.onerror = (err) => {
	      console.warn(err.target.error);
	    };
	} 
});
//delete--
document.querySelector("#whiskey__btn-delete").addEventListener('click', (e) => {
    e.preventDefault();
     let key = document.whiskeyForm.getAttribute("data-key");
    if(key){
			    let tx = makeTX('whiskeyStore', 'readwrite');
		    tx.oncomplete = (e) => {
		      buildList();
		      clearForm();
		    };

		    let store = tx.objectStore('whiskeyStore');
		    let request = store.delete(key);

		    request.onsuccess = (e) => {
		      console.log('successfully deleted an object');
		    };
		    request.onerror = (err) => {
		      console.warn(err.target.error);
		    };
	  };
});
document.querySelector(".whiskey__wish-list").addEventListener("click", (e => {
	//closest having the [data-key]
	let li = e.target.closest("[data-key]");
	let id = li.getAttribute("data-key");
	// console.log(li, id);

	let tx = makeTX('whiskeyStore','readonly');
	let store = tx.objectStore('whiskeyStore');
	let req = store.get(id);
	
	req.onsuccess=(e) => {

		let whiskey = e.target.result;
		document.getElementById('whiskey__name').value = whiskey.name;
	    document.getElementById('whiskey__country').value = whiskey.country;
	    document.getElementById('whiskey__age').value = whiskey.age;
	    document.getElementById('whiskey__isOwned').checked = whiskey.owned;
	    document.whiskeyForm.setAttribute("data-key", whiskey.id);

	}
	req.onerror = (err)=> {
		console.warn(err.target.error);
	}
}));
function buildList(){
 	let list = document.querySelector('.whiskey__wish-list');
 	list.innerHTML =`<li>Loading...</li>`;
 	let tx = makeTX('whiskeyStore','readonly');
 	tx.oncomplete=(e)=> {
 		//do someth on comlete
 	}
 	let store = tx.objectStore('whiskeyStore');
 	let getReq = store.getAll();
 	// array, so need pass a key
 	getReq.onsuccess=(e)=>{
		list.innerHTML = e.target.result.map(whiskeyItem => {
							return `<li data-key ="${whiskeyItem.id}">
							<span>${whiskeyItem.name} </span>
							<span>${whiskeyItem.country} </span>
							<span>${whiskeyItem.age}yrs.</span>
							</li>`})
										.join('\n');
	}
 	
 	getReq.onerror=(err)=>{
		console.warn(err.target.error)
 	}
}
function makeTX(storeName, mode) {
    let tx = db.transaction(storeName, mode);
	    tx.onerror = (err) => {
	      console.warn(err.target.error);
	    };
    return tx;
}
document.getElementById('whiskey__btn-clear').addEventListener('click', clearForm);

function clearForm(){
	// e.preventDefault();
	document.whiskeyForm.reset();
}
})//();


//-----------------add old variant data--------------------

// function addFile(folder, method, fileToPut) {

    
//     return new Promise((resolve, reject) => {
//       // новая транзакция
// 	let action = db.transaction(folder, method)
// 				.objectStore(folder)
// 					.add(fileToPut);
		
	      
//         resolve(action.onsuccess = () => {

//         console.log(`Data has been added to the folder ${folder} succsessful!`); 
        	
//         });

     
//         reject( action.onerror = () => {
// 		console.error(`Error on adding to ${folder}`, e.target.error);
// 		});

// 	})	
	
// }
