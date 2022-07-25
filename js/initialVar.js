const myBody = document.getElementsByTagName('body'),

	fp = document.getElementById('calcandlinks-mainblock__first-price'),
	sp = document.getElementById('calcandlinks-mainblock__second-price'),
	losscount = document.getElementById('loss'),
	averagePrice = document.getElementById('averagePrice'),
	// modalCalc = document.querySelector('.calcandlinks__modalCalc'),
	
	abp = document.querySelector('.header__item-about'),
	headerSrc = document.getElementById('header-search'),

	btn = document.getElementById('btn-count'),
	gr= document.getElementById('bitcoin-rate'), 
	myPoseBitcoin= document.getElementById('bitcoin-mypose'),
	 
	topmenu = document.getElementsByClassName('topmenu'),
	submenu = document.getElementsByClassName('submenu'),
	links = document.getElementsByClassName('links'),
	frontModal = document.querySelector('.frontpage__block-modal'),
	mcl = document.querySelector('.frontpage__block-modal-close'),

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
	wholeListbox__Text = document.querySelector('.storage__text'),
	wholeListbox__close = document.querySelector('.storage__close'),
	link =[],
	arrayBaseLinks = {t:`${new Date().toLocaleString()}`,link},
	saveLinkTime = `${new Date().toLocaleString()}`;
