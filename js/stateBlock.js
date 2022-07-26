const commonLinks = [
	{address: 'https://hangouts.google.com/?hl=ru"', title:'hangOuts'},
	{address: 'https://cloud.mail.ru/home/js/?from-page=home&from=logout"', title:'Mail.ru cloud'},
	{address: 'https://mega.nz/fm/i2wAma6Y"', title:'MegaSinc Облачное хранилице'},
	{address: 'https://drive.google.com/drive/my-drive"', title:'GoogleDisc Облачное хранилище'},
	{address: 'https://www.dropbox.com/home"', title:'DropBox Облачное хранилище'},
	{address: 'https://music.yandex.ru/users/uid-oxmlirbl/artists"', title:'Яндекс.Музыка'},
	{address: 'https://soundcloud.com/user992548114"', title:'SoundCloud'},
	{address: 'https://keypro2.ru/category/%D0%BA%D0%BB%D1%8E%D1%87%D0%B8-%D0%BA-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%D0%BC/"', title:'Malware psw'},
	{address: 'https://hh.ru/applicant/resumes/view?resume=7c9157d1ff05e109d50039ed1f744147637765"', title:'ХХРУ. Мое резюме'},
	{address: 'https://www.avito.ru/moskva/vakansii/bez_opyta_studenty/polnyy_den/ne_imeet_znacheniya"', title:'Авито'},
	{address: 'https://10minutemail.net/?lang=ru"', title:'10 минутная почта'},
	{address: 'https://moguza.ru/service/list/?join"', title:'Могу за...'}
	],
 cssLinks = [
	{address: 'https://cssgrid-generator.netlify.com/"', title:'cssgrid-generator'},
	{address: 'https://stackoverflow.com/users/11873695/piperpiper"', title:'Stack OverflowPiperPiper'},
	{address: 'https://wp-kama.ru/id_8045/flex-v-css.html"', title:'Flexbox в CSS'},
	{address: 'http://www.unit-conversion.info/sitemap.html"', title:'Полезные конверсии и калькуляторы'},
	{address: 'http://css-tricks.com"', title:'Хитрости CSS'},
	{address: 'http://web-sprints.ru/css-elementyi-v-stroku/"', title:'http://web-sprints.ru/css-elementyi-v-stroku'},
	{address: 'https://puzzleweb.ru/css/pr_justify-content.php"', title:'puzzleweb.ru. justify-content'},
	{address: 'http://w3.org.ua/category/js/"', title:'Отличные видео по разаработке'},
	{address: 'https://html5book.ru/styling-hyperlinks/"', title:'styling-hyperlinks'},
	{address: 'https://developer.mozilla.org/ru/docs/Web/CSS/font-weight"', title:'font-weight'},
	{address: 'http://upworktestru.com/css_test_2016_upwork_answers_questions/"', title:'Ответы на Test Questions Upwork. CSS'},
	{address: 'http://upworktestru.com/english-spelling-test-u-s-version-2016-upwork-answers-questions/"', title:'Ответы на Test Questions Upwork. Английский язык'},
	{address: 'https://www.sassmeister.com/"', title:'Sassmeister.com'},
	{address: 'http://css3generator.com/"', title:'CSS генератор'},
	{address: 'https://caniuse.com/"', title:'Can I use'}
	],
 tradingLinks = [
	{address: 'https://www.bestchange.ru/bitcoin-to-ruble-cash.html"', title:'Приложения BestChange.ru'},
	{address: 'https://news.yandex.ru/"', title:'news.yandex.ru'},
	{address: 'https://bcs-express.ru/dividednyj-kalendar"', title:'БКС. Дивиденды'},
	{address: 'https://ru.investing.com/currencies/usd-zar#"', title:'Investing. Экономический календарь'},
	{address: 'https://putinomics.ru/ru/russian-ir"', title:'Putinomics. Экономический календарь'},
	{address: 'http://stocktime.ru/" target= "_blank"', title:'Биржевые часы. котировки ведущих бирж. Валюты'},
	{address: 'https://smart-lab.ru/forum/HYDR/page89/"', title:'Smart-lab. Русгидро- форум'},
	{address: 'https://twitter.com/8thpiper"' ,title:'Твиттер'},
	{address: 'https://smart-lab.ru/forum/HYDR/page89/"' ,title:'Smart-lab. Русгидро- форум'},
	{address: 'https://stockcharts.com/h-sc/ui"', title:'Стокчартс. Недельный СНП'},
	{address: 'https://stockcharts.com/h-sc/ui"', title:'Стокчартс. Дневной СНП'},
	{address: 'https://www.worldcoinindex.com/coin/bitcoin"', title:'Биткойн'}
	],
 powShLinks = [
	{address: 'http://winitpro.ru/index.php/category/powershell/"', title:'WINITPRO'},
	{address: 'https://ss64.com/ps/set-content.html"', title:'Set-Content'},
	{address: 'https://wpconfig.ru/"', title:'Наброски админа'},
	{address: 'https://habr.com/ru/company/netwrix/blog/167171/"', title:'Статья на хабре о PS'},
	{address: 'https://sawfriendship.wordpress.com/2019/03/16/ps_scripts_modules_profiles_1_1/"', title:'Saw-frandship. Блог о PS'},
	{address: 'https://docs.microsoft.com/ru-ru/dotnet/api/system.io.filesystemwatcher.waitforchanged?redirectedfrom=MSDN&view=netframework-4.8#System_IO_FileSystemWatcher_WaitForChanged_System_IO_WatcherChangeTypes_System_Int32_"', title:'net.frameworks'},
	{address: 'https://smearg.wordpress.com/2013/05/16/%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0-f-%D0%B2-powershell/"', title:'Smearg. Блог о PS'},
	{address: 'https://ab57.ru/cmdlist.html"', title:'Список команд Windows ( Windows CMD )'},
	{address: 'http://man7.org/linux/man-pages/dir_section_1.html"', title:'Linux. Все команды'},
	{address: 'https://winintro.ru/windowspowershellhelp.ru/html/c0ceb96b-e708-45f3-803b-d1f61a48f4c1.htm"', title:'Работа с файлами'},
	{address: 'https://docs.microsoft.com/en-us/powershell/module/PowershellGet/Find-DscResource?view=powershell-6"', title:'Майкрософт. PowerShell'},
	{address: 'http://qaru.site/tags"', title:'Вопросник по тегам PowerShell, CSS, HTML JS, Jquery'}
	],
 youTubeLinks = [
	{address: 'https://www.youtube.com/channel/UCY10FZglXJ8RL3xB04VpykQ"', title:'CodeDojo'},
	{address: 'https://www.youtube.com/channel/UCTgx8cZRD5Jz2_zGaT27S3w"', title:'Денис Горелов. CSS'},
	{address: 'https://www.youtube.com/user/TheComePot"', title:'Pa DamTuts'},
	{address: 'https://www.youtube.com/user/dmitrylavr"', title:'Дмитрий Лаврик'},
	{address: 'https://www.youtube.com/user/SkanerSoft"', title:'Сканер Софт'},
	{address: 'https://www.youtube.com/channel/UCP-xJwnvKCGyS-nbyOx1Wmg"', title:'Алекс Лущенко'},
	{address: 'https://www.youtube.com/user/AlexeySuprun"', title:'Web Developer blog'},
	{address: 'https://www.youtube.com/user/loftblog"', title:'Loft blog'},
	{address: 'https://www.youtube.com/channel/UCn5wduCq2Mus0v85QZn9IaA"', title:'Типичный верстальщик'},
	{address: 'https://www.youtube.com/user/LebedevUM"', title:'Юрий Лебедев. PowerShell'}
	],
 designLinks = [
	{address: 'https://www.pinterest.ru/begbi9/"', title:' Pinterest'},
	{address: 'https://lifehacker.ru/photoshop-shortcuts/"', title:' Лайфхакер. 55 горячих клавиш фотошопа'},
	{address: 'https://habr.com/ru/"', title:' Хабр'},
	{address: 'https://vk.com/id462255797"', title:' Вк. Амгуэма'},
	{address: 'https://github.com/Leontii888?tab=repositories"', title:' Гитхаб'},
	{address: 'https://freelance.ru/freelance_bay"', title:' Фриланс. Амгуэма'}
	],
 htmlLinks = [
	{address: 'http://shpargalkablog.ru/2012/04/input-html-5.html"', title:' Шпаргалка блог хтмл'},
	{address: 'http://prog-time.ru/480-2/"', title:' Горячие клавиши для Sublime Text'},
	{address: 'http://htmlbook.ru/samcss/universalnyy-selektor"', title:' htmlbook.ru. Справочник по HTML  и CSS'},
	{address: 'https://html5book.ru/vypadayushee-menu/#part1"', title:' Справка по Html, Css'},
	{address: 'http://getcolor.ru/#937839"', title:' getColor'},
	{address: 'https://webpack.js.org/"', title:' Webpack.js.org'},
	{address: 'http://ava7patterns.com/tag-zminimalistic.php"', title:' Паттерны бэкграундов'},
	{address: 'https://getmdl.io/started/index.html#download"', title:' Material Design Litee'},
	{address: 'https://vc.ru/design/9120-mdl"', title:' Создание веб-страниц Material Design Lite'},
	{address: 'https://medium.com/google-developers/introducing-material-design-lite-3ce67098c031"', title:' Introducing Material Design Lite'},
	{address: 'https://www.amocrm.ru/"', title:' CRM система для сайта'},
	{address: 'http://proweb63.ru/help/all-about-css/sp-sim-html"', title:' Специальные символы'}
	],
 javaScriptLinks = [
	{address: 'https://codepen.io/piperpiper/pen/dLWwmm"', title:' https://codepen.io. Кодить в сети'},
	{address: 'https://learngitbranching.js.org/?locale=ru_RU"', title:' Обучение по git'},
	{address: 'https://jsfiddle.net/"', title:' jsfiddle.net Кодить в сети'},
	{address: 'https://paiza.io/en/projects/new?language=javascript"', title:' paiza.io. Кодить в сети'},
	{address: 'http://tools.seo-auditor.com.ru/javascript-compressor/"', title:' Сервисы кода. Сжатие и проверки онлайн'},
	{address: 'http://rgblog.ru/"', title:' Блог по программированию'},
	{address: 'https://m.habr.com/ru/company/ruvds/blog/441566/"', title:' 12 концепций JavaScript, о которых нужно знать'},
	{address: 'http://www.unit-conversion.info/texttools/text-statistics/#data"', title:' Text statistics generator'},
	{address: 'https://tproger.ru/translations/how-to-handle-undefined-in-javascript/"', title:' 7 советов по обработке «undefined» в JavaScript'},	
	{address: 'https://stackoverflow.com/users/11873695/piperpiper"', title:' stackOverflow. PiperPiper'},
	{address: 'https://developer.mozilla.org/en-US/docs/Web/API/Element/matches"', title:' https://developer.../docs/Web/API/Element/matches'},
	{address: 'https://javascript.ru/forum/dom-window/6831-prisvoenie-vysote-diva-znacheniya-window-innerheight.html"', title:' https://javascript.ru/forum/...prisvoenie-vysote-window-innerheight.html'},
	{address: 'https://javascript.ru/basic/array"', title:' https://javascript.ru/basic/array'},
	{address: 'https://www.w3schools.com/js/js_functions.asp"', title:' Функции'},
	{address: 'https://medium.com/nuances-of-programming/%D0%B4%D0%B0%D0%B2%D0%B0%D0%B9%D1%82%D0%B5-%D1%80%D0%B0%D0%B7%D0%B1%D0%B5%D1%80%D0%B5%D0%BC%D1%81%D1%8F-%D1%81-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D0%B0%D0%BC%D0%B8-slice-splice-%D0%B8-split-%D0%B2-javascript-5f5602a64f63"', title:' slice( ), splice( ) и split( )'},
	{address: 'https://learn.javascript.ru/array-iteration"', title:' https://learn.javascript.ru/array-iteration'},
	{address: 'http://qaru.site/search?query=toggle"', title:' Toggle'},
	{address: 'https://learn.javascript.ru/xhr-forms"', title:' XMLHttpRequest POST, формы и кодировка'},
	{address: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else"', title:' if...else'},
	{address: 'https://learn.javascript.ru/document-write"', title:' Метод document.write'},
	{address: 'https://infodio.ru/tablica-dlya-sajta.html"', title:' Таблица для сайта. Вставить таблицу'},
	{address: 'https://learn.javascript.ru/es-class"', title:' Классы'},
	{address: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/typeof"', title:' typeof'},
	{address: 'https://developer.mozilla.org/ru/docs/Web/API/CanvasRenderingContext2D/drawImage"', title:' CanvasRenderingContext2D.drawImage()'},
	{address: 'https://learn.javascript.ru/settimeout-setinterval"', title:' setTimeout и setInterval'},
	{address: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations"', title:' Canvas_API/Tutorial/Transformations'},
	{address: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax#A_better_apply"', title:' Spread syntax'},
	{address: 'http://qaru.site/questions/25122/passing-an-array-as-a-function-parameter-in-javascript"', title:' Передача массива в качестве параметра функции в JavaScript'},
	{address: 'http://qaru.site/questions/76117/convert-string-into-array-of-integers"', title:' Преобразовать строку в массив целых чисел'},
	{address: 'http://qaru.site/questions/942/get-the-size-of-the-screen-current-web-page-and-browser-window"', title:' get-the-size-of-the-screen-current-web-page-and-browser-window'},
	{address: 'https://learn.javascript.ru/regexp-methods"', title:' Методы RegExp и String'},
	{address: 'https://hackernoon.com/"', title:' Статьи hackernoon.com'},
	{address: 'https://www.jsexpert.net/articles/"', title:' Статьи по JS'},
	{address: 'https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch2.md/#functions-without-function"', title:'О функциях'},
	{address: 'http://browserify.org/"', title:' Browserify.org/'},
	{address: 'https://webpack.js.org/"', title:' Webpack.js.org'}
	],
 tendersLinks= [
	{address:'file:///D:/Programming/java/CodeWars.com/ObjectIngot/ObjectIngot.html"', title:' Расчеты для слитков'},
	{address: 'http://rostender.info/category/tendery-pokovki"', title:' Rostender.info'},
	{address:'file:///D:/Programming/java/CodeWars.com/getIngotCount/getCountMetall.html"', title:' Расчеты для слитков (первый)'},
	{address: 'http://rostender.info/category/tendery-pokovki"', title:' Rostender.info'},
	{address: 'http://www.zakupki.rosatom.ru/Web.aspx?node=currentorders&on2=0601&tso=1&tsl=1&sbflag=0&pform=a&page=1"', title:' RosAtom'},
	{address: 'http://rostender.info/category/tendery-pokovki"', title:' Rostender.info'},
	{address: 'https://www.b2b-center.ru/market/list.html?type=4&all=1"', title:' b2b-center.ru/'},
	{address: 'http://www.tender.pro/view_tenders_list.shtml?sid=&companyid=0&tendertype=0&tenderstate=1&country=0&basis=0&tender_name=&tender_id=&company_name=&good_name=&dateb=&datee=&dateb2=&datee2="', title:' Tender.pro'},
	{address: 'http://metal100.ru/tenders/Pokovka"', title:' Metal100.ru'},
	{address: 'http://zakupki-tendery.ru/index.php?gclid=CjwKCAjw0N3nBRBvEiwAHMwvNvk4aZUeZUol6lt08M9NMCFkCUfumMkbCYNtM4D7uGQeghWuG9QZYRoCz-4QAvD_BwE&Itemid=102&option=com_content&view=article&id=5"', title:' Zakupki-tendery.ru'},
	{address: 'http://docs.cntd.ru/document/12001137785"', title:' GOSTs'}
];


const startString = `<a href="`;
const blank = ` "target ="_blank">`;
const endString = `</a><br/>`;
let preparedArr = [];





//добавить ссылку
// addLink('rbc.ru','Сайт бизнес-информации',tradingLinks);


function addLink(link,discription,base){
	console.log(base.length)
	let string = (link.match(`http://`))
					? link
					: `http://${link}`;

		let putString = 
						{
							address: string,
							title:discription
						}
		let newbase = base.unshift(putString);
	console.log(base)
	return base
	
}


//готовим обекты для размещения в хтмл
const prepareList = (arr) => {
	preparedArr = arr.map(({address,title}) => `${startString}${address}${blank}${title}${endString}`)
	return preparedArr;
};
//размещаем в нужный блок
const hostToBlock = parent => preparedArr.forEach(el => parent.insertAdjacentHTML('beforeend', el ))

//Использование IndexedDB
	
if (!window.indexedDB) {
    window.alert("Ваш браузер не поддерживат стабильную версию IndexedDB. Такие-то функции будут недоступны");
}
const myDbName = "MyKeepBase";
let request = window.indexedDB.open(myDbName, 5);


	prepareList(commonLinks);
	hostToBlock(blockCommonBase);

	prepareList(cssLinks);
	hostToBlock(blockCssBase);

	prepareList(tradingLinks);
	hostToBlock(blockTradingBase);

	prepareList(powShLinks);
	hostToBlock(blockPowShBase);

	prepareList(youTubeLinks);
	hostToBlock(blockYoutubeBase);

	prepareList(htmlLinks);
	hostToBlock(blockHtmlBase);

	prepareList(javaScriptLinks);
	hostToBlock(blockJavascriptBase);

	prepareList(tendersLinks);
	hostToBlock(blocktendersBase);

	prepareList(designLinks);
	hostToBlock(blockDesignBase);	

// request.onsuccsess	= function(){

// 	console.log('request.onsuccsess')
// }

console.log(request)
