const INCREASE_FIFTEEN_PERSENT =1.015;
const RUB_DEPOSIT_AVAIL =150000;
const BITCOIN_DEPOSIT_AVAIL =.334;

//price usd
async function getRateUsd(){
	try{
		const {rates}= await (await fetch("https://openexchangerates.org/api/latest.json?app_id=950e7939546942c5b62a3bd284959545")).json();
			
					const {RUB} = rates;
					// привожу к наличному доллару в обменнике (купить за рубли)
					 let usd = (RUB*INCREASE_FIFTEEN_PERSENT).toFixed(1);
					 return usd;
		}catch(e){
				console.warn(e)
		}
};


// host to block on site
async function hostRateinBlock(){
						blockBitcoinRates.innerHTML= `Requesting data...`
		try{
			const {bpi,time} = await (await fetch("https://api.coindesk.com/v1/bpi/currentprice.json")).json();
						let bitcoinPrice =  bpi.USD.rate_float;
							
						getRateUsd().then(usdPrice=> {
									let myMoneyUsd =  RUB_DEPOSIT_AVAIL/usdPrice,
									myPoseMayBe= myMoneyUsd/bitcoinPrice,
									partOldPose = (myMoneyUsd*100/(bitcoinPrice*BITCOIN_DEPOSIT_AVAIL)).toFixed(1);

									blockBitcoinRates.innerHTML= `<div class="trade__rate-data"><p>Today\`s 
									<a  target='_blank' href ='https://www.worldcoinindex.com/coin/bitcoin'>bitcoin</a> stock price:
									<span>$${(bitcoinPrice).toFixed(0)} ($${usdPrice})</span></p>`;

									blockBitcoinRates.innerHTML+= `<p>Could get (from RUB150_000)
									${time.updated}:
									<span>BTC${(myMoneyUsd/bitcoinPrice).toFixed(8)}
									(${partOldPose}%)</span></p></div>`;
						})
		}catch(e) {
				console.warn(e)
		}
};

console.log(`Смотреть также исторические данные Доллара и Биткойна(getRateUsd и getHistorybitcoinPrice(mydate))`);
//  исторические данные по биткойну

async function  getHistorybitcoinPrice(mydate){
	try{
		mydate = mydate ||"2019-01-01";
  		const startUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=`,
  		 endUrl = `&end=2022-06-07`,
  		 url = `${startUrl}${mydate}${endUrl}`;
			const  data = await (await fetch(url)).json();

			console.log(`Requesting data....`)
			console.log(data)
	}catch(e){
			console.warn(e)
	}
  
};

// getHistorybitcoinPrice("2015-01-01")
