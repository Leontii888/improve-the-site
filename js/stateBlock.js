
let parents = [...document.querySelectorAll(".link")];
let titles = parents.map(el=> el.getAttribute("data-title"));
let preparedTempArr = [];

function pickSingleCollection(library,theme){
	return library.filter( el => Object.keys(el)[0] == theme)[0]
}

function pickSingleItem(obj,id){
	return Object.values(obj)[0].filter(el => el.id===id)
}

function distributeItemsToLocalStorage(titles, library){
	try{
		titles.forEach(title =>
 	  		localStorage.setItem(title, JSON.stringify(Object.values(pickSingleCollection(library, title)))));
				console.log('sucsess on downloading to LS')
	} catch (e){
	 console.warn(e)
	}
}


//prepare  custom form
function prepareList(arr){
	const startString = `<li><a href="`,
 			blank = ` " target = "_blank" data-position="${uid()}">`,
 			endString = `</a></li>`;

	preparedTempArr = arr.map(({address,comment}) =>  `${startString}${address}${blank}${comment}${endString}`);
	return preparedTempArr 
};


//insert to element
function insertToBlock(parent){
	return  preparedTempArr.forEach(el => parent.insertAdjacentHTML('beforeend', el ))
}

//disribute to parent block

function hostingToLS(obj){
	titles.forEach((titleEl,i)=> {
				titleToObj = obj[titleEl];
				prepareList(titleToObj);
				insertToBlock(parents[i]);
	});
}

function uploadFromLS(){
	let theme = new Object;
	for (let item in localStorage){
			let flat = JSON.parse(localStorage.getItem(item));
				
			if(flat){
				theme[item] = flat.flat();
			}
	}
	return theme;
}

// main base
// const library = {
// common:[
// 	{id:1, address: 'https://hangouts.google.com/?hl=ru"', comment:'hangOuts'},
// 	{id:2, address: 'https://cloud.mail.ru/home/js/?from-page=home&from=logout"', comment:'Mail.ru cloud'},
// 	{id:3, address: 'https://mega.nz/fm/i2wAma6Y"', comment:'MegaSinc Облачное хранилице'},
// 	{id:4, address: 'https://drive.google.com/drive/my-drive"', comment:'GoogleDisc Облачное хранилище'},
// 	{id:5, address: 'https://www.dropbox.com/home"', comment:'DropBox Облачное хранилище'},
// 	{id:6, address: 'https://music.yandex.ru/users/uid-oxmlirbl/artists"', comment:'Яндекс.Музыка'},
// 	{id:7, address: 'https://soundcloud.com/user992548114"', comment:'SoundCloud'},
// 	{id:8, address: 'https://keypro2.ru/category/%D0%BA%D0%BB%D1%8E%D1%87%D0%B8-%D0%BA-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC/"', comment:'Malware psw'},
// 	{id:9, address: 'https://hh.ru/applicant/resumes/view?resume=7c9157d1ff05e109d50039ed1f744147637765"', comment:'ХХРУ. Мое резюме'},
// 	{id:10, address: 'https://www.avito.ru/moskva/vakansii/bez_opyta_studenty/polnyy_den/ne_imeet_znacheniya"', comment:'Авито'},
// 	{id:11, address: 'https://10minutemail.net/?lang=ru"', comment:'10 минутная почта'},
// 	{id:12, address: 'https://moguza.ru/service/list/?join"', comment:'Могу за...'}
// 	]
// ,
// css:[
// 	{id:"", address: 'https://cssgrid-generator.netlify.com/"', comment:'cssgrid-generator'},
// 	{id:"", address: 'https://stackoverflow.com/users/11873695/piperpiper"', comment:'Stack OverflowPiperPiper'},
// 	{id:"", address: 'https://wp-kama.ru/id_8045/flex-v-css.html"', comment:'Flexbox в CSS'},
// 	{id:"", address: 'http://www.unit-conversion.info/sitemap.html"', comment:'Полезные конверсии и калькуляторы'},
// 	{id:"", address: 'http://css-tricks.com"', comment:'Хитрости CSS'},
// 	{id:"", address: 'http://web-sprints.ru/css-elementyi-v-stroku/"', comment:'http://web-sprints.ru/css-elementyi-v-stroku'},
// 	{id:"", address: 'https://puzzleweb.ru/css/pr_justify-content.php"', comment:'puzzleweb.ru. justify-content'},
// 	{id:"", address: 'http://w3.org.ua/category/js/"', comment:'Отличные видео по разаработке'},
// 	{id:"", address: 'https://html5book.ru/styling-hyperlinks/"', comment:'styling-hyperlinks'},
// 	{id:"", address: 'https://developer.mozilla.org/ru/docs/Web/CSS/font-weight"', comment:'font-weight'},
// 	{id:"", address: 'http://upworktestru.com/css_test_2016_upwork_answers_questions/"', comment:'Ответы на Test Questions Upwork. CSS'},
// 	{id:"", address: 'http://upworktestru.com/english-spelling-test-u-s-version-2016-upwork-answers-questions/"', comment:'Ответы на Test Questions Upwork. Английский язык'},
// 	{id:"", address: 'https://www.sassmeister.com/"', comment:'Sassmeister.com'},
// 	{id:"", address: 'http://css3generator.com/"', comment:'CSS генератор'},
// 	{id:"", address: 'https://caniuse.com/"', comment:'Can I use'}
// 	]
// ,
// trading:[
// 	{id:"", address: 'https://www.bestchange.ru/bitcoin-to-ruble-cash.html"', comment:'Приложения BestChange.ru'},
// 	{id:"", address: 'https://news.yandex.ru/"', comment:'news.yandex.ru'},
// 	{id:"", address: 'https://bcs-express.ru/dividednyj-kalendar"', comment:'БКС. Дивиденды'},
// 	{id:"", address: 'https://ru.investing.com/currencies/usd-zar#"', comment:'Investing. Экономический календарь'},
// 	{id:"", address: 'https://putinomics.ru/ru/russian-ir"', comment:'Putinomics. Экономический календарь'},
// 	{id:"", address: 'http://stocktime.ru/" target= "_blank"', comment:'Биржевые часы. котировки ведущих бирж. Валюты'},
// 	{id:"", address: 'https://smart-lab.ru/forum/HYDR/page89/"', comment:'Smart-lab. Русгидро- форум'},
// 	{id:"", address: 'https://twitter.com/8thpiper"' ,comment:'Твиттер'},
// 	{id:"", address: 'https://smart-lab.ru/forum/HYDR/page89/"' ,comment:'Smart-lab. Русгидро- форум'},
// 	{id:"", address: 'https://stockcharts.com/h-sc/ui"', comment:'Стокчартс. Недельный СНП'},
// 	{id:"", address: 'https://stockcharts.com/h-sc/ui"', comment:'Стокчартс. Дневной СНП'},
// 	{id:"", address: 'https://www.worldcoinindex.com/coin/bitcoin"', comment:'Биткойн'}
// 	]
// ,
// powershell:[
// 	{id:"", address: 'http://winitpro.ru/index.php/category/powershell/"', comment:'WINITPRO'},
// 	{id:"", address: 'https://ss64.com/ps/set-content.html"', comment:'Set-Content'},
// 	{id:"", address: 'https://wpconfig.ru/"', comment:'Наброски админа'},
// 	{id:"", address: 'https://habr.com/ru/company/netwrix/blog/167171/"', comment:'Статья на хабре о PS'},
// 	{id:"", address: 'https://sawfriendship.wordpress.com/2019/03/16/ps_scripts_modules_profiles_1_1/"', comment:'Saw-frandship. Блог о PS'},
// 	{id:"", address: 'https://docs.microsoft.com/ru-ru/dotnet/api/system.io.filesystemwatcher.waitforchanged?redirectedfrom=MSDN&view=netframework-4.8#System_IO_FileSystemWatcher_WaitForChanged_System_IO_WatcherChangeTypes_System_Int32_"', comment:'net.frameworks'},
// 	{id:"", address: 'https://smearg.wordpress.com/2013/05/16/%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0-f-%D0%B2-powershell/"', comment:'Smearg. Блог о PS'},
// 	{id:"", address: 'https://ab57.ru/cmdlist.html"', comment:'Список команд Windows ( Windows CMD )'},
// 	{id:"", address: 'http://man7.org/linux/man-pages/dir_section_1.html"', comment:'Linux. Все команды'},
// 	{id:"", address: 'https://winintro.ru/windowspowershellhelp.ru/html/c0ceb96b-e708-45f3-803b-d1f61a48f4c1.htm"', comment:'Работа с файлами'},
// 	{id:"", address: 'https://docs.microsoft.com/en-us/powershell/module/PowershellGet/Find-DscResource?view=powershell-6"', comment:'Майкрософт. PowerShell'},
// 	{id:"", address: 'http://qaru.site/tags"', comment:'Вопросник по тегам PowerShell, CSS, HTML JS, Jquery'}
// 	]
// ,
// youtube:[
// 	{id:"", address: 'https://www.youtube.com/channel/UCY10FZglXJ8RL3xB04VpykQ"', comment:'CodeDojo'},
// 	{id:"", address: 'https://www.youtube.com/channel/UCTgx8cZRD5Jz2_zGaT27S3w"', comment:'Денис Горелов. CSS'},
// 	{id:"", address: 'https://www.youtube.com/user/TheComePot"', comment:'Pa DamTuts'},
// 	{id:"", address: 'https://www.youtube.com/user/dmitrylavr"', comment:'Дмитрий Лаврик'},
// 	{id:"", address: 'https://www.youtube.com/user/SkanerSoft"', comment:'Сканер Софт'},
// 	{id:"", address: 'https://www.youtube.com/channel/UCP-xJwnvKCGyS-nbyOx1Wmg"', comment:'Алекс Лущенко'},
// 	{id:"", address: 'https://www.youtube.com/user/AlexeySuprun"', comment:'Web Developer blog'},
// 	{id:"", address: 'https://www.youtube.com/user/loftblog"', comment:'Loft blog'},
// 	{id:"", address: 'https://www.youtube.com/channel/UCn5wduCq2Mus0v85QZn9IaA"', comment:'Типичный верстальщик'},
// 	{id:"", address: 'https://www.youtube.com/user/LebedevUM"', comment:'Юрий Лебедев. PowerShell'}
// 	]
// ,
// design:[
// 	{id:"", address: 'https://www.pinterest.ru/begbi9/"', comment:' Pinterest'},
// 	{id:"", address: 'https://lifehacker.ru/photoshop-shortcuts/"', comment:' Лайфхакер. 55 горячих клавиш фотошопа'},
// 	{id:"", address: 'https://habr.com/ru/"', comment:' Хабр'},
// 	{id:"", address: 'https://vk.com/id462255797"', comment:' Вк. Амгуэма'},
// 	{id:"", address: 'https://github.com/Leontii888?tab=repositories"', comment:' Гитхаб'},
// 	{id:"", address: 'https://freelance.ru/freelance_bay"', comment:' Фриланс. Амгуэма'}
// 	]
// ,
// html:[
// 	{id:"", address: 'http://shpargalkablog.ru/2012/04/input-html-5.html"', comment:' Шпаргалка блог хтмл'},
// 	{id:"", address: 'http://prog-time.ru/480-2/"', comment:' Горячие клавиши для Sublime Text'},
// 	{id:"", address: 'http://htmlbook.ru/samcss/universalnyy-selektor"', comment:' htmlbook.ru. Справочник по HTML  и CSS'},
// 	{id:"", address: 'https://html5book.ru/vypadayushee-menu/#part1"', comment:' Справка по Html, Css'},
// 	{id:"", address: 'http://getcolor.ru/#937839"', comment:' getColor'},
// 	{id:"", address: 'https://webpack.js.org/"', comment:' Webpack.js.org'},
// 	{id:"", address: 'http://ava7patterns.com/tag-zminimalistic.php"', comment:' Паттерны бэкграундов'},
// 	{id:"", address: 'https://getmdl.io/started/index.html#download"', comment:' Material Design Litee'},
// 	{id:"", address: 'https://vc.ru/design/9120-mdl"', comment:' Создание веб-страниц Material Design Lite'},
// 	{id:"", address: 'https://medium.com/google-developers/introducing-material-design-lite-3ce67098c031"', comment:' Introducing Material Design Lite'},
// 	{id:"", address: 'https://www.amocrm.ru/"', comment:' CRM система для сайта'},
// 	{id:"", address: 'http://proweb63.ru/help/all-about-css/sp-sim-html"', comment:' Специальные символы'}
// 	]
// ,
// javascript:[
// 	{id:"", address: 'https://codepen.io/piperpiper/pen/dLWwmm"', comment:' https://codepen.io. Кодить в сети'},
// 	{id:"", address: 'https://learngitbranching.js.org/?locale=ru_RU"', comment:' Обучение по git'},
// 	{id:"", address: 'https://jsfiddle.net/"', comment:' jsfiddle.net Кодить в сети'},
// 	{id:"", address: 'https://paiza.io/en/projects/new?language=javascript"', comment:' paiza.io. Кодить в сети'},
// 	{id:"", address: 'http://tools.seo-auditor.com.ru/javascript-compressor/"', comment:' Сервисы кода. Сжатие и проверки онлайн'},
// 	{id:"", address: 'http://rgblog.ru/"', comment:' Блог по программированию'},
// 	{id:"", address: 'https://m.habr.com/ru/company/ruvds/blog/441566/"', comment:' 12 концепций JavaScript, о которых нужно знать'},
// 	{id:"", address: 'http://www.unit-conversion.info/texttools/text-statistics/#data"', comment:' Text statistics generator'},
// 	{id:"", address: 'https://tproger.ru/translations/how-to-handle-undefined-in-javascript/"', comment:' 7 советов по обработке «undefined» в JavaScript'},	
// 	{id:"", address: 'https://stackoverflow.com/users/11873695/piperpiper"', comment:' stackOverflow. PiperPiper'},
// 	{id:"", address: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/matches"', comment:' https://developer.../docs/Web/API/Element/matches'},
// 	{id:"", address: 'https://javascript.ru/forum/dom-window/6831-prisvoenie-vysote-diva-znacheniya-window-innerheight.html"', comment:' https://javascript.ru/forum/...prisvoenie-vysote-window-innerheight.html'},
// 	{id:"", address: 'https://javascript.ru/basic/array"', comment:' https://javascript.ru/basic/array'},
// 	{id:"", address: 'https://www.w3schools.com/js/js_functions.asp"', comment:' Функции'},
// 	{id:"", address: 'https://medium.com/nuances-of-programming/%D0%B4%D0%B0%D0%B2%D0%B0%D0%B9%D1%82%D0%B5-%D1%80%D0%B0%D0%B7%D0%B1%D0%B5%D1%80%D0%B5%D0%BC%D1%81%D1%8F-%D1%81-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B0%D0%BC%D0%B8-slice-splice-%D0%B8-split-%D0%B2-javascript-5f5602a64f63"', comment:' slice( ), splice( ) и split( )'},
// 	{id:"", address: 'https://learn.javascript.ru/array-iteration"', comment:' https://learn.javascript.ru/array-iteration'},
// 	{id:"", address: 'http://qaru.site/search?query=toggle"', comment:' Toggle'},
// 	{id:"", address: 'https://learn.javascript.ru/xhr-forms"', comment:' XMLHttpRequest POST, формы и кодировка'},
// 	{id:"", address: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else"', comment:' if...else'},
// 	{id:"", address: 'https://learn.javascript.ru/document-write"', comment:' Метод document.write'},
// 	{id:"", address: 'https://infodio.ru/tablica-dlya-sajta.html"', comment:' Таблица для сайта. Вставить таблицу'},
// 	{id:"", address: 'https://learn.javascript.ru/es-class"', comment:' Классы'},
// 	{id:"", address: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/typeof"', comment:' typeof'},
// 	{id:"", address: 'https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/drawImage"', comment:' CanvasRenderingContext2D.drawImage()'},
// 	{id:"", address: 'https://learn.javascript.ru/settimeout-setinterval"', comment:' setTimeout и setInterval'},
// 	{id:"", address: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations"', comment:' Canvas_API/Tutorial/Transformations'},
// 	{id:"", address: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax#A_better_apply"', comment:' Spread syntax'},
// 	{id:"", address: 'http://qaru.site/questions/25122/passing-an-array-as-a-function-parameter-in-javascript"', comment:' Передача массива в качестве параметра функции в JavaScript'},
// 	{id:"", address: 'http://qaru.site/questions/76117/convert-string-into-array-of-integers"', comment:' Преобразовать строку в массив целых чисел'},
// 	{id:"", address: 'http://qaru.site/questions/942/get-the-size-of-the-screen-current-web-page-and-browser-window"', comment:' get-the-size-of-the-screen-current-web-page-and-browser-window'},
// 	{id:"", address: 'https://learn.javascript.ru/regexp-methods"', comment:' Методы RegExp и String'},
// 	{id:"", address: 'https://hackernoon.com/"', comment:' Статьи hackernoon.com'},
// 	{id:"", address: 'https://www.jsexpert.net/articles/"', comment:' Статьи по JS'},
// 	{id:"", address: 'https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch2.md/#functions-without-function"', comment:'О функциях'},
// 	{id:"", address: 'http://browserify.org/"', comment:' Browserify.org/'},
// 	{id:"", address: 'https://webpack.js.org/"', comment:' Webpack.js.org'}
// 	]
// ,
// linux:[
// 	{id:"", address:"https://habr.com/ru/company/ruvds/blog/339820/", comment:' 20 приемов работы с командной строкой'},
// 	{id:"", address:"https://www.opennet.ru/docs/RUS/linux_base/node149.html", comment:'Поиск файлов с FIND'},
// 	{id:"", address:"https://ab57.ru/cmd.html#id4", comment:'Командные файлы Windows'},
// 	{id:"", address:"https://ab57.ru/cmdlist.html", comment:'Список команд Windows ( Windows CMD )'}
// 	]
// };
// {tenders:[
// 	{id:"", address:'file:///D:/Programming/java/CodeWars.com/ObjectIngot/ObjectIngot.html"', comment:' Расчеты для слитков'},
// 	{id:"", address: 'http://rostender.info/category/tendery-pokovki"', comment:' Rostender.info'},
// 	{id:"", address:'file:///D:/Programming/java/CodeWars.com/getIngotCount/getCountMetall.html"', comment:' Расчеты для слитков (первый)'},
// 	{id:"", address: 'http://rostender.info/category/tendery-pokovki"', comment:' Rostender.info'},
// 	{id:"", address: 'http://www.zakupki.rosatom.ru/Web.aspx?node=currentorders&on2=0601&tso=1&tsl=1&sbflag=0&pform=a&page=1"', comment:' RosAtom'},
// 	{id:"", address: 'http://rostender.info/category/tendery-pokovki"', comment:' Rostender.info'},
// 	{id:"", address: 'https://www.b2b-center.ru/market/list.html?type=4&all=1"', comment:' b2b-center.ru/'},
// 	{id:"", address: 'http://www.tender.pro/view_tenders_list.shtml?sid=&companyid=0&tendertype=0&tenderstate=1&country=0&basis=0&tender_name=&tender_id=&company_name=&good_name=&dateb=&datee=&dateb2=&datee2="', comment:' Tender.pro'},
// 	{id:"", address: 'http://metal100.ru/tenders/Pokovka"', comment:' Metal100.ru'},
// 	{id:"", address: 'http://zakupki-tendery.ru/index.php?gclid=CjwKCAjw0N3nBRBvEiwAHMwvNvk4aZUeZUol6lt08M9NMCFkCUfumMkbCYNtM4D7uGQeghWuG9QZYRoCz-4QAvD_BwE&Itemid=102&option=com_content&view=article&id=5"', comment:' Zakupki-tendery.ru'},
// 	{id:"", address: 'http://docs.cntd.ru/document/12001137785"', comment:' GOSTs'}
// 	]}





let uploadedFromLS = uploadFromLS()
// host to site from LS
hostingToLS(uploadedFromLS);


//host to site from this file( object "librery")
// hostingToLS(library);
