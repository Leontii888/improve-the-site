// внести файл (например my_place_to_import.js)  в main- html скриптом с type="module"

//это будет файл в который импортируется обьект (import { hello } from './my_export_foos.js',
// или если был дефолт -import hello from './my_export_foos.js';)

//в my_export_foos.js записать то, что нужно экспортировать (export default foo, или export foo)

export default  function my(){
	console.log("hi, modasdasd234234ule")
};



import my from "./my_module.js";

my();