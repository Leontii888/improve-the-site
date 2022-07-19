// save links to LocStorage

function getmodal() {
	frontModal.style.display = 'block';
}

function getburgerBlock() {
	burgerBlock.style.display = 'block';
}

function closemodal() {
	frontModal.style.display = 'none';
}
function closeBurger() {
	burgerBlock.style.display = 'none';
}



const putSomelinks = () => {
	wholeListbox__Text.innerHTML += `${newlink.value}<br \/>`;
	arrayBaseLinks.push(newlink.value);

};
const showBaseLinks = () => {
	wholeListbox.style.display = 'block';

};
const closeBaseBox = () => {
	wholeListbox.style.display = 'none';

};
const clearLinksInBox = () => {
	wholeListbox__Text.innerHTML = ``;

};
const saveIntoStorage = () => {
	localStorage.setItem(`myLinks (${saveLinkTime})`, JSON.stringify(arrayBaseLinks));
	const data = JSON.parse(localStorage.getItem(`myLinks (${saveLinkTime})`));

	console.log(data);
};