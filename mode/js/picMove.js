window.onload=function(){
	function fn(obj,img){
		obj.onmousedown=function(ev){
			var ev=ev||event;//解决兼容问题
			var minObj=null;//存放最小距离的id
			var aImg=document.getElementsByTagName(img);//如果调用时，这样重新再找一次
			for(var a=0;a<aImg.length;a++){//恢复边框并且把慢动作取消，并给上index
				aImg[a].style.border="4px solid #fff";
				aImg[a].style.transition="";
				aImg[a].style.zIndex="1";
			}
			obj.style.zIndex="999";//这样让他在上面
			var scrollT=document.documentElement.clientTop||document.body.scrollTop;
			//上面的是等滑动时滑动距离
			var objFistL=obj.offsetLeft;//存起来等交换时换位置
			var objFistT=obj.offsetTop;
			var disX=ev.clientX-obj.offsetLeft;//得到固定的距离
			var disY=ev.clientY+scrollT-obj.offsetTop;
				ev.preventDefault&&ev.preventDefault();//高版本兼容图片效果
				ev.returnValue&&ev.returnValue();//低版本兼容图片效果
				obj.setCapture&&obj.setCapture();//低版本需要聚焦
			document.onmousemove=function(ev){
				var ev=ev||event;
				var scrollT=document.documentElement.clientTop||document.body.scrollTop;
				//设置移动的大小
				var maxL=document.documentElement.clientWidth-obj.offsetWidth;
				var maxT=document.documentElement.clientHeight-obj.offsetHeight;
				var L=ev.clientX-disX;
				var T=ev.clientY-disY
				L=L<0?0:L;
				L=L>maxL?maxL:L;
				T=T<0?0:T;
				T=T>maxT?maxT:T;
				obj.style.left=L+"px";
				obj.style.top=T+scrollT+"px";
				//存放碰撞的id
				var arr=[];
				//调用找碰撞id
				for(var a=0;a<aImg.length;a++){
					if(obj!==aImg[a]){
						if(fn2(obj,aImg[a])){
							arr.push(aImg[a]);
						}
					}
				}
				//找最小距离
				var num=Infinity;
				for(var b=0;b<arr.length;b++){
					var c=obj.offsetLeft-arr[b].offsetLeft;
					var d=obj.offsetTop-arr[b].offsetTop;
					if(num>(c*c+d*d)){
						num=c*c+d*d;
						minObj=arr[b];
					}
				}
				//每次动再恢复以前边框
				for(var a=0;a<aImg.length;a++){
					aImg[a].style.border="4px solid #fff";
				}
				//给最小距离的图片变边框
				if(minObj){
					minObj.style.border="5px solid red";
				}
			}
			document.onmouseup=function(){
				if(minObj){
					//交换位置
					obj.style.transition="0.5s";
					minObj.style.transition="0.5s";
					obj.style.left=minObj.offsetLeft+"px";
					obj.style.top=minObj.offsetTop+"px";
					minObj.style.left=objFistL+"px";
					minObj.style.top=objFistT+"px";
					minObj.style.border="4px solid #fff"
				}else{
					//返回原来位置
					obj.style.transition="0.5s";
					obj.style.left=objFistL+"px";
					obj.style.top=objFistT+"px";
				}
				document.onmousemove=document.onmouseup=null;//都要写，不然会回去的
				obj.releaseCapture&&obj.releaseCapture();//失去焦点
				
			}
		}
	}
	function fn2(obj,obj2){
		var objW=obj.offsetWidth;
		var objL=obj.offsetLeft;
		var objT=obj.offsetTop;
		var objH=obj.offsetHeight;
		var obj2W=obj2.offsetWidth;
		var obj2L=obj2.offsetLeft;
		var obj2T=obj2.offsetTop;
		var obj2H=obj2.offsetHeight;
		if(objW+objL<obj2L||objT+objH<obj2T||objL>obj2L+obj2W||objT>obj2T+obj2H){
			return false;
		}else{
			return true;
		}
	}
	var oBox=document.getElementById("box1");
	var str="";
	var num=1;
	for(var a=0;a<3;a++){
		for(var b=0;b<5;b++){
			str+="<img style='left:"+(40+270*b)+"px;top:"+(30+330*a)+"px' src='../img/img/"+num+".jpg'/>";
			num++;
		}
	}
	oBox.innerHTML=str;
	var aImg=document.getElementsByTagName("img");
	for(var a=0;a<aImg.length;a++){
		fn(aImg[a],"img");
	}
	
}