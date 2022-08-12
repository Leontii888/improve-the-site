let flags = {
	isDataSaved:false,
	isRepeated:false,
	isPutMore:false,
	isWarningOpen:false
},
	tempDinamicCreatedInfoEl = {},
	link =[],
	arrayBaseLinks = [],
	index=0,
	querylink,
	modalWarnSetting = new ModalSetting;
//modal window
class ModalWarn extends Block{
	constructor(modalWarnSetting){
		super(commonOptions)
	}
};
let modalWarn = new ModalWarn;

// create the obj
modalWarn.create();

// define parent
modalWarn.addRelativeParent(storage);

//set text
modalWarn.text =`<div class="warn__list">	<div class ="warn__item">WOW! YOU HAVE ALREADY PUT THE LINK!</div>
			 <div class ="warn__item">LOCAL STORAGE UPLOAD IT!</div> 
			 <div class ="warn__item">DO NOT DOUBLE INFORMATION.</div> 
			<div class ="warn__item">PLEASE, <span>CLEAR PANEL</span> UP.</div>
			</div>`;

function writeLinks(){
		let newString = newlink.value.split(",");							
		if(newString.length==1){
			alert("ВВОДИТЕ ВНИМАТЕЛЬНО. ПОСЛЕ ССЫЛКИ ЧЕРЕЗ ЗАПЯТУЮ ВНЕСИТЕ КОММЕНТАРИЙ И НАЗВАНИЕ РАЗДЕЛА!")
			link = [];
			showroomNote.innerHTML = ``;
			// return
			} else {
			let data = {
				address:newString[0],
				comment:newString[1],
				chapter:newString[2],
				id: `${uid()}`
				// tms: new Date().toLocaleString() 
			};
			modifiedData = JSON.stringify(data);
			// console.log(modifiedData)

			showroomNote.innerHTML += `<span>${newString[2]}: ${modifiedData}ПОКА НЕ В БАЗЕ </span><hr>`;
			link =[...link, modifiedData];
			// arrayBaseLinks = [...arrayBaseLinks, link};
			newlink.value ='';
		}
		return newString;
};

function putSomelinks() {
	if(flags.isDataSaved && flags.isPutMore){
		link = [];
		showroomNote.innerHTML = ``;

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
	showroomNote.innerHTML = `НАЧНИТЕ ЗАНОСИТЬ</br>`;
	flags.isPutMore=false;
};
function clearLinksInBox() {
	showroomNote.innerHTML = ``;
	newlink.value ='';
	link.length=0;

	flags.isRepeated =false;
};

function closeWarnWindow(){
					if(flags.isWarningOpen){
						storage.removeChild(querylink);

						flags.isWarningOpen= false;

						console.log("deleted!")
					} else{
						console.log("nothing to delete!")
					}
}

function saveIntoStorage() {
		if(link.length===0){ return	} else {
					if( flags.isRepeated ){
									if( !flags.isWarningOpen ){
										
										//append to
										modalWarn.appendTo(storage);
										querylink =document.querySelector(`.${modalWarn.classNameEl}`);
										setTimeout(()=> {
												flags.isWarningOpen= true;
												storage.addEventListener("click", closeWarnWindow)
										},1000);
									} else {
										console.log("CLEAR ALL")
										clearLinksInBox();
									}
					} else {
										if(link.length==1){
											let parsed = JSON.parse(link[0]);
											
										addToLibrary(parsed.address,parsed.comment,parsed.chapter);
										console.log(`went one: ${parsed}`);
										console.log(currentLibrary);
										showroomNote.innerHTML += `<span>${parsed.chapter}: ${parsed}DOWNLOADED!</span><hr>`;
											
										} else {
											link.forEach(el => {
										let parsed = JSON.parse(el);		
										addToLibrary(parsed.address,parsed.comment,parsed.chapter);
										console.log(`went all: ${parsed}`);
										showroomNote.innerHTML += `<span>${parsed.chapter}: ${parsed}DOWNLOADED!</span><hr>`;
										console.log(currentLibrary)
											})
										}
												localStorage.clear()
												uploadToLocalStorage(chaptersArray, currentLibrary);
												hostingToSite(downloadFromLS());
												currentLibrary =downloadFromLS();

															flags.isDataSaved= true;
															flags.isRepeated = true;
															flags.isPutMore=true;
										}
		}
};





// !!delete all in LS
// localStorage.clear()



