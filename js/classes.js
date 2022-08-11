
class CreatedWindow {
	constructor(options){
		this.tag =options.tag;
		this.top =options.top;
		this.left =options.left;
		this.className =options.className;
		this.background =options.background;
		this.width =options.width;
		this.height =options.height;
		this.padding =options.padding;
		this.margin =options.margin;
		this.opacity =options.opacity;
		this.borderRadius =options.borderRadius;
		this.warning =options.warning;
	};

	create(){
		let el = document.createElement(this.tag);
		el.style.position = "absolute";

		el.className = this.className;
		el.innerHTML =this.warning;

		el.style.background = this.background;
		el.style.opacity = this.opacity;
		el.style.width = this.width;
		el.style.height = this.height;
		el.style.borderRadius = this.borderRadius;

		el.style.padding = this.padding;
		el.style.top = this.top;
		el.style.left = this.left;
		return el;
	}
	get element(){
		return this.create();
	}

	addRelativeParent(parent){
		parent.style.position ="relative"
	}
	appendIt(parent){
		let el =this.create();
		return parent.appendChild(el);
	}
}
let options = {
		tag :"div",
		top:0,
		left: 0,
		className:"goose",
		background:"#000",
		width:"100%",
		height:"100%",
		padding:"50px",
		margin:"50px",
		opacity:.8,
		borderRadius:"2px",
		warning: `<div class="warn__list"></div>
			 <div class ="warn__item">WOW! YOU HAVE ALREADY PUT THE LINK!</div>`
};

let obj4 = new CreatedWindow(options);
// obj4.addRelativeParent(storage);//defined and made relative parent
// obj4.create();// create the obj
// obj4.appendIt(storage);// append the obj to parent
console.log(obj4.element)