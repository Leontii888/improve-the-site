let stringified = object => JSON.stringify(object);

function gatherContacts() {
	let dataForm = {
		name: contactsName.value,
		lastname: contactsLastName.value,
		email: contactsEmail.value,
		note: contactsArea.value
	};
 		let gatheredData = new Contacts(dataForm);
 		console.log(gatheredData);
 		//-------------
	fetch('mypost/', {
    	method: 'POST',
   		headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
   	 	body: stringified(gatheredData)
  	});
  		fetch('mypost/', {
    	method: 'PUT',
   		headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
   	 	body: stringified(gatheredData)
  	});
 	return gatheredData
}


console.log("contacts is on")
