
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
console.log('посчитать стоплосс и тейкпрофит - задать цену покупки (инпут 1) и лосс (инпут 3)о, нажать enter')
function countOptimalLot(){
	let loss =losscount.value?losscount.value:2000;
	if(sp.value){
			const lot = Math.abs((loss/(fp.value-sp.value)).toFixed(1)),
			fee = (fp.value*2*lot/1000000*330).toFixed(1),
			fond = (fp.value*lot/1000000).toFixed(3);	

			calcData.innerHTML=`Искомый лот: ${lot}
			Стоимость сделки: ${fond} млн.,
			в том числе комиссия ${fee} рублей`;
			console.log(`Лот ${lot}, стоимость  ${fond} млн
			 и  комиссы  ${fee} руб`);
			
			modalCalc.style.display ='block';
		} else {
			let pts = (loss/(35000/fp.value)).toFixed(1);
			let stopLOssPrice = (fp.value- pts)
			calcData.innerHTML=`S/l: ${stopLOssPrice}</br>
			t/p: ${(stopLOssPrice+pts*3)}</br>
			купить ${(35000/fp.value).toFixed(0)}шт.</br>

			при депозите 35_000,
			лоссе ${loss}`
			modalCalc.style.display ='block';
		}
		
};
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


// showcase mark-ups
for (var i=0; i< showsubMenu.length; i++){
		showsubMenu[i].setAttribute('data-position', i);
		showsubMenu[i].addEventListener('click', function(e){
			let pointed = this.getAttribute('data-position');
			e.target.style.color= '#C5A639FF';
	// open only 3 in row
			let openedList = [...document.querySelectorAll(".visible")];
			if(openedList.length < 3){
			linkToShow[pointed].classList.toggle('visible');
			} else {

				openedList[0].classList.toggle('visible');
				linkToShow[pointed].classList.toggle('visible')
			}
		})
}

function uid() {
  let timing = Date.now().toString(36).toLocaleUpperCase();
  let randomising = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
  randomising = randomising.toString(36).slice(0, 12).padStart(12, '0').toLocaleUpperCase();
  return ''.concat(timing, '-', randomising);
};

		
console.log('mySite070422.js')
console.log((new Date).toLocaleDateString() );








