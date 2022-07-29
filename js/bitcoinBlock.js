

function showBitcoinRate(){
	getRate();
	setTimeout(()=> {
		gr.innerHTML= ``;
		myPoseBitcoin.innerHTML= ``;
	},60000)
};

async function getRateUsd(){
	try{
		const {rates}= await (await fetch("https://openexchangerates.org/api/latest.json?app_id=950e7939546942c5b62a3bd284959545")).json();
	console.log(`Смотрите также исторические данные getRateUsd`)

		const {RUB} = rates;
		//  типа привожу к наличному доллару в обменнике (купить за рубли)
		 let usd = (RUB*1.015).toFixed(1);
		 return usd;
	}catch(e){
			console.erorr(e)
	}
 
};
async function getRate(){
	try{
		const {bpi,time} = await (await fetch("https://api.coindesk.com/v1/bpi/currentprice.json")).json();
		
// денег у меня в долларах,сколько могу купить биткойнов,процент моей позы
					let bitcoinRate =  bpi.USD.rate_float;
						
					getRateUsd().then(rate=> {
								let myCurMoneyUsd =  150000/rate,
								myPoseMayBe= myCurMoneyUsd/bitcoinRate,
								procentFromOldPose = (myCurMoneyUsd*100/(bitcoinRate*0.334)).toFixed(1);

								gr.innerHTML= `<div class="trade__rate-data"><p>Today\`s 
								<a  target='_blank' href ='https://www.worldcoinindex.com/coin/bitcoin'>bitcoin</a> stock price:
								<span>$${(bitcoinRate).toFixed(0)} ($${rate})</span></p>`;
								gr.innerHTML+= `<p>Could get (from RUB150_000)
								${time.updated}:
								<span>BTC${(myCurMoneyUsd/bitcoinRate).toFixed(8)}
								(${procentFromOldPose}%)</span></p></div>`;
								}).catch(e=> e);
						 
		console.log(`Смотрите также исторические данные getHistoryBitcoinRate(mydate)`)
	}catch(e){
			console.error(e)
	}
		
};

//  исторические данные по битку

async function  getHistoryBitcoinRate(mydate){
	try{
		mydate = mydate ||"2019-01-01";
  		const startUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=`,
  		 endUrl = `&end=2021-12-07`,
  		 url = startUrl+mydate+endUrl;
			const  data = await (await fetch(url)).json();
			console.log(data)
	}catch(e){
			console.erorr(e)
	}
  
};

// getHistoryBitcoinRate("2019-01-01")
