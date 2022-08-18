function clientScrollTillY(){
	return window.scrollY;
}//=> 7300px

let stringified = object => {
	return JSON.stringify(object);
}




let isInputCheckedOk =false;
let inputContactsCollection = document.querySelectorAll(".contacts__input");
let spanCollection = document.querySelectorAll(".contacts__input-span");
let clientPlaceArrived = clientScrollTillY();
const SECTION_CONTACTS_Y =7295;

//add listener when arrived to the section
if(clientPlaceArrived>SECTION_CONTACTS_Y){
	for (let el of inputContactsCollection){
	el.addEventListener("blur", function(){
		check(el, el.dataset.rule);
		})
	}
}

function getCheckboxSpan(collection, property){
 return item = [...collection].filter(el => el.dataset.flag === property)[0]
};

function check(el, prop){
	if (prop==="name"){
					if(!el.value.match(/^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/)){
					  el.style.border ="1px solid red";
					 
					  isInputCheckedOk= false;
					  return
					}
	} else if (prop==="lastname"){
				if(!el.value.match(/^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,33})$/)){
				  el.style.border ="1px solid red";
				  isInputCheckedOk= false;
				  return
				}
	} else if  (prop==="email"){
				if(!el.value.match(/^(?:(?:[\w\.\-_]+@[\w\d]+(?:\.[\w]{2,6})+)[,;]?\s?)+$/)){
				  el.style.border ="1px solid red";
				  isInputCheckedOk= false;
				  return
				}
	}	
	console.log(`Test OK: ${prop}`);
	//checkbox
	let elemTestedOk =  getCheckboxSpan(spanCollection,prop);
	elemTestedOk.style.display= "block";
	elemTestedOk.style.color= "#0a9901";
	//remove red border input
	el.style.borderColor ="rgb(118, 118, 118)";
	isInputCheckedOk= true;
}
function clearInputs(cls){
		contactsForm.reset();
		isInputCheckedOk = false;
	return [...document.querySelectorAll(cls)].forEach(el => {
		el.style.borderColor ="rgb(118, 118, 118";
	});
}

function gatherContacts() {

	if(isInputCheckedOk){
		let data = {
				name: contactsName.value,
				lastname: contactsLastName.value,
				email: contactsEmail.value,
				note: contactsArea.value
			};
 		
 		let gatheredData =new Contacts(data);
 		console.log(gatheredData);

 		clearInputs(".contacts__input");
 		//checkbox spans turn off
 		[...spanCollection].forEach(el=> el.style.display = "none")

 		return gatheredData
	} else {
		console.log("Rewrite pls, there are some errors!");
		return
	}
}



//-------------
// fetch('mypost/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: stringified(gatherContacts)
//   })