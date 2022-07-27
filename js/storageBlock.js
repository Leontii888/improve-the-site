let isSaved=false,
	isRepeated =0,
	isOpened =false,
	tempInfoDinamicCreatedEl ={};


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




const writeLinks = ()=> {
	wholeListbox__Text.innerHTML += `<span>${newlink.value}</span><hr>`;
	link =[...link, newlink.value]
	arrayBaseLinks = {t:`${new Date().toLocaleString()}`, link};
	// clearLinksInBox()
	newlink.value ='';
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
	checkStorage.style.display = 'inline';


};
const closeBaseBox = () => {

	wholeListbox.style.display = 'none';
	checkStorage.style.display = 'none';
	newlink.value ='';
	wholeListbox__Text.innerHTML = ``;

	storageContainer.removeEventListener("click", closeWarn);
	isOpened =false;
	


};
const clearLinksInBox = () => {
	wholeListbox__Text.innerHTML = ``;

	isRepeated =0;
};

function warnModalAbsolutePosition(
									tag,
									parent,
									top,
									left,
									className,
									background,
									width,
									height,
									padding,
									opacity,
									warning){
	let createdItem = document.createElement(tag);
		createdItem.style.position = "absolute";

		createdItem.className = className;
		createdItem.innerHTML =warning;

		createdItem.style.background = background;
		createdItem.style.opacity = opacity;
		createdItem.style.width = width;
		createdItem.style.height = height;
		createdItem.style.borderRadius = "2px";

		createdItem.style.padding = padding;
		createdItem.style.top = top;
		createdItem.style.left = left;

		parent.style.position ="relative";
		parent.appendChild(createdItem);
		let querylink =document.querySelector(`.${className}`)
		tempInfoDinamicCreatedEl = {
									tag,
									parent,
									top,
									left,
									className,
									background,
									width,
									height,
									padding,
									opacity,
									warning,
									querylink

		};
			return createdItem
}
storage.addEventListener("click", closeWarn);

function closeWarn(){
					if(isOpened){
						storage.removeChild(tempInfoDinamicCreatedEl.querylink)
						isOpened= false;
						console.log("deleted!")
					} else{
						console.log("nothing to delete!")

					}
}

const saveIntoStorage = () => {
	let index = Math.floor(Math.random() * 10000000000).toString().padStart(10, "0");
	if(localStorage.getItem(`myLinks (${isRepeated})`)){
		if(!isOpened){
			warnModalAbsolutePosition("div",
				storage,
				"0",
				"0",
				'warn',
				"#000",
				"100%",
				"100%",
				"50px",
				0.7,
				 `<div class="warn__list">
				 <div class ="warn__item">WOW! YOU HAVE ALREADY PUT THE LINK!</div>
				 <div class ="warn__item">LOCAL STORAGE UPLOAD IT!</div> 
				 <div class ="warn__item">DO NOT DOUBLE INFORMATION.</div> 
				<div class ="warn__item">PLEASE, <span>CLEAR PANEL</span> UP.</div>
				</div>`);
			setTimeout(()=> {
				isOpened= true;
				storageContainer.addEventListener("click", closeWarn)
				},1000);
		}else {	};
		
	} else {
		localStorage.setItem(`myLinks (${index})`, JSON.stringify(arrayBaseLinks));
		const data = JSON.stringify(localStorage.getItem(`myLinks (${index})`));
		wholeListbox__Text.innerHTML = `<span>${data}</span>`;
		storageLength.innerHTML = `<span>${localStorage.length}</span>`;
		isRepeated = index;
		}
	
		isSaved= true;
};



// !!delete all in LS
localStorage.clear()