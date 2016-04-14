window.onload= function(){
	var aInputs = document.getElementsByTagName('input');
	var oVideo = document.getElementById('v1');
	timer=null;

////
	var d2 = new Drag('div2');
	d2.init(function(scale){
		oVideo.currentTime = scale * oVideo.duration;//可以查询，也可以修改达到目的
			
		nowTime();
	});
	
	var d4 = new Drag('div4');
	d4.init(function(scale){
		oVideo.volume = scale;
	});


////
	//按钮一播放，video属性paused，方法play（）pause（）关联nowTime
	aInputs[0].onclick = function(ev){
		if (oVideo.paused) {
			oVideo.play();
			this.className ='stop';///////////////////修改class，但是也有忧先级吧
			nowTime();
			timer = setInterval(nowTime,1000);
		}else{
			oVideo.pause();
			clearInterval(timer);
			this.className ='';
		}
	}
	//显示最终时间
	aInputs[2].value= changeTime(oVideo.duration);
	//显示静音与否属性muted（true/false）是否静音、volume(0-1) 
	aInputs[3].onclick= function(){
		if (oVideo.muted) {
			oVideo.volume =1;
			oVideo.muted = false;
			this.className ='silence';
		}else{
			oVideo.volume =0;
			oVideo.muted = true;
			this.className ='';
		}
	}

	//全屏，只能在火狐和谷歌浏览器使用，还要做他们的兼容，还写着W3C的标准（暂时谁没按他的）
	aInputs[4].onclick = function(){
		if (!document.fullscreenElement &&!document.mozFullScreenElement && !document.webkitFullscreenElement) {  
    	if (document.documentElement.requestFullscreen) {
      		oVideo.requestFullscreen();
    	} else if (document.documentElement.mozRequestFullScreen) {
      				doVideo.mozRequestFullScreen();
    	} else if (document.documentElement.webkitRequestFullscreen) {
      				oVideo.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    	}
 	} else {
    if (document.cancelFullScreen) {
      oVideo.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      oVideo.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      oVideo.webkitCancelFullScreen();
    }
  }
	}
	//通用函数，最后要放在前面
	function nowTime(){
		aInputs[1].value = changeTime(oVideo.currentTime);
		var scale = oVideo.currentTime/oVideo.duration;
		d2.obj.style.left = scale * 240 + 'px';
		// alert(d2.obj.style.left);
	}
	function changeTime(iNum){
		var hour = toZero(Math.floor(iNum/3600));
		var min = toZero(Math.floor(iNum%3600/60));
		var sec = toZero(Math.floor(iNum%60));
		return hour+":"+min+":"+sec;
	}
	function toZero (num) {
		if(num<=9){
			return  '0'+ num;
		}else{
			return ''+num;
		}
	}
}