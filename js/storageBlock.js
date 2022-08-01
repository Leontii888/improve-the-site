let flags = {
	isDataSaved:false,
	isRepeated:false,
	isPutMore:false,
	isWarningOpen:false
},
	tempDinamicCreatedInfoEl = {},
	link =[],
	arrayBaseLinks = { link };
	index=0;


// counterFrom
//---------------------
// function counterFrom(base){
// 	 let increment = 0;
// 	return function(){
// 		 let total = base+=increment;
// 		 increment++;
// 		 return total
// 	}
// };
// let counterFromTwenty =counterFrom(20);
function modifyDataString(string) {
	return string.split("")
	.filter(e => e != "\\")
	.filter(e => e != "\"")
	.filter(Boolean)
	.join("");
}
function writeLinks(){
		let newString = newlink.value.split(",");							
		if(newString.length==1){
			alert("ВВОДИТЕ ВНИМАТЕЛЬНО. ПОСЛЕ ССЫЛКИ НУЖНА ЗАПЯТАЯ И КОММЕНТАРИЙ")
			link = [];
			wholeListbox__Text.innerHTML = ``;
			// return
			} else {
			let data = {
				address:newString[0],
				comment:newString[1],
				tms: new Date().toLocaleString() 
			}
			modifiedData = JSON.stringify(data);
			// console.log(modifiedData)

			wholeListbox__Text.innerHTML += `<span>${modifiedData}ПОКА НЕ В БАЗЕ </span><hr>`;
			link =[...link, modifiedData];
			arrayBaseLinks = {t:`${new Date().toLocaleString()}`, link};
			newlink.value ='';
		}
};
function putSomelinks() {
	if(flags.isDataSaved && flags.isPutMore){
		link = [];
		wholeListbox__Text.innerHTML = ``;

		writeLinks();

		flags.isPutMore = false;
		flags.isRepeated=false;
	} else {
		writeLinks()

		flags.isRepeated=false;
	}
};
function showBaseLinks() {
	wholeListbox.style.display = 'block';
	storageLength.innerHTML = `${localStorage.length}`
	checkStorage.style.display = 'inline';

};
function closeBaseBox() {

	wholeListbox.style.display = 'none';
	checkStorage.style.display = 'none';
	newlink.value ='';
	wholeListbox__Text.innerHTML = `НАЧНИТЕ ЗАНОСИТЬ</br>`;
	flags.isPutMore=false;
};
function clearLinksInBox() {
	wholeListbox__Text.innerHTML = ``;
	newlink.value ='';
	arrayBaseLinks.link.length=0;

	flags.isRepeated =false;
};
//ПЕРЕПИСАТЬ НА КЛАССАХ!
function warnModalAbsolutePosition(	tag,
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
		tempDinamicCreatedInfoEl = {
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

function closeWarnWindow(){
					if(flags.isWarningOpen){
						storage.removeChild(tempDinamicCreatedInfoEl.querylink);

						flags.isWarningOpen= false;

						console.log("deleted!")
					} else{
						console.log("nothing to delete!")
					}
}

function saveIntoStorage() {
		if(arrayBaseLinks.link.length===0){ return	}else{
					// if(localStorage.getItem(`myLinks (${flags.isRepeated})`)){
					if(flags.isRepeated){
									if(!flags.isWarningOpen){
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
												flags.isWarningOpen= true;

												storage.addEventListener("click", closeWarnWindow)
											},1000);
									}else{
										console.log("CLEAR ALL")
										clearLinksInBox();
									}
						}else {
								index =Math.floor(Math.random() * 10000000000).toString().padStart(10, "0");
										localStorage.setItem(`myLinks (${index})`, JSON.stringify(arrayBaseLinks));
											const data = JSON.stringify(localStorage.getItem(`myLinks (${index})`));
											console.log(`ДАТА СОХРАНЕНА В БАЗУ ${modifyDataString(data)}`)
													wholeListbox__Text.innerHTML = `<span>ДАТА СОХРАНЕНА В LS:${modifyDataString(data)}</span>`;
														storageLength.innerHTML = `<span>${localStorage.length}</span>`;

															flags.isDataSaved= true;
															flags.isRepeated = true;
															flags.isPutMore=true;
										}
		}
};





// !!delete all in LS
localStorage.clear()



