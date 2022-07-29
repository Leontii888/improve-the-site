const myBody = document.getElementsByTagName('body'),

	fp = document.getElementById('trade__data-first-price'),
	sp = document.getElementById('trade__data-second-price'),
	calcData = document.querySelector('.trade__calc-output'),
	losscount = document.getElementById('trade__loss'),
	averagePrice = document.getElementById('trade__averagePrice'),
	modalCalc = document.querySelector('.trade__modalCalc'),
	
	abp = document.querySelector('.header__item-about'),
	headerSrc = document.getElementById('header-search'),

	btn = document.getElementById('trade__bitcoin-btn'),
	gr= document.getElementById('trade__bitcoin-rate'), 
	myPoseBitcoin= document.getElementById('trade__bitcoin-mypose'),
	 
	topmenu = document.getElementsByClassName('topmenu'),
	submenu = document.getElementsByClassName('submenu'),
	frontModal = document.querySelector('.frontpage__block-modal'),
	mcl = document.querySelector('.frontpage__block-modal-close'),

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

	count = document.getElementById('minervini__count-main-graph'),
	dataBlock = document.getElementById('minervini__put-data-main-graph'),
	countInt = document.getElementById('minervini__count-sub-graph'),
	singleInt = document.getElementById('minervini__put-data-sub-graph'),
	
	fetchCurrencies = document.querySelector('.fetch-currencies'),
	arr = [],
	
	weatherBlock = document.querySelector('.mapsWeather__show'),
	getReqWeather = document.querySelector('#mapsWeather__city'),
	mapsDataConditions = document.querySelector('.mapsWeather__item-data');
	// storage block

let newlink = document.querySelector('.storage__input'),
	storage = document.querySelector('.storage'),
	storageContainer = document.getElementById('storage__container'),
	buts__putLink = document.querySelector('.storage__put-link'),
	buts__getLink = document.querySelector('.storage__get-link'),
	buts__clearBase = document.querySelector('.storage__clear-input'),
	buts__setStorage = document.querySelector('.storage__save-to-storage'),
	storageLength = document.querySelector('.storage__check-length'),
	wholeListbox = document.querySelector('.storage__check'),
	checkStorage = document.querySelector('.storage__check-length'),
	wholeListbox__Text = document.querySelector('.storage__showroom-note'),
	wholeListbox__close = document.querySelector('.storage__close'),
	saveLinkTime = `${new Date().toLocaleString()}`;
