function gatherContacts() {
	let data = {
		name: contactsName.value,
		lastname: contactsLastName.value,
		email: contactsEmail.value,
		note: contactsArea.value
	};
 		let gatheredData =new Contacts(data);
 		console.log(gatheredData)
 	return gatheredData

}

let stringified = object => {
	return JSON.stringify(object);
}


//-------------
// fetch('mypost/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: stringified(gatherContacts)
//   })