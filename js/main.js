var sentara = function(){
	var numberOfSlides,
		windowHeight = $(window).height(),
		documentHeight,
		slides,
		currentSlide = 1,
		htmlbody;
	$(function(){ //######### INIT #######################

		/*                               *\
			event handlers for > mobile
		\*                               */
		if($(window).width() > 992){
			sentara.lastScrollTop = 0;
			$(window).bind('scroll',function(e){
				var st = $(this).scrollTop();
				if (st > sentara.lastScrollTop){
				// downscroll code
					sentara.parallaxScroll('down');
				} else {
				// upscroll code
					sentara.parallaxScroll('up');
				}
				sentara.lastScrollTop = st;
			});

			$(window).resize(function(){
				sentara.setSize();
			});
			$(document).on('keydown', function(e){
				sentara.keyNav(e);
			});

			$(".lazy").lazyload({effect : "fadeIn",skip_invisible : false});
		}else{
			$(".lazy").lazyload({skip_invisible : false, threshold:windowHeight * 2});
		}

		slides = $('.slide');
		documentHeight = $(document).height();
		numberOfSlides = slides.length;
		htmlbody = $('html,body');

		currentSlide = (Math.floor($(window).scrollTop() / windowHeight)) + 1;

		/* Set Nav */
		for(var i=0; i < numberOfSlides; i++){
			$('#nav ul').append('<li attrSlideNumber="'+(i+1)+'"></li>');
		}

		$('li[attrSlideNumber='+currentSlide+']').addClass('active');
		
		$('#nav ul li').bind('click',function(){
			var slideNum = $(this).attr('attrSlideNumber');
			sentara.scrollTo(slideNum);
		});

		$('.next button, .next .caret').bind('click',function(){
			sentara.nextSlide();
		});

		$('#slides').slidesjs({
			width: 400,
			height: 250,
			play: {
				active: false,
				// [boolean] Generate the play and stop buttons.
				// You cannot use your own buttons. Sorry.
				effect: "fade",
				// [string] Can be either "slide" or "fade".
				interval: 5000,
				// [number] Time spent on each slide in milliseconds.
				auto: false,
				// [boolean] Start playing the slideshow on load.
				swap: true,
				// [boolean] show/hide stop and play buttons
				pauseOnHover: false,
				// [boolean] pause a playing slideshow on hover
				restartDelay: 2500
				// [number] restart delay on inactive slideshow
			},
			navigation: {
				effect: "fade"
			},
			pagination: {
				effect: "fade"
			},
			subHeadContainer : $('#subHeadContainer'),
			effect: {
				fade: {
					speed: 800,
					// [number] Speed in milliseconds of the fade animation.
					crossfade: true
					// [boolean] Cross-fade the transition.
				}
			}

		});
	}); // ################### METHODS #########################
	return {
		parallaxScroll : function(direction){
			var scrolled = $(window).scrollTop(),
				slideWhole = documentHeight + scrolled,
				slide = Math.floor(scrolled / windowHeight),
				percent = Math.ceil((scrolled / windowHeight % 1) *100) / 100;


			if(currentSlide != slide+1){
				var slideObj = $(slides[slide]);
				currentSlide = slide+1;

				$('#nav ul li.active').removeClass('active');
				$('li[attrSlideNumber='+(slide+1)+']').addClass('active');
				$('.content.fixed').removeClass('fixed');
				slideObj.find('.content').addClass('fixed');
			}

			
			
			var content = $(slides[slide+1]).find('.content');

			if(percent < 0.93 && currentSlide !==0){
				$(content).find('h1').css('margin-top', 500 - (500 * percent));
				$(content).find('hr').css('margin-top', 200 - (200 * percent));
				$(content).find('h3').css('margin-top', 400 - (400 * percent));
			}else{
				$(content).find('h1, hr, h3').removeAttr('style');
			}
		},
		slideContentStagger : function(){

		},
		setSize : function(){
			windowHeight = $(window).height();
			documentHeight = $(document).height();
		},
		scrollTo : function(slide){
			htmlbody.animate({
				scrollTop: (windowHeight*slide) - windowHeight
			}, 1600, 'easeInOutExpo', function() { //era 600 easeOutQuint
				
			});
		},
		keyNav : function(e){
			// up/left arrow = scroll up -  || e.keyCode == 38
			if (e.keyCode == 37 || e.keyCode == 38) {
			//Back
				this.scrollTo(currentSlide-1);
			}
			// down/right arrow, space = scroll down -  || e.keyCode == 40 || e.keyCode == 32
			if (e.keyCode == 39 || e.keyCode == 40) {
			//Forward
				this.scrollTo(currentSlide+1);
			}
		},
		nextSlide : function(){
			this.scrollTo(currentSlide+1);
		}
	};
}();
