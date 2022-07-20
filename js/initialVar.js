const fp = document.getElementById('firstPrice'),
	myBody = document.getElementsByTagName('body'),
	sp = document.getElementById('secondPrice'),
	losscount = document.getElementById('loss'),
	btn = document.getElementById('btn-count'),
	averagePrice = document.getElementById('averagePrice'),
	modalCalc = document.querySelector('.modalCalc'),
	gr= document.getElementById('bitcoin-rate'), 
	myPoseBitcoin= document.getElementById('bitcoin-mypose'), 
	topmenu = document.getElementsByClassName('topmenu'),
	submenu = document.getElementsByClassName('submenu'),
	links = document.getElementsByClassName('links'),
	frontModal = document.getElementById('main-modal'),
	burger = document.getElementById('burger'),
	burgerBlock = document.getElementById('main-nav-block'),
	mcl = document.getElementById('modal-close'),
	burgercl = document.getElementById('burger-close'),
	abp = document.getElementById('abp'),
	headerSrc = document.getElementById('header-search'),
	count = document.getElementById('getCount'),
	dataBlock = document.getElementById('data'),
	countInt = document.getElementById('getCountSingle'),
	singleInt = document.getElementById('single'),
	fetchCurrencies = document.querySelector('.fetch-currencies');
	arr = [],
	weatherBlock = document.querySelector('.maps-data_show'),
	getReqWeather = document.querySelector('#maps-data_city'),
	mapsDataConditions = document.querySelector('.maps-data_conditions');
	// блок для сохранения ссылок в Сторедже

let newlink = document.getElementById('newLinks'),
	buts__putLink = document.getElementById('buts__putLink'),
	buts__getLink = document.getElementById('buts__getLink'),
	buts__clearBase = document.getElementById('buts__clearBase'),
	buts__setStorage = document.getElementById('buts__setStorage'),
	storageLength = document.querySelector('.storage-length'),
	wholeListbox = document.getElementById('wholeListbox'),
	checkStorage = document.getElementById('checkStorage'),
	wholeListbox__Text = document.getElementById('wholeListbox__Text'),
	wholeListbox__close = document.getElementById('wholeListbox__close');

	
const arrayBaseLinks = [],
saveLinkTime = `${new Date()}`;