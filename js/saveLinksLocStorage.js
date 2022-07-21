// save links to LocStorage

function getmodal() {
	frontModal.style.display = 'block';
}

// function getburgerBlock() {
// 	burgerBlock.style.display = 'block';
// }

function closemodal() {
	frontModal.style.display = 'none';
}
// function closeBurger() {
// 	burgerBlock.style.display = 'none';
// }

let isSaved=false;



const writeLinks = ()=> {
	wholeListbox__Text.innerHTML += `${newlink.value}<br \/>`;
	link =[...link, newlink.value]
	arrayBaseLinks = {t:`${new Date().toLocaleString()}`, link};
};

const putSomelinks = () => {
	if(isSaved){
		link = [];
		writeLinks();
		isSaved = false;
		
	} else {
		writeLinks()
	}
};
const showBaseLinks = () => {
	wholeListbox.style.display = 'block';
	storageLength.innerHTML = `${localStorage.length}`
	checkStorage.style.display = 'block';

};
const closeBaseBox = () => {

	wholeListbox.style.display = 'none';
	checkStorage.style.display = 'none';
	newlink.value ='';
	wholeListbox__Text.innerHTML = ``;
	


};
const clearLinksInBox = () => {
	newlink.value ='';
	// wholeListbox__Text.innerHTML = ``;

};
const saveIntoStorage = () => {
	let index = Math.floor(Math.random() * 10000000000).toString().padStart(10, "0");
	console.log(index);
	
	localStorage.setItem(`myLinks (${index})`, JSON.stringify(arrayBaseLinks));
	const data = JSON.stringify(localStorage.getItem(`myLinks (${index})`));
	wholeListbox__Text.innerHTML = `${data}`;
	storageLength.innerHTML = `${localStorage.length}`
	console.log(data);
	isSaved= true;
};