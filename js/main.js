jQuery(document).ready(function(a){function t(){window.matchMedia("(max-width: 800px)").matches?(a(".content_2").mCustomScrollbar("destroy"),a(".resp-vtabs .resp-tabs-container").css("height","100%"),a(".content_2").css("height","100%")):(a(".resp-vtabs .resp-tabs-container").css("height","580px"),a(".content_2").css("height","580px"),a(".content_2").mCustomScrollbar("destroy"),a(".content_2").mCustomScrollbar({theme:"dark-2",contentTouchScroll:!0,advanced:{updateOnContentResize:!0,updateOnBrowserResize:!0,autoScrollOnFocus:!1}}))}a(window).load(function(){a("#spinner").fadeOut(200),a("#preloader").delay(200).fadeOut("faster"),a(".wrapper").fadeIn(200),a("#custumize-style").fadeIn(200)});var e=new Array("fa fa-user icon_menu icon_menu_active","fa fa-tasks icon_menu","fa fa-briefcase icon_menu","fa fa-bullhorn icon_menu","fa fa-envelope icon_menu");a("#verticalTab").find("ul.resp-tabs-list li").addClass("resp-tab-item"),a("#verticalTab").css({display:"block",width:"auto",margin:"0px"}),a("#verticalTab").find(".resp-tabs-container > div").addClass("resp-tab-content"),a("#verticalTab").addClass("resp-vtabs"),a("#verticalTab").find(".resp-tab-content").before("<h2 class='resp-accordion hi-icon-wrap hi-icon-effect-5 hi-icon-effect-5a' role='tab'><i class='hi-icon'></i></h2>"),a("#verticalTab").find(".resp-accordion").each(function(t){$tabItemh2=a(this),$tabItemh2.find(".hi-icon").addClass(e[t]);var i=a("#verticalTab").find(".resp-tab-item:eq("+t+")").text();a("#verticalTab").find(".resp-accordion:eq("+t+")").append('<span class="tite-list-resp">'+i+"</span>"),$tabItemh2.attr("aria-controls","tab_item-"+t)}),a("#verticalTab").find(".resp-tab-item").each(function(t){$tabItem=a(this),$tabItem.attr("aria-controls","tab_item-"+t),$tabItem.attr("role","tab"),a("#verticalTab").find(".resp-tab-item").first().addClass("resp-tab-active"),a("#verticalTab").find(".resp-accordion").first().addClass("resp-tab-active"),a("#verticalTab").find(".resp-tab-content").first().addClass("resp-tab-content-active").attr("style","display:block"),a("#verticalTab").find(".resp-tab-content").each(function(t){a(this).attr("aria-labelledby","tab_item-"+t)})}),a("#verticalTab").find("[role=tab]").each(function(){var t=a(this);t.click(function(){var e=t.attr("aria-controls");return t.hasClass("resp-accordion")&&t.hasClass("resp-tab-active")?(a("#verticalTab").find(".resp-tab-content-active").slideUp("",function(){a(this).addClass("resp-accordion-closed")}),t.removeClass("resp-tab-active"),!1):void(!t.hasClass("resp-tab-active")&&t.hasClass("resp-accordion")?(a("#verticalTab").find(".resp-tab-active").removeClass("resp-tab-active"),a("#verticalTab").find(".resp-tab-content-active").slideUp().removeClass("resp-tab-content-active resp-accordion-closed"),a("#verticalTab").find("[aria-controls="+e+"]").addClass("resp-tab-active"),a("#verticalTab").find(".resp-tab-content[aria-labelledby = "+e+"]").slideDown().addClass("resp-tab-content-active")):(a("#verticalTab").find(".resp-tab-active").removeClass("resp-tab-active"),a("#verticalTab").find(".resp-tab-content-active").removeAttr("style").removeClass("resp-tab-content-active").removeClass("resp-accordion-closed"),a("#verticalTab").find("[aria-controls="+e+"]").addClass("resp-tab-active"),a("#verticalTab").find(".resp-tab-content[aria-labelledby = "+e+"]").addClass("resp-tab-content-active").attr("style","display:block")))}),a(window).resize(function(){a("#verticalTab").find(".resp-accordion-closed").removeAttr("style")})}),a("h2.resp-accordion").click(function(){a(this).find(".icon_menu").addClass("icon_menu_active"),a("h2.resp-accordion").not(this).find(".icon_menu").removeClass("icon_menu_active"),a("html, body").animate({scrollTop:a("h2.resp-accordion").offset().top-50},600)}),a(".resp-tabs-list li").click(function(){a(this).find(".icon_menu").addClass("icon_menu_active"),a(".resp-tabs-list li").not(this).find(".icon_menu").removeClass("icon_menu_active")}),a(".resp-tabs-list li").hover(function(){a(this).find(".icon_menu").addClass("icon_menu_hover")},function(){a(this).find(".icon_menu").removeClass("icon_menu_hover")}),a("h2.resp-accordion").hover(function(){a(this).find(".icon_menu").addClass("icon_menu_hover")},function(){a(this).find(".icon_menu").removeClass("icon_menu_hover")}),a(".content_2").mCustomScrollbar({theme:"dark-2",contentTouchScroll:!0,advanced:{updateOnContentResize:!0,updateOnBrowserResize:!0,autoScrollOnFocus:!1}});var i="bounceIn";a(".dropdown-select").change(function(){i=a(".dropdown-select").val()}),a("ul.resp-tabs-list li[class^=tabs-]").click(function(){a(this).attr("data-tab-name");return a(".resp-tabs-container").addClass("animated "+i),a(".resp-tabs-container").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){a(".resp-tabs-container").removeClass("animated "+i)}),a(".content_2").mCustomScrollbar("destroy"),a(".content_2").mCustomScrollbar({theme:"dark-2",contentTouchScroll:!0,advanced:{updateOnContentResize:!0,updateOnBrowserResize:!0,autoScrollOnFocus:!1}}),!1}),window.addEventListener("load",t,!1),window.addEventListener("resize",t,!1);var n={init:function(){a("#portfoliolist").mixitup({targetSelector:".portfolio",filterSelector:".filter",effects:["fade"],easing:"snap",onMixEnd:n.hoverEffect()})},hoverEffect:function(){a("#portfoliolist .portfolio").hover(function(){a(this).find(".label").stop().animate({bottom:0},200),a(this).find("img").stop().animate({top:-30},500)},function(){a(this).find(".label").stop().animate({bottom:-40},200),a(this).find("img").stop().animate({top:0},300)})}};n.init(),a(".-tabs-container h2.resp-accordion").each(function(){a(this).hasClass("resp-tab-active")?a(this).append("<i class='glyphicon glyphicon-chevron-up arrow-tabs'></i>"):a(this).append("<i class='glyphicon glyphicon-chevron-down arrow-tabs'></i>")}),a(".resp-tabs-container h2.resp-accordion").click(function(){a(this).hasClass("resp-tab-active")&&a(this).find("i.arrow-tabs").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up"),a(".resp-tabs-container h2.resp-accordion").each(function(){a(this).hasClass("resp-tab-active")||a(this).find("i.arrow-tabs").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down")})}),a(".tabs-resume").click(function(){a(".skillbar").each(function(){a(this).find(".skillbar-bar").width(0)}),a(".skillbar").each(function(){a(this).find(".skillbar-bar").animate({width:a(this).attr("data-percent")},2e3)})}),a("#resume").prev("h2.resp-accordion").click(function(){a(".skillbar").each(function(){a(this).find(".skillbar-bar").width(0)}),a(".skillbar").each(function(){a(this).find(".skillbar-bar").animate({width:a(this).attr("data-percent")},2e3)})}),a("input:radio[name=page_builder]").on("change",function(){return a("input:radio[name=page_builder]").each(function(){var t=a(this);a(this).prop("checked")&&window.location.replace(t.val())}),!1})});