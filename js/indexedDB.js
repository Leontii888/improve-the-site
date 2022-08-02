


//manual data

// const customerData = [
//   { id:uid(),"ssn": "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
//   { id:uid(),"ssn": "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
// ];
// const customerData2 = [
//   { id:uid(),"ssn": "444-00-4444", name: "Billy", age: 30, email: "billy@company.com" },
//   { id:uid(),"ssn": "555-00-5555", name: "Donnaroza", age: 72, email: "donnaroza@home.org" }
// ];
// const customerData3 = [
//   { id:uid(),"ssn": "444", name: "yo", age: 3, email: "yo@company.com" },
//   { id:uid(),"ssn": "555", name: "bro", age: 7, email: "bro@home.org" }
// ];

// stored data

// console.log(library)
// console.log(customerData)



// id------------------------
// function idRandomStyle(){
// 	return parseInt(Math.floor(Math.random() * 10000000000).toString().padStart(10, "0"));
// }
function uid() {
  let timing = Date.now().toString(36).toLocaleUpperCase();
  let randomising = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
  randomising = randomising.toString(36).slice(0, 12).padStart(12, '0').toLocaleUpperCase();
  return ''.concat(timing, '-', randomising);
};



// use IndexedDB

if (!window.indexedDB) {
    window.alert("Ваш браузер не поддерживает стабильную версию IndexedDB. Такие-то функции будут недоступны");
}

// проверяем существования префикса.

// window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

// let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

// window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

// let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

// window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


// //--------------delete base at all
 // let deleteRequest = indexedDB.deleteDatabase("linksDB");


//-------------init base
const IDB = (function init() {
  let db = null;
  let objectStore = null;
  let DBOpenReq = indexedDB.open('WhiskeyDB', 9);

  DBOpenReq.addEventListener('error', (err) => {
    //Error occurred while trying to open DB
    console.warn(err);
  });
  DBOpenReq.addEventListener('success', (ev) => {
    //DB has been opened... after upgradeneeded
    db = ev.target.result;
    console.log('success', db);
    buildList();
  });
  DBOpenReq.addEventListener('upgradeneeded', (ev) => {
    //first time opening this DB
    //OR a new version was passed into open()
    db = ev.target.result;
    let oldVersion = ev.oldVersion;
    let newVersion = ev.newVersion || db.version;
    console.log('DB updated from version', oldVersion, 'to', newVersion);

    console.log('upgrade', db);
    if (!db.objectStoreNames.contains('whiskeyStore')) {
      objectStore = db.createObjectStore('whiskeyStore', {
        keyPath: 'id',
      });
    }
 });

 document.whiskeyForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

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
console.log(1)
    let tx = makeTX('whiskeyStore', 'readwrite');
console.log(2)
    tx.oncomplete = (ev) => {
console.log(3)
      console.log(ev);
      buildList();
      clearForm();
    };

    let store = tx.objectStore('whiskeyStore');
    let request = store.add(whiskey);

    request.onsuccess = (ev) => {
      console.log('successfully added an object');
    };
    request.onerror = (err) => {
      console.warn(err);
    };
 });

function buildList(){
 	let list = document.querySelector('.whiskey__wish-list');
 	list.innerHTML =`<li>Loading...</li>`;
 	let tx = makeTX('whiskeyStore','readonly');
 	tx.oncomplete=(ev)=> {
 		//do some on comlete
 	}
 	let store = tx.objectStore('whiskeyStore');
 	let getReq = store.getAll();
 	// array, so need pass akey
 	getReq.onsuccess=(ev)=>{
 			//getall succsess
	//getReq===ev.target
	list.innerHTML = ev.target.result.map(whiskey => {
						return `<li data-key ="${whiskey.id}"><span>${whiskey.name} </span><span>${whiskey.country} </span><span>${whiskey.age}</span></li>`
					}).join('\n'); }
 	getReq.onerror=(err)=>{
	console.warn(err)
 	}
}

document.querySelector(".whiskey__wish-list").addEventListener("click", (ev => {
	//closest having the [data-key]
	let li = ev.target.closest("[data-key]");
	let id = li.getAttribute("data-key");
	console.log(li, id);


	let tx = makeTX('whiskeyStore','readonly');
	let store = tx.objectStore('whiskeyStore');
	let req = store.get(id);
	
	req.onsuccess=(ev) => {

	let whiskey = ev.target.result;
	document.getElementById('whiskey__name').value = whiskey.name;
    document.getElementById('whiskey__country').value = whiskey.country;
    document.getElementById('whiskey__age').value = whiskey.age;
    document.getElementById('whiskey__isOwned').checked = whiskey.owned;
    document.whiskeyForm.setAttribute("data-key", whiskey.id);

	}
	req.onerror = (err)=> {
		console.warn(err);
	}
}))    

function makeTX(storeName, mode) {
    let tx = db.transaction(storeName, mode);
    tx.onerror = (err) => {
      console.warn(err);
    };
    return tx;
}
document.getElementById('whiskey__btn-clear').addEventListener('click', clearForm);

function clearForm(ev){
	if(ev) ev.preventDefault();
	document.whiskeyForm.reset();
}



})();













// -------------------add
// addFile("names","readwrite", customerData);
// addFile("names","readwrite", customerData2);

//--------put
// putFolder("lib","readwrite", library[4].youtube);
// putFile("lib","readwrite", library[1].css);
// putFile("lib","readwrite", library[5].design);
// putFile("names","readwrite", customerData);
// putFolder("names","readwrite", customerData3);

//-----getAll
// getAll("lib","readwrite");
// getAll("names","readwrite");

//-----deleteKey doesnt work
// deleteValue("lib","readwrite", `"http://www.unit-conversion.info/sitemap.html"`);
// deleteItem("lib","readwrite", `https://www.youtube.com/channel/UCY10FZglXJ8RL3xB04VpykQ`);
// deleteItem("names","readwrite", `444-44-4444`);


//-----getItem  doesnt work
// getItem("lib","444-44-4444");
// getItem("names","readwrite",2181801051);

//------getIndex  doesnt work
// getIndex("lib","readwrite", "name", 6);

//-----------------add data--------------------

function addFile(folder, method, fileToPut) {

    
    return new Promise((resolve, reject) => {
      // новая транзакция
	let action = db.transaction(folder, method)
				.objectStore(folder)
					.add(fileToPut);
		
	      
        resolve(action.onsuccess = () => {

        console.log(`Data has been added to the folder ${folder} succsessful!`); 
        	
        });

     
        reject( action.onerror = () => {
		console.error(`Error on adding to ${folder}`, e.target.error);
		});

	})	
	
}
//-----------------------put

function putFolder(folder, method, fileToPut) {

    return new Promise((resolve, reject) => {

      // новая транзакция
		let action = db.transaction(folder, method)
							.objectStore(folder)
								.put(fileToPut);
     
        resolve(action.onsuccess = (e) => {
       	 console.log("Data have been upload by putting. Completed!"); 
      	});

      
        reject(action.onerror = (e) => {
			console.error(`Error on puting to ${folder}`, e.target.error);
     	}); // ошибка

    });

 }
//-------delete

 function deleteItem(folder,method, value) {

    return new Promise((resolve, reject) => {

      // новая транзакция
      let action = db.transaction([folder],method).objectStore(folder).delete(value);
      
      resolve(action.onsuccess = (e) => {
				console.log(`Deleting ${value} completed!`); // успех
	  });

      
        reject(action.onerror = (e) => {
			console.error(`Error on Deleting item on ${value}`, e.target.error);

        }); // ошибка
    });

  }


 //------------get
// function getItem(folder, value){

// 	let action = db.transaction([folder])
// 		    		.objectStore(folder)						
// 						.get(value);

// 		console.log(`Gettin action succsesful!`);

// 		action.onsuccess = function (e) {
// 			if(e.target.result){
// 				 console.log(`Gettin item on ${value} succsesful!`);
// 		    	 console.log(e.target.result)
// 			}
		   
// 		    console.log(e.target.result)
// 			console.log(`FUCK!`);
// 		}
// 		action.oncomplete=() => {
// 				console.log(`Gettin item on ${value} completed!`);
// 		}
// 	    action.onerror = function (e) {
//     		console.log(`Error on gettin item   on ${value}`, e.target.error);
//     	}
// }




function getItem(folder, method,value) {

    return new Promise((resolve, reject) => {

      // новая транзакция
      let action = db.transaction([folder],method)
		    		.objectStore(folder)						
						.get(value);

        resolve(
			action.onsuccess = (e) => {
				console.log(e)
		});
        
        reject( action.onerror = () => {
        	console.error(`Error on Getting all from ${folder}`, e.target.error);
 		});
     
	})
}
//------------------------getAll


function getAll(folder, method) {

    return new Promise((resolve, reject) => {

      // новая транзакция
      let action = db.transaction([folder],method)
		    		.objectStore(folder)						
						.getAll();

        resolve(action.onsuccess = (e) => {
       		 console.log(e.target.result);
        	 console.log(`Gettin all items completed!`); // успех
        });

     
        reject( action.onerror = () => {
			console.error(`Error on Getting all from ${folder}`, e.target.error);
        }); 

    });

}


//------------------------get-index doesnt work


function getIndex(folder, method,key, value) {

    return new Promise((resolve, reject) => {

      // новая транзакция
		let action = db.transaction(folder, method).objectStore(folder)
																.index(key)
																	.get(value);

        resolve(action.onsuccess = (e) => {
        console.log(e.target.result);
        console.log(`Gettin index completed!`); // успех
      });

      
        reject(action.onerror = () => {
        				console.error(`Error on Getting all`, e.target.error);

      });

    });

}


