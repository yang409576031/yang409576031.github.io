
function d(c){
	console.log(c);
}
//获取活动面积宽
var width=$(".snake_box").width();
var driect={
	sizeNum:20,
	size:width/20,
	gamebox:$(".snake_box"),
	Snake:null,
	Food:null,
	S_move:null,
}
//创建蛇头
function Snake(){
	this.head=null;
	this.pos={
		x:0,
		y:0
	},
	this.dir="right";
	this.arr=[];
	this.count=0;
}
Snake.prototype={
	create:function(){
		this.head=$("<span class='shead'>").css({
			width:driect.size,
			height:driect.size,
			left:this.pos.x,
			top:this.pos.y
		}).appendTo(driect.gamebox);
	},
	move:function(){
		 var opos={x:this.pos.x,y:this.pos.y}
		switch (this.dir){
            case "right":
                this.pos.x+=driect.size;
                break;
            case "left":
                this.pos.x-=driect.size;
                break;
            case "up":
                this.pos.y-=driect.size;
                break;
            case "down":
                this.pos.y+=driect.size;
                break;
   	};
     	if(this.defalut()){
     		return;
     	};
     	this.boxMove(opos);
		this.head.css({
            left:this.pos.x,
            top:this.pos.y
       });
       
       
	},
	defalut:function(){
		var w=parseInt(this.pos.x);
		var h=parseInt(this.pos.y);
		var maxw=driect.size*(driect.sizeNum-1);
		var w1=parseInt(driect.Food.pos.x);
		var h1=parseInt(driect.Food.pos.y);
		if(w<0||w>maxw||h<0||h>maxw){
			clearInterval(driect.S_move);
			this.stop();
			return true;
		};
		for(var a=0;a<this.arr.length;a++){
			var w2=parseInt(this.arr[a].css("left"));
			var h2=parseInt(this.arr[a].css("top"));
			if(w==w2&&h==h2){
				clearInterval(driect.S_move);
				this.stop();
				return true;
			}
		};
		if(w==w1&&h==h1){
			this.eat();
		};
	},
	stop:function(){
		$(".swper").show();
		$(".title h5").html("您得分为"+this.count+"分")
		touch.on(".title button","tap",function(){
			clearInterval(driect.S_move);
			driect.gamebox.find(".shead").remove();
            driect.gamebox.find(".sfood").remove();
            driect.gamebox.find(".sbox").remove();
			driect.Snake=new Snake();
			$(".scod>span").html("0");
			driect.Snake.create();
			driect.S_move=setInterval(function(){
				driect.Snake.move();
			},200)
			driect.Food=new Food();
			driect.Food.create();
			$(".swper").hide();
		})
	},
	eat:function(){
		this.count++;
		$(".scod>span").html(this.count);
		driect.Food.postPsoition();
		this.addbox();
	},
	addbox:function(){
		var box=$("<div class='sbox'></div>").css({
			width:driect.size,
			height:driect.size,
			left:this.pos.x,
			top:this.pos.y
		}).appendTo(driect.gamebox);
		this.arr.push(box);
	},
	boxMove:function(opt){
		if(this.arr.length){
			this.arr[this.arr.length-1].css({
				left:opt.x,
				top:opt.y
			});
			this.arr.unshift(this.arr.pop());
		};
		
	}
}
//创建食物
function Food(){
	this.head=null;
	this.pos={
		x:0,
		y:0
	}
}
Food.prototype={
	create:function(){
		this.post();
		this.head=$("<span class='sfood'>").css({
			width:driect.size,
			height:driect.size,
			left:this.pos.x,
			top:this.pos.y
		}).appendTo(driect.gamebox);
	},
	post:function(){
		var x=Math.floor(Math.random()*(driect.sizeNum-1))*driect.size;
		var y=Math.floor(Math.random()*(driect.sizeNum-1))*driect.size;
		this.pos.x=x;
		this.pos.y=y;
	},
	postPsoition:function(){
		this.post();
		this.head.css({
			left:this.pos.x,
			top:this.pos.y
		});
	}
}


//开始运行
touch.on(".scod button","tap",function(){
	var html=$(".scod button").html();
	if(html=="开始游戏"){
		$(".scod button").html("正在游戏");
		driect.Snake=new Snake();
		driect.Snake.create();
		driect.S_move=setInterval(function(){
			driect.Snake.move();
		},200)
		driect.Food=new Food();
		driect.Food.create();
		touch.on(".snake","swipeup",function(){
			if(driect.Snake.dir=="down"){
				return;
			}
		    driect.Snake.dir="up";
		})
		touch.on(".snake","swipedown",function(){
			if(driect.Snake.dir=="up"){
				return;
			}
		    driect.Snake.dir="down";
		})
		touch.on(".snake","swipeleft",function(){
			if(driect.Snake.dir=="right"){
				return;
			}
		    driect.Snake.dir="left";
		})
		touch.on(".snake","swiperight",function(){
			if(driect.Snake.dir=="left"){
				return;
			}
		    driect.Snake.dir="right";
		})
	}else if(html=="正在游戏"){
		$(".scod button").html("暂停游戏");
		clearInterval(driect.S_move);
	}else if(html=="暂停游戏"){
		$(".scod button").html("正在游戏");
		driect.S_move=setInterval(function(){
			driect.Snake.move();
		},200)
	}
	
})
