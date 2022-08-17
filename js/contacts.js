//checkin form is false
let isTestedOk =false;
let inputContactsCollection = document.querySelectorAll(".contacts__input");
let spanCollection = document.querySelectorAll(".contacts__input-span");

let getSpan=(collection, property) => {
 return item = [...collection].filter(el => el.dataset.flag === property)[0]
};

for (let el of inputContactsCollection){
	el.addEventListener("blur", function(){
		check(el, el.dataset.rule);
	})
}

function check(el, prop){
	if (prop==="name"){
					if(!el.value.match(/^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/)){
					  el.style.border ="1px solid red";
					 
					  isTestedOk= false;
					  return
					}
	} else if (prop==="lastname"){
				if(!el.value.match(/^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,33})$/)){
				  el.style.border ="1px solid red";
				  isTestedOk= false;
				  return
				}
	} else if  (prop==="email"){
				if(!el.value.match(/^(?:(?:[\w\.\-_]+@[\w\d]+(?:\.[\w]{2,6})+)[,;]?\s?)+$/)){
				  el.style.border ="1px solid red";
				  isTestedOk= false;
				  return
				}
	}	
	console.log(`Test OK: ${prop}`);
	let elemTestedOk =  getSpan(spanCollection,prop);
	elemTestedOk.style.display= "block";
	elemTestedOk.style.color= "#0a9901";
	//remove red border input
	el.style.borderColor ="rgb(118, 118, 118)";
	isTestedOk= true;
}
function clearInputs(cls){
		contactsForm.reset();
		isTestedOk = false;
	return [...document.querySelectorAll(cls)].forEach(el => {
		el.style.borderColor ="rgb(118, 118, 118";
	});
}


function gatherContacts() {

	if(isTestedOk){
		let data = {
				name: contactsName.value,
				lastname: contactsLastName.value,
				email: contactsEmail.value,
				note: contactsArea.value
			};
 		
 		let gatheredData =new Contacts(data);
 		console.log(gatheredData);

 		clearInputs(".contacts__input");

 		return gatheredData
	} else {
		console.log("rewrite pls!");
		return
}




	
 		
 	

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