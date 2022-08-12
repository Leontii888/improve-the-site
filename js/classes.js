//CONDITIONS of window
let commonOptions = {
		tag:"div",
		top:0,
		left:0,
		className:"someName",
		background:"#000",
		width:"100%",
		height:"100%",
		padding:"2rem",
		margin:0,
		opacity:.7,
		borderRadius:"2px",
		text:`<div class="warning__list"><p class ="Warning__text">WOW! YOU HAVE ALREADY PUT THE LINK!</p>
			 <p class ="Warning__text">THANK YOU!</p>
			 </div>`
}

class Options {
	constructor(conditions){
		this.tag=conditions.tag,
		this.top=conditions.top,
		this.left=conditions.left,
		this.className=conditions.className,
		this.background=conditions.background,
		this.width=conditions.width,
		this.height=conditions.height,
		this.padding=conditions.padding,
		this.margin=conditions.margin,
		this.opacity=conditions.opacity,
		this.borderRadius=conditions.borderRadius,
		this.text=conditions.text
	}
};
//
class ModalSetting extends Options{
	constructor(){
		super(commonOptions)
	}
};
//
class Block {
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
		this.text =options.text;
	};

	create(){
		let el = document.createElement(this.tag);
		el.style.position = "absolute";

		el.className = this.className;
		el.innerHTML =this.text;

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
	addRelativeParent(parent){
		parent.style.position ="relative"
	}
	appendTo(parent){
		let el =this.create();
		return parent.appendChild(el);
	}
	get element(){
		return this.create();
	}
	get classNameEl(){
		return this.create().className;
	}

}
