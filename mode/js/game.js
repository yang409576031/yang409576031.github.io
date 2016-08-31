window.onload=function(){
	var aInput=$("input")[0],aP=$("p",$("#fraction")),oBox=$("#box"),oQQ=$("#qq");
	var num1=0;
	var num2=0;
	var speed=5;
	aInput.onclick=function(){
		
		game()
	}
	function game(){
		aInput.value="正在游戏中";
		aInput.disabled=true;
		oQQ.style.left=Math.ceil(Math.random()*752+24)+"px";
		oQQ.style.background='url(../img/img2/'+Math.ceil(Math.random()*11)+'.png)';
		move(oQQ,"top",speed,426,function(){
			num2++;
			aP[1].innerHTML="失分："+num2+"分";
			oQQ.style.background='url(../img/img2/qq.png)';
			shake(oBox,"top",3,1,function(){
				oQQ.style.top="-24px";
				if(num2==5){
					alert("游戏结束");
					aInput.value="开始游戏";
					aInput.disabled=false;
					num1=0;
					num2=0;
					aP[0].innerHTML="得分："+num1+"分";
					aP[1].innerHTML="失分："+num2+"分";
				}else{
					game();
				}
				
			});
			
		})
		oQQ.onmousedown=function(){
			var H=parseInt(getStyle(oQQ,"top"));
			if(H!=426){
				clearInterval(oQQ.times);
				oQQ.times=null;
				num1++;
				aP[0].innerHTML="得分："+num1+"分";
				shake(oQQ,"left",3,1,function(){
					oQQ.style.top="-24px";
					speed+=0.5;
					game();
				})
			}
		}
	}
}