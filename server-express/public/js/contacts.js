// let clientScrollTillY = () => window.pageYOffset 
//=> 7300px
let initialData = {
name: null,
        lastname: null,
        email: null,
        note:null
};
let gatheredData =new Contacts(initialData);

function stringified(object){
  return JSON.stringify(object);
}

//
let isInputCheckedOk =false;
let inputContactsCollection = document.querySelectorAll(".contacts__input");
let spanCollection = document.querySelectorAll(".contacts__input-span");

//add listener when arrived to the section

for (let el of inputContactsCollection){
  el.addEventListener("blur", function(){
    checkFormFilled(el, el.dataset.rule);
  })
}

function getCheckedSpan(collection, property){
 return item = [...collection].filter(el => el.dataset.flag === property)[0]
};

function checkFormFilled(el, prop){
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
    let elemTestedOk =  getCheckedSpan(spanCollection,prop);
    elemTestedOk.style.display= "block";
    elemTestedOk.style.color= "#0a9901";
    //remove red border input
    el.style.borderColor ="rgb(118, 118, 118)";
    isInputCheckedOk= true;
}

function removeCheckedProperties(){
  [...spanCollection].forEach(el=> el.style.display = "none");
  [...document.querySelectorAll(".contacts__input")].forEach(el => {
    el.style.borderColor ="rgb(118, 118, 118)";
  });
    contactsForm.reset();
  isInputCheckedOk = false;
}
//
// fetch('mypost/', {
//       method: 'POST',
//       headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//       body: stringified(gatheredData)
// });

function gatherContacts() {
  if(isInputCheckedOk){
    let data = {
        name: contactsName.value,
        lastname: contactsLastName.value,
        email: contactsEmail.value,
        note: contactsArea.value
      };
    gatheredData = new Contacts(data);
    //clear all and  turn off checkbox spans
    removeCheckedProperties();
    //update
    //-------------
    fetch('mypost/', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
        body: stringified(gatheredData)
    });

    console.log(gatheredData);
    return gatheredData
  } else {
    console.log("Rewrite pls, there are some errors!");
    return
  }
};




 	



console.log("contacts is on")
