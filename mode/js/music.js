
var looper=0;
$("#listBtn").click(function(){
	$("#musicList").toggle();
	return false;
})
$(document).click(function(){
	$("#musicList").hide();
	$(".musicVolume").hide();
	$(".musicLoop").hide();
})
var arr=[
	{
		"pic":"../img/1.jpg",
		"music":"../music/1.mp3"
	},
	{
		"pic":"../img/2.jpg",
		"music":"../music/2.mp3"
	},
	{
		"pic":"../img/3.jpg",
		"music":"../music/3.mp3"
	}
];
var musicCount=0;

function init(){
	$("#music").prop("src",arr[musicCount].music);
	$("#musicPic img").prop("src",arr[musicCount].pic);
	$("#musicList li").removeClass("on");
	$("#musicList li").eq(musicCount).addClass("on");
	$("#musicLoop p").removeClass("loopColor");
	$("#musicLoop p").eq(looper).addClass("loopColor");
}
init();
$(".next").on("click",function(){
	next();
});
function next(){
	if(looper==0){
		musicCount++;
		if(musicCount>arr.length-1){
			musicCount=0;
		}
	}else if(looper==1){
		musicCount=Math.floor(Math.random()*3);
	}
	var state=$("#music")[0].paused;
	init();
	if(!state){
		$("#music")[0].play();
	}
};
$(".prev").on("click",function(){
	if(looper==0){
		musicCount--;
		if(musicCount<0){
			musicCount=arr.length-1;
		}
	}else if(looper==1){
		musicCount=Math.floor(Math.random()*3);
	}
	var state=$("#music")[0].paused;
	init();
	if(!state){
		$("#music")[0].play();
	}
})
$(".playmusic").click(function(){
var state=$("#music")[0].paused;
	if(state){
		$("#music")[0].play();
		$(".playmusic").removeClass("glyphicon-play").addClass("glyphicon glyphicon-pause");
		addMove();
	}else{
		$("#music")[0].pause();
		$(".playmusic").removeClass("glyphicon-pause").addClass("glyphicon glyphicon-play");
		removeMove();
	}
})
function addMove(){
	$("#musicPic img").css({
		animation:"musicMove 5s linear 0s infinite",
	})
}
function removeMove(){
	$("#musicPic img").css({
		animation:"none 1s",
	})
}
$("#musicList").on("click","li",function(){
	musicCount=$(this).index();
	init();
	$("#music")[0].play();
	$("#musicList").hide();
});
$("#music").on("ended",function(){
	next();
	$("#music")[0].play();
})
$("#music").on("timeupdate",function(){
	var time=$("#music")[0].currentTime;
	var timeTotle=$("#music")[0].duration;
	var width=parseInt($(".musicScroll").css("width"));
	var process=time/timeTotle*(width-20);
	var c=Math.floor(time/60);
	var s=parseInt(time%60);
	if(c<10){
		c="0"+c;
	}
	if(s<10){
		s="0"+s
	}
	$(".musicTimes").html(c+":"+s);
	$(".musicProgress").css("left",process+"px");
	$(".musicProgressW").css("width",process+"px");
})
/*控制播放进度条*/
$(".musicProgress").on("mousedown",function(ev){
	var disx=ev.pageX;
	var width1=parseInt($(".musicProgressW").css("width"));
	$(document).on("mousemove",function(ev){
			var disx1=ev.pageX-disx+width1;
			var timeTotle=$("#music")[0].duration;
			var width=parseInt($(".musicScroll").css("width"));
			$(".musicProgress").css("left",disx1+"px");
			$(".musicProgressW").css("width",disx1+"px");
	        $("#music")[0].currentTime=(disx1/(width-20))*timeTotle;
	})
	$(document).on("mouseup",function(){
		$(document).off();
	})
	return false;
})


/*音量控制*/
$("#music")[0].volume=0.5;
$("#musicVolume").click(function(){
	$(".musicVolume").toggle();
	return false;
})
$(".valumeScroll").mousedown(function(ev){
	var disy=ev.pageY;
	var width1=parseInt($(".valumeProgess").css("height"));
	$(document).on("mousemove",function(ev){
			var disx1=disy-ev.pageY+width1;
			var width=parseInt($(".valumeToall").css("height"))-15;
			if(disx1<=0){
				disx1=0;
				$("#musicVolume>span").removeClass("glyphicon-volume-up").addClass("glyphicon-volume-off")
			}else{
				$("#musicVolume>span").removeClass("glyphicon-volume-off").addClass("glyphicon-volume-up")	
			}
			if(disx1>width){
				disx1=width;
			}
			$(".valumeScroll").css("bottom",disx1+"px");
			$(".valumeProgess").css("height",disx1+"px");
	        $("#music")[0].volume=(disx1/width);
	})
	$(document).on("mouseup",function(){
		$(document).off();
	})
	return false;
})

/*播放顺序*/
$(".musicLoopO").click(function(){
	$(".musicLoop").toggle();
	return false;
})
$(".musicLoop p").click(function(){
	looper=$(this).index();
	$("#musicLoop p").removeClass("loopColor");
	$("#musicLoop p").eq(looper).addClass("loopColor");
	if(looper==0){
		$(".musicLoopO").removeClass("glyphicon-repeat glyphicon-random").addClass("glyphicon-refresh")
	}else if(looper==1){
		$(".musicLoopO").removeClass("glyphicon-repeat glyphicon-refresh").addClass("glyphicon-random")
	}else{
		$(".musicLoopO").removeClass("glyphicon-random glyphicon-refresh").addClass("glyphicon-repeat")
	}
})
