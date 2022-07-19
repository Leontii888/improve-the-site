
const getId = (itemId)=>{
	return document.getElementById(itemId) 
},
fp = getId('firstPrice'),
myBody = document.getElementsByTagName('body'),
sp = getId('secondPrice'),
losscount = getId('loss'),
res = getId('result'),
btn = getId('btn-count'),
btnCl = document.getElementsByClassName('btn-clearVal')[1],
inpr = getId('inpAvPr'),
tpr = getId('tableAvPr'),
gr= getId('bitcoin'), 
myPoseBitcoin= getId('my-bitcoin'), 
myRequestBitcoin = new XMLHttpRequest(),
topmenu = document.getElementsByClassName('topmenu'),
submenu = document.getElementsByClassName('submenu'),
links = document.getElementsByClassName('links'),
frontModal = getId('main-modal'),
burger = getId('burger'),
burgerBlock = getId('main-nav-block'),
mcl = getId('modal-close'),
burgercl = getId('burger-close'),
abp = getId('abp'),
headerSrc = getId('header-search'),
// bitcoinFetch = getId('bicoin-fetch'),
countMinnervini = getId('countMinnervini'),
dataMinnervini = getId('dataMinnervini'),

arr = [],
	// myRequestHistBitcoin = new XMLHttpRequest(),
	weather = getId("weather"),
	weatherInner = getId("whetherIn"),
	cityPrompt = getId("city"),

	//ищу коллекцию по классу
	srchCollClassBeginWith = function(classBeginWith){
		let matchItems = new Array();
		allElems = document.getElementsByTagName("*");
		for(var i=0; i < allElems.length; i++){
			if( allElems[i].matches("[class^="+classBeginWith"]")){
				matchItems.push(allElems[i]);
			}
		};
		return matchItems;
	},
	

	cleanInp = function(){
		var inp= document.querySelectorAll('input');
		console.log(inp);
		inp.forEach(function(x,i){
			if(i!=3){
				console.log(`B ${i} поле было записано ${x.value}`);
				x.value = null;
				tpr.innerHTML= `Расчет средней цены лота`;
				res.innerHTML= `Искомый лот:`;
			}
		})
		console.log(`${res.innerHTML}`);
	},
	lotCountMonitor = function(){
		// var comm, resurs;
		const lot = Math.abs((losscount.value/(fp.value-sp.value)).toFixed(1)),
		comm = (fp.value*2*lot/1000000*330).toFixed(1),
		resurs = (fp.value*lot/1000000).toFixed(3);		
		res.innerHTML=`Искомый лот:	${lot}
		Стоимость сделки: ${resurs} млн., в том числе комиссия ${comm} рублей`;
		console.log(`Лот ${lot}, стоимость  ${resurs}  млн и  комиссы  ${comm} руб`);
		res.style.paddingBottom = "0px";
	},
	getAverageLot = function(){
		if(inpr.value){
			const q= inpr.value.split(',').filter(Boolean).length,
			res= inpr.value
			.split(',').filter(Boolean).map(Number)
			.reduce(function(sum, x){ return sum+x },0);
			tpr.innerHTML = `Средняя цена лота:${(res/q).toFixed(1)}`;

		} else {
			alert(`Введено неверное значение! Проверьте ввод цифр`)
		}
	},
	pointMenu = (function(){
		var subMenuItems = srchCollClassBeginWith("sub-");
		for (var i=0; i< subMenuItems.length; i++){
			subMenuItems[i].setAttribute('ind', i);
			subMenuItems[i].addEventListener('click', function(e){
				// console.log(e);
				// console.log(this);
				var num = this.getAttribute('ind');
				console.log(this.getAttribute('ind'));
				e.target.style.color= '#C5A639FF';
				links[num].classList.toggle('visible');
			});
		}
	})();

	btn.onclick= getAverageLot; 
	btnCl.onclick= cleanInp;		//очистка инпутов
	abp.onclick= getmodal;			// открыть модальное окно
	burger.onclick= getburgerBlock;	// открыть навигацию под бургером
	mcl.onclick= closemodal;		// иконка закрытия модального окна
	burgercl.onclick= closeBurger;	// иконка закрытия ббургера
	bitcoinFetch.onclick= currenciesFetching;	// запрос котирвок валют



	losscount.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			lotCountMonitor();
		}
	});
	cityPrompt.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			getWeather(cityPrompt.value);
		}
	});



headerSrc.addEventListener("keyup", function(event) {
	event.preventDefault();
		if (event.keyCode === 13) {
			searchSome();
		}
});

(async function getRateUsd(){
	const  resp = await fetch("https://openexchangerates.org/api/latest.json?app_id=950e7939546942c5b62a3bd284959545");
	const  data = await resp.json();
	console.log(`Смотрите также исторические данные getRateUsd`)
	try {
		const {rates} = data;
		const {RUB} = rates;
		//  типа привожу к наличному доллару в обменнике (купить за рубли)
		 return curdollarUsa = (RUB*1.015).toFixed(1);
	} catch (e){
		return new Error('Сервер не отдает данные по курсам')
	}
		

	})();
async function getRateUsd(){
	try {
		const  data = await (await fetch("https://openexchangerates.org/api/latest.json?app_id=950e7939546942c5b62a3bd284959545")).json();
		const {RUB,EUR,CNY,BTC,TRY,GBP,UAH} = data.rates;
		const currencies= {
			RUB,
			EUR,
			CNY,
			BTC,
			TRY,
			GBP,
			UAH
		};
		console.log(currencies)
		return currencies
	} catch (e){
		throw new Error(e,'getRateUsd не овечает')
	}
};

	(async function getRate(){
		const  resp = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
		const  data = await resp.json();
		console.log(`Смотрите также исторические данные getHistoryBitcoinRate(mydate)`)
		const {bpi,time} = data;
		gr.innerHTML= `<font color="#f35">today\`s bitcoin:</font> $${(bpi.USD.rate_float).toFixed(0)} ($${curdollarUsa})`;
		
		// денег у меня в долларах
		const myCurMoneyUsd = 150000/curdollarUsa;

		// сколько могу купить биткойнов
		const myPoseMayBe = myCurMoneyUsd/(bpi.USD.rate_float);

		//процент моей позы
		let procPose = ((bpi.USD.rate_float*0.334)/4000).toFixed(2);

		myPoseBitcoin.innerHTML= `Can get (from RUB150000) poseValue on <font color="#f35">
		${time.updated}:</font> <b>BTC${myPoseMayBe.toFixed(4)}</b>
		(${(procPose*100).toFixed(1)}%)`;

			// ${time.updated}:</font> $${((bpi.USD.rate_float*0.334).toFixed(0))}

			// (RUB<b>${(curdollarUsa*bpi.USD.rate_float*0.334).toFixed(0)}</b>)
			// (${(procPose*100).toFixed(1)}%)`;
		})();

//  исторические данные по битку

// async function  getHistoryBitcoinRate(mydate){
//   mydate = mydate ||"2019-01-01";
//   	const beginningUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=`,
//   		 endUrl = `&end=2021-12-07`,
//   		 url = beginningUrl+mydate+endUrl;
// 	    	const  response = await fetch(url);
// 			const  data = await response.json();
// 			console.log(data)
// };



function getmodal() {
	frontModal.style.display = 'block';
}

function getburgerBlock() {
	burgerBlock.style.display = 'block';
	// burgerBlock.style.display = 'block';
}

function closemodal() {
	frontModal.style.display = 'none';
}
function closeBurger() {
	burgerBlock.style.display = 'none';
}

function searchSome() {
	alert ('Пока не работает, братан!')
}
// блок для сохранения ссылок в Сторедже
let newlink = document.getElementById('newLinks'),
buts__putLink = document.getElementById('buts__putLink'),
buts__getLink = document.getElementById('buts__getLink'),
buts__clearBase = document.getElementById('buts__clearBase'),
buts__setStorage = document.getElementById('buts__setStorage'),
wholeListbox = document.getElementById('wholeListbox'),
wholeListbox__Text = document.getElementById('wholeListbox__Text'),
wholeListbox__close = document.getElementById('wholeListbox__close');

const arrayBaseLinks = [],
saveLinkTime = `${new Date()}`;





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

// показать мою позу по биткойну при наведении мыши



buts__putLink.addEventListener('click', putSomelinks);
buts__getLink.addEventListener('click', showBaseLinks);
wholeListbox__close.addEventListener('click', closeBaseBox);
buts__clearBase.addEventListener('click', clearLinksInBox);
buts__setStorage.addEventListener('click', saveIntoStorage);




// погодный блок и карты
//============================================

async function getWeather(ct){
	ct = ct || "Anadyr";
	weatherInner.innerHTML= null;
	const  response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ct}&APPID=2281c7fed03ac47a4b272784c3b8ea80&units=metric`);
	const  data = await response.json(),
	{city,list} = data;
	weather.innerHTML = `<p><font color="#f35">Погода в ${city.name}</font> (долгота ${city.coord.lat}, широта ${city.coord.lon})</p>`
	console.log(data)
	const showWeather = (placeToShow, {city,list},n) => {
                		// let {city,list} = dataMain,
                		let {name,coord:{lat: x}, coord:{lon:y}} = city,
                		{dt_txt,clouds:{all:cl}, main:{humidity:hm},main:{pressure:prs},main:{temp:tm},wind:{speed:windSp},weather} = list[n],
                		{main} = weather[0];
                		return placeToShow.innerHTML += `<p>на дату: ${dt_txt}
                		Температура: <font color="#f35">${tm}</font><br \/>
                		Давление: ${(prs/1.333).toFixed(1)}<br \/>
                		Описание: ${main}<br \/>
                		Облачность: ${cl}<br \/>
                		Влажность: ${hm}<br \/>
                		Ветер: ${windSp}<br \/></p>`
                	}
                	showWeather(weatherInner,data,0);
                	showWeather(weatherInner,data,7);
                	showWeather(weatherInner,data,24);
                	showWeather(weatherInner,data,39);

                	getMap([city.coord.lat, city.coord.lon]);
                	console.log([city.coord.lat, city.coord.lon]);
                };

                console.log(`Ввод координат [lat, lon]. Для поиска на карте вызвать функцию getMap()`)

// let coord = [44.9296,37.988]; //Крымск

const getMap = (coordinatesArray) => {
	//очищаем карту сперва
	const container = L.DomUtil.get('mapBoxCom');
	if(container != null || container!= undefined){
		container._leaflet_id = null;
	}
				// присвоить координаты
	// coordinatesArray = coordinatesArray ? coordinatesArray : [64.7317,177.5061];//анадырь

	const mymapbox = L.map('mapBoxCom');
						// .setView(coordinatesArray, 9);
							// .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

							L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
								attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
								tileSize: 512,
								maxZoom: 18,
								zoomOffset: -1,
								id: 'mapbox/streets-v11',
								accessToken: 'pk.eyJ1IjoibGVvODg4IiwiYSI6ImNqeXB0YzBqaTFlbnozbm5vY28ycnlsdWsifQ.m0BJKilThXfVd1rARpRtJQ'
		    // accessToken: 'YOUR_MAPBOX_ACCESS_TOKEN'
		}).addTo(mymapbox);
//=====================2
// L.mapbox.accessToken = 'pk.eyJ1IjoibGVvODg4IiwiYSI6ImNqeXB0YzBqaTFlbnozbm5vY28ycnlsdWsifQ.m0BJKilThXfVd1rARpRtJQ';
// const mymapbox = L.mapbox.map('mapBoxCom')
// 							.setView(coordinatesArray, 9)
// 									.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));



};

getMap();


//Миннерыини расчеты  и граики
//==============================================================
//

const fooProfit = (kf, success) => {
	let deposit = 100000,
	sample=10,
	currd = 0,
	arrayCount = [],
	finObj = {p: 0, res: 0, earn: 0},
	finArr = [],
	p = 1,
	ea = 0;
	const fee = deposit / 1000000 * 720;

	while (p <= 100) {
		let i = 1,
		y = 1,
		cd = deposit;

		while (i <= sample * success / 100) {
			currd = cd * (1 + p / 100) - fee;
			cd = currd;
			arrayCount = [...arrayCount, currd];
			i++;
		}
		let earnings = currd;

		while (y <= sample * (1 - success / 100)) {

			currd = (earnings * (1 - p / (100 * kf)) - fee).toFixed(1);
			earnings = currd;
			y++;
			ea = (100 * currd / deposit - 100).toFixed(1);
			finObj = {p: p, res: currd, earn: ea};
		}
		p++;
		finArr = [...finArr, finObj]
	}
	const maxEarning = Math.max.apply(null, finArr.map(c => c.earn));
	const bestProcent = finArr.filter(c => c.earn == maxEarning)
	console.log(bestProcent)
	const pc= finArr.map(c=>c.p+'%');
	const earnPc= finArr.map(c=>c.earn);
	const dep= finArr.map(c=>c.res);
	const countMinn ={pc:pc, earnPc: earnPc,dep:dep, success:success,kf:kf,sample:sample,bestProcent:bestProcent};
	return countMinn;
};

//получаем обьект расчетных даных для построения графика
//начальный депозит
//kf  соотношение прибыль лосс,sample  выборка (колсичестов тестов),
// sample количестов выборки
//succsess процент успешных сделок из 100
//pc процент прибыли
//earnPc полученная прибыль в процентах после выполненея выборки 


//запустить программу с default данными и получить нужные переменные
let {
	pc:pc,
	earnPc: earnPc,
	success:success,
	kf:kf,
	sample:sample,
	bestProcent:bestProcent} = fooProfit(2, 40),
	// передать default данные  для графика
	data = {
		type: 'bar',
		data: {
	    	//ось Х
	    	labels: pc,
	    	datasets: [{
	    		label: `% earnings`,


	            //ось Y
	            data: earnPc,
	            backgroundColor: [
	            'rgba(255, 99, 32, 0.2)'],
	            borderColor: [
	            'rgba(255, 99, 132, 1)'],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	maintainAspectRatio: false,
	    	plugins: {
	    		title: {
	    			display: true,
	    			text: `% earnings at ${success}% succsess trades and best result ${bestProcent[0].p}%(a trade profit)/${bestProcent[0].earn}%(total) at sample ${sample}`
	    		}
	    	}
	    },
	    scales: {
	    	x: {
	    		title: {
	    			display: true,
	    			color: '#f35',
	    			text: `A trade profit`
	    		},
	    		backgroundColor: 'rgba(255, 255, 255, 0.75)'
	    	},
	    	y: {
	    		title: {
	    			display: true,
	    			text: `depositNewTotalSize`
	    		},
	    		beginAtZero: true,

	    	}
	    }
	};


//поулчить данные из инпута
const getDataMinn= ()=> {
	let defaultData = dataMinnervini.value.split(',')
	.map(// .replace(/\s/g, '')
		c=> parseInt(c));
	defaultData = defaultData.length!=2
	?[2,40]
	:defaultData

	return defaultData
}

//вывод расчета с данными из инпута
const countMinn = ()=> {
	console.log(getDataMinn())
	let {
		pc:pc,
		earnPc: earnPc,
		success:success,
		kf:kf,
		sample:sample,
		bestProcent:bestProcent} = fooProfit.apply(this, getDataMinn()),
		data = {
			type: 'bar',
			data: {
	    	labels: pc,
	    	datasets: [{
	    		label: `% earnings`,
		            //ось Y
		            data: earnPc,
		            backgroundColor: [
		            'rgba(255, 99, 32, 0.2)'],
		            borderColor: [
		            'rgba(255, 99, 132, 1)'],
		            borderWidth: 1
		        }]
	    	},
		    options: {
		    	maintainAspectRatio: false,
		    	plugins: {
		    		title: {
		    			display: true,
		    			text: `% earnings at ${success}% succsess trades and best result ${bestProcent[0].p}%(a trade profit)/${bestProcent[0].earn}%(total) at sample ${sample}`
		    		}
		    	}
		    },
		    scales: {
		    	x: {
		    		title: {
		    			display: true,
		    			color: '#f35',
		    			text: `A trade profit`
		    		},
		    		backgroundColor: 'rgba(255, 255, 255, 0.75)'
		    	},
		    	y: {
		    		title: {
		    			display: true,
		    			text: `depositNewTotalSize`
		    		},
		    		beginAtZero: true,

		    	}
		    }
	};
//чистим графическую область
chart.destroy();

// строим график
chart = new Chart(ctx, data);
}

countMinnervini.onclick= countMinn;	


let chart = document.getElementById('myChart'),
ctx = chart.getContext('2d');
//данные для графика 

// строим график
chart = new Chart(ctx, data);
chart.canvas.parentNode.style.width ='800px';
chart.canvas.parentNode.style.height ='600px';

