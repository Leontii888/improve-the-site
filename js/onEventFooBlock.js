
aboutModal.onclick= getmodal;			// открыть модальное окно
closeModal.onclick= closemodal;		// иконка закрытия модального окна
modalCalc.onclick= closeCalc;		
count.onclick = showChart;
countInt.onclick = getSingleChartForInterest;
fetchCurrencies.onclick = hostRateinBlock;




lossCount.addEventListener("keyup", function(e) {
	e.preventDefault();
	if (e.keyCode === 13) {
		countOptimalLot();
	}
});
averagePrice.addEventListener("keyup", function(e) {
	e.preventDefault();
	if (e.keyCode === 13) {
		countAveragePrice();
	}
});
getReqWeather.addEventListener("keyup", function(e) {
	e.preventDefault();
	if (e.keyCode === 13) {
		getWeather(getReqWeather.value);
	}
});

putLink.addEventListener('click', putSomelinks);
getLink.addEventListener('click', showBaseLinks);
showroomClose.addEventListener('click', closeBaseBox);
clearBase.addEventListener('click', clearLinksInBox);
saveToStorage.addEventListener('click', saveIntoStorage);
