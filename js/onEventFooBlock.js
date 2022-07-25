
abp.onclick= getmodal;			// открыть модальное окно
mcl.onclick= closemodal;		// иконка закрытия модального окна
modalCalc.onclick= closeCalc;		
count.onclick = showChart;
countInt.onclick = getSingleChartForInterest;
fetchCurrencies.onclick = showBitcoinRate;




losscount.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		countOptimalLot();
	}
});
averagePrice.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		countAveragePrice();
	}
});
getReqWeather.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		getWeather(getReqWeather.value);
	}
});

buts__putLink.addEventListener('click', putSomelinks);
buts__getLink.addEventListener('click', showBaseLinks);
wholeListbox__close.addEventListener('click', closeBaseBox);
buts__clearBase.addEventListener('click', clearLinksInBox);
buts__setStorage.addEventListener('click', saveIntoStorage);
