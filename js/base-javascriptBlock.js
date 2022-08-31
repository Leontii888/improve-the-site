const MINIMAL_ACCEPTED_LOSS= 2000;
const MILLION= 1000000;
const MILLION_TRADE_FEE= 330;
const TRADES_PAIR= 2;
const DEPOSIT= 35000;
const RATIO= 3;
const LIS_IN_BIG_CHAPTER= 32;
const LIS_IN_MID_CHAPTER= 16;
const CHAPTERS_SHOWED= 3;



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
	let fPrice = +firstPricePose.value,
		sPrice = +secondPricePose.value;
	if(sPrice){
			const lot = Math.abs((loss/(fPrice-sPrice)).toFixed(1)),
			fee = (fPrice*TRADES_PAIR*lot/MILLION*MILLION_TRADE_FEE).toFixed(1),
			fond = (fPrice*lot/MILLION).toFixed(3);	
//modal
				tradeModal.text =`<p>Искомый лот: ${lot}
				Стоимость сделки: ${fond} млн.,
				в том числе комиссия ${fee} рублей при возможном лоссе ${loss}</br>Цель сделки ${fPrice+RATIO*(fPrice-sPrice)}(${RATIO*(fPrice-sPrice)}pts)</p>`;
			
				tradeModal.appendTo(tradeBlockInp); 
				console.log(`Лот ${lot}, стоимость  ${fond} млн	 и  комиссы  ${fee} руб при возможном лоссе ${loss}. Цель сделки ${fPrice+RATIO*(fPrice-sPrice)}`);

					// close modal, remove listener
					tradeBlockInp.addEventListener("click", () => {
						let tradeModalWin =document.querySelector(".tradeModalWin");
						tradeBlockInp.removeChild(tradeModalWin);
						cleanInp();
					},{once: true});
			// calcData.innerHTML=``);
			// modalCalc.style.display ='block';
	} else {
			let pts = (loss/(DEPOSIT/fPrice)).toFixed(1);
			let stopLossPrice = (fPrice - pts),
				thisTradeProfit = Math.floor(-100+100*(fPrice+pts*RATIO)/fPrice);

			tradeModal.text =`<p>Вход: ${fPrice}</br>S/l: ${stopLossPrice}</br>
			t/p: ${fPrice + pts*RATIO}</br>
			купить ${(DEPOSIT/fPrice).toFixed(0)}шт.</br>
			при депозите 35_000, максимальном лоссе ${loss}  и соотношении прибыль/убыток = 3.</br> Прибыль ${thisTradeProfit}% (${pts*RATIO}pts)</br>БРАТЬ НЕ БОЛЕЕ 12% ПРИБЫЛИ!</p>`;
			tradeModal.appendTo(tradeBlockInp);

			tradeBlockInp.addEventListener("click", () => {
					let tradeModalWin =document.querySelector(".tradeModalWin");
					tradeBlockInp.removeChild(tradeModalWin);
					cleanInp();
			},{once: true})
			console.log(`Вход: ${fPrice} S/l: ${stopLossPrice} t/p: ${fPrice + pts*RATIO}.Купить ${(DEPOSIT/fPrice).toFixed(0)}шт. при депозите 35_000, максимальном лоссе ${loss}  и соотношении прибыль/убыток = 3. Прибыль ${thisTradeProfit}% (${pts*RATIO}pts) БРАТЬ НЕ БОЛЕЕ 12% ПРИБЫЛИ!`);

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

					// delete extra(>7) el from row
						if(openedList.length+1 > CHAPTERS_SHOWED){
							openedList[0].classList.remove('visible');
						}
					//for middle-long-rows li
				} else if(linkToShow[pointed].children.length > LIS_IN_MID_CHAPTER){

						linkToShow[pointed].classList.add('visible');
						linkToShow[pointed].classList.add('big');
						if(openedList.length+1>CHAPTERS_SHOWED){
							openedList[0].classList.remove('visible');
						}

				}else {
					////for rest li
						linkToShow[pointed].classList.add('visible');
						if(openedList.length+1 > CHAPTERS_SHOWED){
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

//remove slashes and spaces
function modifyDataString(string) {
	return string.split("")
					.filter(el => el != "\\")
						.filter(el => el != "\"")
							.filter(Boolean)
								.join("");
}


