function clock(size,dial,color,color2){
			this.size=size||400;
			this.bansize=this.size/2;
			this.dial=dial||5;
			this.color=color||"black";
			this.color2=color||"#ccc";
			this.canvas=document.getElementById("mycanvas");
			this.draw=this.canvas.getContext("2d");
		}
		clock.prototype={
			init:function(){
				this.canvas.width=this.size;
				this.canvas.height=this.size;
				this.makeDial();
				this.makeDial2();
				this.makeDial3();
				this.makeround();
				this.makePointer2();
				this.makeDial4();
				this.makePointer();
				this.makeMove();
				this.makeround2();
				this.maketext();
			},
			/*制作表盘*/
			makeDial:function(){
				this.draw.save();
				this.draw.beginPath();
				this.draw.arc(this.bansize,this.bansize,this.bansize-this.dial,0,Math.PI*2);
				this.draw.lineWidth=1;
				this.draw.closePath();
				this.draw.strokeStyle=this.color2;
				this.draw.stroke();
				this.draw.fillStyle="#fff";
				this.draw.fill();
				this.draw.restore();
			},
			makeDial2:function(){	
				this.draw.save();
				this.draw.beginPath();
				this.draw.arc(this.bansize,this.bansize,this.bansize/8*7,0,Math.PI*2);
				this.draw.closePath();
				this.draw.fillStyle="#E0E0E0";
				this.draw.fill();
				this.draw.restore();
			},
			maketext:function(){
				var num=0;
				for(var a=0;a<60;a++){
					this.draw.save();
					this.draw.beginPath();
					//this.draw.rotate(Math.PI/6);
					this.draw.translate(this.bansize,this.bansize);
					ang=Math.PI/30*a;
                    sang=Math.sin(ang);
                    cang=Math.cos(ang);
					if(a%5==0){
						num++;
						this.draw.font="normal 20px 微软雅黑";
						this.draw.textalign = 'left';
						this.draw.textBaseline = 'middle';
						this.draw.fillStyle="#46A0FF";
						textWidth ="40px";
						nx = sang *(this.bansize-45);
                        ny = cang * -(this.bansize-45);
						this.draw.fillText(num,nx-5,ny);
					}
					//this.draw.rotate(a*Math.PI/30-40+Math.PI/6);
					this.draw.closePath();
					this.draw.restore();
					
				}
			},
			makeDial3:function(){	
				this.draw.save();
				this.draw.beginPath();
				this.draw.arc(this.bansize,this.bansize,this.bansize/8*4,0,Math.PI*2);
				this.draw.closePath();
				this.draw.fillStyle="#fff";
				this.draw.fill();
				this.draw.restore();
			},
			makeDial4:function(){	
				this.draw.save();
				this.draw.beginPath();
				this.draw.arc(this.bansize,this.bansize,this.bansize/16*3,0,Math.PI*2);
				this.draw.closePath();
				this.draw.fillStyle="#46A0FF";
				this.draw.fill();
				this.draw.restore();
			},
			makePointer2:function(){
				for(var a=0;a<60;a++){
					this.draw.save();
					this.draw.beginPath();
					this.draw.translate(this.bansize,this.bansize);
					this.draw.rotate(a*Math.PI/30);
					this.draw.strokeStyle="#46A0FF";
					if(a%5==0){
						this.draw.moveTo(-this.bansize+20,0);
						this.draw.lineWidth="3";
						
					}
					this.draw.lineTo((this.bansize-this.dial),0);
					this.draw.strokeStyle="#fff";
					this.draw.stroke();
					this.draw.closePath();
					this.draw.restore();
				}
			},
			makePointer:function(){
				for(var a=0;a<60;a++){
					this.draw.save();
					this.draw.beginPath();
					this.draw.translate(this.bansize,this.bansize);
					this.draw.rotate(a*Math.PI/30);
					this.draw.strokeStyle="#46A0FF";
					if(a%5==0){
						this.draw.moveTo(this.bansize-30,0);
						this.draw.lineWidth="3";
						
					}else{
						this.draw.moveTo(this.bansize-20,0);
						this.draw.lineWidth="2";
					};
					this.draw.lineTo((this.bansize-this.dial),0);
					this.draw.stroke();
					this.draw.closePath();
					this.draw.restore();
				}
			},
			makeround:function(){
				this.draw.save();
				this.draw.beginPath();
				this.draw.translate(this.bansize,this.bansize);
				this.draw.arc(0,0,8,0,Math.PI*2);
				this.draw.fillStyle="#666666";
				this.draw.fill();
				this.draw.restore();
			},
			makeround2:function(){
				this.draw.save();
				this.draw.beginPath();
				this.draw.translate(this.bansize,this.bansize);
				this.draw.arc(0,0,5,0,Math.PI*2);
				this.draw.fillStyle="#666666";
				this.draw.fill();
				this.draw.restore();
			},
			makeMove:function(){
				this.makeMove1();
				var that=this;
				setInterval(function(){
					that.makeMove1();
				},1000);
			},
			makeMove1:function(){
				this.draw.clearRect(0,0,this.size,this.size);
				this.makeDial();
				this.makeDial2();
				this.makeDial3();
				this.makeround();
				this.makePointer2();
				this.makeDial4();
				this.makePointer();
				this.maketext();
				var time=new Date();
				var m=time.getMinutes();
				var c=time.getSeconds();
				var h=time.getHours();
				if(h>12){
					h=h-12;
				}
				/*秒*/
					this.draw.save();
					this.draw.beginPath();
					this.draw.translate(this.bansize,this.bansize);
					this.draw.rotate(Math.PI/30*c);
					this.draw.moveTo(0,30);
					this.draw.lineTo(4,0);
					this.draw.lineTo(1,-this.bansize+20);
					this.draw.lineTo(-1,-this.bansize+20);
					this.draw.lineTo(-4,0);
					this.draw.closePath();
					this.draw.fillStyle="#FC9A13";
					this.draw.fill();
					this.draw.restore();
					
				/*分*/
					this.draw.save();
					this.draw.beginPath();
					this.draw.translate(this.bansize,this.bansize);
					this.draw.rotate(Math.PI/30*m+Math.PI/1800*c);
					this.draw.moveTo(0,25);
					this.draw.lineTo(4,0);
					this.draw.lineTo(1,-this.bansize+50);
					this.draw.lineTo(-1,-this.bansize+50);
					this.draw.lineTo(-4,0);
					this.draw.closePath();
					this.draw.fillStyle="#FC9A13";
					this.draw.fill();
					this.draw.restore();
				/*时*/
					this.draw.save();
					this.draw.beginPath();
					this.draw.translate(this.bansize,this.bansize);
					this.draw.rotate(Math.PI/6*h+Math.PI/360*m+Math.PI/21600*c);
					this.draw.moveTo(0,15);
					this.draw.lineTo(4,0);
					this.draw.lineTo(1,-this.bansize+80);
					this.draw.lineTo(-1,-this.bansize+80);
					this.draw.lineTo(-4,0);
					this.draw.closePath();
					this.draw.fillStyle="#FC9A13";
					this.draw.fill();
					this.draw.restore();;
					this.draw.restore();
					
				this.makeround2();
					
			}
			
		}
		var clock1=new clock();
		clock1.init();