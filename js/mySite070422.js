

	//find collections
function srchCollClassBeginWith(classBeginWith){
		let matched = new Array();
		 [...document.getElementsByTagName("*")].forEach(el=> {
				if( el.matches("[class^="+classBeginWith+"]")){
				matched = [...matched,el]
			};
		})
		return matched;
};
	//clean inputs
function cleanInp(){
		document.querySelectorAll('input').forEach(function(el,i){
			if(el.id!=='loss'
				& el.id!=='getCount'
				& el.id!=='getCountSingle'
				& el.id!=='search'){
				console.log(`B ${i} поле было записано ${el.value}`);
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

			modalCalc.innerHTML=`Искомый лот: ${lot}
			Стоимость сделки: ${fond} млн.,
			в том числе комиссия ${fee} рублей`;
			console.log(`Лот ${lot}, стоимость  ${fond} млн
			 и  комиссы  ${fee} руб`);
			
			modalCalc.style.display ='block';
		} else {
			let pts = (loss/(35000/fp.value)).toFixed(1);
			console.log(pts)
			let stopLOssPrice = (fp.value- pts)
			modalCalc.innerHTML=`S/l: ${stopLOssPrice}</br>
			t/p: ${(stopLOssPrice+pts*3)}</br>
			купить ${(35000/fp.value).toFixed(0)}шт.</br>

			при депозите 35_000,
			лоссе ${loss}`
			modalCalc.style.display ='block';
		}
		
};
function countAveragePrice(){
		modalCalc.innerHTML=``;
		if(averagePrice.value){
			const cleanArray   = averagePrice.value.split(',').filter(Boolean);
			const quantity= cleanArray.length;
					sum = cleanArray.map(Number).reduce((sum, el)=> sum+el,0);
			modalCalc.innerHTML = `Средняя цена лота:${(sum/quantity).toFixed(1)}`;
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
//show 
const  showsubMenu = srchCollClassBeginWith("sub-");

for (var i=0; i< showsubMenu.length; i++){
		showsubMenu[i].setAttribute('ind', i);
		showsubMenu[i].addEventListener('click', function(e){
			let pointed = this.getAttribute('ind');
			// console.log(this.getAttribute('ind'));
			e.target.style.color= '#C5A639FF';
			links[pointed].classList.toggle('visible');
		})
}
		
console.log('mySite070422.js')
console.log((new Date).toLocaleDateString() );







