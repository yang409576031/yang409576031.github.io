function clock(size,border1){
	this.width=size||500;
	this.height=size||500;
	this.border=border1||3;
	this.clock;
	this.M;
	this.H;
	this.S;	
	this.clock2;
};
clock.prototype={
	init:function(){
		this.makeclock();
		this.makesclock();
		this.makestext();
		this.makeM();
		this.makeH();
		this.makeS();
		this.makecicle();
		this.makesetclocl();
	},
	makeclock:function(){
		this.clock=$("<div/>").css({
			width:this.width+"px",
			height:this.height+"px",
			borderRadius:"50%",
			margin:"50px auto",
			position:"relative" ,
		}).appendTo($(".box2"));
		this.clock2=$("<div/>").css({
			width:this.width+"px",
			height:this.height+"px",
			borderRadius:"50%",
			left:"250px",
			top:"230px",
			position:"absolute" ,
		}).appendTo(this.clock);
	},
	makesclock:function(){
		for(var a=0;a<60;a++){
			if(a%5==0){
				var w=8;
				var h=35;
			}else{
				var w=5;
				var h=20;
			}
			$("<div/>").css({
				width:w+"px",
				height:h+'px',
				position:"absolute",
				background:"#333",
				left:0,
				right:0,
				top:0,
				bottom:0,
				margin:"0 auto",
				borderRadius:"10px",
				transformOrigin:"center "+this.width/2+"px",
				transform:"translateX("+(-w/2)+"px)  rotate("+a*6+"deg)"
			}).appendTo(this.clock)
		}
	},
	makestext:function(){
		for(var a=1;a<61;a++){
			if(a%5==0){
				ang=Math.PI/30*a;
                sang=Math.sin(ang);
                cang=Math.cos(ang);
                
                nx = sang *200;
                ny = -cang * 200;
				$("<div>"+(a/5)+"</div>").css({
					width:"40px",
					height:'40px',
					position:"absolute",
					transform:"translate(250px,250px)",
					left:"-20px",
					fontSize:"30px",
					//right:0,
					//top:"30px",
					textAlign:"center",
					lineHeight:"40px",
					//margin:"0 auto",
					//borderRadius:"10px",
					transform:"translate("+nx+"px, "+ny+"px)",
				}).appendTo(this.clock2);
			}
		}
	},
	makeS:function(){
		this.S=$("<span class='span'>").css({
			display:'block',
			height:'240px',
			width:"4px",
			position:"absolute",
			background:"#F3A92B",
			left:'50%',
			top:"10px",
			borderRadius:"10px",
			transformOrigin:"center bottom",
			transform:"translate(-2px)",
		}).appendTo(this.clock)
	},
	makeM:function(){
		this.M=$("<span>").css({
			display:'block',
			height:'215px',
			width:"10px",
			position:"absolute",
			background:"#222222",
			left:'50%',
			top:"35px",
			borderRadius:"10px",
			transformOrigin:"center bottom",
			transform:"translate(-5px) rotate(90deg)"
		}).appendTo(this.clock)
	},
	makeH:function(){
		this.H=$("<span>").css({
			display:'block',
			height:'180px',
			width:"20px",
			position:"absolute",
			background:"#222222",
			left:'50%',
			top:"70px",
			borderRadius:"10px",
			transformOrigin:"center bottom",
			transform:"translate(-10px) rotate(45deg)"
		}).appendTo(this.clock);
	},
	makecicle:function(){
		$("<strong>").css({
			width:'40px',
			height:"40px",
			display:"block",
			borderRadius:"50%",
			position:"absolute",
			left:"0px",
			top:"0px",
			background:"#F3A92B",
			right:"0px",
			bottom:"0px",
			margin:"auto",
		}).appendTo(this.clock)
	},
	makesetclocl:function(){
		var that=this
		var c=new Date().getMinutes();
		var m=new Date().getSeconds();
		var h=Math.abs(new Date().getHours()-12);
		that.S.css({
			transform:"rotate("+6*m+"deg)"
		});
		that.M.css({
			transform:"rotate("+(6*c+m*0.1)+"deg)"
		});
		that.H.css({
			transform:"rotate("+(30*h+m*0.1+c/12)+"deg)"
		});
		setInterval(function(){
			var c=new Date().getMinutes();
			var m=new Date().getSeconds();
			var h=Math.abs(new Date().getHours()-12);
			that.S.css({
				transform:"rotate("+6*m+"deg)"
			});
			that.M.css({
				transform:"rotate("+(6*c+m*0.1)+"deg)"
			});
			that.H.css({
				transform:"rotate("+(30*h+m*0.1+c/120)+"deg)"
			});
		},1000);
		
	}
};
$(function(){
	var clock1=new clock();
	clock1.init();
})
