//front-modal
aboutModal.onclick= getmodal;	
closeModal.onclick= closemodal;	
//trade
modalCalc.onclick= closeCalc;
//minervini		
count.onclick = showChart;
countInt.onclick = getSingleChartForInterest;
//bitc
fetchCurrencies.onclick = hostRateinBlock;



//trade
lossCount.addEventListener("keyup", (e) => {
	e.preventDefault();
	if (e.keyCode === 13) {
		countOptimalLot();
	}
});
averagePrice.addEventListener("keyup", (e) => {
	e.preventDefault();
	if (e.keyCode === 13) {
		countAveragePrice();
	}
});

// weather
getReqWeather.addEventListener("keyup", (e) => {
	e.preventDefault();
	if (e.keyCode === 13) {
		getWeather(getReqWeather.value);
	}
});

//storage
putLink.addEventListener('click', putSomelinks);
getLink.addEventListener('click', showBaseLinks);
showroomClose.addEventListener('click', closeBaseBox);
clearBase.addEventListener('click', clearLinksInBox);
saveToStorage.addEventListener('click', saveIntoStorage);
