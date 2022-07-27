//Миннервини расчеты  и графики
//==============================================================
//
let chartDiv = document.getElementById('minervini__canvas-chart');
// console.log(data);
	let ctx = chartDiv.getContext('2d');
	let chart =null;


let buffer;
let objInitial = getObjInitial();

function getObjInitial (sucsessTradesProportion=40, samples=10,ratio=2, deposit=100000,fee=720/1000000) {

	let trades= [],
	sucsess= sucsessTradesProportion*samples/100;
	for (let i = 1; i<=sucsess; i++) {
		trades= [...trades,true]
	} 
	for (let i = 1; i<=(samples-sucsess); i++) {
		trades= [...trades,false];
	} 
	return {
		sucsessTradesProportion,
		deposit,
		fee,
		samples,
		trades: trades.sort(()=> Math.random()-0.5),
		ratio
	}
};


function getCountMainTaskArray ({sucsessTradesProportion,samples, trades,ratio,deposit,fee}) {
	let 
	chartCountData=[],
	interest = 1,
	oneInterestResults,
	feeTrade = fee*deposit,
	isNextInterest =true;
	
	while (interest <= 50){

		let depo= deposit,
			depoProgressArray = [],
			earnProgressArray = [];
			//депозит всегда один и тот же
			// function getTradeConstDepoArray(step){
			// 		depoProgressArray = (step)?
			// 		[...depoProgressArray, +deposit * (1 + interest / 100)-feeTrade]
			// 			:
			// 			[...depoProgressArray, +(deposit * (1 - interest / (100 * ratio))-feeTrade).toFixed(1)];

			// 				earnProgressArray = (step)?
			// 				 [...earnProgressArray,+(100 * ( depoProgressArray[depoProgressArray.length-1] - deposit) /deposit).toFixed(2)]
			// 					:
			// 					[...earnProgressArray,+(100 * ( depoProgressArray[depoProgressArray.length-1] - deposit) /deposit).toFixed(2)];
			// }
			// депозитом является последняя сумма 
			function getTradeArray(step){
					depo = isNextInterest? depo: depoProgressArray[depoProgressArray.length-1];
					depoProgressArray = (step)?
					[...depoProgressArray, +depo * (1 + interest / 100)-feeTrade]
						:
						[...depoProgressArray, +(depo * (1 - interest / (100 * ratio))-feeTrade).toFixed(1)];

							earnProgressArray = (step)?
							 [...earnProgressArray,+(100 * ( depoProgressArray[depoProgressArray.length-1] - deposit) /deposit).toFixed(2)]
								:
								[...earnProgressArray,+(100 * ( depoProgressArray[depoProgressArray.length-1] - deposit) /deposit).toFixed(2)];
							
							isNextInterest =false;
			}
			// trades.map(trade => getTradeConstDepoArray(trade));
			trades.map(trade => getTradeArray(trade));

			chartCountData = [...chartCountData,{interest,depoProgressArray,earnProgressArray}];
			isNextInterest = true;
			interest++
	}
	return chartCountData		
};
function putDataToChart(scaleXArray,scaleYArray,label,textLine){
	const {
					sucsessTradesProportion,
					samples,
					trades,
					ratio
					} = buffer;
					// 0,170,255,
		let data = {
					type: 'bar',
					data: {
			    	//ось Х
			    	labels: scaleXArray,
			    	datasets: [{
			    		label: label,
			    		// ось Y
			    		data: scaleYArray,
			    		backgroundColor: [
			    		'rgba(0,170,255,, 0.2)'
			    		],

			    		borderColor: [
			    		'rgba(0,170,255, 100)'
			    		],
			    		borderWidth: 1
			    	}]
			    },
			    options: {
			    	maintainAspectRatio: false,
			    	plugins: {
			    		title: {
			    			display: true,
			    			text:textLine
			    		}
			    	}
			    },
			    scales: {
			    	x: {
			    		title: {
			    			display: true,
			    			color: '#f35',
			    			text: `interes`
			    		},
			    		backgroundColor: 'rgba(255, 255, 255, 0.75)'
			    	},
			    	y: {
			    		title: {
			    			display: true,
			    			text: `earnings`
			    		},
			    		beginAtZero: true,

			    	}
			    }
			};
			return data
};
function showChart (){
	let newInputData = dataBlock.value.split(',').map(c=> Number(c)),
		newobjInitial;
				
			newobjInitial = dataBlock.value
			? getObjInitial(...newInputData)
			: objInitial;
			 console.log(objInitial,newobjInitial)
				const {
					sucsessTradesProportion,
					samples,
					trades,
					ratio
					} = newobjInitial;
					console.log(trades)
						const {
							interestscale,
							earningsSamplesFinalValues,
							earningsBestValue,
							bestInterestValue
							} = prepareObjForChartData(newobjInitial);
								buffer= newobjInitial;
								if(chart){
										chart.destroy();
											chart = new Chart(ctx, putDataToChart(interestscale,earningsSamplesFinalValues,"% earnings",
												`% earnings at ${sucsessTradesProportion }% succsess trades (ratio ${ratio}) and best result  ${earningsBestValue} at interest ${bestInterestValue}%, at samples ${samples} `));
											chart.canvas.parentNode.style.width = "70%";
											chart.canvas.parentNode.style.height ='30rem';
											chartDiv.style.opacity =1;
								} else {
										chart = new Chart(ctx, putDataToChart(interestscale,earningsSamplesFinalValues,"% earnings",
											`% earnings at ${sucsessTradesProportion }% succsess trades (ratio ${ratio}) and best result  ${earningsBestValue} at interest ${bestInterestValue}%, at samples ${samples} `));
										chart.canvas.parentNode.style.width = "70%";
										chart.canvas.parentNode.style.height ='30rem';
										chartDiv.style.opacity =1;
														}
};
function getSingleChartForInterest(){
	let interestRate = +singleInt.value;
	console.log(interestRate)
	const {sucsessTradesProportion,ratio,deposit} = buffer;
	const interestAllCountsArray = getCountMainTaskArray(buffer);
	let scaleX =Array.from({ length: interestAllCountsArray[0].depoProgressArray.length }, (i,j) => j);
	console.log(interestAllCountsArray[interestRate-1].depoProgressArray);
	console.log(interestAllCountsArray[interestRate-1].earnProgressArray);
	let maxDepo =((Math.max.apply(null,interestAllCountsArray[interestRate-1].depoProgressArray) - deposit)*100/deposit).toFixed(1);
	let minDepo =((Math.min.apply(null,interestAllCountsArray[interestRate-1].depoProgressArray) - deposit)*100/deposit).toFixed(1);

		chart.destroy();
		chart = new Chart(ctx, putDataToChart(scaleX,interestAllCountsArray[interestRate-1].depoProgressArray,"depo",`Changing the deposit max/min = ${maxDepo}/${minDepo}  at constant interest ${interestRate},  succsess trades ${sucsessTradesProportion }% (ratio ${ratio}) to ${interestAllCountsArray[interestRate-1].depoProgressArray[scaleX.length-1].toFixed(1)} at samples ${scaleX.length} `));
		chart.canvas.parentNode.style.width = "70%";
		chart.canvas.parentNode.style.height ='30rem';
};
function prepareObjForChartData (chartCountData){

	let resArr = getCountMainTaskArray(chartCountData),
		interestscale = resArr.map(c=> c.interest),
		earningsSamplesFinalValues = resArr
										.map(c=> c.earnProgressArray)
											.map(i=> i[chartCountData.samples-1]),
		earningsBestValue = Math.max.apply(null, earningsSamplesFinalValues),
		bestInterestValue = resArr.filter(c=> c.earnProgressArray
									.find(c => c===earningsBestValue))[0].interest;
	return {
				interestscale,
				earningsSamplesFinalValues,
				earningsBestValue,
				bestInterestValue
			}
};
