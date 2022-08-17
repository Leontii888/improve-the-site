const MINIMAL_ACCEPTED_LOSS= 2000;
const MILLION= 1000000;
const MILLION_TRADE_FEE= 330;
const TRADES= 2;
const DEPOSIT= 35000;
const RATIO= 2;
const LIS_IN_BIG_CHAPTER= 32;
const LIS_IN_MID_CHAPTER= 16;
const CHAPTERS_SHOWED_COMMON= 5;
const CHAPTERS_SHOWED_MID= 3;
const CHAPTERS_SHOWED_BIG= 2;



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

// modal
let modalWinSetting = new ModalSetting;
	modalWinSetting.padding =0;
	modalWinSetting.className ="linkTradeModal";
class TradeModal extends Block{
		constructor(modalWinSetting){
			super(commonOptions)
		}
};
let tradeModal = new TradeModal;
tradeModal.className =`tradeModalWin`;
let tradeModalEl = tradeModal.create();
tradeModal.addRelativeParent(tradeBlockInp)


//calc
function countOptimalLot(){
	let loss =lossCount.value ? lossCount.value : MINIMAL_ACCEPTED_LOSS;
	if(secondPricePose.value){
			const lot = Math.abs((loss/(firstPricePose.value-secondPricePose.value)).toFixed(1)),
			fee = (firstPricePose.value*TRADES*lot/MILLION*MILLION_TRADE_FEE).toFixed(1),
			fond = (firstPricePose.value*lot/MILLION).toFixed(3);	
//modal
				tradeModal.text =`<p>Искомый лот: ${lot}
				Стоимость сделки: ${fond} млн.,
				в том числе комиссия ${fee} рублей</p>`;
			
				tradeModal.appendTo(tradeBlockInp);
				console.log(`Лот ${lot}, стоимость  ${fond} млн
				 и  комиссы  ${fee} руб`);

					// close modal, remove listener
					tradeBlockInp.addEventListener("click", () => {
						let tradeModalWin =document.querySelector(".tradeModalWin");
						tradeBlockInp.removeChild(tradeModalWin);
						cleanInp();
					},{once: true});
			// calcData.innerHTML=``);
			// modalCalc.style.display ='block';
	} else {
			let pts = (loss/(DEPOSIT/firstPricePose.value)).toFixed(1);
			let stopLossPrice = (firstPricePose.value - pts);

			tradeModal.text =`<p>S/l: ${stopLossPrice}</br>
			t/p: ${(stopLossPrice+pts*RATIO)}</br>
			купить ${(DEPOSIT/firstPricePose.value).toFixed(0)}шт.</br>
			при депозите 35_000, максимальном лоссе ${loss}</p>`;
			tradeModal.appendTo(tradeBlockInp);

			tradeBlockInp.addEventListener("click", () => {
					let tradeModalWin =document.querySelector(".tradeModalWin");
					tradeBlockInp.removeChild(tradeModalWin);
					cleanInp();
			},{once: true})
			console.log(`S/l: ${stopLossPrice}, t/p: ${(stopLossPrice+pts*RATIO)} купить ${(DEPOSIT/firstPricePose.value).toFixed(0)}штук при депозите 35_000, максимальном лоссе ${loss}`);

			// calcData.innerHTML=`S/l: ${stopLossPrice}</br>
			// t/p: ${(stopLossPrice+pts*RATIO)}</br>
			// купить ${(DEPOSIT/firstPricePose.value).toFixed(0)}шт.</br>

			// при депозите 35_000,
			// лоссе ${loss}`
			// modalCalc.style.display ='block';
	}
		
};


//calc
function countAveragePrice(){
		calcData.innerHTML=``;
		if(averagePrice.value){
			const cleanArray   = averagePrice.value.split(',').filter(Boolean);
			const quantity= cleanArray.length;
					sum = cleanArray.map(Number).reduce((sum, el)=> sum+el,0);
					//modal
					tradeModal.text =`<p>Средняя цена лота:${(sum/quantity).toFixed(1)}</p>`
					tradeModal.appendTo(tradeBlockInp);
					// close modal, remove listener
					tradeBlockInp.addEventListener("click", ()=> {
						let tradeModalWin =document.querySelector(".tradeModalWin");
						tradeBlockInp.removeChild(tradeModalWin);
						cleanInp();
					},{once: true})
			// calcData.innerHTML = `Средняя цена лота:${(sum/quantity).toFixed(1)}`;
			// modalCalc.style.display ='block';
			console.log(`Средняя цена лота:${(sum/quantity).toFixed(1)}`);
		} else {
			alert(`Введено неверное значение! Проверьте ввод цифр`)
		}
};

// showcase link-li mark-ups and expand

for (let i = 0; i < showsubMenu.length; i++){
		showsubMenu[i].setAttribute('data-position', i);

		showsubMenu[i].addEventListener('click', function(e){
				let pointed = e.target.getAttribute('data-position');
				e.target.style.color= '#375ead';

				let visibles =document.querySelectorAll(".visible");
				let openedList = [...visibles];
				let quantityOfVisibleLi = openedList.reduce((q,el) => q= el.children.length + q,0)
				// console.log(quantityOfVisibleLi);

				//get optimal quantity of rows
				//for long-rows li
				if(linkToShow[pointed].children.length > LIS_IN_BIG_CHAPTER){

					linkToShow[pointed].classList.add('visible');
					linkToShow[pointed].classList.add('biggest');

					// delete extra(>2) el from row
						if(openedList.length+1 > CHAPTERS_SHOWED_BIG){
							// openedList[0].classList.remove('visible');
							 for(let i=CHAPTERS_SHOWED_BIG-1; i < openedList.length; i++){
							 	openedList[i].classList.remove('visible');
							 }
						}
						}
					//for middle-long-rows li
				else if(linkToShow[pointed].children.length > LIS_IN_MID_CHAPTER){

						linkToShow[pointed].classList.add('visible');
						linkToShow[pointed].classList.add('big');
						//limit q-ty of chapters
						if(openedList.length > CHAPTERS_SHOWED_MID){
						 for(let i=CHAPTERS_SHOWED_MID-1; i < openedList.length; i++){
							 	openedList[i].classList.remove('visible');
							 }

							// openedList[0].classList.remove('visible');
						}
				}else {
					////for rest li
						linkToShow[pointed].classList.add('visible');
						if(openedList.length+1 > CHAPTERS_SHOWED_COMMON &&openedList.length <CHAPTERS_SHOWED_MID){
							openedList[0].classList.remove('visible');
						} else {
							for(let i=CHAPTERS_SHOWED_BIG-1; i < openedList.length; i++){
							 	openedList[i].classList.remove('visible');
							 }
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

//remove slashes and spaces
function modifyDataString(string) {
	return string.split("")
					.filter(el => el != "\\")
						.filter(el => el != "\"")
							.filter(Boolean)
								.join("");
}


//curry foos
//update contexts

// let changeTextOnId = class => content => document.querySelector(`.${class}`).textContent=content;
// let updateContent = changeTextOnId("trade__title-text");
// updateContent("bla bla")
//

