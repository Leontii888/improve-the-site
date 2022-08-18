const		aboutModal = document.querySelector('.header__item-about'),
	headerSrc = document.getElementById('header-search'),
    //trade
	firstPricePose = document.getElementById('trade__data-first-price'),
	secondPricePose = document.getElementById('trade__data-second-price'),
	calcData = document.querySelector('.trade__calc-output'),
	tradeBlockInp = document.querySelector('.trade__calc'),
	lossCount = document.getElementById('trade__loss'),
	averagePrice = document.getElementById('trade__averagePrice'),
	modalCalc = document.querySelector('.trade__modalCalc'),

	blockBitcoinRates= document.getElementById('trade__bitcoin-rate'), 
	myPoseBitcoin= document.getElementById('trade__bitcoin-mypose'),
	 
	topmenu = document.getElementsByClassName('topmenu'),
	submenu = document.getElementsByClassName('submenu'),
	frontModal = document.querySelector('.frontpage__block-modal'),
	closeModal = document.querySelector('.frontpage__block-modal-close'),
	//showcase
	commonBase = document.getElementById('showcase__link-common'),
	tradingBase = document.getElementById('showcase__link-trading'),
	cssBase = document.getElementById('showcase__link-css'),
	powershellBase = document.getElementById('showcase__link-PowS'),
	youtubeBase = document.getElementById('showcase__link-youtube'),
	designBase = document.getElementById('showcase__link-design'),
	htmlBase = document.getElementById('showcase__link-html'),
	javascriptBase = document.getElementById('showcase__link-javaScript'),
	tendersBase = document.getElementById('showcase__link-tenders'),
	showsubMenu = document.querySelectorAll(".showcase__down-el"),
	linkToShow = document.getElementsByClassName('link'),
	
	//minervini
	count = document.getElementById('minervini__count-main-graph'),
	dataBlock = document.getElementById('minervini__put-data-main-graph'),
	countInt = document.getElementById('minervini__count-sub-graph'),
	singleInt = document.getElementById('minervini__put-data-sub-graph'),
	
	fetchCurrencies = document.querySelector('.fetch-currencies'),
	//weather
	weatherBlock = document.querySelector('.mapsWeather__show'),
	getReqWeather = document.querySelector('#mapsWeather__city'),
	mapsDataConditions = document.querySelector('.mapsWeather__item-data'),
	containerWeather = document.querySelector('#mapsWeather__map'),
	// storage block

	newlink = document.querySelector('.storage__input'),
	storage = document.querySelector('.storage'),
	storageContainer = document.getElementById('storage__container'),
	putLink = document.querySelector('.storage__put-link'),
	getLink = document.querySelector('.storage__get-link'),
	clearBase = document.querySelector('.storage__clear-input'),
	saveToStorage = document.querySelector('.storage__save-to-storage'),
	storageLength = document.querySelector('.storage__check-length'),
	wholeListbox = document.querySelector('.storage__check'),
	checkStorage = document.querySelector('.storage__check-length'),
	showroomNote = document.querySelector('.storage__showroom-note'),
	showroomClose = document.querySelector('.storage__close'),
	saveLinkTime = `${new Date().toLocaleString()}`,

	//contacts
	contactsForm = document.querySelector('.contacts__form'),
	contactsName = document.querySelector('.contacts__input-name'),
	contactsLastName = document.querySelector('.contacts__input-lastname'),
	contactsEmail = document.querySelector('.contacts__input-email'),
	contactsArea = document.querySelector('#contacts__area'),
	contactsButtonSubmit = document.querySelector('.contacts__button-submit');
	contactsButtonReset = document.querySelector('.contacts__button-reset');

