$('.box>div').addClass("hiden");
		$("input").click(function(){
			var random1=Math.floor(Math.random()*6);
			var random2=Math.floor(Math.random()*6);
			$('.box>div').removeClass("hiden");
			$('.box').addClass("move");
			
			$(".box").on("webkitAnimationEnd",function(){
				setTimeout(function(){
					$(".box").css({
						transform:"rotateX("+random1*90+"deg) rotateY("+random2*90+"deg)"
					})
				},0);
				$(this).removeClass("move");
				setTimeout(function(){
					$('.box>div').addClass("hiden");
				},3000);
			})
			
		})