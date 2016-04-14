//一开始是想函数复用的，以为逻辑参不多，就是个别的参数和部分功能不一样
//思路是构造函数有属性（每个对象可以不同），构造函数有方法（复用）
//难点是要弄清楚this指谁，函数给那个对象执行才不多就它了
//
function Drag(conid){
	this.obj = document.getElementById(conid);
	this.vLength =0;
	this.disX =0;
	this.L =0;
	this.scale =this.L/this.vLength;
}
	Drag.prototype.init = function (fn) {
		var This= this;//是为了mousedown函数里的执行上下文和mousedown一样
		this.vLength= this.obj.parentNode.offsetWidth - this.obj.offsetWidth;
	this.obj.onmousedown = function(ev){
		var ev = ev || window.event;
		This.disX = ev.clientX - This.obj.offsetLeft;
		document.onmousemove = function(ev){
			This.L = ev.clientX - This.disX;
			if(This.L<0){
				This.L = 0;
			}
			else if(This.L>This.vLength){
				This.L = This.vLength;
			}
			This.obj.style.left = This.L + 'px';
			
			This.scale = This.L/This.vLength;
			
			fn(This.scale);
			
		}
		document.onmouseup = function(){
			This.fnUp();	
		};	
		return false;
		}
	
	}
	Drag.prototype.fnUp= function(){
		document.onmousemove = null;
		document.onmouseup = null;
		};





