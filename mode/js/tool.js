//获取id和TagName的函数
function $(abc,ahc,tagname){//如果ahc也就是id有时会没有写，则要写在后面
	ahc=ahc||document;//表示如果输入ach则是ach否则为document；
	tagname=tagname||"*";
	if(abc.charAt(0)=="#"){
		return document.getElementById(abc.slice(1));
	}else if(abc.charAt(0)=="."){//这个不懂可以看下面的getClassName
		arrclass=ahc.getElementsByTagName(tagname);//获取所有元素
		var arr2=[];
		for(var a=0;a<arrclass.length;a++){
			var str=arrclass[a].className.split(" ");//把一个个元素分割成数组
			for(var b=0;b<str.length;b++){//在数组重查找
				if(str[b]==abc.slice(1)){
					arr2.push(arrclass[a]);//存在数组中
					break;//防止一个标签中有多个同样的 claaName
				}
			}
		}
		return arr2;//返回数组
		
	}else{
		return ahc.getElementsByTagName(abc);
	}
}
//支持高低版本获取style中元素值的函数，前置支持低版本，后置支持高版本(获取属性值)
function getStyle(id,attr){
	if(id.currentStyle){//return id.currentStyle?id.currentStyle[attr]:getComputedStyle(id)[attr];
		return id.currentStyle[attr];//因为是在id后最多是undifined但是不会报错
	}else{
		return getComputedStyle(id)[attr];//如果拿他先判断低版本会出现报错；实在想去用就必须在判断前写成window.getComputedStyle
	}
}
//查找数组中固定值的方法
function arrIndexOf(arr,str,num){//arr代表数组，str代表要找到的内容；num表示从几个数开始找
	if(arguments.length!==0||arguments.length!==1){//arguments存的是实际参数
		num=num||0;//表示如果输入num则是num否则为0；
		for(var i=num;i<arr.length;i++){
			if(str==arr[i]){
				return i;
			}
		}
		return -1;
	}
	return "您写的参数不对";
}
//封装一个兼容性的获取className的函数
//思路：1.先找到你想在哪个标签下找对应的className只写一个则默认为全部body中找 2.循环去查到，把查到到的tagName存在一个数组中 3.在程序中便利；
function getClassName(className1,id,tagname){
	id=id||document;
	tagname=tagname||"*";
	abc=id.getElementsByTagName(tagname);//获取所有元素
	var arr2=[];
	for(var a=0;a<abc.length;a++){
		var str=abc[a].className.split(" ");//把一个个元素分割成数组
		for(var b=0;b<str.length;b++){//在数组重查找
			if(str[b]==className1){
				arr2.push(abc[a]);//存在数组中
				break;//防止一个标签中有多个同样的 claaName
			}
		}
	}
	return arr2;//返回数组
}
//添加一个className
function addClass(id,className1){
	if(id.className==""){//如果没有classname则直接输进去
		id.className=className1;
	}else{
		var str=id.className.split(" ");//分割成数组去判断
		if(arrIndexOf(str,className1)==-1){//当是-1时里面没有对应的classname名字
			id.className+=" "+className1;
		}
	}
}
//删除className
function removeClass(id,className1){
	if(id.className!==""){
		var arr=id.className.split(" ");//引号中有空格，指的是通过空格把字符串分割成数组，再进去判断
		for(var a=0;a<arr.length;a++){
			if(arr[a]==className1){
				arr.splice(a,1);
				a--;
			}
		}
		id.className=arr.join(" ");
		
	}
}
//获取元素下第一个子元素
function first(id){
	var first=id.firstElementChild||id.firstChild;//先写前面是因为后面的都可用，但是后面的可用识别高版本的空白文本，前者只有高版本的识别且只是识别高版本的元素标签
	//不管如何两者都不能识别空白的
	if(!first||first.nodeType!=1){//先判断是否是空白，接着判断是否是元素节点//如果是高版本不需要判断后面，低版本前面满足则需要判断后面
		return null;
	}else{
		return first;
	}
}
//获取一个元素下的最后一个子元素(不懂可以看前面的frist)
function last(id){
	var last=id.lastElementChild||id.lastChild;
	if(!last||last.nodeType!=1){
		return null;
	}else{
		return last;
	}
}
//获取一个元素下的最后一个子元素(不懂可以看前面的frist)
function next(id){
	var next=id.nextElementSibling||id.nextSibling;
	if(!next||next.nodeType!=1){
		return null;
	}else{
		return next;
	}
}
//获取一个元素下的最后一个子元素(不懂可以看前面的frist)
function previous(id){
	var previous=id.previousElementSibling||id.previousSibling;
	if(!previous||previous.nodeType!=1){
		return null;
	}else{
		return previous;
	}
}
//获取他相对于body的位置
function getPost(id){
	var post={left:0,top:0};
	if(id.offsetParent){
		post.left+=id.offsetLeft;
		post.left+=(id.offsetParent.clientWidth-id.offsetParent.clientWidth)/2;
		post.top+=id.offsetTop;
		post.top+=(id.offsetParent.clientTop-id.offsetParent.clientTop)/2
		id=id.offsetParent;
	}
	return post;
}
//绑定函数的调用
function bind(obj,evName,evFn,isCapture){//第二个参数需要加引号，第三个参数是调用的函数第四个参数是指是否捕获，参数写ture或者false；
	if(obj.addElementListener){//高版本浏览器用这个
		obj.addEventListener(evName,evFn,isCapture);//
	}else if(obj.attachEvent){//这个写的时候比高级浏览器多了一个事件时加“on”，少了一个是否捕获
		obj.attachEvent("on"+evName,function(){evFn.call(obj)});//低版本只能识别冒泡，不能识别捕获，Ie浏览器用这个
	}else{
		obj["on"+evName]=evFn;
	}
}
//递归来给数组排序
function sort(arr){
	if(arr.length<1){//这个必须写，不然会报错
		return arr;
	}{
		var num=arr.splice(0,1)[0];//这个不能放在前面，不然会少数字的
		var left=[],right=[];
		for(var a=0;a<arr.length;a++){
			if(arr[a]>num){
				right.push(arr[a]);
			}else{
				left.push(arr[a]);
			}
		}
	}
	return sort(left).concat(num,sort(right));
}
//通过冒泡来给数组排序
function sort1(arr){
	for(var a=0;a<arr.length;a++){
		for(var b=arr.length-1;b>a;b--){
			if(arr[b-1]>arr[b]){
				var abc=arr[b-1];
				arr[b-1]=arr[b];
				arr[b]=abc;
			}
		}
	}
	return arr;
}
//通过开关来给数组去重
function fn1(arr){
	var arr2=[];
	for(var a=0;a<arr.length;a++){
		if(a==0){
			arr2.push(arr[0]);
		}else{
			var onOff=true;
			for(var b=0;b<arr2.length;b++){
				if(arr[a]===arr[b]){
					onOff=false;
				}
			}
			if(onOff){
				arr2.push(arr[a]);
			}
		}
		
	}
	return arr2;
}
//alert(fn1(arr));
//利用jios键名唯一来给数组去重
function fn2(arr){
	var arr2=[];
	var jos={};//通过json的键值唯一，来去重
	for(var a=0;a<arr.length;a	++){
		var str=typeof arr[a]+arr[a];//防止字符串和数字一样
		if(!jos[str]){
			arr2.push(arr[a]);
			jos[str]=true;
		}
	}
	return arr2;
}
//图片拖拽兼容性函数封装//碰撞后找最短的距离换位置
function drag(obj,img){
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
					if(hitText(obj,aImg[a])){
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
//封装一个碰撞的检查函数
function hitText(obj,obj2){
	var objW=obj.offsetWidth;
	var objL=obj.offsetLeft;
	var objT=obj.offsetTop;
	var objH=obj.offsetHeight;
	var obj2W=obj2.offsetWidth;
	var obj2L=obj2.offsetLeft;
	var obj2T=obj2.offsetTop;
	var obj2H=obj2.offsetHeight;
	if(objW+objL<obj2L||objT+objH<obj2T||objL>obj2W+obj2L||objT>obj2T+obj2H){
		return false;
	}else{
		return true;
	}
}
//封装一个设置cookie的函数
function setCookie(key,value,t){
	var myDate=new Date();
	myDate.setDate(myDate.getDate()+t);
	document.cookie=key+"="+encodeURI(value)+";expires="+myDate.toGMTString();
}
//封装一个查找对应key 的value值
function getCookie(key){
	var arr=document.cookie.split("; ");
	for(var a=0;a<arr.length;a++){
		var newArr=arr[a].split("=");
		if(newArr[0]==key){
			return newArr[1];
		}
	}
}
//删除cookie,过期就删除了
function removeCookie(key){
	setCookie(key,"",-1)
}
//ajax函数的封装，也就是与传输获取数据//自己弄的有错误；
/*function ajax(options){
	var defaults={
		method: options.method ||"get",
		url:options.url ,
		data:options.data|| "",
		fn:options.fn || null,
		dataType: options.dataType || ""
	}
	var xhr=null;
	try{
		xhr=new XMLHttpRequest();
	}catch(e){
		//xhr=new ActiveXObject("Microsoft.XMLHTTP");
		xhr=new ActiveXObject("Microsoft.XMLHTTP");

	}
	if(defaults.method=="get"&&defaults.data){
		defaults.url=defaults.url+"?"+defaults.data;
	}
	xhr.open(defaults.method,defaults.url,true);
	if(defaults.method=="post"){
		xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
		xhr.send(defaults.data);
	}else{
		xhr.send();
	}
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				var data=xhr.responseText;
				if(dataType=="json"){
					data=JSON.parse(xhr.responseText);
				}
				if(dataType=="xml"){
					data=xhr.responseXML;
				}
				defaults.fn&defaults.fn(data);
			}else{
				alert("您输入的错误代码是"+xhr.state);
			}
		}
	}
}*/
//老师的ajax封装
function ajax(options){
	
	var defaults={
		method: options.method ||"get",
		url:options.url ,
		data:options.data|| "",
		fn:options.fn || null,
		dataType: options.dataType || ""
	}
					
	var xhr=null;
	try{
		xhr=new XMLHttpRequest();
	}catch(e){
		xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	if(defaults.method=="get"&&defaults.data){
		defaults.url=defaults.url+"?"+defaults.data+"&"+new Date().getTime();
	}
	xhr.open(defaults.method,defaults.url,true);
	if(defaults.method=="post"){
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		xhr.send(defaults.data);
	}else{
		xhr.send();
	}
	xhr.onreadystatechange=function(){ 
		if(xhr.readyState==4){
			if(xhr.status==200){
				//xml   json
				var data=xhr.responseText;
				if(defaults.dataType=="json"){
					data=JSON.parse(xhr.responseText);
				}
				if(defaults.dataType=="xml"){
					data=xhr.responseXML;
				}
				
				defaults.fn&&defaults.fn(data);
			}else{
				alert("错了，状态码是："+xhr.status);
			}
		}
	}
}
//定时器的调用
function move(obj,attr,speed,target,fn){
	//if(obj.times)return;
	clearInterval(obj.times);
	obj.times=null;
	speed=target>parseInt(getStyle(obj,attr))?speed:-speed;
	obj.times=setInterval(function(){
		var H=parseInt(getStyle(obj,attr))+speed;
		if(H>=target&&speed>0||H<=target&&speed<0){
			clearInterval(obj.times);
			obj.times=null;
			H=target;
			obj.style[attr]=H+"px";
			fn&&fn();
		}else{
			obj.style[attr]=H+"px";
		}
		
	},30)
}
//抖动函数
function shake(obj,attr,sudu,speed,fn){
	if(obj.times)return;
	var num=0;
	var arr=[];
	for(var a=sudu;a>-1;a-=speed){
		arr.push(a,-a);
	}
	var L=parseInt(getStyle(obj,attr))
	obj.times=setInterval(function(){
		obj.style[attr]=L+arr[num]+"px";
		num++;
		if(num==arr.length-1){
			clearInterval(obj.times);
			obj.times=null;
			fn&&fn();
		}
	},100)
}
/*function  startMove(obj,json,fn){
	obj.timer=setInterval(function(){
		var onOff=true;
		//遍历json里面的每一个属性
		for( var attr in json){
			var iCur=parseInt(getStyle(obj,attr));//初始化的时候的这个对象下的这个属性的值
		//0  	10
		//用目标属性值减去 目前的样式的值，差值 除以8 得到一个小的速度值
			var speed=(json[attr]-iCur)/8;
			
			//进行向上取整 （js中计算的样式的小数值得时候，会进行四舍五入，所以到了某一个
			//值得时候,就会发生停止(四舍五入不上去了)）
			speed=json[attr]-iCur>0 ?  Math.ceil(speed)  : Math.floor(speed);
			//只要有一个属性值没有到目标点，则让开关变成假	
			if(iCur!=json[attr]){
				onOff=false;
			}
			//console.log(iCur+":"+speed);
			//让对象的这个属性等于当前的样式里面的属性值加上  速度（已经处理过了）
			obj.style[attr]=iCur+ speed   +"px";
			
		}
		//当循环完json的属性的时候，判断这次循环的开关是不是真的，如果是真的，说明
	//	都到目标点了，停止定时器，并且执行回调函数
		if(onOff){
			clearInterval(obj.timer);
			fn&&fn();
		}
		
	},30);
}*/
//上面的是老师封装的
//运动函数的调用，多条属性运动//最好写的能整出不然会抖动
function moreMove(obj,json,fn){
	clearInterval(obj.times);
	obj.times=setInterval(function(){
		var onOff=true;
		//便利json中的每一项
		for(var attr in json){
			//获取当前json中每一项在css中的样式
			if(attr=="opacity"){
				var iCur=parseFloat(getStyle(obj,attr))*100;
			}else{
				var iCur=parseInt(getStyle(obj,attr));
			}
			//这样做是为了进度一样，不能使用固定的值但是除以几是可以变化的
			speed=(json[attr]-iCur)/8;
			//因为是除所有会发生除后加起来进不上去的现象，所有我进行处理，正数向上去取正大，但是负数是向下取正大，所有要判断；
			speed=json[attr]-iCur>0?Math.ceil(speed):Math.floor(speed);
			//只要有一项没到达目标开关就是false，不能写else为ture，不然只要有一个到达就可能停止运动了
			if(iCur!=json[attr]){
				onOff=false;
			}
			//让变化进行起来
			if(attr=="opacity"){
				obj.style.opacity=(iCur+speed)/100;
				obj.style.filter="alpha(opacity="+(iCur+speed)+")";
			}else{
				obj.style[attr]=iCur+speed+"px";
			}
			
		}
		//循环完成后进行判断，如果都完成则看是否有回调函数，有则执行
		if(onOff){
			clearInterval(obj.times);
			fn&&fn();
		}
	},30)
}
//抛物线运动
function parabola(obj,json,speed,fn){
	clearInterval(obj.times);
	var char2={
		x:parseInt(getStyle(obj,"left")),
		y:parseInt(getStyle(obj,"top"))
	}
	var char={
		x:json.left-char2.x,
		y:json.top-char2.y
	}
	var num=0;
	var b=(char.y-0.0005*char.x*char.x)/char.x;
	//y=0.05*num*num+b*num
	obj.times=setInterval(function(){
		num+=speed;
		if(num>=char.x){
			num=char.x;
			clearInterval(obj.times);
			fn&&fn()
		}
		obj.style.left=char2.x+num+"px";
		obj.style.top=char2.y+0.0005*num*num+b*num+"px";
	},10)
}
//随机颜色封装
function randomColor(){
	var r=Math.floor(Math.random()*256).toString(16);
	var g=Math.floor(Math.random()*256).toString(16);
	var b=Math.floor(Math.random()*256).toString(16);
	return "#"+(r.length>1?r:"0"+r)+(g.length>1?g:"0"+g)+(b.length>1?b:"0"+b)
}
//封装一个forEach();
function forEach(arr,callback){
	for(var i=0;i<arr.length;i++){
		callback(arr[i],i);
	};	
}