//open m0dal window
function getmodal() {
	frontModal.style.display = 'block';
}

function closemodal() {
	frontModal.style.display = 'none';
}


	//clean inputs
function cleanInp(){
		document.querySelectorAll('input').forEach(function(el,i){
			if(el.id!=='loss'
				& el.id!=='minervini__count-main-graph'
				& el.id!=='minervini__count-sub-graph'
				& el.id!=='search'){
				el.value = null;
			}
		})
};
//
console.log('посчитать стоплосс и тейкпрофит - задать цену покупки (инпут 1) и лосс (инпут 3), нажать enter')
//calc
function countOptimalLot(){
	let loss =lossCount.value?lossCount.value:2000;
	if(secondPricePose.value){
			const lot = Math.abs((loss/(firstPricePose.value-secondPricePose.value)).toFixed(1)),
			fee = (firstPricePose.value*2*lot/1000000*330).toFixed(1),
			fond = (firstPricePose.value*lot/1000000).toFixed(3);	

			calcData.innerHTML=`Искомый лот: ${lot}
			Стоимость сделки: ${fond} млн.,
			в том числе комиссия ${fee} рублей`;
			console.log(`Лот ${lot}, стоимость  ${fond} млн
			 и  комиссы  ${fee} руб`);
			
			modalCalc.style.display ='block';
		} else {
			let pts = (loss/(35000/firstPricePose.value)).toFixed(1);
			let stopLossPrice = (firstPricePose.value- pts)
			calcData.innerHTML=`S/l: ${stopLossPrice}</br>
			t/p: ${(stopLossPrice+pts*3)}</br>
			купить ${(35000/firstPricePose.value).toFixed(0)}шт.</br>

			при депозите 35_000,
			лоссе ${loss}`
			modalCalc.style.display ='block';
		}
		
};
//calc
function countAveragePrice(){
		calcData.innerHTML=``;
		if(averagePrice.value){
			const cleanArray   = averagePrice.value.split(',').filter(Boolean);
			const quantity= cleanArray.length;
					sum = cleanArray.map(Number).reduce((sum, el)=> sum+el,0);
			calcData.innerHTML = `Средняя цена лота:${(sum/quantity).toFixed(1)}`;
			modalCalc.style.display ='block';
			console.log(`Средняя цена лота:${(sum/quantity).toFixed(1)}`);
		} else {
			alert(`Введено неверное значение! Проверьте ввод цифр`)
		}
};
function closeCalc(){
		modalCalc.style.display ='none';
		cleanInp()
};


// showcase link-li mark-ups


for (let i = 0; i < showsubMenu.length; i++){
		showsubMenu[i].setAttribute('data-position', i);

		showsubMenu[i].addEventListener('click', function(e){
				let pointed = e.target.getAttribute('data-position');
				e.target.style.color= '#375ead';

				let visibles =document.querySelectorAll(".visible");
				let openedList = [...visibles];
				let quantityOfVisibleLi = openedList.reduce((q,el) => q= el.children.length + q,0)
				console.log(quantityOfVisibleLi);

				//get optimal quantity of rows
				//for long-rows li
				if(linkToShow[pointed].children.length > 32){

					linkToShow[pointed].classList.add('visible');
					linkToShow[pointed].classList.add('biggest');

					// delete extra(>7) el from row
						if(openedList.length+1 > 4){
							openedList[0].classList.remove('visible');
						}
					//for middle-long-rows li
				} else if(linkToShow[pointed].children.length >16){

						linkToShow[pointed].classList.add('visible');
						linkToShow[pointed].classList.add('big');
						if(openedList.length+1>4){
							openedList[0].classList.remove('visible');
						}

				}else {
					////for rest li
						linkToShow[pointed].classList.add('visible');
						if(openedList.length+1 > 4){
							openedList[0].classList.remove('visible');
						}
				}
		})
}


//uniq id generator
function uid() {
  let timing = Date.now().toString(36).toLocaleUpperCase();
  let randomising = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
  randomising = randomising.toString(36).slice(0, 12).padStart(12, '0').toLocaleUpperCase();
  return ''.concat(timing, '-', randomising);
};

		
console.log('base-javascript.js loaded', new Date().toLocaleDateString())








